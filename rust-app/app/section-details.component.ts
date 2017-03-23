import { Component, Input, OnInit } from '@angular/core';
import { Course } from './models/courses';

@Component({
    moduleId: module.id,
    selector: 'section-details',
    templateUrl: 'section-details.component.html'
})
export class SectionDetailsComponent implements OnInit {
    @Input() semesters: any[];
    private selectedSemester: any;;
    
    formatSemester(semester: any): string {
        let formatted = '';
        switch(semester.name.slice(0,-4)){
            case "0":
                formatted += "Winter";
                break;
            case "1":
                formatted += "Spring";
                break;
            case "7":
                formatted += "Summer";
                break;
            default: 
                formatted += "Fall";
        }
        formatted += ` ${semester.name.slice(-4)}`;
        return formatted;
    }
    
    ngOnInit(): void {
        // console.log(this.semesters);
        this.semesters.sort((a, b) => {
            if (b.name.slice(-4) != a.name.slice(-4)){
                return b.name.slice(-4) - a.name.slice(-4);
            } else {
                return b.name.slice(0,-4) - a.name.slice(0,-4);
            }
        });
        
        if (this.semesters[0]){
            this.selectedSemester = this.semesters[0];
        }
    }
    
    selectSemester(semester: any): void {
        this.selectedSemester = semester;
        event.stopPropagation();
    }
    
    // OnClick(semester: any): void {
    //     console.log(`${semester.name} data:`);
    //     console.log(JSON.stringify(semester.sections));
    //     event.stopPropagation();
    // }
}