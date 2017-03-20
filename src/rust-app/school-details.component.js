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
var rust_search_pipe_1 = require('./rust-search.pipe');
var SchoolDetailsComponent = (function () {
    /*private schoolData: string;*/
    //#B3E5FC
    function SchoolDetailsComponent(schoolDataService, rustSearchPipe) {
        this.schoolDataService = schoolDataService;
        this.rustSearchPipe = rustSearchPipe;
        this.name = 'Angular';
    }
    SchoolDetailsComponent.prototype.getSchools = function () {
        // this.schoolData = this.schoolDataService.getSchoolData();
        this.schoolData = this.schoolDataService.getSchoolData();
    };
    SchoolDetailsComponent.prototype.selectSchool = function (school) {
        school.selected = !school.selected;
        event.stopPropagation();
    };
    SchoolDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSchools();
        this.rustSearchPipe.searchDataSubject.subscribe(function (data) {
            _this.searchResults = data;
        });
    };
    SchoolDetailsComponent.prototype.ngOnChanges = function (changes) {
        console.log("" + rust_search_pipe_1.RustSearchPipe);
    };
    SchoolDetailsComponent.prototype.OnClick = function () {
        this.schoolDataService.reportQueriedData();
    };
    SchoolDetailsComponent.prototype.ShowSearchResults = function () {
        console.log(this.searchResults);
    };
    SchoolDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'school-details',
            // providers: [ RustSearchPipe ],
            templateUrl: 'school-details.component.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof school_data_service_1.SchoolDataService !== 'undefined' && school_data_service_1.SchoolDataService) === 'function' && _a) || Object, (typeof (_b = typeof rust_search_pipe_1.RustSearchPipe !== 'undefined' && rust_search_pipe_1.RustSearchPipe) === 'function' && _b) || Object])
    ], SchoolDetailsComponent);
    return SchoolDetailsComponent;
    var _a, _b;
}());
exports.SchoolDetailsComponent = SchoolDetailsComponent;
//# sourceMappingURL=school-details.component.js.map