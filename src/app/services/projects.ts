import { Asset, EntryProps } from 'contentful-management';

export type Project = EntryProps<{
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

export interface GetProjectsResponse {
	data: {
		includes: {
			Asset: Asset[];
		};
		items: Project[];
	} | null;
	error: unknown;
	success: boolean;
}

export async function getProjects(): Promise<GetProjectsResponse> {
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
		const data = await response.json();

		return {
			data,
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
