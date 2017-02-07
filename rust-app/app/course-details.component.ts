import { Component, Input, OnInit } from '@angular/core';
import { SchoolDataService } from './school-data.service';
import { Course } from './models/courses';
// import { CourseCode } from './models/CourseCode';

@Component({
    moduleId: module.id,
    selector: 'course-details',
    templateUrl: 'course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
    @Input() schoolId: string;
    @Input() schoolCode: string;
    @Input() subjectCode: string;
    courseData: Course[];
    
    constructor(private schoolDataService: SchoolDataService) {}
    
    getCourses(): void {
        this.schoolDataService.getCourses(this.schoolCode, this.subjectCode)
        .then(data => {
            // console.log(data);
            this.courseData = data;
        });
    }
    
    selectCourse(course: Course): void {
        course.selected = !course.selected;
        event.stopPropagation();
    }
    
    ngOnInit(): void {
        this.getCourses();
    }
}