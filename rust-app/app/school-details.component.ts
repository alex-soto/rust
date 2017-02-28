import { Component, Input, OnInit, OnChanges, ChangeDetectorRef, ApplicationRef, trigger, state, style, transition, animate } from '@angular/core';
import { SchoolDataService } from './school-data.service';
import { School } from './models/schools';
import { RustSearchPipe } from './rust-search.pipe';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'school-details',
    // providers: [ RustSearchPipe ],
    templateUrl: 'school-details.component.html'
    // ,
    // changeDetection: ChangeDetectionStrategy.OnPush,
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

export class SchoolDetailsComponent implements OnInit, OnChanges {
    name: String = 'Angular';
    schoolData: Observable<School[]>;
    searchResults: any[];
    
    /*private schoolData: string;*/
    //#B3E5FC
    constructor(private schoolDataService: SchoolDataService,
                private rustSearchPipe: RustSearchPipe) {}

    getSchools(): void {
        // this.schoolData = this.schoolDataService.getSchoolData();
        this.schoolData = this.schoolDataService.getSchoolData();
    }
    
    selectSchool(school: School): void {
        school.selected = !school.selected;
        event.stopPropagation();
    }
    
    ngOnInit(): void {
        this.getSchools();
        this.rustSearchPipe.searchDataSubject.subscribe(data=>{
            this.searchResults = data;
            
        });
        
    }
    
    ngOnChanges(changes: any): void {
        console.log(`${RustSearchPipe}`);
    }
    
    OnClick(): void {
        this.schoolDataService.reportQueriedData();
    }
    
    ShowSearchResults(){
        console.log(this.searchResults);
    }
}