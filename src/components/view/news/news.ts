import './news.css';
import type { Article } from '../../types/newsApi';

type NewsItem = Pick<
    Article,
    'source' | 'author' | 'publishedAt' | 'title' | 'description' | 'url' | 'urlToImage'
>;

class News {
    private static readonly MAX_ITEMS = 10;
    private static readonly PLACEHOLDER_IMAGE = 'img/news_placeholder.jpg';

    public draw(data: readonly NewsItem[]): void {
        const news = data.slice(0, News.MAX_ITEMS);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('Template "#newsItemTemp" not found in the DOM');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                News.getElement(newsClone, '.news__item').classList.add('alt');
            }

            News.getElement(newsClone, '.news__meta-photo').style.backgroundImage =
                `url(${item.urlToImage || News.PLACEHOLDER_IMAGE})`;
            News.getElement(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            News.getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            News.getElement(newsClone, '.news__description-title').textContent = item.title;
            News.getElement(newsClone, '.news__description-source').textContent = item.source.name;
            News.getElement(newsClone, '.news__description-content').textContent =
                item.description ?? '';
            News.getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = News.getElement(document, '.news');
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    private static getElement<T extends HTMLElement = HTMLElement>(
        root: ParentNode,
        selector: string
    ): T {
        const element = root.querySelector<T>(selector);

        if (!element) {
            throw new Error(`Element "${selector}" not found`);
        }

        return element;
    }
}

export default News;