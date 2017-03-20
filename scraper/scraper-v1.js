'use strict';
const fs = require('fs');
const ruquery = require('../ru-query');
// const db = require('./db');
const util = require('./utilities');
// const Promise = require('promise');

let qs = {
    semester: '92016',
    campus: 'NB',
    level: 'U',
    subject: null
};

let scraperFolder = '../.scraper-data/',
    scraperFile = scraperFolder + 'meta',
    localSchoolFile = scraperFolder + "schools-" + qs.semester,
    localSubjectFile = scraperFolder + 'subjects-' + qs.semester;
    
let metaData,
    newCurrentTerm,
    schoolData,
    subjectData = null;
    
// if updateExistingData is set to true, school and subject info should be updated to match the new queried data
let updateExistingData = false; 

// queryResults will keep track of the data queried/added to the db
let queryResults = {
    subjects: {
        pass: [],
        fail: []
    }
};

// check to see if a folder for scraper data has been created
if (!fs.existsSync(scraperFolder)){
    // create the scraper folder if it does not exist
    fs.mkdirSync(scraperFolder);
}

// check to see if a info file has been created
if (!fs.existsSync(scraperFile)){
    // create the meta file if it does not exist
    metaData = {
        currentTerm: {
            term: null,
            year: null
        },
        queriedTerms: [],
    };
    
    fs.writeFileSync(scraperFile,JSON.stringify(metaData),'utf8');
} else {
    // if the meta file does exist, read the data
    let fileContents = fs.readFileSync(scraperFile, 'utf8');
    metaData = JSON.parse(fileContents);
}

// Check to see if the school data for the target semester has already been queried
let getSchoolData = () => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(localSchoolFile)) {
            let schoolFileData = fs.readFileSync(localSchoolFile, 'utf8');
            schoolData = JSON.parse(schoolFileData);
            resolve();
        } else { 
            ruquery.getSocData('SCHOOLS')
            .then(data => {
                // console.log(data.length);
                if (!data){
                    console.log(`Unable to retrieve school data!`);
                    reject();
                } else {
                    schoolData = data;
                    fs.writeFileSync(localSchoolFile, JSON.stringify(data),'utf8');
                    resolve();
                }
            });
        }
    });
};

// check the queried current term against the saved current term
// if the new date is the same/more recent than the old, or if the saved term is null, 
// then school and course data should be updated
let compareSchoolAndMetaData = () => {
    return new Promise((resolve, reject) => {
        newCurrentTerm = schoolData.currentTermDate;
        if ((metaData.currentTerm.term == null || metaData.currentTerm.year == null) ||
            ( newCurrentTerm.year >= metaData.currentTerm.year && 
                    newCurrentTerm.term >= metaData.currentTerm.term)){
            metaData.currentTerm.term = newCurrentTerm.term;
            metaData.currentTerm.year = newCurrentTerm.year;
            updateExistingData = true;
        } else {
            updateExistingData = false;
        }
        // let termName = schoolData.currentTermDate.term + '' + schoolData.currentTermDate.year;
        
        // check if the data was previously queried
        if (metaData.queriedTerms.length == 0) {
            resolve();
        } else {
            for (let i in metaData.queriedTerms) {
                if (metaData.queriedTerms[i].semester == qs.semester) {
                    metaData.queriedTerms.splice(i, 1);
                    resolve();
                } else if (i == metaData.queriedTerms.length - 1){
                    resolve();
                }
            }
        }
    });
};

// Function updateSchoolData: loop through all the schools in schoolData.units and update as necessary.
let updateSchoolData = (schools, counter) => {
    return new Promise((resolve, reject) => {
        counter = counter ? counter : 0;
        if (counter == 0){
            console.log(`Querying school API...`);
        }
        let school = schools[counter];
        if ((school.level.indexOf(qs.level) >= 0) && (school.campus.indexOf(qs.campus) >= 0)){
            let output = `Updating: ${school.code}-${school.description}`;
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(output);
            util.findSchoolByCode(school.code)
            .then(data => {
                if (data && updateExistingData){
                    util.updateSchool(data, school);
                } 
                else if (!data) {
                    util.addNewSchool(school);
                }
            });
        }
        if (counter < schools.length - 1){
            counter++;
            // resolve(updateSchoolData(schools, counter));
            setTimeout(() => {
                school = null;
                resolve(updateSchoolData(schools, counter));
            }, 200);
            
        } else {
            schools = null;
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.log(`Finished updating schools.`);
            resolve(counter);
        }
    });
};

