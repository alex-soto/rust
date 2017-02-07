import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { School } from './models/schools';
import { Subject } from './models/subjects';
import { Course } from './models/courses';
import { CoreCode } from './models/corecode';

import '../node_modules/rxjs/add/operator/toPromise';

@Injectable()
export class SchoolDataService {
    private baseUrl: string = 'api/';
    private subjectsUrl: string = 'subjects?';
    private coursesUrl: string = 'courses?'
    private queriedData: School[];

    constructor(private http: Http){}
    
    reportQueriedData(): void {
        console.log(`schoolDataService.queriedData:`);
        console.log(this.queriedData);
    }
    
    getSchoolData(): Promise<School[]> {
        let result: Promise<School[]>;
        if (this.queriedData) {
            result = Promise.resolve(this.queriedData);
        } else {
            result = this.http.get(this.baseUrl)
            .toPromise()
            .then(response => {
                // console.log(response.json());
                this.queriedData = response.json() as School[];
                return response.json() as School[];
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
        return result;
    }
    
    getSubjects(schoolCode: string): Promise<Subject[]> {
        let targetUrl = this.baseUrl + this.subjectsUrl;
        let result: Promise<Subject[]>;
        for (let school of this.queriedData){
            if (school.code == schoolCode && school.subjects) {
                return Promise.resolve(school.subjects);
            } else if ((school.code == schoolCode) && (!school.subjects)){
                return this.http.get(`${targetUrl}school=${schoolCode}`)
                .toPromise()
                .then(response => {
                    school.subjects = response.json() as Subject[];
                    return response.json() as Subject[];
                })
                .catch(err => {
                    return Promise.reject(err);
                });    
            }
        }
    };
    
    getCourses(schoolCode: string, subjectCode: string): Promise<Course[]> {
        let school = this.queriedData.find(x => x.code == schoolCode);
        if (school.subjects) {
            let subject = school.subjects.find(y => y.code == subjectCode);
            if (subject.courses) {
                return Promise.resolve(subject.courses)
            } else {
                let targetUrl = this.baseUrl + this.coursesUrl;
                return this.http.get(`${targetUrl}school=${schoolCode}&subject=${subjectCode}`)
                .toPromise()
                .then(response => {
                    subject.courses = response.json() as Course[];
                    return response.json() as Course[];
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }
        }
    };
}