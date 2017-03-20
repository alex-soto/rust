'use strict';
const fs = require('fs');
const db = require('./db');
const util = require('./utilities');

/*
util.getAllSchools()
.then(data => {
    for (let school of data){
        console.log(`${school.code}: ${school.description}`);
    }
})
.then(() => process.exit(0));
*/

let findSchoolsWithSubjects = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.find({
            "subjects": {
                $not: {
                    $size: 0
                }
            }
        }, (err, schools) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(schools);
            }
        });
    });
};

let findSchoolsWithCourses = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.aggregate([{
            $match: {
                "subjects": {
                    $not: {
                        $size: 0
                    }
                }
            }
        }, {
            $unwind: "$subjects"
        }, {
        $match: {
            "subjects.courses": {
                $not: {
                    $size: 0
                }
            }
        }},
        {
            $unwind: "$subjects.courses"
        }, 
        // {
        //     $match: {
        //         "subjects.courses.semesters": {
        //             $not: {
        //                 $size: 0
        //             }
        //         }
        //     }
        // }, 
        {
            $group: {
                "_id": {
                    "school": "$code",
                    "subject": "$subjects.code",
                    "course": "$subjects.courses.courseNumber",
                    "courseTitle": "$subjects.courses.title"
                }
                ,
                "semesters": {$sum: "$subjects.courses.semesters"}
            }
        }], (err, schools) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(schools);
            }
        });
    });
};

let findSchoolsWithSemesters = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.aggregate([{
            $match: {
                "subjects": {
                    $not: {
                        $size: 0
                    }
                }
            }
        }, {
            $unwind: "$subjects"
        }, {
            $unwind: "$subjects.courses"
        }, {
            $match: {
                "subjects.courses": {
                    $not: {
                        $size: 0
                    }
                },
                "subjects.courses.semesters": {
                    $not: {
                        $size: 0
                    }
                }
            }
        }, {
            $project: {
                "_id": 0,
                "school": "$code",
                "subject": "$subjects.code",
                "course": "$subjects.courses.courseNumber",
                "name": "$subjects.courses.title",
                "semesterCount": {
                    $size: "$subjects.courses.semesters"
                }
            }
        }], (err, schools) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(schools);
            }
        });
    });
};

findSchoolsWithSubjects()
.then(data => {
    // console.log(`SCHOOLS WITH SUBJECTS:`);
    // for (let item of data) {
    //     console.log(`${item.code}-${item.description}: ${item.subjects.length} subjects`);
    //     for (let sub of item.subjects) {
    //         console.log(`\t${item.code}:${sub.code}:${sub.description}`);
    //     }
    // }
    // console.log(data[0]);
    console.log(`Schools with subjects: ${data.length}`);
    return findSchoolsWithCourses();
})
.then(data => {

    console.log(`Schools with courses: ${data.length}`);
    console.log(JSON.stringify(data[0]));
    return findSchoolsWithSemesters();
})
.then(data=>{
    for (let item of data){
        // console.log(`${item.school}:${item.subject}:${item.course}: ${item.semesterCount} semesters`);
        if (item.semesterCount == 0 || item.semesterCount > 3){
            console.log(`${item.school}:${item.subject}:${item.course}: ${item.semesterCount} semesters`);
        }
    }
    console.log(`Schools with semesters: ${data.length}`);
    console.log(JSON.stringify(data[0]));
})
.then(() => process.exit(0))
.catch(err => {
    console.log(`Error finding school: ${err}`);
    process.exit(0);
});

// util.findSchoolByCode('01')
// .then(doc => {
//     return util.findSubjectByCode(doc, '074');
// })
// .then(data => {
//     console.log(data);
// })
// .then(() => process.exit());
/*

findSchoolsWithSubjects()
.then(data => {
    for (let item of data) {
        console.log(`${item.code}-${item.description}: ${item.subjects.length} subjects`);
    }
    // console.log(data[0]);
    console.log(`Count: ${data.length}`);
}).then(() => process.exit(0))
.catch(err => {
    console.log(`Error finding school: ${err}`);
    process.exit(0);
});

let testPromise = util.findSchoolByCode('11')
.then(doc => util.findSubjectByCode(doc, '035'))
.then(subject => {
    return util.findCourseByCode(subject, '200');
})
.then((course, err) => {
    return util.findSemesterInCourse(course, '12017');    
})
.then(data => {
    console.log(data);
}, err => {
    console.log(`err on line 27: ${err}`);
})
.catch(err => {
    console.log(`err: ${err}`);
    process.exit(0);
});

Promise.all([testPromise]).then(() => {
    console.log(`exiting process on line 35`);
    process.exit(0);
});
*/
