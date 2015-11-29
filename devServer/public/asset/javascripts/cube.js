
var options = {
  x: [ 0, 50, 100 ],
  y: [ -75, -25, 25 ],
  z: [ -50, 0, 50 ],
};

var _MAPS = [

];

var data = initTransformData(options);

$(document).ready(function(){

  $('html, body').on('click', '.ctrl', function(){

    var layer = $(this).attr('data-layer');
    var rx = $(this).attr('data-rx') || 0; // rotateX
    var ry = $(this).attr('data-ry') || 0; // rotateY
    var rz = $(this).attr('data-rz') || 0; // rotateY

    var cubes = data.map(function(cube){
      data.indexOf(cube);
      if(cube.index.indexOf(layer) != -1){
        return {
          index: data.indexOf(cube),
          classStr: cube.classStr,
        };
      }
      return false;
    }).filter(function(cube){
      return cube;
    });
    return doTransform(cubes, rx, ry, rz);
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

function initTransformData(options){
  var data = [];
  options.x.forEach(function(x, xi){
    options.y.forEach(function(y, yi){
      options.z.forEach(function(z, zi){
        var cube = {
          x: x,
          y: y,
          z: z,
          rx: 0,
          ry: 0,
          rz: 0,
        };
        cube.index = buildStr(xi, yi, zi)
        cube.classStr = buildStr(xi, yi, zi, '.')
        data.push(cube);
        if( xi == 0 && yi == 0 && zi == 2 ){
          console.log(cube);
        }
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
