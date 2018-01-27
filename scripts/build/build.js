'use strict';

const fse = require('fs-extra');
const DIR_BUILD = './build';

// Deletes directory contents if the directory is not empt
// If the directory does not exist, it is created
// The directory itself is not deleted
fse.emptyDirSync(DIR_BUILD);