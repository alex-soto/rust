import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { FormControl, FormGroup } from '@angular/forms';
import { SchoolDataService } from './school-data.service';
import { RustSearchPipe } from './rust-search.pipe';

@Component({
  moduleId: module.id,
  selector: 'rust-search',
  templateUrl: 'rust-search.component.html',
  styleUrls: ['../css/search.css']
})

export class RustSearchComponent { 
  
  @Input() searchPipe: RustSearchPipe;
  searchCriteria: any[] = [];
  selectedSearch: any;
  search: FormControl = new FormControl();
  searchParams: any[] = [];
  
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
  ];
  
  addSearchCriterion(): void {
    if (this.selectedSearch && this.search.value){
      let newCriterion = {
        id: this.selectedSearch.id,
        type: this.selectedSearch.displayText.toLowerCase(),
        value: this.search.value
      }
      this.searchCriteria.push(newCriterion);
      this.schoolDataService.getSearchData(newCriterion).subscribe(data => {
        
        this.searchParams.push({
          "searchKey": newCriterion,
          "searchResults": this.getKeysFromData(data)
        });
        this.searchPipe.updateSearchData(this.searchParams);
      });
    }
    this.search.setValue('');
  }
  
  deleteSearchCriterion(criterion: any): void {
    this.searchCriteria.splice(this.searchCriteria.indexOf(criterion), 1);
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

  OnClick(){
    console.log(`this.searchCriteria`);
    console.log(`${this.searchCriteria}`);
    console.log(`this.searchParams: `);
    console.log(this.searchParams);
  }
  
} // class RustSearchComponent
