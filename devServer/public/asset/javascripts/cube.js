$(document).ready(function(){


  var data = [];
  var translate= {
    x: [ null, 0, 50, 100 ],
    y: [ null, 0, 50, 100 ],
    z: [ null, -50, 0, 50 ]
  };

  for( var x = 1; x <= 3; x++ ){
    for( var y = 1; y <= 3; y++ ){
      for( var z = 1; z <= 3; z++ ){
        var cube = {};
        cube.key = 'x' + x + 'y' + y + 'z' + z; //'x1y1z1'
        cube.classsStr = '.x' + x + '.y' + y + '.z' + z; // '.x1.y1.z1'
        cube.x = translate.x[x];
        cube.y = translate.y[y];
        cube.z = translate.z[z];
        cube.rx = 0;
        cube.ry = 0;
        data.push(cube);
      } // z end
    } // y end
  } // x end

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
