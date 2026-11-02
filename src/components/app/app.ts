import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { NewsResponse, SourcesResponse } from '../types/newsApi.ts';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector<HTMLElement>('.sources');

        if (!sourcesElement) {
            throw new Error('Element ".sources" not found in the DOM');
        }

        sourcesElement.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
        );

        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;