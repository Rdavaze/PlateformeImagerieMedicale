var postid;

//Plugin permettant de dessiner une ellipse dans un canvas
CKEDITOR.plugins.add('drawellipse', {
	icons : 'drawellipse',
	init  : function (editor) {


		editor.ui.addButton('drawellipse', {
			label   : 'Dessiner ellipse',
			command : 'drawellipseCommand',
			toolbar : 'drawellipse'
		});

		editor.addCommand('drawellipseCommand',{ exec: function( editor ) {

			getPostID();

			var	    w = canvas.width,
			h = canvas.height,
			x1,
			x2,
			y1,
			y2,
			isDown = false;     


			canvas.$.onmousedown = function(e) {

				var rect = canvas.$.getBoundingClientRect();
				x1 = e.clientX - rect.left;
				y1 = e.clientY - rect.top;
				isDown = true;

			}

			canvas.$.onmouseup = function() {
				isDown = false;

				updateAnnotation(x1,y1,x2,y2,postid);
				drawExistingEllipse();
			}

			canvas.$.onmousemove = function(e) {

				if (!isDown) return;

				var rect = canvas.$.getBoundingClientRect();
				x2 = e.clientX - rect.left;
				y2 = e.clientY - rect.top;

				ctx.clearRect(0, 0, w, h);
				ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);

				drawEllipse(x1, y1, x2, y2);
			}


		}}
		);

	}
});


//Fonction qui dessine l'ellipse dans le canvas
function drawEllipse(x1, y1, x2, y2) {

	var radiusX = (x2 - x1) * 0.5,   
	radiusY = (y2 - y1) * 0.5,   
	centerX = x1 + radiusX,      
	centerY = y1 + radiusY,
	step = 0.01,                 
	a = step,                    
	pi2 = Math.PI * 2 - step;    


	ctx.beginPath();


	ctx.moveTo(centerX + radiusX * Math.cos(0),
			centerY + radiusY * Math.sin(0));


	for(; a < pi2; a += step) {
		ctx.lineTo(centerX + radiusX * Math.cos(a),
				centerY + radiusY * Math.sin(a));
	}


	ctx.closePath();
	ctx.stroke();
}

function updateAnnotation(x1,y1,x2,y2){
	$.ajax({
		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/saveAnnotations.php',
		type: 'POST',
		dataType: 'text',
		data: {'x1':x1,'y1':y1,'x2':x2,'y2':y2,'postid':postid,'color':ctx.strokeStyle}
	});

}

function drawExistingEllipse(){

	$.get('qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/getAnnotations.php?postid='+postid,function(data){

		data = JSON.parse(data);		
		var currentStrokeStyle = ctx.strokeStyle;
		
		for(var key in data){
			ctx.strokeStyle = data[key].color;
			drawEllipse(parseInt(data[key].x1),parseInt(data[key].y1),parseInt(data[key].x2),parseInt(data[key].y2));
		}

		ctx.strokeStyle = currentStrokeStyle;
	})
	.fail(function() {
		alert( "error" );
	});

}

function getPostID(){
	var indexPostID = window.location.href.indexOf('state=edit-');
	if(indexPostID != -1){
		
		var buffer = window.location.href.substring(indexPostID+11,window.location.href.length);
		postid = parseInt(buffer);
	}
	else
	{
		$.get('qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/getPostID.php',function(data){
			data = JSON.parse(data);
			postid =  parseInt(data.max_postid)+1;
		})		
	}

}