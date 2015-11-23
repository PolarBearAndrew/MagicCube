document.querySelector('#cube').addEventListener("mousemove", mouseOver, false);

function mouseOver(e) {
  var x = e.pageX * 0.2;
  var y = e.pageY * 0.2;
  rotate(x, y);
}

// function showPlane(c) {
//   document.querySelector('#cube').style.background = c.checked ? '#CCC' : '';
// }

function rotate(newX, newY) {
  var x = parseInt(document.querySelector('#rx').value, 10) + (newX || 0);
  var y = parseInt(document.querySelector('#ry').value, 10) + (newY || 0);
  var cube = document.getElementById('cube');

  cube.style.webkitTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  // cube.style.MozTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
  //cube.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
}
