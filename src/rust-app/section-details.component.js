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
var SectionDetailsComponent = (function () {
    function SectionDetailsComponent() {
    }
    ;
    SectionDetailsComponent.prototype.formatSemester = function (semester) {
        var formatted = '';
        switch (semester.name.slice(0, -4)) {
            case "0":
                formatted += "Winter";
                break;
            case "1":
                formatted += "Spring";
                break;
            case "7":
                formatted += "Summer";
                break;
            default:
                formatted += "Fall";
        }
        formatted += " " + semester.name.slice(-4);
        return formatted;
    };
    SectionDetailsComponent.prototype.ngOnInit = function () {
        // console.log(this.semesters);
        this.semesters.sort(function (a, b) {
            if (b.name.slice(-4) != a.name.slice(-4)) {
                return b.name.slice(-4) - a.name.slice(-4);
            }
            else {
                return b.name.slice(0, -4) - a.name.slice(0, -4);
            }
        });
        if (this.semesters[0]) {
            this.selectedSemester = this.semesters[0];
        }
    };
    SectionDetailsComponent.prototype.selectSemester = function (semester) {
        this.selectedSemester = semester;
        event.stopPropagation();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SectionDetailsComponent.prototype, "semesters", void 0);
    SectionDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'section-details',
            templateUrl: 'section-details.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SectionDetailsComponent);
    return SectionDetailsComponent;
}());
exports.SectionDetailsComponent = SectionDetailsComponent;
//# sourceMappingURL=section-details.component.js.map