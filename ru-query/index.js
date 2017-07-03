'use strict';
const request = require('request');

const QUERY_TYPES = {
    'SCHOOLS': 'init.json',
    'SUBJECTS': 'subjects.json?',
    'COURSES': 'courses.json?'
};

let baseUrl = 'http://sis.rutgers.edu/soc/';

let getSocData = (socQueryType, qs) => {
    let queryType, apiUrl = null;
    
    for (let key in QUERY_TYPES){
        if (socQueryType.toUpperCase() === key) {
            queryType = key;
        }
    }
    
    if (!queryType) {
        let errorMessage = `Invalid query type ${socQueryType}. Valid types are: SCHOOLS, SUBJECTS, COURSES.`;
        throw new Error(errorMessage);
    }
    
    // let data, apiUrl = null;
    switch (queryType) {
        case 'SCHOOLS':
            apiUrl = baseUrl + QUERY_TYPES[queryType];
            break;
        
        case 'SUBJECTS':
            if (!(qs.semester) || !(qs.campus) || !(qs.level)) {
                let errorMessage = `To query subjects, please provide a querystring object with: semester, campus, level.`;
                console.log(errorMessage);
                throw new Error(errorMessage);
            }
            apiUrl = baseUrl + QUERY_TYPES[queryType] + `semester=${qs.semester}&campus=${qs.campus}&level=${qs.level}`;
            break;
        
        case 'COURSES':
            if (!(qs.subject) || !(qs.semester) || !(qs.campus) || !(qs.level)) {
                let errorMessage = `To query courses, please provide a querystring object with: subject, semester, campus, level.`;
                throw new Error(errorMessage);
            }
            apiUrl = baseUrl + QUERY_TYPES[queryType] + `subject=${qs.subject}&semester=${qs.semester}&campus=${qs.campus}&level=${qs.level}`;
            break;
    }
    
    return querySocApi(apiUrl);
};

let querySocApi = (url) => {
    
    return new Promise((resolve, reject) => {
        
        request
            .get({
                url,
                json: true
            }, (err, response, body) => {
                // console.log(`querySocApi results for: ${url}`);
                // console.log(`response.statusCode: ${response.statusCode}`);
                // console.log(`response.body ${response.body}`);
                if (err) {
                    reject(JSON.stringify(err));
                } else if (response.statusCode !== 200){
                    reject(response.statusCode);
                } else {
                    resolve(body);
                }
            });    
    });
};


module.exports = {
    getSocData
};
