import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';
import { SchoolDataService } from './school-data.service';
// import { School } from './models/schools';
// import { Subject } from './models/subjects';

@Pipe({
    name: "rustSearch",
    pure: false
})
@Injectable()
export class RustSearchPipe implements PipeTransform {

    static searchData: any[] = [];
    static timesCalled = 0;
    public searchDataSubject = new BehaviorSubject(RustSearchPipe.searchData);
    private obs = this.searchDataSubject.subscribe(data => {
        RustSearchPipe.searchData = data;
    });
    
    updateSearchData(newData: any[]) {
        this.searchDataSubject.next(newData);
        // console.log(this.searchDataSubject);
        // RustSearchPipe.timesCalled = 0;
    }
    
    transform(value: any[], args: string): any[] {
        // console.log(`RustSearchPipe: transform() called: ${RustSearchPipe.timesCalled}`);
        if (!RustSearchPipe.searchData || RustSearchPipe.searchData.length == 0) {
            return value;
        } else if (value != null) {
            return value.filter(entry => {
                for (let criteria of RustSearchPipe.searchData) {
                    if (criteria.searchResults[args.toLowerCase()].length != 0 &&
                        criteria.searchResults[args.toLowerCase()].indexOf(entry._id) < 0){
                        return false;
                    }
                }
                return true;
            });
        }
    }
}

/*
schoolTransform(schools: School[]): any[] {
        console.log(`schoolTransform called.`);
        let schoolSearchTerms: string[] = [];
        for (let crit in RustSearchPipe.searchData){
            if (RustSearchPipe.searchData[crit].type == "schools"){
                schoolSearchTerms.push(RustSearchPipe.searchData[crit].value);
            }
        }
        console.log(`schoolSearchTerms: ${schoolSearchTerms}`);
        if (schoolSearchTerms.length == 0){
            return schools;
        }
        return schools.filter(school => {
            let schoolKeys = Object.keys(school);
            for (let key in schoolKeys){
                for (let term of schoolSearchTerms){
                    if (
                        (school['code'].toLowerCase().indexOf(term) >= 0) || 
                        (school['description'].toLowerCase().indexOf(term) >= 0)
                        ) {
                        return true;
                    } 
                }
            }
            return false;
            // school[keyToSearch].indexOf(searchParam) >= 0;
        });
    }

subjectTransform(subjects: Subject[]): any[] {
        
        console.log(`subjectTransform called.`);
        let subjectSearchTerms: string[] = [];
        for (let crit in RustSearchPipe.searchData){
            if (RustSearchPipe.searchData[crit].type == "subjects"){
                subjectSearchTerms.push(RustSearchPipe.searchData[crit].value);
            }
        }
        console.log(`subjectSearchTerms: ${subjectSearchTerms}`);
        if (subjectSearchTerms.length == 0){
            return subjects;
        }
        
        return subjects.filter(subject => {
            let subjectKeys = Object.keys(subject);
            for (let key in subjectKeys){
                for (let term of subjectSearchTerms){
                    if (
                        (subject['code'].toLowerCase().indexOf(term) >= 0) || 
                        (subject['description'].toLowerCase().indexOf(term) >= 0)
                        ) {
                        return true;
                    } 
                }
            }
            return false;
        });
    }
*/