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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var SchoolDataService = (function () {
    function SchoolDataService(http) {
        this.http = http;
        this.baseUrl = 'api/';
        this.schoolsUrl = "schools";
        this.subjectsUrl = 'subjects?';
        this.coursesUrl = 'courses?';
        this.searchUrl = 'search?';
    }
    SchoolDataService.prototype.reportQueriedData = function () {
        console.log("schoolDataService.queriedData:");
        console.log(this.queriedData);
        console.log("typeof this.queriedData[0]: " + typeof this.queriedData[0]);
        console.log("this.searchResults:");
        console.log(this.searchResults);
    };
    SchoolDataService.prototype.getSchoolData = function () {
        var _this = this;
        if (this.queriedData)
            return Rx_1.Observable.of(this.queriedData);
        var targetUrl = this.baseUrl + this.schoolsUrl;
        return this.http.get(targetUrl)
            .map(function (response) {
            // console.log(response.json());
            _this.queriedData = response.json();
            return response.json();
        });
    };
    SchoolDataService.prototype.getSubjects = function (schoolId) {
        var targetUrl = this.baseUrl + this.subjectsUrl;
        // let result: Promise<Subject[]>;
        var _loop_1 = function(school) {
            if (school._id == schoolId && school.subjects && typeof school.subjects[0] != 'string') {
                return { value: Rx_1.Observable.of(school.subjects) };
            }
            else if (school._id == schoolId) {
                return { value: this_1.http.get(targetUrl + "school=" + schoolId)
                    .map(function (response) {
                    school.subjects = response.json();
                    return response.json();
                }) };
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.queriedData; _i < _a.length; _i++) {
            var school = _a[_i];
            var state_1 = _loop_1(school);
            if (typeof state_1 === "object") return state_1.value;
        }
    };
    ;
    SchoolDataService.prototype.getCourses = function (schoolCode, subjectId) {
        var school = this.queriedData.find(function (x) { return x.code == schoolCode; });
        var subject = school.subjects.find(function (y) { return y._id == subjectId; });
        if (subject.courses && typeof subject.courses[0] != 'string') {
            return Rx_1.Observable.of(subject.courses);
        }
        else {
            var targetUrl = this.baseUrl + this.coursesUrl;
            return this.http.get(targetUrl + "subject=" + subjectId)
                .map(function (response) {
                subject.courses = response.json();
                return response.json();
            });
        }
    };
    ;
    SchoolDataService.prototype.getSearchData = function (searchCriterion) {
        var _this = this;
        var targetUrl = this.baseUrl + this.searchUrl;
        // let queryParams: any = {};
        var queryString = searchCriterion.id + "=" + this.escapeHtml(searchCriterion.value);
        return this.http.get(targetUrl.concat(queryString))
            .map(function (response) {
            // console.log(response.json());
            _this.searchResults = response.json();
            return response.json();
        });
        // .subscribe();
    };
    SchoolDataService.prototype.escapeHtml = function (unsafe) {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/\s/g, "&#32;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            .replace(/\+/g, "&#43;").replace(/\./g, "&#46;");
    };
    SchoolDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SchoolDataService);
    return SchoolDataService;
}());
exports.SchoolDataService = SchoolDataService;
//# sourceMappingURL=school-data.service.js.map