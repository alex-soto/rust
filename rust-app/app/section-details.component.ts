import { Component, Input } from '@angular/core';
import { Course } from './models/courses';

@Component({
    moduleId: module.id,
    selector: 'section-details',
    templateUrl: 'section-details.component.html'
})
export class SectionDetailsComponent {
    @Input() semesters: any[];
    
    OnClick(semester: any): void {
        console.log(`${semester.name} data:`);
        console.log(JSON.stringify(semester.sections));
    }
}