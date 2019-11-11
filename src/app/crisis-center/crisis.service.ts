import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crisis } from './crisis';
import { CRISIS } from './mock-crisis';
import { MessageService } from '../message.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CrisisService {
    static nextCrisisId = 100;
    private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISIS);

    constructor(private messageService: MessageService) { }

    getCrises() {
        return this.crises$;
    }

    getCrisis(id: number | string) {
        return this.getCrises().pipe(
            map(crises => crises.find(crisis => crisis.id === +id))
        );
    }

    addCrisis(name: string) {
        name = name.trim();
        if (name) {
            const crisis = {id: CrisisService.nextCrisisId++, name};
            CRISIS.push(crisis);
            this.crises$.next(CRISIS);
        }
    }

}
