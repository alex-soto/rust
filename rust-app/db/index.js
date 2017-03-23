'use strict';
const config = require('../config');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }};
const Mongoose = mongoose.connect(config.dbURI, options);

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

const courseSchema = new Mongoose.Schema({
  school: { type: String, ref: 'School' },
  subject: { type: String, ref: 'Subject' },
  courseNumber: {
    type: String,
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
      sparse: true
    },
    sections: [{
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
      instructors: [{ 
        type: String, 
        trim: true
      }],
      meetingTimes: []
    }]
  }]
});

const subjectSchema = new Mongoose.Schema({
  school: { type: String, ref: 'School' },
  code: {
    type: String,
    unique: true,
    sparse: true
  },
  description: {
    type: String,
    trim: true
  },
  courses: [{ type: String, ref: 'Course' }]
});

const schoolSchema = new Mongoose.Schema({
  code: String,
  level: String,
  campus: String,
  description: String,
  subjects: [{ type: String, ref: 'Subject' }]
});

schoolSchema.index({'$**':'text'});
subjectSchema.index({'$**':'text'});
courseSchema.index({'$**':'text'});

let schoolModel = Mongoose.model('School', schoolSchema),
    subjectModel = Mongoose.model('Subject', subjectSchema),
    courseModel = Mongoose.model('Course', courseSchema);

module.exports = {
    Mongoose,
    schoolModel,
    subjectModel,
    courseModel
};
