
export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type Callback<T> = (data: T) => void;

export interface LoaderOptions {
    apiKey: string;
    sources?: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<LoaderOptions>;
}
