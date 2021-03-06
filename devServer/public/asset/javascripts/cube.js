
var options = {
  x: [ 0, 50, 100 ],
  y: [ -75, -25, 25 ],
  z: [ -50, 0, 50 ],
};

var _MAPS = {};

var data = initTransformData(options);

$(document).ready(function(){

  $('html, body').on('click', '.ctrl', function(){

    var layer = $(this).attr('data-layer');
    var rx = $(this).attr('data-rx') || 0; // rotateX
    var ry = $(this).attr('data-ry') || 0; // rotateY
    var rz = $(this).attr('data-rz') || 0; // rotateY

    var targets = [];
    Object.keys(_MAPS).forEach(function(x){
      Object.keys(_MAPS[x]).forEach(function(y){
        Object.keys(_MAPS[x][y]).forEach(function(z){
          if( x == layer || y == layer || z == layer){
            targets.push(_MAPS[x][y][z]);
          }
        });
      });
    });
    // console.log('targets', targets, _MAPS['x1']);

    var cubes = data.map(function(cube){
      data.indexOf(cube);
      // if(cube.index.indexOf(layer) != -1){
      if(targets.indexOf(cube.classStr) != -1){
        return {
          index: data.indexOf(cube),
          classStr: cube.classStr,
        };
      }
      return false;
    }).filter(function(cube){
      return cube;
    });
    doTransform(cubes, rx, ry, rz);
    offsetCube(layer);
    return false;
  }); // .ctrl[click] end
}); // doc ready end

function doTransform(cubes, rx, ry, rz){
  rx = parseInt(rx);
  ry = parseInt(ry);
  rz = parseInt(rz);
  cubes.forEach(function(info){
    var ctrl = { x : 1, y : 1, z : 1, };
    var cube = data[info.index];
    var key = {
      x : 'r' + cube.directions.x.replace(/-/, ''),
      y : 'r' + cube.directions.y.replace(/-/, ''),
      z : 'r' + cube.directions.z.replace(/-/, ''),
    };
    if(cube.directions.x.indexOf('-') != -1) ctrl.x = -1;
    if(cube.directions.y.indexOf('-') != -1) ctrl.y = -1;
    if(cube.directions.z.indexOf('-') != -1) ctrl.z = -1;
    cube[key.x] = ( cube[key.x] + ( rx * ctrl.x ) + 360 ) % 360;
    cube[key.y] = ( cube[key.y] + ( ry * ctrl.y ) + 360 ) % 360;
    cube[key.z] = ( cube[key.z] + ( rz * ctrl.z ) + 360 ) % 360;
    var transformStr =
      'rotateX(@rxdeg) rotateY(@rydeg) rotateZ(@rzdeg) ' +
      'translateX(@xpx) translateY(@ypx) translateZ(@zpx)';
    transformStr = transformStr
      .replace('@rx', cube.rx)
      .replace('@ry', cube.ry)
      .replace('@rz', cube.rz)
      .replace('@x', cube.x)
      .replace('@y', cube.y)
      .replace('@z', cube.z);
    $(info.classStr).css('transform', transformStr);
    // cube.directions = gyroscope(cube.directions, rx, ry, rz); //陀螺儀校正

    var tmp =  _.cloneDeep(cube.directions);
    if(rx != 0){
      tmp.y = cube.directions.uz;
      tmp.uy = cube.directions.z;
      tmp.z = cube.directions.uy;
      tmp.uz = cube.directions.y;
    }else if(ry != 0){
      tmp.x = cube.directions.z;
      tmp.ux = cube.directions.uz;
      tmp.z = cube.directions.ux;
      tmp.uz = cube.directions.x;
    }else if(rz != 0){
      // tmp.x = cube.directions.uy;
      // tmp.ux = cube.directions.y;
      // tmp.y = cube.directions.x;
      // tmp.uy = cube.directions.ux;
    }else{
      console.log('error 無任何xyz翻轉角度');
    }
    cube.directions = _.cloneDeep(tmp);

    if(cube.classStr == '.x1.y2.z3'){
      console.log('陀螺儀資訊', key);
      console.log('new 陀螺儀資訊', cube.directions);
    }
  });
  return false;
}

