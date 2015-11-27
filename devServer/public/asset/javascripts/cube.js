$(document).ready(function(){

  var data = {
    'x1y1z1': { str: '.x1.y1.z1', x: 0, y: 0, z: -50, rx: 0, ry: 0},
    'x1y1z2': { str: '.x1.y1.z2', x: 0, y: 0, z: 0, rx: 0, ry: 0},
    'x1y1z3': { str: '.x1.y1.z3', x: 0, y: 0, z: 50, rx: 0, ry: 0},
    'x1y2z1': { str: '.x1.y2.z1', x: 0, y: 50, z: -50, rx: 0, ry: 0},
    'x1y2z2': { str: '.x1.y2.z2', x: 0, y: 50, z: 0, rx: 0, ry: 0},
    'x1y2z3': { str: '.x1.y2.z3', x: 0, y: 50, z: 50, rx: 0, ry: 0},
    'x1y3z1': { str: '.x1.y3.z1', x: 0, y: 100, z: -50, rx: 0, ry: 0},
    'x1y3z2': { str: '.x1.y3.z2', x: 0, y: 100, z: 0, rx: 0, ry: 0},
    'x1y3z3': { str: '.x1.y3.z3', x: 0, y: 100, z: 50, rx: 0, ry: 0},
    'x2y1z1': { str: '.x2.y1.z1', x: 50, y: 0, z: -50, rx: 0, ry: 0},
    'x2y1z2': { str: '.x2.y1.z2', x: 50, y: 0, z: 0, rx: 0, ry: 0},
    'x2y1z3': { str: '.x2.y1.z3', x: 50, y: 0, z: 50, rx: 0, ry: 0},
    'x2y2z1': { str: '.x2.y2.z1', x: 50, y: 50, z: -50, rx: 0, ry: 0},
    'x2y2z2': { str: '.x2.y2.z2', x: 50, y: 50, z: 0, rx: 0, ry: 0},
    'x2y2z3': { str: '.x2.y2.z3', x: 50, y: 50, z: 50, rx: 0, ry: 0},
    'x2y3z1': { str: '.x2.y3.z1', x: 50, y: 100, z: -50, rx: 0, ry: 0},
    'x2y3z2': { str: '.x2.y3.z2', x: 50, y: 100, z: 0, rx: 0, ry: 0},
    'x2y3z3': { str: '.x2.y3.z3', x: 50, y: 100, z: 50, rx: 0, ry: 0},
    'x3y1z1': { str: '.x3.y1.z1', x: 100, y: 0, z: -50, rx: 0, ry: 0},
    'x3y1z2': { str: '.x3.y1.z2', x: 100, y: 0, z: 0, rx: 0, ry: 0},
    'x3y1z3': { str: '.x3.y1.z3', x: 100, y: 0, z: 50, rx: 0, ry: 0},
    'x3y2z1': { str: '.x3.y2.z1', x: 100, y: 50, z: -50, rx: 0, ry: 0},
    'x3y2z2': { str: '.x3.y2.z2', x: 100, y: 50, z: 0, rx: 0, ry: 0},
    'x3y2z3': { str: '.x3.y2.z3', x: 100, y: 50, z: 50, rx: 0, ry: 0},
    'x3y3z1': { str: '.x3.y3.z1', x: 100, y: 100, z: -50, rx: 0, ry: 0},
    'x3y3z2': { str: '.x3.y3.z2', x: 100, y: 100, z: 0, rx: 0, ry: 0},
    'x3y3z3': { str: '.x3.y3.z3', x: 100, y: 100, z: 50, rx: 0, ry: 0},
  };


  $('html, body').on('click', '#test', function(){
    var target = {
      key: 'x1y1z3',
      str: '.x1.y1.z3',
    };
    return doTransform(target);
  });

  function doTransform(target){
    var info = data[target.key];
    var transformStr = 'rotateY(@rydeg) translateX(@xpx) translateY(@ypx) translateZ(@zpx)';
    info.ry = (info.ry + 90);
    transformStr = transformStr.replace('@ry', info.ry);
    transformStr = transformStr.replace('@x', info.x);
    transformStr = transformStr.replace('@y', info.y);
    transformStr = transformStr.replace('@z', info.z);
    $(target.str).css('transform', transformStr);
    return false;
  }

});
// doc ready end


// $('.x1.y1.z3').animate({
//   // transform: transformStr
// }, 500, function(){
//   console.log('done animate');
// })
