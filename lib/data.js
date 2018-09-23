var fs = require('fs');
var path = require('path');
var helpers = require('./helpers')

//container
var lib = {}

// base directin on the lib object so other functions

lib.baseDir = path.join(__dirname, '/../.data/')

// write data to a file
lib.create = function(dir, file, data, callback ) {
  // open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
    if (!err && fileDescriptor) {
      // convert data to string 
      var stringData = JSON.stringify(data);

      // write to the file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file')
            }
          })
        } else {
          callback('Error writing to new file')
        }
      })
    } else {
      callback('Could not create new file, it may already exist')
    }
  })
}


 /// read data from a file
 lib.read = function(dir, file, callback) {

  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data) {
    if (!err && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data)
    }
  })
 }

lib.update = function(dir, file, data, callback) {
  // open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if (!err && fileDescriptor) {
      var stringData = JSON.stringify(data);
      //truncarte the file
      fs.ftruncate(fileDescriptor, function(err){
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if(!err) {
                  callback(false)
                } else {
                  callback('error closing the file')
                }
              })
            } else {
              callback('Error writing to existing file')
            }
          })
        } else {
          callback('Error truncating the file')
        }
      })
    } else {
      callback('Could not open the file for updating')
    }
  })
}


// Delete a file
lib.delete = function(dir,file,callback) {

  // Open the file for writing
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing existing file');
            }
          });
        } else {
          callback('Error writing to existing file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });
};

module.exports = lib