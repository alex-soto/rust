import { Component } from '@angular/core';
import { SchoolDetailsComponent } from './school-details.component';
import {SchoolDataService } from './school-data.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  providers:    [ SchoolDataService ],
  templateUrl: 'app.component.html'
})
export class AppComponent  { 
  
}
