import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RustRoutingModule } from './rust-routing.module';
import { RustComponent }  from './rust.component';
import { RustSearchComponent } from './rust-search.component';
import { RustSearchPipe } from './rust-search.pipe';
import { SchoolDetailsComponent } from './school-details.component';
import { SubjectDetailsComponent  } from './subject-details.component';
import { CourseDetailsComponent } from './course-details.component';
import { SectionDetailsComponent } from './section-details.component';

// @NgModule({
//   imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, Ng2AutoCompleteModule ],
//   declarations: [ RustComponent, CourseDetailsComponent, RustSearchComponent, RustSearchPipe, 
//                   SchoolDetailsComponent, SectionDetailsComponent, SubjectDetailsComponent],
//   bootstrap:    [ RustComponent ]
// })

@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, RustRoutingModule ],
  declarations: [ RustComponent, CourseDetailsComponent, RustSearchComponent, RustSearchPipe, 
                  SchoolDetailsComponent, SectionDetailsComponent, SubjectDetailsComponent],
  exports:    [ RustComponent ]
})
export class RustModule {}
