import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { AppComponent }  from './app.component';
import { RustSearchComponent } from './rust-search.component';
import { RustSearchPipe } from './rust-search.pipe';
import { SchoolDetailsComponent } from './school-details.component';
import { SubjectDetailsComponent  } from './subject-details.component';
import { CourseDetailsComponent } from './course-details.component';
import { SectionDetailsComponent } from './section-details.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, Ng2AutoCompleteModule ],
  declarations: [ AppComponent, CourseDetailsComponent, RustSearchComponent, RustSearchPipe, 
                  SchoolDetailsComponent, SectionDetailsComponent, SubjectDetailsComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  
    //constructor (private schoolDataService: SchoolDataService) {}
    
}
