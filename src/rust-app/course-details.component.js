"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var school_data_service_1 = require('./school-data.service');
var CourseDetailsComponent = (function () {
    function CourseDetailsComponent(schoolDataService) {
        this.schoolDataService = schoolDataService;
    }
    CourseDetailsComponent.prototype.getCourses = function () {
        this.courseData = this.schoolDataService.getCourses(this.schoolCode, this.subjectId);
        // .then(data => {
        //     // console.log(data);
        //     this.courseData = data;
        // });
    };
    CourseDetailsComponent.prototype.selectCourse = function (course) {
        course.selected = !course.selected;
        event.stopPropagation();
    };
    CourseDetailsComponent.prototype.ngOnInit = function () {
        this.getCourses();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CourseDetailsComponent.prototype, "schoolId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CourseDetailsComponent.prototype, "schoolCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CourseDetailsComponent.prototype, "subjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CourseDetailsComponent.prototype, "subjectCode", void 0);
    CourseDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-details',
            templateUrl: 'course-details.component.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof school_data_service_1.SchoolDataService !== 'undefined' && school_data_service_1.SchoolDataService) === 'function' && _a) || Object])
    ], CourseDetailsComponent);
    return CourseDetailsComponent;
    var _a;
}());
exports.CourseDetailsComponent = CourseDetailsComponent;
//# sourceMappingURL=course-details.component.js.map