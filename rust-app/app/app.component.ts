import { Component } from '@angular/core';
import { SchoolDetailsComponent } from './school-details.component';
import {SchoolDataService } from './school-data.service';
import { RustSearchPipe } from './rust-search.pipe';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers:    [ SchoolDataService, RustSearchPipe ],
  templateUrl: 'app.component.html'
})
export class AppComponent  { 
  
}
