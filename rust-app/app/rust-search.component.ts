import { Component, Input } from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { SchoolDataService } from './school-data.service';

@Component({
  moduleId: module.id,
  selector: 'rust-search',
  providers:    [ SchoolDataService ],
  templateUrl: 'rust-search.component.html'
})
export class RustSearchComponent { 
  
  
  searchCriteria: any[] = [];
  selectedSearch: any;
  search: FormControl = new FormControl(); 
  
  /*
   * Search options: School, Subject, Course, Professor, CoreCode
   */
  searchTypes = [
    {
      id: "school",
      displayText: "Schools",
      example: `"01" or "arts and sciences"`
    },
    {
      id: "subject",
      displayText: "Subjects",
      example: `"547" or "information technology"`
    },
    {
      id: "course",
      displayText: "Courses",
      example: `"421", "data analytics", or instructor's name`
    },
    {
      id: "coreCode",
      displayText: "Core Codes",
      example: `"WCd" or "writing and communication"`
    }
  ];

  @Input() searchParams: string;//= [];
  
  
  testFunction(event: any) {
    console.log(`testFunction() called`)
    console.log(event);
  }
  
  addSearchCriterion(): void {
    console.log(`addSearchCriterion() called.`);
    if (this.selectedSearch && this.search.value){
      this.searchCriteria.push({
        type: this.selectedSearch.displayText,
        value: this.search.value
      });
    }
    this.search.setValue('');
  }
  
  
  constructor(){
    this.selectedSearch = this.searchTypes[0];
    
    // this.searchForm.valueChanges
    // .distinctUntilChanged()
    // .debounceTime(400)
    // .subscribe(val => {
    //   this.searchParams = val;
    //   console.log(`search.valueChanges called.`);
    // });
  }
}

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
  
 observableSource(){
    return Observable.of(this.autoCompleteSource);
  };
  
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