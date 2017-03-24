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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
// import { School } from './models/schools';
// import { Subject } from './models/subjects';
var RustSearchPipe = (function () {
    function RustSearchPipe() {
        this.searchDataSubject = new BehaviorSubject_1.BehaviorSubject(RustSearchPipe.searchData);
        this.obs = this.searchDataSubject.subscribe(function (data) {
            RustSearchPipe.searchData = data;
        });
    }
    RustSearchPipe.prototype.updateSearchData = function (newData) {
        this.searchDataSubject.next(newData);
        // console.log(this.searchDataSubject);
        // RustSearchPipe.timesCalled = 0;
    };
    RustSearchPipe.prototype.transform = function (value, args) {
        // console.log(`RustSearchPipe: transform() called: ${RustSearchPipe.timesCalled}`);
        if (!RustSearchPipe.searchData || RustSearchPipe.searchData.length == 0) {
            return value;
        }
        else if (value != null) {
            return value.filter(function (entry) {
                for (var _i = 0, _a = RustSearchPipe.searchData; _i < _a.length; _i++) {
                    var criteria = _a[_i];
                    if (criteria.searchResults[args.toLowerCase()].length != 0 &&
                        criteria.searchResults[args.toLowerCase()].indexOf(entry._id) < 0) {
                        return false;
                    }
                }
                return true;
            });
        }
    };
    RustSearchPipe.searchData = [];
    RustSearchPipe.timesCalled = 0;
    RustSearchPipe = __decorate([
        core_1.Pipe({
            name: "rustSearch",
            pure: false
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RustSearchPipe);
    return RustSearchPipe;
}());
exports.RustSearchPipe = RustSearchPipe;
/*
schoolTransform(schools: School[]): any[] {
        console.log(`schoolTransform called.`);
        let schoolSearchTerms: string[] = [];
        for (let crit in RustSearchPipe.searchData){
            if (RustSearchPipe.searchData[crit].type == "schools"){
                schoolSearchTerms.push(RustSearchPipe.searchData[crit].value);
            }
        }
        console.log(`schoolSearchTerms: ${schoolSearchTerms}`);
        if (schoolSearchTerms.length == 0){
            return schools;
        }
        return schools.filter(school => {
            let schoolKeys = Object.keys(school);
            for (let key in schoolKeys){
                for (let term of schoolSearchTerms){
                    if (
                        (school['code'].toLowerCase().indexOf(term) >= 0) ||
                        (school['description'].toLowerCase().indexOf(term) >= 0)
                        ) {
                        return true;
                    }
                }
            }
            return false;
            // school[keyToSearch].indexOf(searchParam) >= 0;
        });
    }

subjectTransform(subjects: Subject[]): any[] {
        
        console.log(`subjectTransform called.`);
        let subjectSearchTerms: string[] = [];
        for (let crit in RustSearchPipe.searchData){
            if (RustSearchPipe.searchData[crit].type == "subjects"){
                subjectSearchTerms.push(RustSearchPipe.searchData[crit].value);
            }
        }
        console.log(`subjectSearchTerms: ${subjectSearchTerms}`);
        if (subjectSearchTerms.length == 0){
            return subjects;
        }
        
        return subjects.filter(subject => {
            let subjectKeys = Object.keys(subject);
            for (let key in subjectKeys){
                for (let term of subjectSearchTerms){
                    if (
                        (subject['code'].toLowerCase().indexOf(term) >= 0) ||
                        (subject['description'].toLowerCase().indexOf(term) >= 0)
                        ) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
*/ 
//# sourceMappingURL=rust-search.pipe.js.map