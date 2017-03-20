import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { School } from './models/schools';
import { Subject } from './models/subjects';
import { Course } from './models/courses';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SchoolDataService {
    private baseUrl: string = 'api/';
    private schoolsUrl: string = "schools";
    private subjectsUrl: string = 'subjects?';
    private coursesUrl: string = 'courses?';
    private searchUrl: string = 'search?';
    private queriedData: School[];
    public searchResults: any[];

    constructor(private http: Http){}
    
    reportQueriedData(): void {
        console.log(`schoolDataService.queriedData:`);
        console.log(this.queriedData);
        console.log(`typeof this.queriedData[0]: ${typeof this.queriedData[0]}`);
        console.log(`this.searchResults:`);
        console.log(this.searchResults);
    }
    
    getSchoolData(): Observable<School[]> {
        if (this.queriedData) return Observable.of(this.queriedData);
        let targetUrl = this.baseUrl + this.schoolsUrl;
        return this.http.get(targetUrl)
            // .debounceTime(1000)
            .map(response => {
                // console.log(response.json());
                this.queriedData = response.json() as School[];
                return response.json();
            });  
    }
    
    
    getSubjects(schoolId: string): Observable<Subject[]> {
        let targetUrl = this.baseUrl + this.subjectsUrl;
        // let result: Promise<Subject[]>;
        for (let school of this.queriedData){
            if (school._id == schoolId && school.subjects && typeof school.subjects[0] != 'string') {
                return Observable.of(school.subjects); 
            } else if (school._id == schoolId){
                return this.http.get(`${targetUrl}school=${schoolId}`)
                .map(response => {
                    school.subjects = response.json() as Subject[];
                    return response.json();
                });
            }
        }
    };
    
    getCourses(schoolCode: string, subjectId: string): Observable<Course[]> {
        let school = this.queriedData.find(x => x.code == schoolCode);
        let subject = school.subjects.find(y => y._id == subjectId);
        if (subject.courses && typeof subject.courses[0] != 'string') {
            return Observable.of(subject.courses);
        } else {
            let targetUrl = this.baseUrl + this.coursesUrl;
            return this.http.get(`${targetUrl}subject=${subjectId}`)
            .map(response => {
                subject.courses = response.json() as Course[];
                return response.json();
            })
        }
    };
    
    getSearchData(searchCriterion: any): Observable<any[]> {
        let targetUrl = this.baseUrl + this.searchUrl;
        // let queryParams: any = {};
        let queryString: string = `${searchCriterion.id}=${this.escapeHtml(searchCriterion.value)}`;
        return this.http.get(targetUrl.concat(queryString))
            .map(response => {
                // console.log(response.json());
                this.searchResults = response.json();
                return response.json();
            });
            // .subscribe();
    }
    
    escapeHtml(unsafe: string) {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;").replace(/\s/g, "&#32;")
                     .replace(/"/g, "&quot;").replace(/'/g, "&#039;")
                     .replace(/\+/g, "&#43;").replace(/\./g, "&#46;");
      }
}