function offsetCube(layer){
  var tmp =  _.cloneDeep(_MAPS);
  if(layer.indexOf('x') != -1){
    tmp[layer]['y1']['z1'] = _MAPS[layer]['y1']['z3'];
    tmp[layer]['y1']['z2'] = _MAPS[layer]['y2']['z3'];
    tmp[layer]['y1']['z3'] = _MAPS[layer]['y3']['z3'];
    tmp[layer]['y2']['z1'] = _MAPS[layer]['y1']['z2'];
    // tmp[layer]['y2']['z2'] = _MAPS[layer]['y2']['z2']; //center
    tmp[layer]['y2']['z3'] = _MAPS[layer]['y3']['z2'];
    tmp[layer]['y3']['z1'] = _MAPS[layer]['y1']['z1'];
    tmp[layer]['y3']['z2'] = _MAPS[layer]['y2']['z1'];
    tmp[layer]['y3']['z3'] = _MAPS[layer]['y3']['z1'];
  }else if(layer.indexOf('y') != -1){
    tmp['x1'][layer]['z1'] = _MAPS['x3'][layer]['z1'];
    tmp['x1'][layer]['z2'] = _MAPS['x2'][layer]['z1'];
    tmp['x1'][layer]['z3'] = _MAPS['x1'][layer]['z1'];
    tmp['x2'][layer]['z1'] = _MAPS['x3'][layer]['z2'];
    // tmp['x2'][layer]['z2'] = _MAPS['x2'][layer]['z2']; //center
    tmp['x2'][layer]['z3'] = _MAPS['x1'][layer]['z2'];
    tmp['x3'][layer]['z1'] = _MAPS['x3'][layer]['z3'];
    tmp['x3'][layer]['z2'] = _MAPS['x2'][layer]['z3'];
    tmp['x3'][layer]['z3'] = _MAPS['x1'][layer]['z3'];
  }else if(layer.indexOf('z') != -1){
    tmp['x1']['y1'][layer] = _MAPS['x1']['y3'][layer];
    tmp['x1']['y2'][layer] = _MAPS['x2']['y3'][layer];
    tmp['x1']['y3'][layer] = _MAPS['x3']['y3'][layer];
    tmp['x2']['y1'][layer] = _MAPS['x1']['y2'][layer];
    // tmp['x2']['y2'][layer] = _MAPS['x2']['y2'][layer]; //center
    tmp['x2']['y3'][layer] = _MAPS['x3']['y2'][layer];
    tmp['x3']['y1'][layer] = _MAPS['x1']['y1'][layer];
    tmp['x3']['y2'][layer] = _MAPS['x2']['y1'][layer];
    tmp['x3']['y3'][layer] = _MAPS['x3']['y1'][layer];
  }else{
    console.log('error 無offset轉換');
  }
  _MAPS = _.cloneDeep(tmp);
  return false;
}

// function gyroscope(directions, rx, ry, rz){
//
//
//   return _.cloneDeep(tmp);
// }

function initTransformData(options){
  var data = [];

  options.x.forEach(function(x, xi){

    var xKey = 'x' + (xi + 1);
    if(!_MAPS[xKey]) _MAPS[xKey] = {};

    options.y.forEach(function(y, yi){

      var yKey = 'y' + (yi + 1);
      if(!_MAPS[xKey][yKey]) _MAPS[xKey][yKey] = {};

      options.z.forEach(function(z, zi){

        var zKey = 'z' + (zi + 1);
        _MAPS[xKey][yKey][zKey] = buildStr(xi, yi, zi, '.');

        var cube = {
          x: x,
          y: y,
          z: z,
          rx: 0,
          ry: 0,
          rz: 0,
          xi : xi,
          yi : yi,
          zi : zi,
          directions: {
            x: 'x',
            ux: '-x',
            y: 'y',
            uy: '-y',
            z: 'z',
            uz: '-z',
          }
        };
        cube.index = buildStr(xi, yi, zi);
        cube.classStr = buildStr(xi, yi, zi, '.');
        data.push(cube);
      });
    });
  });
  return data;
}

function buildStr(xi, yi, zi, pre){
  pre = pre || '';
  return (
    pre + 'x' + ( xi + 1 ) +
    pre + 'y' + ( yi + 1 ) +
    pre + 'z' + ( zi + 1 )
  );
}
