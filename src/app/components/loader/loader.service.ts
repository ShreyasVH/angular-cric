import { Injectable } from '@angular/core';
import { EventBusService } from '../../event-bus.service';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    constructor(private bus: EventBusService) {}

    show() {
        console.log('showing loader');
        this.bus.emit({ type: 'LOADER_SHOW' });
    }

    hide() {
        this.bus.emit({ type: 'LOADER_HIDE' });
    }
}
