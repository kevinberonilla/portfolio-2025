import { Asset, EntryProps } from 'contentful-management';
import { buildCategories } from './categories';

export type ProjectEntry = EntryProps<{
	appExchangeListing?: string;
	categories: string[];
	contributions: string;
	endYear?: number;
	endYearOrder?: number;
	githubRepository?: string;
	images?: Pick<Asset, 'sys'>[];
	liveSite?: string;
	name: string;
	owner: string;
	recognition?: string;
	startYear?: number;
	thumbnail: Pick<Asset, 'sys'>;
	videos?: string[];
}>;

export type Project = ProjectEntry['fields'] & {
	hash: string;
	imageUrls: string[];
	thumbnailUrl: string;
};

interface GetProjectsResult {
	data: {
		categories: string[];
		projects: Project[];
	} | null;
	error: unknown;
	success: boolean;
}

function buildProjects(projects: ProjectEntry[], assets: Asset[]): Project[] {
	const formattedProjects: Project[] = [];

	projects.forEach((project) => {
		const imageUrls: string[] = project.fields.images?.length
			? project.fields.images
					.map((image) => {
						const asset = assets.find(
							(asset) => asset.sys.id === image.sys.id
						);
						return typeof asset?.fields.file.url === 'string'
							? asset.fields.file.url
							: '';
					})
					.filter((url) => url !== '')
			: [];

		const thumbnailAsset = assets.find(
			(asset) => asset.sys.id === project.fields.thumbnail.sys.id
		);
		const thumbnailUrl =
			typeof thumbnailAsset?.fields.file.url === 'string'
				? thumbnailAsset.fields.file.url
				: '';

		formattedProjects.push({
			hash:
				'#' +
				encodeURIComponent(
					project.fields.name.toLowerCase().replaceAll(' ', '-')
				),
			imageUrls: imageUrls,
			thumbnailUrl: thumbnailUrl,
			...project.fields,
		});
	});

	return formattedProjects;
}

export async function getProjects(): Promise<GetProjectsResult> {
	try {
		const projectsHeaders = new Headers({
			Authorization: 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN,
		});
		const requestOptions = {
			headers: projectsHeaders,
			method: 'GET',
			redirect: 'follow' as RequestRedirect,
		};
		const response = await fetch(
			`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?order=-fields.endYear,fields.endYearOrder,-fields.startYear,-sys.createdAt&content_type=project`,
			requestOptions
		);
		const responseJson = await response.json();
		const projects = buildProjects(
			responseJson.items,
			responseJson.includes.Asset
		);
		const categories = buildCategories(responseJson.items);

		return {
			data: {
				categories,
				projects,
			},
			error: null,
			success: true,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
			success: false,
		};
	}
}
