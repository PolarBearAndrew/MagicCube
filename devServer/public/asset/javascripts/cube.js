
var options = {
  x: [ 0, 50, 100 ],
  y: [ -75, -25, 25 ],
  z: [ -50, 0, 50 ],
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
  }); // .ctrl[click] end
}); // doc ready end

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
    $(cube.classsStr).css('transform', transformStr);
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
        cube.key = buildStr(xi, yi, zi)
        cube.classsStr = buildStr(xi, yi, zi, '.')
        data.push(cube);
      });
    });
  });
  return data;
}

function buildStr(xi, yi, zi, pre){
  pre = pre || '';
  return pre + 'x' + ( xi + 1 ) +
    pre + 'y' + ( yi + 1 ) +
    pre + 'z' + ( zi + 1 );
}
