import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Crisis } from './crisis-center/crisis';
import { CrisisService } from './crisis-center/crisis.service';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CrisisDetailResolveService implements Resolve<Crisis> {

    constructor(private cs: CrisisService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Promise<Crisis> | Crisis {
        const id = route.paramMap.get('id');

        return this.cs.getCrisis(id).pipe(
            take(1),
            mergeMap(crisis => {
                if (crisis) {
                    return of(crisis);
                } else {
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
            })
        );
    }
}
