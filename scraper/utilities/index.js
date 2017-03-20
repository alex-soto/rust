'use strict';
const db = require('../db');

let getAllSchools = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.find({
                'subjects': {
                    $not: {
                        $size: 0
                    }
                },
        }, (err, school) => {
            if (err) {
                reject(err);
            } else {
                resolve(school);
            }
        })
    });
};

let findSchoolByCode = code => {
    return new Promise((resolve, reject) => {
        db.schoolModel.findOne({ 'code':code }, (err, school) => {
            if (err){
                reject(err);
            } else {
                resolve(school);
            }
        });
    });
};

let addNewSchool = school => {
    return new Promise((resolve, reject) => {
        let newSchool = new db.schoolModel({
            code: school.code,
            level: school.level,
            campus: school.campus,
            description: school.description,
            subjects: []
        });
        
        newSchool.save((err, doc) => {
            if (err){
                // console.log(`save error: ${err}`);
                reject(err);
            } else {
                // console.log(`save successful: ${doc}`);
                resolve(doc);    
            }
            
        });
    });
};

let updateSchool = (existingSchool, newSchool) => {
    return new Promise((resolve, reject) => {
        existingSchool.code = newSchool.code;
        existingSchool.description = newSchool.description;
        existingSchool.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
        
    })
    
}

let findSubjectByCode = (code) => {
    return new Promise((resolve, reject) => {
        db.subjectModel.findOne({ 'code':code }, (err, subject) => {
            if (err){
                reject(err);
            } else {
                resolve(subject);
            }
        });
    });
};

let updateSubjectData = (existingSubject, newSubject) => {
    return new Promise((resolve, reject) => {
        existingSubject.code = newSubject.code;
        existingSubject.description = newSubject.description;
        existingSubject.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        }); 
    });
};

let addNewSubject = (school, subject) => {
    return new Promise((resolve, reject) => {
        
        let createdSubject;
        let newSubject = new db.subjectModel({
            school: school._id,
            code: subject.code,
            description: subject.description,
            courses: []
        });
        
        newSubject.save((error, doc) => {
            if (error) {
                // console.log(`error saving newSubject: ${error}`);
                reject(error);
            }
            createdSubject = doc;
            school.subjects.push(doc._id);
            // console.log(`pushed subjects to school`);
            school.save((e, d) => {
                // console.log(`saved school`);
                resolve(createdSubject);
            });
        });
    });
};

let findCourseByCode = (subject, code) => {
    return new Promise((resolve, reject) => {
        db.courseModel.findOne({
            'courseNumber': code,
            'subject': subject._id
        }, (error, course) => {
            if (error) {
                // console.log(`error finding course by code: ${error}`);
                reject(error);
            }
            resolve(course);
        });
    });
};

let updateCourseData = (existingCourse, newCourse) => {
    return new Promise((resolve, reject) => {
        existingCourse.courseNumber = newCourse.courseNumber;
        existingCourse.title = newCourse.title;
        existingCourse.Credits = newCourse.credits;
        existingCourse.prereqs = newCourse.preReqNotes;
        existingCourse.fullTitle = newCourse.expandedTitle;
        existingCourse.synopsis = newCourse.synopsisUrl;
        existingCourse.coreCodes = null;
        if (newCourse.coreCodes){
            newCourse.coreCodes.forEach(cc => {
                    existingCourse.coreCodes.push({
                        id: cc.coreCodeReferenceId,
                        code: cc.code,
                    });
            });
        }
        existingCourse.save((error, doc) => {
            if (error) reject(error);
            resolve(existingCourse);
        });
    });
};

let addNewCourse = (school, subject, course) => {
    // console.log(`addNewCourse: ${school.code}:${subject.code}:${course.courseNumber}: ${course.title}`);
    return new Promise((resolve, reject) => {
        // let createdCourse;
        let newCourse = new db.courseModel({
            school: school._id,
            subject: subject._id,
            courseNumber: course.courseNumber,
            title: course.title,
            credits: course.credits,
            coreCodes: null,
            prereqs: course.preReqNotes,
            fullTitle: course.expandedTitle,
            synopsis: course.synopsisUrl,
            semesters: []
        });
        
        if (course.coreCodes){
            newCourse.coreCodes = [];
            for (let cc of course.coreCodes){
                newCourse.coreCodes.push({
                        id: cc.coreCodeReferenceId,
                        code: cc.code,
                    });
            }
        }
        newCourse.save((error, doc) => {
            if (error) {
                // console.log(`error saving new course: school: ${school.code}, subject: ${subject.code}, courseNumber: ${course.courseNumber}`);
                // console.log(`error: ${error}`);
                reject(error);
            }
            subject.courses.push(doc._id);
            subject.save((e, d) => {
                // console.log(`newCourse and subject saved!`);
                resolve(doc);
            });
        });
    });
};

let findSemesterInCourse = (course, semester) => {
    return new Promise((resolve, reject) => {
        // console.log(`course.semesters: ${course.semesters}`);
        if (!course.semesters || course.semesters.length == 0){
            reject(null);
        }
        for (let i in course.semesters){
            if (course.semesters[i].name == semester) {
                // console.log(`found semester in course! ${course.semesters[i].name}`);
                resolve(course.semesters[i].name);
            } 
            // else if (i == course.semesters.length && course.semesters[i].name != semester) {
            //     console.log(`semester not found! rejecting`);
            //     reject(null);        
            // }
        }
        reject(null);
    });
};

let addSectionsToSemester = (course, semester, sectionData) => {
    // console.log(`${JSON.stringify(course)}`);
    // console.log(`addSectionsToSemester: ${school.code}:${course.subject}:${course.courseNumber}: ${course.title}|${semester}|${sectionData.length}`);
    return new Promise((resolve, reject) => {
        let newSections = [];
        for (let i in sectionData) {
            newSections.push({
                'number': sectionData[i].number,
                'index': sectionData[i].index,
                'instructors': sectionData[i].instructors.map(instr => instr.name),
                'meetingTimes': sectionData[i].meetingTimes
            });
        }
        
        let newSemester = {
            'name': semester,
            'sections': newSections
        };
        
        course.semesters.push(newSemester);
        course.save((error, doc) => {
            if (error) {
                console.log(`error adding new semester to ${course.title}: ${JSON.stringify(error)}`);
                reject(error);
            }
            // console.log(`new semester added to ${course.title}!`);
            resolve(doc);
        });
    });
};

module.exports = {
    getAllSchools,
    findSchoolByCode,
    addNewSchool,
    updateSchool,
    findSubjectByCode,
    updateSubjectData,
    addNewSubject,
    findCourseByCode,
    updateCourseData,
    addNewCourse,
    findSemesterInCourse,
    addSectionsToSemester
};