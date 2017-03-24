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
var forms_1 = require('@angular/forms');
var school_data_service_1 = require('./school-data.service');
var rust_search_pipe_1 = require('./rust-search.pipe');
var RustSearchComponent = (function () {
    // constructor(){
    function RustSearchComponent(schoolDataService) {
        this.schoolDataService = schoolDataService;
        this.searchCriteria = [];
        this.search = new forms_1.FormControl();
        this.searchParams = [];
        /*
         * Search options: School, Subject, Course, Professor, CoreCode
         */
        this.searchTypes = [
            {
                id: "school",
                displayText: "Schools",
                example: "\"01\" or \"arts and sciences\""
            },
            {
                id: "subject",
                displayText: "Subjects",
                example: "\"547\" or \"information technology\""
            },
            {
                id: "course",
                displayText: "Courses",
                example: "\"421\", \"data analytics\", core code, or instructor name"
            }
        ];
        this.selectedSearch = this.searchTypes[0];
    }
    RustSearchComponent.prototype.addSearchCriterion = function () {
        var _this = this;
        if (this.selectedSearch && this.search.value) {
            var newCriterion_1 = {
                id: this.selectedSearch.id,
                type: this.selectedSearch.displayText.toLowerCase(),
                value: this.search.value
            };
            this.searchCriteria.push(newCriterion_1);
            this.schoolDataService.getSearchData(newCriterion_1).subscribe(function (data) {
                _this.searchParams.push({
                    "searchKey": newCriterion_1,
                    "searchResults": _this.getKeysFromData(data)
                });
                _this.searchPipe.updateSearchData(_this.searchParams);
            });
        }
        this.search.setValue('');
    };
    RustSearchComponent.prototype.deleteSearchCriterion = function (criterion) {
        this.searchCriteria.splice(this.searchCriteria.indexOf(criterion), 1);
        for (var _i = 0, _a = this.searchParams; _i < _a.length; _i++) {
            var srch = _a[_i];
            if (srch.searchKey == criterion) {
                this.searchParams.splice(this.searchParams.indexOf(srch), 1);
            }
        }
    };
    RustSearchComponent.prototype.getKeysFromData = function (data) {
        var values = {
            "schools": [],
            "subjects": [],
            "courses": []
        };
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var res = data_1[_i];
            if (res.subject && res.school) {
                values.schools.push(res.school);
                values.subjects.push(res.subject);
                values.courses.push(res._id);
            }
            else if (res.school && res.courses) {
                values.schools.push(res.school);
                values.subjects.push(res._id);
            }
            else {
                values.schools.push(res._id);
            }
        }
        return values;
    };
    RustSearchComponent.prototype.OnClick = function () {
        console.log("this.searchCriteria");
        console.log("" + this.searchCriteria);
        console.log("this.searchParams: ");
        console.log(this.searchParams);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', rust_search_pipe_1.RustSearchPipe)
    ], RustSearchComponent.prototype, "searchPipe", void 0);
    RustSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rust-search',
            templateUrl: 'rust-search.component.html',
            styleUrls: ['../css/search.css']
        }), 
        __metadata('design:paramtypes', [school_data_service_1.SchoolDataService])
    ], RustSearchComponent);
    return RustSearchComponent;
}());
exports.RustSearchComponent = RustSearchComponent; // class RustSearchComponent
//# sourceMappingURL=rust-search.component.js.map