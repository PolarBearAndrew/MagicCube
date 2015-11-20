var express = require('express');
var router  = express.Router();

var request = require('request');
var list    = require('../../list.js');
var db      = require('../data/index.js');
var file    = require('../feature/fs.js');
var queryString = require('../feature/queryString.js');


var data = [];

//read page (using on dev)
// router.get('/', (req, res, next) => {

// 	if( req.query.page !== undefined && req.query.data !== undefined){

// 		let page	 = req.query.page;  // using jade page
// 		let data	 = req.query.data;  // using data
// 		let appbar = db.appbar || {}; // appbar data
//     let title  = page + '/' + data;

//     // console.log('db[data]', db[data]);

// 		res.render( page, { appbar: appbar, data: db[data], page: page }); // output, title: title

// 	}else{ return next('頁面不存在'); }
// });

//read page (using on dev)
router.get('/', (req, res, next) => {

  if( req.query.page !== undefined){

    let page    = req.query.page;
    let useData = req.query.data || '';
    let tmp     = data[useData]  || [];

    console.log('Building page...', page);

    res.render( page, { data: tmp } );

  }else{

    return next('頁面不存在');
  }
});

//read page for build

//recheck queryString insid ()

//build page
router.post('/build', (req, res, next) => {

  list.forEach( ( val, index ) => {

    let name = val.page;

    // request file
    request({
      url:  queryString( 'http://127.0.0.1:8080/', { page: val.page, data: val.data } ),
      method: 'GET'

    },( err, res, data ) => {

      //delete origin files
      file.remove(name)
          .then( () => {
            return file.write( name, data );
          })
          .catch( err => {
            console.log('build file fail', err);

            res.status(500).json(err);
          });
    });
  });

  // report finish
  res.json({ list: list });
});

router.get('/_admin', (req, res, next) => {
  res.render('_admin');
});

router.get('/:page', (req, res, next) => {
  res.render(req.params.page.replace(/.html/, ''))
});

module.exports = router;
