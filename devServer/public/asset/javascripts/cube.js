
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
    console.log('targets', targets, _MAPS['x1']);

    var cubes = data.map(function(cube){
      data.indexOf(cube);
      // if(cube.index.indexOf(layer) != -1){
      if(targets.indexOf(cube.classStr) != -1){
        return {
          index: data.indexOf(cube),
          classStr: cube.classStr, // TODO: 有空要換成id
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
    var cube = data[info.index];
    cube.rx = (cube.rx + rx + 360 ) % 360;
    cube.ry = (cube.ry + ry + 360 ) % 360;
    cube.rz = (cube.rz + rz + 360 ) % 360;
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
  }
  _MAPS = _.cloneDeep(tmp);
  return false;
}

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
