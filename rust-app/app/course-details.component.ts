import { Component, Input, OnInit } from '@angular/core';
import { SchoolDataService } from './school-data.service';
// import { RustSearchPipe } from './rust-search.pipe';
import { Course } from './models/courses';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'course-details',
    templateUrl: 'course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
    @Input() schoolId: string;
    @Input() schoolCode: string;
    @Input() subjectId: string;
    @Input() subjectCode: string;
    courseData: Observable<Course[]>;
    
    constructor(private schoolDataService: SchoolDataService) {}
    
    getCourses(): void {
        this.courseData = this.schoolDataService.getCourses(this.schoolCode, this.subjectId)
        // .then(data => {
        //     // console.log(data);
        //     this.courseData = data;
        // });
    }
    
    selectCourse(course: Course): void {
        course.selected = !course.selected;
        event.stopPropagation();
    }
    
    ngOnInit(): void {
        this.getCourses();
    }
}