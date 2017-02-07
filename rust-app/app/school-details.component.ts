import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { SchoolDataService } from './school-data.service';
import { School } from './models/schools';

@Component({
    moduleId: module.id,
    selector: 'school-details',
    templateUrl: 'school-details.component.html'
})

// animations: [
//         trigger('schoolState',[
//             state('inactive',style({
//                 backgroundColor: '#ECEFF1',
//                 transform: 'scale(1) translateX(0)'
//             })),
//             state('active',style({
//                 backgroundColor: '#B3E5FC',
//                 transform: 'scale(1.1) translateX(0)'
//             })),
//             transition('inactive => active', animate('100ms ease-in')),
//             transition('active => inactive', animate('100ms ease-out')),
//             transition('void => *', [
//                 style({ transform: 'translateX(-100%)' }),
//                 animate(200)
//             ]),
//             transition('* => void', [
//                 style({ transform: 'translateX(100%)' }),
//                 animate(200)
//             ])
//         ])
//     ]

export class SchoolDetailsComponent implements OnInit {
    name: String = 'Angular';
    schoolData: School[];
    /*private schoolData: string;*/
    //#B3E5FC
    constructor(private schoolDataService: SchoolDataService) {}

    getSchools(): void {
        this.schoolDataService.getSchoolData()
        .then((data) => {
            this.schoolData = data;
            for (let school of this.schoolData) {
                school.selected = false;
            }
        });
    }
    
    selectSchool(school: School): void {
        school.selected = !school.selected;
        event.stopPropagation();
    }
    
    ngOnInit(): void {
        this.getSchools();
    }
    
    OnClick(): void {
        this.schoolDataService.reportQueriedData();
    }
}