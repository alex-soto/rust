'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = {
    	"dbURI": "mongodb://rudatauser:Zp13409603761hTKk23498101349asov23478095hwKZLAJSUEjwqm92134@ds139899.mlab.com:39899/rudata"
    };
} else {
    module.exports = require('./development.json');
}