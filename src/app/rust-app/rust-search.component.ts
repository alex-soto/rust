import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { SchoolDataService } from './school-data.service';
import { RustSearchPipe } from './rust-search.pipe';

@Component({
  moduleId: module.id,
  selector: 'rust-search',
  templateUrl: 'rust-search.component.html'
})

export class RustSearchComponent implements OnInit { 
  
  @Input() searchPipe: RustSearchPipe;
  searchCriteria: any[] = [];
  selectedSearch: any;
  search: FormControl = new FormControl();
  
  //BEGIN TEST//
  searchParams: any[] = [];
  //END TEST//
  
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
      example: `"421", "data analytics", core code, or instructor name`
    }
    // ,
    // {
    //   id: "coreCode",
    //   displayText: "Core Codes",
    //   example: `"WCd" or "writing and communication"`
    // }
  ];
  
  addSearchCriterion(): void {
    if (this.selectedSearch && this.search.value){
      let newCriterion = {
        id: this.selectedSearch.id,
        type: this.selectedSearch.displayText.toLowerCase(),
        value: this.search.value
      }
      // this.searchCriteria.push(newCriterion);
      // this.schoolDataService.getSearchData(newCriterion);
      this.searchCriteria.push(newCriterion);
      this.schoolDataService.getSearchData(newCriterion).subscribe(data => {
        // this.searchParams = data;
        
        this.searchParams.push({
          "searchKey": newCriterion,
          "searchResults": this.getKeysFromData(data)
          // "searchResults": this.getKeysFromData(data)
        });
        this.searchPipe.updateSearchData(this.searchParams);
        // this.searchPipe.searchDataSubject.next(this.searchParams);
      });
      
    }
    this.search.setValue('');
    // this.searchResults = this.schoolDataService.getSearchData(this.searchCriteria);
  }
  
  deleteSearchCriterion(criterion: any): void {
    this.searchCriteria.splice(this.searchCriteria.indexOf(criterion), 1);
    // this.rustSearchPipe.searchDataSubject.next(this.searchCriteria);
    for (let srch of this.searchParams) {
      if (srch.searchKey == criterion){
        this.searchParams.splice(this.searchParams.indexOf(srch), 1);
      }
    }
    
  }
  
  private getKeysFromData(data: any[]): any[] {
    let values: any = {
      "schools": [],
      "subjects": [],
      "courses": []
    };
    for (let res of data){
      if (res.subject && res.school){
        values.schools.push(res.school);
        values.subjects.push(res.subject);
        values.courses.push(res._id);
      } else if (res.school && res.courses) {
        values.schools.push(res.school);
        values.subjects.push(res._id);
      } else {
        values.schools.push(res._id);
      }
    }
    return values;
  }
  
  // constructor(){
  constructor(private schoolDataService: SchoolDataService){
    this.selectedSearch = this.searchTypes[0];
    
  }
  
  ngOnInit(){
    // this.searchPipe.searchDataSubject.subscribe(data=>{
    //   console.log(`RustSearchPipe.searchDataSubject: SUBSCRIPTION-RUST-SEARCH.COMPONENT`);
    // })
  }
  
  onClick(){
    console.log(`this.searchCriteria`);
    console.log(`${this.searchCriteria}`);
    console.log(`this.searchParams: `);
    console.log(this.searchParams);
  }
  
} // class RustSearchComponent
  
  

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