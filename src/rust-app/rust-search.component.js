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
        //BEGIN TEST//
        this.searchParams = [];
        //END TEST//
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
            // this.searchCriteria.push(newCriterion);
            // this.schoolDataService.getSearchData(newCriterion);
            this.searchCriteria.push(newCriterion_1);
            this.schoolDataService.getSearchData(newCriterion_1).subscribe(function (data) {
                // this.searchParams = data;
                _this.searchParams.push({
                    "searchKey": newCriterion_1,
                    "searchResults": _this.getKeysFromData(data)
                });
                _this.searchPipe.updateSearchData(_this.searchParams);
                // this.searchPipe.searchDataSubject.next(this.searchParams);
            });
        }
        this.search.setValue('');
        // this.searchResults = this.schoolDataService.getSearchData(this.searchCriteria);
    };
    RustSearchComponent.prototype.deleteSearchCriterion = function (criterion) {
        this.searchCriteria.splice(this.searchCriteria.indexOf(criterion), 1);
        // this.rustSearchPipe.searchDataSubject.next(this.searchCriteria);
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
    RustSearchComponent.prototype.ngOnInit = function () {
        // this.searchPipe.searchDataSubject.subscribe(data=>{
        //   console.log(`RustSearchPipe.searchDataSubject: SUBSCRIPTION-RUST-SEARCH.COMPONENT`);
        // })
    };
    RustSearchComponent.prototype.onClick = function () {
        console.log("this.searchCriteria");
        console.log("" + this.searchCriteria);
        console.log("this.searchParams: ");
        console.log(this.searchParams);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof rust_search_pipe_1.RustSearchPipe !== 'undefined' && rust_search_pipe_1.RustSearchPipe) === 'function' && _a) || Object)
    ], RustSearchComponent.prototype, "searchPipe", void 0);
    RustSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'rust-search',
            templateUrl: 'rust-search.component.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof school_data_service_1.SchoolDataService !== 'undefined' && school_data_service_1.SchoolDataService) === 'function' && _b) || Object])
    ], RustSearchComponent);
    return RustSearchComponent;
    var _a, _b;
}());
exports.RustSearchComponent = RustSearchComponent; // class RustSearchComponent
/*
autoCompleteSource: any[];

regexArr = [
    {
      "regex": /[0-9]{2}/g,
      "options":[{
        id:"schools",
        text:"school codes"
        }]
    },
    {
      "regex": /[0-9]{3}/g,
      "options":[{
        id:"subjects",
        text:"subject codes"
        },{
        id:"courseNum",
        text:"course codes"
        }]
    },
    {
      "regex": /([a-z]|\s)+/ig,
      "options":[{
        id:"courseTitle",
        text:"course titles"
      }, {
        id:"instructors",
        text:"instructors"
      },{
        id:"coreCodes",
        text:"core codes"
      }]
    }
  ];

  autocompleteListFormatter = (data: any) : SafeHtml => {
    let html = `<span (click)="addSearchCriterion()">Find '<i>${this.searchParams}</i>' in ${data.text}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
    findRegexMessages(input: string) {
    // let messages: string[] = [];
    this.autoCompleteSource = [];
    for (let i in this.regexArr){
      if (this.regexArr[i]["regex"].test(input)){
        for (let j in this.regexArr[i]["options"]){
          this.autoCompleteSource.push(this.regexArr[i]["options"][j]);
        }
        
      }
    }
  }
  
*/ 
//# sourceMappingURL=rust-search.component.js.map