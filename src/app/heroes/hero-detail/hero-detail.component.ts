import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    public hero$: Observable<Hero>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: HeroService) { }

    ngOnInit() {
        this.hero$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.service.getHero(params.get('id'));
            })
        );
    }

    gotoHeroes(hero: Hero) {
        const heroId = hero ? hero.id : null;
        this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
    }

}
