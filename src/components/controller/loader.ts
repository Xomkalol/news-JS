import { Endpoint, HttpMethod, HttpStatus } from '../../types/common';
import type { Callback, LoaderOptions, RequestParams } from '../../types/common';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<Pick<LoaderOptions, 'apiKey'>>;

    constructor(baseLink: string, options: Readonly<Pick<LoaderOptions, 'apiKey'>>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<LoaderOptions>, endpoint: Endpoint): string {
        const urlOptions: Partial<LoaderOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: Partial<LoaderOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res): Promise<T> => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;