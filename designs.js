/*                  *******Changelog*******
Live demo: https://codepen.io/JohnRin/pen/PEmgGG
01-02-18: Added save canvas feature
28-01-18: Reduced the use of selector $() with the use of variables
          Added erase with single right click.
24-01-18: Fixed Bugs where the paint continued if the cursor went
          out of canvas, and the drag painting started from the next
          "pixel"
21-01-18: Added right-click to erase feature
13-01-18: Added min/max values to grid size to prevent lagging in very large canvas
30-12-17: initial implementation with extra features to drag and paint
*/
//require('./js/html2canvas.min.js');
const canvas = $('#pixel_canvas');
const colorPicker = $("#colorPicker");
//var html2canvas = require('./js/html2canvas.min.js');

// When size is submitted by the user, call makeGrid()
function makeGrid(width, height) {
  if (canvas.has("tr")) {//if pixel_canvas has children, delete them
    canvas.empty();
  }
  //create the grid with the values passed in the function
  for (let i = 0; i < height; i++) {
    canvas.append("<tr id=tr" + i + "></tr>");//insert a row in every i iteration
    for (let j = 0; j < width; j++) {
      canvas.children("#tr" + i).append("<td></td>");//insert a box in every row equal to the number of width
    }
  }
}
$("#sizePicker").submit(function () {//select the form and on submit event
  let height = ($("#input_height").val());//take the value of height
  let width = ($("#input_width").val());//take the value of width
  makeGrid(width, height); // call makeGrid with the dimensions of the grid
  return false; // prevent the form from reloading the page
});
canvas.on('click', 'td', function () {// on the table if a td is clicked
  $(this).css("background-color", colorPicker.val()) // take the color of the colorpicker and paint the backround of the td
});

/* 
****EXTRA FEATURES*******
*/
//click and drag to paint,right-click to erase for more efficiency
var clicked = false;
var rightClicked = false;
canvas.on('mousedown', 'td', function (e) {
  if (e.which == 1) {//if event is click
    clicked = true;
    rightClicked = false;
  }
  if (e.which == 3) {//if event is right-click    
    clicked = false;
    rightClicked = true;
  }
  e.preventDefault();
});
canvas.on('mouseup', 'td', function (e) {
  if (e.which == 1) {//if event is click
    clicked = false;
    rightClicked = false;
  }
  if (e.which == 3) {//if event is right-click
    rightClicked = false;
    clicked = false;
  }

});
canvas.on('mouseleave', function () {// if the mouse leaves the canvas reset the variables
  clicked = false;
  rightClicked = false;

});
canvas.on('mouseenter mousemove', 'td', function () {
  if (clicked) { // only if the mouse is down paint the "pixel"
    $(this).css("background-color",colorPicker.val());
  } else if (rightClicked) {//else erase
    $(this).css("background-color", "white");
  }

});
//prevent right-click to show the menu in the canvas
canvas.contextmenu(function () {
  return false;
  $(this).css("background-color", "white");// single right click to erase a pixel
});

//Save Canvas feature
$('#save').click(function(){
  html2canvas(document.querySelector('#pixel_canvas')).then (saveCanvas =>{
      let link= document.createElement('a');
      link.href= saveCanvas.toDataURL();
      link.download= "canvas.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  });
 
});
