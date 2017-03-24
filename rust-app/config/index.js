'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./production.json');
} else {
    module.exports = require('./development.json');
}