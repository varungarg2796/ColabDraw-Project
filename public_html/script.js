const socket = io();
var canvas;
var context;
var selectedShape=null;
var color="";


$(function () {


    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    const username = localStorage.getItem('user');


       // context.fillStyle = "#aabbcc";
        //context.fillRect (100, 100, 400, 400);   
    

    $('#submitchat').click(function () {
        console.log("Clicked on sent");
        socket.emit('chat',
            {
                user: username,
                msg: $('#chatmessage').val()
            })
    });

    socket.on('chat', function (data) {
        console.log("chat sent");
        $('#chatbox').append(data.user
            + ': ' + data.msg + '<br>')
    })

    socket.on('drawSquare',function(data){
        console.log(data);
        context.fillStyle = data.colour;
        context.fillRect (data.positionx, data.positiony, 400, 400);   
    })

    socket.on('drawRect',function(data){
        console.log(data);
        context.fillStyle = data.colour;
        context.fillRect (data.positionx, data.positiony, data.height_entry,data.width_entry);   
    })

    socket.on('drawCircle',function(data){

        context.fillStyle=data.colour;
        context.beginPath();
        context.arc(data.positionx, data.positiony,data.radius_entry,0,Math.PI*2,true);
        context.fill();
    });

    socket.on('drawTriangle',function(data){
        context.fillStyle = data.colour;
        context.beginPath();
        context.moveTo(data.positionx,data.positiony);
        context.lineTo(data.positionx+25,data.positiony+25);
        context.lineTo(data.positionx-25,data.positiony+25);
        context.fill()

    });

    //here
   // get canvas element and create context
   
    $("#a_slider").slider({
        orientation: "horizontal",
        range: false,
        min: 0,
        max: 1,
        value: 0,
        step: .01,
        animate: true,
        slide: function (event, ui) {
            $("#a_field").val(ui.value);
            $("#a").text(ui.value);
        }
    });



    //here


});


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

    socket.emit('drawSquare',{
        colour:color,
        positionx:posx,
        positiony:posy
    });
    //Done
    console.log("Wtf");
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

    socket.emit('drawRect',{
        colour:color,
        positionx:posx,
        positiony:posy,
        height_entry:height,
        width_entry:width
    });
}

function Circle(event){
    var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;
    var radius=$('#radius').val();
    socket.emit('drawCircle',{
        colour:color,
        positionx:posx,
        positiony:posy,
        radius_entry:radius
    });
}

function triangle (event) {
	var pos = getMousePos(canvas, event);
    posx = pos.x;
    posy = pos.y;   

    socket.emit('drawTriangle',{
        colour:color,
        positionx:posx,
        positiony:posy,
    });


	
}

/*function drawLine(event) {
    
    $('#canvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });


    $('#canvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#canvas').mouseup(function (e) {
        mousePressed = false;
    });
        $('#canvas').mouseleave(function (e) {
        mousePressed = false;
    });
   }


   function Draw(x, y, isDown) {
    if (isDown) {
        context.beginPath();
        context.strokeStyle = "red";
        context.lineWidth = "3";
        context.lineJoin = "round";
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.closePath();
        context.stroke();
    }
    lastX = x; lastY = y;
}*/

 
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
    else if (selectedShape==6) {
        
       // drawLine();
    }

	else if (selectedShape==5) {

		setInterval(function(){

			
        
    $('#canvas').mousedown(function(event) {
        canvas.addEventListener('mousemove',eraser);
        
    });

    $('#canvas').mouseup(function(event) {
        
        canvas.removeEventListener("mousemove", eraser);
            clearInterval();
    });

			
		},30);

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

$("#line").click(function() {
    selectedShape=this.value;
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