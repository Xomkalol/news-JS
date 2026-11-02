import './sources.css';
import type { SourceInfo } from '../../types/newsApi';

type SourceItem = Pick<SourceInfo, 'id' | 'name'>;

class Sources {
    public draw(data: readonly SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Template "#sourceItemTemp" not found in the DOM');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            Sources.getElement(sourceClone, '.source__item-name').textContent = item.name;
            Sources.getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        Sources.getElement(document, '.sources').append(fragment);
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

export default Sources;
