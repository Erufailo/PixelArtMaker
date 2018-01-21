/*                  *******Changelog*******
Live demo: https://codepen.io/JohnRin/pen/PEmgGG

21-1-18: Added right-click to erase feature
13-1-18: Added min/max values to grid size to prevent lagging in very large canvas
30-12-17: initial implementation with extra features to drag and paint
*/

// When size is submitted by the user, call makeGrid()
function makeGrid(width,height) {
  if($(pixel_canvas).has("tr")){//if pixel_canvas has children, delete them
    $(pixel_canvas).empty();
  }
  //create the grid with the values passed in the function
  for (let i=0; i < height; i++){
    $("#pixel_canvas").append("<tr id=tr"+i+"></tr>");//insert a row in every i iteration
    for (let j=0; j < width; j++){
      $("#pixel_canvas").children("#tr"+i).append("<td></td>");//insert a box in every row equal to the number of width
    }
  }
}
$("#sizePicker").submit(function() {//select the form and on submit event
  let height=( $( "#input_height" ).val() );//take the value of height
  let width=( $( "#input_width" ).val());//take the value of width
  makeGrid(width,height); // call makeGrid with the dimensions of the grid
  return false; // prevent the form from reloading the page
});
$('#pixel_canvas').on('click', 'td', function(){// on the table if a td is clicked
  $(this).css("background-color",$("#colorPicker").val()) // take the color of the colorpicker and paint the backround of the td
});

/* 
****EXTRA FEATURES*******
*/
//click and drag to paint,right-click to erase for more efficiency
var clicked =false;
var rightClicked =false;
$('#pixel_canvas').on('mousedown', 'td', function(e){
  if(e.which ==1){//if event is click
    clicked =true;
    rightClicked=false;
  }
  if(e.which==3){//if event is right-click    
    clicked=false;
    rightClicked=true;    
  }
});
$('#pixel_canvas').on('mouseup', 'td', function(e){
  if(e.which ==1){//if event is click
    clicked =false;
    rightClicked=false;
  }
   if(e.which==3){//if event is right-click
    rightClicked=false;
    clicked =false;    
  }
});

$('#pixel_canvas').on('mouseenter', 'td', function(){
  if(clicked){ // only if the mouse is down paint the "pixel"
    $(this).css("background-color",$("#colorPicker").val());
  }else if(rightClicked){//else erase
     $(this).css("background-color","white");
   }

});
//prevent right-click to show the menu in the canvas
$('#pixel_canvas').contextmenu(function() {
  return false;
});
