'use strict';
const db = require('../db');

let getAllSchools = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.find({
            $and: [{
                'subjects': {
        
                    $not: {
                        $size: 0
                    }
                }},
                {
                    'courses': {
                        $not: {
                            $size: 0
                        }
                    }
                }
            ]
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

let findSubjectByCode = (school, code) => {
    return new Promise((resolve, reject) => {
        // console.log(`findSubjectByCode: school=${school}`);
        if (school.subjects.length == 0) reject(null);
        let subject = school.subjects.filter(subj => subj.code == code);
        if (subject.length > 0) {
            resolve(subject[0]);
        } else {
            reject(null);
        }
        
    });
};

let updateSubjectData = (school, existingSubject, newSubject) => {
    return new Promise((resolve, reject) => {
        existingSubject.code = newSubject.code;
        existingSubject.description = newSubject.description;
        school.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(existingSubject);
            }
        }); 
    });
};

let addNewSubject = (school, subject) => {
    return new Promise((resolve, reject) => {
        let newSubject = {
            code: subject.code,
            description: subject.description,
            courses: []
        };
        
        school.subjects.push(newSubject);
        // db.schoolModel.update(
        //     { _id: school._id },
        //     { $addToSet: { subjects: newSubject } },
        //     callback
        // ).then((err, doc) => {
        //     if (err) reject(err);
        //     resolve(findSubjectByCode(school, subject.code))
        // });
        school.save((error, doc) => {
            // console.log(`addNewSubject. err: ${error}, doc: ${doc}`);
            if (error) reject(error);
            findSubjectByCode(school, subject.code).then(data => resolve(data));
        });
    });
};

let findCourseByCode = (subject, code) => {
    // console.log(`findCourseByCode: SUBJECT.COURSES.LENGTH: ${subject.courses.length}, CODE: ${code}`);
    return new Promise((resolve, reject) => {
        if (!subject.courses || subject.courses.length == 0) {
            reject(null);
        } else {
            for (let course of subject.courses){
                if (course.courseNumber == code){
                    resolve(course);
                } 
                // else if (i == subject.courses.length-1 && subject.courses[i].courseNumber != code){
                //     // console.log(`findCourseByCode: code not found. i: ${i}, subject.courses.length: ${subject.courses.length}`)
                //     reject(null);    
                // }
            }
            reject(null);
        }
    });
};

let updateCourseData = (school, course, newCourse) => {
    return new Promise((resolve, reject) => {
        course.courseNumber = newCourse.courseNumber;
        course.title = newCourse.title;
        course.Credits = newCourse.credits;
        course.prereqs = newCourse.preReqNotes;
        course.fullTitle = newCourse.expandedTitle;
        course.synopsis = newCourse.synopsisUrl;
        course.coreCodes = null;
        if (newCourse.coreCodes){
            newCourse.coreCodes.forEach(cc => {
                    course.coreCodes.push({
                        id: cc.coreCodeReferenceId,
                        code: cc.code,
                    });
            });
        }
        school.save((err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(course);
        });
    });
};

let addNewCourse = (school, subject, course) => {
    // console.log(`addNewCourse: ${school.code}:${subject.code}:${course.courseNumber}: ${course.title}`);
    return new Promise((resolve, reject) => {
        let newCourse = {
            courseNumber: course.courseNumber,
            title: course.title,
            credits: course.credits,
            prereqs: course.preReqNotes,
            fullTitle: course.expandedTitle,
            synopsis: course.synopsisUrl,
            semesters: []
        };
        if (course.coreCodes){
            newCourse.coreCodes = [];
            for (let cc of course.coreCodes){
                newCourse.coreCodes.push({
                        id: cc.coreCodeReferenceId,
                        code: cc.code,
                    });
            }
            // course.coreCodes.forEach(cc => {
                    
            // });
        }
        subject.courses.push(newCourse);
        // console.log(`subject.courses: ${JSON.stringify(subject.courses)}`);
        school.save((error, doc) => {
            if (error) {
                console.log(`error saving new course: ${error}`);
                reject(error);
            }
            findCourseByCode(subject, course.courseNumber).then(data => resolve(data));
            // resolve(newCourse);
        });
    });
};

let findSemesterInCourse = (course, semester) => {
    // console.log(`findSemesterInCourse: COURSE TITLE: ${course.title}, SEMESTER: ${semester}`);
    return new Promise((resolve, reject) => {
        // if (!course.semesters || course.semesters.length == 0) {
        if (!course.semesters){
            // console.log(`!course.semesters: ${course.semesters}`);
        }
        if (course.semesters.length == 0) {
            // console.log(`findSemesterInCourse: semester not found. COURSE.TITLE: ${course.title}, SEMESTER: ${semester}`);
            // console.log(`course.semesters.length == 0. COURSE: ${course}`);
            reject(null);
        } else {
            for (let i in course.semesters){
                if (course.semesters[i].name == semester) {
                    // console.log(`findSemesterInCourse. semester found`);
                    resolve(course.semesters[i]);
                } else if (i == course.semesters.length-1 && 
                           course.semesters[i].name != semester){
                    // console.log(`findSemesterInCourse: semester not found2. COURSE.TITLE: ${course.title}, SEMESTER: ${semester}`);
                    reject(null);
                }
            }
        }
        
    });
};

let addSectionsToSemester = (school, course, semester, sectionData) => {
    // console.log(`${JSON.stringify(course)}`);
    // console.log(`addSectionsToSemester: ${school.code}:${course.subject}:${course.courseNumber}: ${course.title}|${semester}|${sectionData.length}`);
    return new Promise((resolve, reject) => {
        if (!sectionData || sectionData.length == 0) {
            reject(null);
        } else {
            let newSections = [];
            for (let i in sectionData) {
                newSections.push({
                    number: sectionData[i].number,
                    index: sectionData[i].index,
                    instructors: sectionData[i].instructors,
                    meetingTimes: sectionData[i].meetingTimes
                });
                
                if (i == sectionData.length-1) {
                    let newSemesterData = {
                        name: semester,
                        sections: newSections
                    };
                    course.semesters.push(newSemesterData);
                    school.save((error, doc) => {
                        if (error) {
                            console.log(`addNewSemester err: ${error}`);
                            reject(error);
                        } else {
                            // console.log(`addNewSemester success!`);
                            resolve(newSemesterData);
                        }
                    });  
                }
            }
        }
        
        // if (i >= sectionData.length && newSections.length > 0){
                  
        //     } else if (i >= sectionData.length && !newSections){
        //         reject(sectionData);
        //     }
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