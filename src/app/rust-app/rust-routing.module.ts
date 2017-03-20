import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RustComponent } from './rust.component';

const rustRoutes: Routes = [
    { path: 'projects/rust', component: RustComponent }
  ];
  
@NgModule({
    imports: [
        RouterModule.forChild(rustRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RustRoutingModule {}