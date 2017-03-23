import { Component, Input, OnInit } from '@angular/core';
import { SchoolDataService } from './school-data.service';
import {Observable} from 'rxjs/Rx';
import { Subject } from './models/subjects';

@Component({
    moduleId: module.id,
    selector: 'subject-details',
    templateUrl: 'subject-details.component.html'
})
export class SubjectDetailsComponent implements OnInit {
    
    @Input() schoolId: string;
    @Input() schoolCode: string;
    subjectData: Observable<Subject[]>;
    
    constructor(private schoolDataService: SchoolDataService) {}
    
    getSubjects(): void {
        this.subjectData = this.schoolDataService.getSubjects(this.schoolId)
    }
    
    logSubjects(): void {
        console.log(this.subjectData);
    }
    
    selectSubject(subject: Subject): void {
        // if (!this.subjectData || this.subjectData.length <= 0) return;
        // for (let item of this.subjectData) {
        //     if (item != subject) {
        //         item.selected = false;
        //     } else {
        //         item.selected = true;
                
        //     }
        // }
        subject.selected = !subject.selected;
        event.stopPropagation();
    }
    
    ngOnInit(): void {
        this.getSubjects();
    }
}