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
var SubjectDetailsComponent = (function () {
    function SubjectDetailsComponent(schoolDataService) {
        this.schoolDataService = schoolDataService;
    }
    SubjectDetailsComponent.prototype.getSubjects = function () {
        this.subjectData = this.schoolDataService.getSubjects(this.schoolId);
    };
    SubjectDetailsComponent.prototype.logSubjects = function () {
        console.log(this.subjectData);
    };
    SubjectDetailsComponent.prototype.selectSubject = function (subject) {
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
    };
    SubjectDetailsComponent.prototype.ngOnInit = function () {
        this.getSubjects();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SubjectDetailsComponent.prototype, "schoolId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SubjectDetailsComponent.prototype, "schoolCode", void 0);
    SubjectDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subject-details',
            templateUrl: 'subject-details.component.html'
        }), 
        __metadata('design:paramtypes', [school_data_service_1.SchoolDataService])
    ], SubjectDetailsComponent);
    return SubjectDetailsComponent;
}());
exports.SubjectDetailsComponent = SubjectDetailsComponent;
//# sourceMappingURL=subject-details.component.js.map