let getSubjectData = (qs) => {
    return new Promise((resolve, reject) => {
        console.log("Retrieving subject data...");
        if (fs.existsSync(localSubjectFile)){
            console.log(`Found saved subject file. Reading...`);
            let subjectFileData = fs.readFileSync(localSubjectFile, 'utf8');
            subjectData = JSON.parse(subjectFileData);
            resolve(subjectData);
        } else {
            console.log(`No subject file found. Querying subject API...`);
            ruquery.getSocData('SUBJECTS', qs).then(data => {
                if (!data){
                    reject(qs.semester);
                } else {
                    subjectData = data;
                    fs.writeFileSync(localSubjectFile, JSON.stringify(data),'utf8');
                    resolve(subjectData);
                }
            }).catch(err => {
                reject(err);
            });
        }
    });
};

let findItemInData = (code, data) => {
    return new Promise((resolve, reject) => {
        for (let i in data){
            if (code == data[i].code){
                resolve(data[i]);
            } 
        }
        reject(null);
    });
};

let bulkProcessCourseData = (school, subject, course) => {
    return new Promise((resolve, reject) => {
        if (!school || !subject || !course){
            console.log(`Critical error: missing one or more of the following data: school, subject, courses.`);
            reject(null);
        }
        let thisCourse = null;
        
        util.findCourseByCode(subject, course.courseNumber)
        .then(data => {
            // if (courseNum == 0){
            //     console.log(`line 212. course found in data. data: ${JSON.stringify(data)}`);    
            // }
            thisCourse = data;
            // Promise.resolve(thisCourse);
        }, err => {
            // if (courseNum == 0) console.log(`line 217. course not found. adding...`);
            return util.addNewCourse(school, subject, course).then(data => thisCourse = data);
            // return util.addNewCourse(school, subject, course);
        })
        .then(data => {
            return util.findSemesterInCourse(thisCourse, qs.semester);
        }, err => {
            console.log(`Error finding semester in course: ${err}`);
        })
        .then(data => {
            if (data == null || data.length == 0) {
                return util.addSectionsToSemester(school, thisCourse, qs.semester, course.sections);
            }
        }, err => {
            return util.addSectionsToSemester(school, thisCourse, qs.semester, course.sections);
        })
        .then(() => {
            resolve(thisCourse);
        })
        .catch(err => {
            console.log(`line 307. error with course: ${course.offeringUnitCode}:${subject.code}:${course.courseNumber} (${course.title}). err: ${err}`);
            reject(course);
        });
    });
};

let getCourseData = (subjects, subjNum) => {
    return new Promise((resolve, reject) => {
        let school, subject, courses = null;
        let nodeMemory, percentMemory, percentComplete, progress = null; 
        subjNum = subjNum ? subjNum : 0;
        // let queryProgressMarker = (process.stdout.columns / 100);
        // Code to actually get the class data
        let localQs = qs;
        localQs.subject = subjects[subjNum]['code'];
        if (!localQs.subject) {
            reject(`Querying courses failed. Subject was invalid: ${localQs.subject}`);
        }
        
        ruquery.getSocData('COURSES', localQs)
        .then(data => {
            courses = data;
            queryResults.subjects.pass.push(localQs.subject);
            return util.findSchoolByCode(courses[0].offeringUnitCode)
            .then(data => {
                school = data;
                return util.findSubjectByCode(school, courses[0].subject)
                .then(data => {
                    subject = data;
                }, err => {
                    return findItemInData(courses[0].subject, subjectData)
                    .then(data => {
                        // console.log(`line 413. subject found in data.`);
                        return util.addNewSubject(school, data).then(data => subject = data);
                    });
                })
                // .then(data => {
                //     console.log(`line 306. data: ${JSON.stringify(data)}`);
                //     if (data) subject = data;
                // });
            });
        }, err => {
            queryResults.subjects.fail.push(`${localQs.subject}`);
            reject(`Failed to query data for subject: ${localQs.subject}`);
        })
        .then(data => {
            // Code to make the terminal output look fanceh
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            percentComplete = ((subjNum + 1) / subjects.length * 100);
            nodeMemory = process.memoryUsage();
            percentMemory = Math.round(nodeMemory.heapUsed/nodeMemory.heapTotal*100);
            progress = `${subjNum+1}/${subjects.length} (${Math.round(percentComplete)}%) | ` ;
            progress += `Current Subject: ${localQs.subject} - ${subjects[subjNum]['description']} | `;
            progress += `Num Courses: ${courses.length} | Memory: ${percentMemory}%}`;
            process.stdout.write(progress);
            // console.log(`\nline 329. ${school.code}:${subject.code}- ${courses.length} courses`);
            // return processCourseData(school, subject, courses);
            let promisifiedCourses = courses.map((course) => {
                return bulkProcessCourseData(school, subject, course);
            });
            return Promise.all(promisifiedCourses);
        })
        .then(() => {
            // localQs, school, subject, courses, percentComplete, nodeMemory, percentMemory, progress = null;
            if (subjNum < subjects.length - 1) {
            // TODO: Replace following test condition with the condition above:
            // if (subjNum < 5) {
                subjNum++;
                setTimeout(() => {
                    resolve(getCourseData(subjects, subjNum));
                }, (Math.random() * 1000)); // End of setTimeout
                // resolve(getCourseData(subjects, subjNum));
            } else {
                console.log("\nFinished querying course API");
                resolve(subjNum);
            }    
        })
        .catch(err => {
           console.log(`Error retrieving subject data: ${err}`); 
           if (subjNum < subjects.length - 1){
               subjNum++;
               resolve(getCourseData(subjects, subjNum));
           }
        });
        
        // let randomInterval = 500 + Math.random() * 1000;
        // let getDataAfterDelay = () => {
        //     setTimeout(() => {
                        
        //     }, randomInterval); // End of setTimeout
        // };
        
        // getDataAfterDelay(); 
    });
     
};

