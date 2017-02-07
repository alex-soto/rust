'use strict';
const config = require('../config');
// const Mongoose = require('mongoose').connect(config.dbURI);
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }};
const Mongoose = mongoose.connect(config.dbURI, options);

// Mongoose.connection.on('connected', () => {  
//   console.log('Mongoose default connection open.');
// });

Mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose connection closed.');
});

Mongoose.connection.on('error', error => {  
  console.log('MongoDB error:' + error);
});

process.on('SIGINT', () => {  
  Mongoose.connection.close(() => { 
    console.log('App terminated. Mongoose connection disconnected.'); 
    process.exit(0); 
  }); 
}); 

const sectionSchema = new Mongoose.Schema({
  number: {
    type: String,
    unique: true,
    sparse: true
  },
  index: {
    type: String,
    unique: true,
    sparse: true
  },
  instructors: [],
  meetingTimes: []
});

const courseSchema = new Mongoose.Schema({
  courseNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    trim: true
  },
  credits: Number,
  coreCodes: [{
    id: String,
    code: String
  }],
  prereqs: {
    type: String,
    set: p => {
      if (p) {
        let prereqRegEx = /[0-9]|[\:]|[\(]|[\)]|\sOR\s|\sAND\s/ig;
        let prereq = p.match(prereqRegEx).join("");
        p = prereq;
      }
      return p;
    }
  },
  fullTitle: {
    type: String,
    trim: true
  },
  synopsis: String,
  semesters: [{
    name: {
      type: String,
      unique: true,
      sparse: true
    },
    sections: [sectionSchema]
  }]
});

const subjectSchema = new Mongoose.Schema({
  code: {
    type: String,
    unique: true,
    sparse: true
  },
  description: {
    type: String,
    trim: true
  },
  courses: [courseSchema]
});

const schoolSchema = new Mongoose.Schema({
  code: String,
  level: String,
  campus: String,
  description: String,
  subjects: [subjectSchema]
});

let schoolModel = Mongoose.model('School', schoolSchema);

module.exports = {
    Mongoose,
    schoolModel
};
