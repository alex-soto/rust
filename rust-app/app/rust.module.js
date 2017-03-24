"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var rust_routing_module_1 = require('./rust-routing.module');
var rust_component_1 = require('./rust.component');
var rust_search_component_1 = require('./rust-search.component');
var rust_search_pipe_1 = require('./rust-search.pipe');
var school_details_component_1 = require('./school-details.component');
var subject_details_component_1 = require('./subject-details.component');
var course_details_component_1 = require('./course-details.component');
var section_details_component_1 = require('./section-details.component');
var RustModule = (function () {
    function RustModule() {
    }
    RustModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.ReactiveFormsModule, rust_routing_module_1.RustRoutingModule],
            declarations: [rust_component_1.RustComponent, course_details_component_1.CourseDetailsComponent, rust_search_component_1.RustSearchComponent, rust_search_pipe_1.RustSearchPipe,
                school_details_component_1.SchoolDetailsComponent, section_details_component_1.SectionDetailsComponent, subject_details_component_1.SubjectDetailsComponent],
            bootstrap: [rust_component_1.RustComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], RustModule);
    return RustModule;
}());
exports.RustModule = RustModule;
//# sourceMappingURL=rust.module.js.map