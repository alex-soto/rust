import { CoreCode } from './corecode';

export interface Course {
    "id": String,
    "code": String,
    "coreCodes": CoreCode[],
    "courseNumber": String,
    "credits": Number,
    "fullTitle": String,
    "prereqs": String,
    "synopsis": String,
    "title": String,
    "semesters": any[],
    "selected": Boolean
}