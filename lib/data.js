/**
 * library for storing and editing data
 */

// dependencies
var fs = require('fs');
var path = require('path');

// container for the module(to be exported)
var lib = {};

// base directory of the data forlder
lib.baseDir = path.join(__dirname, '/.././.data/');


// write to a file
lib.create = function (dir, file, data, callback) {
    // open file for writing
    fs.open(lib.baseDir + '/' + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // convert it to string
            var stringData = JSON.stringify(data);

            // write to a file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error clsing the file')
                        }
                    })
                } else {
                    callback('Error writing to a file')
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
}

// read data from file
lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + '/' + dir + '/' + file + '.json', 'utf-8', function (err, data) {
        callback(err, data);
    });
}

// update data
lib.update = function (dir, file, data, callback) {
    // open the file
    fs.open(lib.baseDir + '/' + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);

            // truncate the file
            fs.truncate(fileDescriptor, function (err) {
                if (!err) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    console.log("error closing");
                                }
                            })
                        } else {
                            callback('Error writing to existing file');
                        }
                    })
                } else {
                    callback('Error truncating file');
                }
            })
        } else {
            callback('could not get the file, may not exist yet')
        }
    })
}

// delete file
lib.delete = function (dir, file, callback) {
    // unlink the file
    fs.unlink(lib.baseDir+'/'+dir+'/'+file+'.json', function(err) {
        if(!err){
            callback(false);
        } else {
            callback('error deleting file');
        }
    })
}


// export
module.exports = lib;