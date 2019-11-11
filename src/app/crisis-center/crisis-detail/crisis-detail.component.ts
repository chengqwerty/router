import { Component, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../dialog.service';

@Component({
    selector: 'app-crisis-detail',
    templateUrl: './crisis-detail.component.html',
    styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

    public crisis: Crisis;
    public editName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { crisis: Crisis }) => {
            this.editName = data.crisis.name;
            this.crisis = data.crisis;
        });
    }

    cancel() {
        this.gotoCrises();
    }

    gotoCrises() {
        const crisisId = this.crisis ? this.crisis.id : null;
        this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    }
}
