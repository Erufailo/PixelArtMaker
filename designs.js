// When size is submitted by the user, call makeGrid()
function makeGrid(width,height) {
  if($(pixel_canvas).has("tr")){//if pixel_canvas has children, delete them
    $(pixel_canvas).empty();
  }
  //create the grid with the values passed in the function
  for (var i=0; i < height; i++){
    $("#pixel_canvas").append("<tr id=tr"+i+"></tr>");//insert a row in every i iteration
    for (var j=0; j < width; j++){
      $("#pixel_canvas").children("#tr"+i).append("<td></td>");//insert a box in every row equal to the number of width
    }
  }
}
$("#sizePicker").submit(function() {//select the form and on submit event
  var height=( $( "#input_height" ).val() );//take the value of height
  var width=( $( "#input_width" ).val());//take the value of width
  makeGrid(width,height); // call makeGrid with the dimensions of the grid
  return false; // prevent the form from reloading the page
});
$('#pixel_canvas').on('click', 'td', function(){// on the table if a td is clicked
  $(this).css("background-color",$("#colorPicker").val()) // take the color of the colorpicker and paint the backround of the td
});

