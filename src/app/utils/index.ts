import { inject } from '@angular/core';
import { EventBusService } from '../event-bus.service';

export const formatDateTimeString = (dateTimeString: string): string => {
    let date = new Date(dateTimeString);
    let options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short'
    };
    return date.toLocaleDateString('en-GB', options);
};

export const copyObject = (referencedObject: any) => JSON.parse(JSON.stringify(referencedObject));

export function showLoader() {
    const bus = inject(EventBusService);
    bus.emit({ type: 'LOADER_SHOW' });
}

export function hideLoader() {
    const bus = inject(EventBusService);
    bus.emit({ type: 'LOADER_HIDE' });
}