/********** BEGIN TEST **********/
getSchoolData()
.then(compareSchoolAndMetaData)
.then(() => {
    console.log(`updateExistingData: ${updateExistingData}`);
    return updateSchoolData(schoolData.units);
})
.then(() => {
    schoolData = null;
    console.log(`Getting subject data...`);
    return getSubjectData(qs);
})
.then(data => {
    console.log("Querying course API...");
    // console.log(`Subject length: ${data.length}`);
    return getCourseData(data);
}, err => {
    console.log(`Error while querying subjects! ${err}`);
})
.then(() => {
    metaData.queriedTerms.push({
        'semester': qs.semester, 
        'queryResults': queryResults
    });
    
    fs.writeFileSync(scraperFile,JSON.stringify(metaData),'utf8');
    console.log(`Final query results:`);
    console.log(`====================`);
    console.log(`Subjects: ${queryResults.subjects.pass.length} passed, ${queryResults.subjects.fail.length} failed.`);
    fs.unlink(localSchoolFile, () => {
        console.log(`Deleted the local school file.`);
    });
    fs.unlink(localSubjectFile, () => {
        console.log(`Deleted the local subject file`);
    });
})
.then(() => {
    process.exit();
})
.catch(err => {
    console.log(`ERROR! ${err}`);
    process.exit();
});

/********** END TEST **********/

/*
let processCourseData = (school, subject, courses, courseNum) => {
    return new Promise((resolve, reject) => {
        courseNum = courseNum ? courseNum : 0;
        if (!school || !subject || !courses){
            console.log(`Critical error: missing one or more of the following data: school, subject, courses.`);
            reject(null);
        }
        let course = courses[courseNum];
        let thisCourse = null;
        
        util.findCourseByCode(subject, course.courseNumber)
        .then(data => {
            // if (courseNum == 0){
            //     console.log(`line 212. course found in data. data: ${JSON.stringify(data)}`);    
            // }
            thisCourse = data;
            // Promise.resolve(thisCourse);
        }, err => {
            // if (courseNum == 0) console.log(`line 217. course not found. adding...`);
            return util.addNewCourse(school, subject, course).then(data => thisCourse = data);
            // return util.addNewCourse(school, subject, course);
        })
        .then(data => {
            // if (data) thisCourse = data;
            // if (data && courseNum == 0) console.log(`line 222. thisCourse: ${JSON.stringify(thisCourse)}`);
            return util.findSemesterInCourse(thisCourse, qs.semester);
        }, err => {
            if (courseNum == 0) console.log(`line 221. err adding new course: ${err}`);
        })
        .then(data => {
            // console.log(`line 229. semester ${qs.semester} found in ${thisCourse.title} `);
            if (data == null || data.length == 0) {
                return util.addSectionsToSemester(school, thisCourse, qs.semester, course.sections);
            }
        }, err => {
            // if (courseNum == 0) console.log(`line 226. adding new semester ${qs.semester} to ${thisCourse.title}.`);
            return util.addSectionsToSemester(school, thisCourse, qs.semester, course.sections);
        })
        .then(() => {
            // queryResults.courses.pass.push(`${subject.code}:${thisCourse.courseNumber}`);
            course, thisCourse = null;
            if (courseNum < courses.length - 1) {
                courseNum++;
                resolve(processCourseData(school, subject, courses, courseNum));
            } else {
                school, subject, courses = null;
                resolve(courseNum);
            }
        })
        .catch(err => {
            console.log(`line 245. error with courses[${courseNum}]: ${course.offeringUnitCode}:${subject.code}:${course.courseNumber} (${course.title}). err: ${err}`);
            course, thisCourse = null;
            if (courseNum < courses.length - 1) {
                courseNum++;
                resolve(processCourseData(school, subject, courses, courseNum));
            } else {
                // console.log(`line 237. resolve() called.`);
                school, subject, courses = null;
                resolve(courseNum);
            }
        });
    });
};
*/