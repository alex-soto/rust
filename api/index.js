'use strict';
const util = require('../scraper/utilities');
const db = require('../scraper/db');
const router = require('express').Router();

let getSchools = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.aggregate([
            {
                $match: {
                    $and: [
                        {'subjects': {$not: {$size: 0}}},
                        {'courses': {$not: {$size: 0}}}
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    code: 1,
                    description: 1,
                    numSubjects: {$size: "$subjects"}
                }
            },
            {
                $sort: { "code": 1}
            }
        ], (err, doc) => {
            if (err) {
                reject(err);
            }
            if (doc) {
                resolve(doc);
            }
        });
    });
        
};

let getSubjects = schoolCode => {
    return new Promise((resolve, reject) => {
        db.schoolModel.aggregate([
            {
                $match: { code: schoolCode }
            },
            {
                $unwind: "$subjects" 
            },
            {
                $project: {
                    _id: "$subjects._id", 
                    code: "$subjects.code", 
                    description: "$subjects.description",
                    numCourses: { $size: "$subjects.courses"}
                }
            }
        ], (err, doc) => {
            if (err) {
                reject(err);
            }
            if (doc) {
                resolve(doc);
            }
        });
    });
};

let getCourses = (schoolCode, subjectCode) => {
    console.log(`getCourses called`);
    return new Promise((resolve, reject) => {
        db.schoolModel.aggregate([
            {
                $match: { code: schoolCode }
            },
            {
                $unwind: "$subjects" 
            },
            {
                $match: { "subjects.code" : subjectCode }
            },
            {
                $unwind: "$subjects.courses"
            },
            {
                $project: {
                    _id: "$subjects.courses._id",
                    code: "$subjects.courses.courseNumber",
                    fullTitle: "$subjects.courses.fullTitle",
                    title: "$subjects.courses.title",
                    credits: "$subjects.courses.credits",
                    prereqs: "$subjects.courses.prereqs",
                    coreCodes: "$subjects.courses.coreCodes",
                    synopsis: "$subjects.courses.synopsis",
                    semesters: "$subjects.courses.semesters"
                }
            }
        ], (err, doc) => {
            if (err) {
                reject(err);
            }
            if (doc) {
                resolve(doc);
            }
        });
    });
};

router.get('/', (req, res) => {
    console.log(`'/' api called`);
    
    getSchools().then(data => {
        res.send(data);
    });
});

router.get('/subjects', (req, res) => {
    console.log(`'/subjects' api called`);
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    getSubjects(req.query.school).then(data => {
        res.send(data);
    });
});

router.get('/courses', (req, res) => {
    console.log(`'/courses' api called`);
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    getCourses(req.query.school, req.query.subject).then(data => {
        res.send(data);
    });
    
});

module.exports = router;

// let getSubjectsBySchool = schoolId => {
//     return new Promise((resolve, reject) => {
//         db.schoolModel.findOne({ '_id' : schoolId }, (err, doc) => {
            
//             if (err) {
//                 console.log(`getSubjectsBySchool err: err`)
//                 reject(err);
//             }
//             let subjects = doc.subjects.map((subj) => {
//                 return {
//                     "_id": subj._id,
//                     "code": subj.code,
//                     "description": subj.description
//                 };
//             });
//             // Promise.resolve(subjects);
//             resolve(subjects);
//         });
//     });
// };