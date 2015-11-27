$(document).ready(function(){

  var data = [
    { key: 'x1y1z1', classsStr: '.x1.y1.z1', x: 0, y: 0, z: -50, rx: 0, ry: 0 },
    { key: 'x1y1z2', classsStr: '.x1.y1.z2', x: 0, y: 0, z: 0, rx: 0, ry: 0 },
    { key: 'x1y1z3', classsStr: '.x1.y1.z3', x: 0, y: 0, z: 50, rx: 0, ry: 0 },
    { key: 'x1y2z1', classsStr: '.x1.y2.z1', x: 0, y: 50, z: -50, rx: 0, ry: 0 },
    { key: 'x1y2z2', classsStr: '.x1.y2.z2', x: 0, y: 50, z: 0, rx: 0, ry: 0 },
    { key: 'x1y2z3', classsStr: '.x1.y2.z3', x: 0, y: 50, z: 50, rx: 0, ry: 0 },
    { key: 'x1y3z1', classsStr: '.x1.y3.z1', x: 0, y: 100, z: -50, rx: 0, ry: 0 },
    { key: 'x1y3z2', classsStr: '.x1.y3.z2', x: 0, y: 100, z: 0, rx: 0, ry: 0 },
    { key: 'x1y3z3', classsStr: '.x1.y3.z3', x: 0, y: 100, z: 50, rx: 0, ry: 0 },
    { key: 'x2y1z1', classsStr: '.x2.y1.z1', x: 50, y: 0, z: -50, rx: 0, ry: 0 },
    { key: 'x2y1z2', classsStr: '.x2.y1.z2', x: 50, y: 0, z: 0, rx: 0, ry: 0 },
    { key: 'x2y1z3', classsStr: '.x2.y1.z3', x: 50, y: 0, z: 50, rx: 0, ry: 0 },
    { key: 'x2y2z1', classsStr: '.x2.y2.z1', x: 50, y: 50, z: -50, rx: 0, ry: 0 },
    { key: 'x2y2z2', classsStr: '.x2.y2.z2', x: 50, y: 50, z: 0, rx: 0, ry: 0 },
    { key: 'x2y2z3', classsStr: '.x2.y2.z3', x: 50, y: 50, z: 50, rx: 0, ry: 0 },
    { key: 'x2y3z1', classsStr: '.x2.y3.z1', x: 50, y: 100, z: -50, rx: 0, ry: 0 },
    { key: 'x2y3z2', classsStr: '.x2.y3.z2', x: 50, y: 100, z: 0, rx: 0, ry: 0 },
    { key: 'x2y3z3', classsStr: '.x2.y3.z3', x: 50, y: 100, z: 50, rx: 0, ry: 0 },
    { key: 'x3y1z1', classsStr: '.x3.y1.z1', x: 100, y: 0, z: -50, rx: 0, ry: 0 },
    { key: 'x3y1z2', classsStr: '.x3.y1.z2', x: 100, y: 0, z: 0, rx: 0, ry: 0 },
    { key: 'x3y1z3', classsStr: '.x3.y1.z3', x: 100, y: 0, z: 50, rx: 0, ry: 0 },
    { key: 'x3y2z1', classsStr: '.x3.y2.z1', x: 100, y: 50, z: -50, rx: 0, ry: 0 },
    { key: 'x3y2z2', classsStr: '.x3.y2.z2', x: 100, y: 50, z: 0, rx: 0, ry: 0 },
    { key: 'x3y2z3', classsStr: '.x3.y2.z3', x: 100, y: 50, z: 50, rx: 0, ry: 0 },
    { key: 'x3y3z1', classsStr: '.x3.y3.z1', x: 100, y: 100, z: -50, rx: 0, ry: 0 },
    { key: 'x3y3z2', classsStr: '.x3.y3.z2', x: 100, y: 100, z: 0, rx: 0, ry: 0 },
    { key: 'x3y3z3', classsStr: '.x3.y3.z3', x: 100, y: 100, z: 50, rx: 0, ry: 0 },
  ];


  $('html, body').on('click', '.ctrl', function(){

    var layer = $(this).attr('data-layer');
    var rx = $(this).attr('data-rx'); // rotateX
    var ry = $(this).attr('data-ry'); // rotateY

    var targets = data.map(function(cube){
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
    return doTransform(targets, rx, ry);
  });

  function doTransform(cubes, rx, ry){
    rx = parseInt(rx);
    ry = parseInt(ry);
    cubes.forEach(function(cube){
      var target = data[cube.key];
      var transformStr = 'rotateX(@rxdeg) rotateY(@rydeg) translateX(@xpx) translateY(@ypx) translateZ(@zpx)';
      target.rx = (target.rx + rx + 360 ) % 360;
      target.ry = (target.ry + ry + 360 ) % 360;
      transformStr = transformStr
        .replace('@rx', target.rx)
        .replace('@ry', target.ry)
        .replace('@x', target.x)
        .replace('@y', target.y)
        .replace('@z', target.z);
      $(cube.classsStr).css('transform', transformStr);
    });
    return false;
  }

});
// doc ready end
