
var options = {
  x: [ null, 0, 50, 100 ],
  y: [ null, -75, -25, 25 ],
  z: [ null, -50, 0, 50 ],
};

var data = initTransformData(options);

$(document).ready(function(){

  $('html, body').on('click', '.ctrl', function(){

    var layer = $(this).attr('data-layer');
    var rx = $(this).attr('data-rx') || 0; // rotateX
    var ry = $(this).attr('data-ry') || 0; // rotateY
    var rz = $(this).attr('data-rz') || 0; // rotateY

    var cubes = data.map(function(cube){
      data.indexOf(cube);
      if(cube.key.indexOf(layer) != -1){
        return {
          key: data.indexOf(cube),
          classsStr: cube.classsStr,
        };
      }
      return false;
    }).filter(function(cube){
      return cube;
    });
    return doTransform(cubes, rx, ry, rz);
  });
});
// doc ready end

function doTransform(cubes, rx, ry, rz){
  rx = parseInt(rx);
  ry = parseInt(ry);
  rz = parseInt(rz);
  cubes.forEach(function(cube){
    var target = data[cube.key];
    var transformStr =
      'rotateX(@rxdeg) rotateY(@rydeg) rotateZ(@rzdeg) ' +
      'translateX(@xpx) translateY(@ypx) translateZ(@zpx)';
    target.rx = (target.rx + rx + 360 ) % 360;
    target.ry = (target.ry + ry + 360 ) % 360;
    target.rz = (target.rz + rz + 360 ) % 360;
    transformStr = transformStr
      .replace('@rx', target.rx)
      .replace('@ry', target.ry)
      .replace('@rz', target.rz)
      .replace('@x', target.x)
      .replace('@y', target.y)
      .replace('@z', target.z);
    console.log('test', transformStr);
    $(cube.classsStr).css('transform', transformStr);
  });
  return false;
}

function initTransformData(options){
  var data = [];
  for( var x = 1; x <= 3; x++ ){
    for( var y = 1; y <= 3; y++ ){
      for( var z = 1; z <= 3; z++ ){
        var cube = {};
        cube.key = 'x' + x + 'y' + y + 'z' + z; //'x1y1z1'
        cube.classsStr = '.x' + x + '.y' + y + '.z' + z; // '.x1.y1.z1'
        cube.x = options.x[x];
        cube.y = options.y[y];
        cube.z = options.z[z];
        cube.rx = 0;
        cube.ry = 0;
        cube.rz = 0;
        data.push(cube);
      } // z end
    } // y end
  } // x end
  return data;
}
