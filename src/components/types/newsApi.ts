export interface Source {
    id: string | null;
    name: string;
}

export interface SourceInfo {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: Source;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: SourceInfo[];
}