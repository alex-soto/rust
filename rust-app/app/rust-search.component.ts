import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { SchoolDataService } from './school-data.service';

@Component({
  moduleId: module.id,
  selector: 'rust-search',
  providers:    [ SchoolDataService ],
  templateUrl: 'rust-search.component.html'
})
export class RustSearchComponent { 
  
  autoCompleteSource: any[]; // = []; // = []; // = ['alpha', 'beta', 'charlie', 'delta'];
  
  /*
   * Search options: School, Subject, Course, Professor, CoreCode
   */
  twoNumRegex = /[0-9]{2}/g;
  threeNumRegex = /[0-9]{3}/g;
  stringRegex = /([a-z]|\s)+/ig;
  // twoNumMsg = ["schools"];
  // threeNumMsg = ["subjects","courses"];
  // strMsg = ["course titles", "instructors", "core codes"];
  
  // regexArr = [
  //   {"regex": /[0-9]{2}/g, "messages":["schools"]},
  //   {"regex": /[0-9]{3}/g, "messages":["subjects","courses"]},
  //   {"regex": /([a-z]|\s)+/ig, "messages":["course titles", "instructors", "core codes"]},
  // ];
  regexArr = [
    {
      "regex": this.twoNumRegex, 
      "options":[{
        id:"schools",
        text:"school codes"
        }]
    },
    {
      "regex": this.threeNumRegex, 
      "options":[{
        id:"subjects", 
        text:"subject codes"
        },{
        id:"courseNum",
        text:"course codes"
        }]
    },
    {
      "regex": this.stringRegex, 
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
  
  findRegexMessages() {
    // let messages: string[] = [];
    this.autoCompleteSource = [];
    for (let i in this.regexArr){
      // console.log(`this.regexArr[${i}]["regex"].test(${val})=${this.regexArr[i]["regex"].test(val)}`);
      if (this.regexArr[i]["regex"].test(this.searchParams[this.searchParams.length-1])){
        // messages = this.regexArr[i]["messages"];
        for (let j in this.regexArr[i]["options"]){
          this.autoCompleteSource.push(this.regexArr[i]["options"][j]);
        }
        
      }
    }
    // this.autoCompleteSource = messages;
    // return messages;
  }
  searchParams: string[] = [];
  search = new FormControl();
  observableSource(){
    return Observable.of(this.autoCompleteSource);
  };
  
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>Find '<i>${this.searchParams}</i>' in ${data.text}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  testVar = search;
  
  constructor(private _sanitizer: DomSanitizer){
    this.autoCompleteSource = [];
    
    this.search.valueChanges
    .distinctUntilChanged()
    .subscribe(val => {
      this.searchParams = [];
      this.searchParams.push(val);
      this.findRegexMessages();
    });
    
    
  }
}