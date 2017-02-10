import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SchoolDataService } from './school-data.service';

@Component({
  moduleId: module.id,
  selector: 'rust-search',
  providers:    [ SchoolDataService ],
  templateUrl: 'rust-search.component.html'
})
export class RustSearchComponent { 
  
  mySource: string[] = ['alpha', 'beta', 'charlie', 'delta'];
  
  searchParams: string[] = [];
  search = new FormControl();
  
  constructor(){
    this.logSearchChange();
  }
  
  logSearchChange(){
    this.search.valueChanges.forEach(val => {
      this.searchParams.push(val);
      
      // if (this.searchParams.length >= 2){
        
      // }
    })
  }
  
}