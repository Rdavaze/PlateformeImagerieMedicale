//Plugin permettant de dessiner un polygone dans un canvas

var offsetX,offsetY;
var coordinates = [];
var isDone=false;
var mouseX,mouseY;
var diffX,diffY;


CKEDITOR.plugins.add('drawpolygon', {
	icons : 'drawpolygon',
	init  : function (editor) {


		editor.ui.addButton('drawpolygon', {
			label   : 'Dessiner polygone',
			command : 'drawpolygonCommand',
			toolbar : 'drawpolygon'
		});

		editor.addCommand('drawpolygonCommand',{ exec: function( editor ) {

			reOffset();
			window.onscroll=function(e){ reOffset(); }

			ctx.lineWidth=2;
			ctx.strokeStyle='blue';


			canvas.$.onmousedown = function(e){
				if(isDone || coordinates.length>20){return;}

				// dire au browser qu'on gère cet event
				e.preventDefault();
				e.stopPropagation();

				mouseX=parseInt(e.clientX-offsetX);
				mouseY=parseInt(e.clientY-offsetY);
				coordinates.push({x:mouseX,y:mouseY});
				diffX = Math.abs( mouseX - coordinates[0].x );
				diffY = Math.abs( mouseY - coordinates[0].y );
				drawPolygon();

			};


		}}
		);

	}
});


//Fonction qui dessine le polygone dans le canvas
function drawPolygon(){
	ctx.clearRect(0,0,imageWidth,imageHeight);
	ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);
	ctx.beginPath();
	ctx.moveTo(coordinates[0].x, coordinates[0].y);
	for(index=1; index<coordinates.length;index++) {
		ctx.lineTo(coordinates[index].x, coordinates[index].y);
	}
	if(diffX < 10 && diffY < 10 && coordinates.length > 1){
		ctx.closePath();
		isDone = true;
	}
	
	ctx.stroke();
}

function reOffset(){
	var BB=canvas.$.getBoundingClientRect();
	offsetX=BB.left;
	offsetY=BB.top;        
}