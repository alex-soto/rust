import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { SchoolDetailsComponent } from './school-details.component';
import { SubjectDetailsComponent  } from './subject-details.component';
import { CourseDetailsComponent } from './course-details.component';
import { SectionDetailsComponent } from './section-details.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, SchoolDetailsComponent, SubjectDetailsComponent, 
                  CourseDetailsComponent, SectionDetailsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  
    //constructor (private schoolDataService: SchoolDataService) {}
    
}
