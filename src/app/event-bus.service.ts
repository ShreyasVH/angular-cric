import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { AppEvent } from './app-events';

type EventOf<TType extends AppEvent['type']> = Extract<AppEvent, { type: TType }>;

@Injectable({ providedIn: 'root' })
export class EventBusService {
    private readonly subject = new Subject<AppEvent>();

    emit<E extends AppEvent>(event: E): void {
        this.subject.next(event);
    }

    on<T extends AppEvent['type']>(type: T): Observable<EventOf<T>> {
        return this.subject.asObservable()
            .pipe(filter((e): e is EventOf<T> => e.type === type));
    }
}
