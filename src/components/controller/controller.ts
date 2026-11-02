import AppLoader from './appLoader';
import { Endpoint } from '../types/common';
import type { Callback } from '../types/common';
import type { NewsResponse, SourcesResponse } from '../types/newsApi';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        this.getResp<SourcesResponse>({ endpoint: Endpoint.Sources }, callback);
    }

    public getNews(e: Event, callback: Callback<NewsResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        if (!target || !newsContainer) return;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;