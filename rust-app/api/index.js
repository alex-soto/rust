'use strict';
const db = require('../db');
const router = require('express').Router();

let getSchools = () => {
    return new Promise((resolve, reject) => {
        db.schoolModel.find({
            'subjects': {$not: {$size: 0} }
        })
        .lean()
        .sort('code')
        .exec((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
};

let getSubjects = schoolId => {
    return new Promise((resolve, reject) => {
         db.subjectModel.find({
            'school': schoolId
        })
        .lean()
        .sort('code')
        .exec((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
};

let getCourses = (subjectId) => {
    console.log(`getCourses called`);
    return new Promise((resolve, reject) => {
        db.courseModel.find({
            'subject': subjectId
        })
        .sort('code')
        .exec((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
};

let performSearch = (query) => {
    return new Promise((resolve, reject) => {
        let searchKey = Object.keys(query)[0];
        let searchValue = query[searchKey];
        let searchModel;
        let dbQuery = [];
        switch(searchKey){
            case "school":
                searchModel = db.schoolModel;
                break;
            case "subject":
                searchModel = db.subjectModel;
                break;
            case "course":
                searchModel = db.courseModel;
                break;
            default:
                searchModel = db.courseModel;
            
        }
        if (searchModel){
            // let searchRegex = new RegExp(`/.*${searchValue}.*/`);
            searchModel.find({
                $text: { $search: `.*${searchValue}.*` }
                // $text: { $regex: searchRegex }
            }, (err, docs) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(docs);
            });

        } else {
            reject(query);
        }
        
    });
};

router.get('/schools', (req, res) => {
    // console.log(`'/schools' api called`);
    
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
    getCourses(req.query.subject).then(data => {
        res.send(data);
    });
    
});

router.get('/search', (req, res) => {
    console.log(`'/search' api called`);
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    performSearch(req.query).then(data => {
        res.send(data);
    });
});

module.exports = router;