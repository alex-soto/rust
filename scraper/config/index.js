'use strict';

if (process.env.NODE_ENV === 'production') {
    // module.exports = require('./production.json');
    module.exports = {
        "dbURI": process.env.dbURI
    };
    
} else {
    module.exports = require('./development.json');
}