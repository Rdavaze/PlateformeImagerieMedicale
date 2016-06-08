// Plugin permettant de dessiner une ellipse dans un canvas
CKEDITOR.plugins.add('drawellipse', {
	icons : 'drawellipse',
	init  : function (editor) {


		editor.ui.addButton('drawellipse', {
		label   : 'Draw Ellipse',
		command : 'drawellipseCommand',
		toolbar : 'drawellipse'
	});

		editor.addCommand('drawellipseCommand',{ exec: function( editor ) {

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
			    updateAnnotation(x1,y1,x2,y2);
			}

			canvas.$.onmousemove = function(e) {

			    if (!isDown) return;

			    var rect = canvas.$.getBoundingClientRect();
			        x2 = e.clientX - rect.left;
			        y2 = e.clientY - rect.top;

			    ctx.clearRect(0, 0, w, h);
			    ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);
			    drawExistingEllipse();
			    drawEllipse(x1, y1, x2, y2);
			}
		
		
	}}
			);

}
});


// Fonction qui dessine l'ellipse dans le canvas
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
    ctx.strokeStyle = '#00F';
    ctx.stroke();
}

function updateAnnotation(x1,y1,x2,y2){

	$.ajax({
		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/saveAnnotations.php',
		type: 'POST',
		dataType: 'text',
		data: {'x1':x1,'y1':y1,'x2':x2,'y2':y2}
	});
	
}

function drawExistingEllipse(){
	
	$.get('qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/getAnnotations.php',function(data){
		for(var i=0; i < data.length; i++){
			drawEllipse(data[i].x1,data[i].y1,data[i].x2,data[i].y2);
		}
	})
	  .fail(function() {
		    alert( "error" );
		  });

//	var xhr = new XMLHttpRequest();
//	// Lorsqu'un réponse est émise par le serveur
//	xhr.onreadystatechange = function() {
//		if (xhr.status == 200 && xhr.readyState == 4) {
//
//			// xhr.responseText contient exactement ce que la page PHP renvoi
//			var answer = JSON.parse(xhr.responseText);
//			console.log(answer);
//
//		}
//		
//		xhr.open('GET', 'qa-plugin/wysiwyg-editor/ckeditor/plugins/drawellipse/getAnnotations.php');
//		xhr.send('');
//}
}