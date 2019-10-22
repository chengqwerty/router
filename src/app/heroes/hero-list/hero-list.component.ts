import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

    public heroes$: Observable<Hero[]>;
    public selectedId: number;

    constructor(private service: HeroService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.heroes$ = this.route.paramMap.pipe(
            switchMap(params => {
                this.selectedId = +params.get('id');
                return this.service.getHeroes();
            })
        );
    }

}
