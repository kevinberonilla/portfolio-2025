import { Asset, EntryProps } from 'contentful-management';

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
	slug: string;
	startYear?: number;
	thumbnail: Pick<Asset, 'sys'>;
	videos?: string[];
}>;

export type Project = ProjectEntry['fields'] & {
	imageUrls: string[];
	thumbnailUrl: string;
};

interface GetProjectsResults {
	data: {
		projects: Project[];
	} | null;
	error: unknown;
	success: boolean;
}

interface GetProjectsParams {
	order?: string;
	slug?: string;
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
							? `https:${asset.fields.file.url}`
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
			imageUrls,
			thumbnailUrl: `https:${thumbnailUrl}`,
			...project.fields,
		});
	});

	return formattedProjects;
}

export async function getProjects({
	order,
	slug,
}: GetProjectsParams = {}): Promise<GetProjectsResults> {
	try {
		const projectsHeaders = new Headers({
			Authorization: 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN,
		});
		const requestOptions = {
			headers: projectsHeaders,
			method: 'GET',
			redirect: 'follow' as RequestRedirect,
		};
		const params = new URLSearchParams({
			content_type: 'project',
			order:
				order ||
				'-fields.endYear,fields.endYearOrder,-fields.startYear,-sys.createdAt',
			...(slug && { 'fields.slug': slug }),
		});
		const response = await fetch(
			`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?${params.toString()}`,
			requestOptions
		);
		const responseJson = await response.json();
		const projects = buildProjects(
			responseJson.items,
			responseJson.includes?.Asset ?? []
		);

		return {
			data: { projects },
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
