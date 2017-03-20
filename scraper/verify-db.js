'use strict';
const fs = require('fs');
const db = require('./db');
const util = require('./utilities');

let findCourseWithSubject = () => {
    return new Promise((resolve, reject) => {
        db.courseModel.findOne({
            'courseNumber': '301'
            })
            .populate('school subject')
            .exec((err, course) => {
            if (err) {
                reject(err);
            } else {
                console.log(course);
                resolve(course);
            }
        });
    })
};

let findMultipleInstructors = () => {
    return new Promise((resolve, reject) => {
       db.courseModel.find({
             'semesters.sections.instructors': { $size: 2 }
        }, (err, docs) => {
           if (err) {
               reject(err);
           }
           resolve(docs);
        }); 
    });
};

let findItemById = (model, id) => {
    return new Promise((resolve, reject) => {
        // console.log(`${model.modelName}`);
        model.findOne({
            _id: id
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
  
};

let performSearch = (query) => {
    return new Promise((resolve, reject) => {
        let searchKey = Object.keys(query)[0];
        let searchValue = query[searchKey];
        let searchModel, modelKeys;
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
            // modelKeys = Object.keys(searchModel.schema.obj);
            // for (let key of modelKeys){
            //     dbQuery.push({[key]: searchValue});
            // }
            
            console.log(searchModel.modelName);
            
            searchModel.find({
                $text: { $search: searchValue }
            }, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });

        } else {
            reject(query);
        }
        
    });
};

// let testQuery = {"school": "arts and"};
// let testQuery = {"subject": "information"};
let testQuery = {"course": "sarath"};

// findMultipleInstructors()
performSearch(testQuery)
.then(data => {
    console.log(JSON.stringify(data[0]));
    console.log(`data.length: ${data.length}`);
}, err => {
    console.log(`Error with search! ${JSON.stringify(err)}`);
})
.then(()=>{
    process.exit(0);
});

// findCourseWithSubject();
