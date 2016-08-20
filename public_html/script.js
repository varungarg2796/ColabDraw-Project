var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var selectedShape=null;
var color="";


function eraser(event){
	var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;

    var height=$('#height').val();
    var width=$('#width').val();
    context.fillStyle = "white";
    context.fillRect (posx, posy, height, width);
}
function drawSquare(event){
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;

    context.fillStyle = color;
    context.fillRect (posx, posy, 200, 200);
   	console.log(color);
}
function reset(event){

	context.fillStyle="white";
	context.fillRect(0,0,canvas.height,canvas.width);
}

function drawRect(event){
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;
    var height=$('#height').val();
    var width=$('#width').val();

    if(height ===""|| width==="")
    {
    	alert("Please enter the height and width");
    }

    context.fillStyle = color;
    context.fillRect (posx, posy, height, width);
}

function Circle(event){
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;
    var radius=$('#radius').val();

    context.fillStyle=color;
	 context.beginPath();
	 context.arc(posx,posy,radius,0,Math.PI*2,true);
	 context.fill();
}

function triangle (event) {
	var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;

    
	context.fillStyle = color;
	context.beginPath();
    context.moveTo(posx,posy);
    context.lineTo(posx+25,posy+25);
    context.lineTo(posx-25,posy+25);


    context.fill();
}









function draw(event){
      
	console.log(selectedShape);
	if (selectedShape==1) {
		drawSquare(event);
	}

	else if (selectedShape==2) {
		drawRect(event);
	}

	else if (selectedShape==3) {
		Circle(event);
	}
	else if (selectedShape==4) {
		triangle(event);

	}
	else if (selectedShape==5) {

		setInterval(function(){

			$(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32){

		 canvas.addEventListener('mousemove',eraser);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
        	canvas.removeEventListener("mousemove", eraser);
            clearInterval();
            
        	}
    	});
			
		},50)

	}
}

function setTextColor(picker) {
		document.getElementsByTagName('body')[0].style.color = '#' + picker.toString();
		color= '#' + picker.toString();
		console.log(picker.toString());
	}


$("#square").click(function() {
    selectedShape = this.value;
});

$("#rectangle").click(function() {
    selectedShape = this.value;
});

$("#circle").click(function() {
    selectedShape = this.value;
});

$("#triangle").click(function() {
    selectedShape = this.value;
});

$("#eraser").click(function() {
    selectedShape = this.value;
});

$("#reset").click(function() {
    reset();
});


function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
}

downloadLnk.addEventListener('click', download, false); //calling the download canvas option