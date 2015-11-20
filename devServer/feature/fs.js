var fs    = require('fs');

module.exports = {

  write: ( fileName, data ) => {

    data = data.toString('utf8');

    let buildPath = 'public/' + fileName + '.html';

    return new Promise( ( resolve, reject ) => {
      fs.writeFile( buildPath, data, ( err, res ) => {
        if (err){
          reject(err);
        }else{
          console.log('Saved file: ' + fileName + '.html' );
          resolve(res);
        }
      });
    });
  },

  remove( fileName ) {

    let buildPath = 'public/' + fileName + '.html';

    return new Promise( ( resolve, reject ) => {
      fs.unlink( buildPath, ( err, res ) => {
        if (err){
          // reject(err);
          resolve(res);
        }else{
          console.log('Remove file: ' + fileName + '.html' );
          resolve(res);
        }
      });
    });
  },
};