//Plugin permettant de dessiner un lasso dans un canvas

var offsetX,offsetY;
var coordinates = [];
var isDown=false;
var mouseX,mouseY;
var postid;
var str;


CKEDITOR.plugins.add('drawlasso', {
	icons : 'drawlasso',
	init  : function (editor) {


		editor.ui.addButton('drawlasso', {
			label   : 'Draw Lasso',
			command : 'drawlassoCommand',
			toolbar : 'drawlasso'
		});

		editor.addCommand('drawlassoCommand',{ exec: function( editor ) {

			getPostID();

			reOffset();
			window.onscroll=function(e){ reOffset(); }

			ctx.lineWidth=2;


			canvas.$.onmousedown = function(e){

				coordinates = [];

				// dire au browser qu'on gère cet event
				e.preventDefault();
				e.stopPropagation();

				mouseX=parseInt(e.clientX-offsetX);
				mouseY=parseInt(e.clientY-offsetY);
				coordinates.push({x:mouseX,y:mouseY});

				isDown=false;


				ctx.clearRect(0,0,imageWidth,imageHeight);
				ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);
				drawLasso();
				//console.log(str);
			};


		}}
		);

	}
});


//Fonction qui dessine le lasso dans le canvas
function drawLasso(){

	ctx.beginPath();
	canvas.$.onmousemove = function(e){

		if(isDown)return;

		mouseX=parseInt(e.clientX-offsetX);
		mouseY=parseInt(e.clientY-offsetY);
		coordinates.push({x:mouseX,y:mouseY});
		ctx.lineTo(mouseX, mouseY);
		ctx.stroke();
	}

	canvas.$.onmousedown = function(e) {
		ctx.closePath();
		isDown=true;
		ctx.stroke();
		updateAnnotationLasso();
		drawExistingLasso();
		drawExistingEllipse();
	}	
};

function reOffset(){
	var BB=canvas.$.getBoundingClientRect();
	offsetX=BB.left;
	offsetY=BB.top;        
}

function updateAnnotationLasso(){

	var cpt=0;
	for(var coordinate in coordinates){
		var obj = coordinates[coordinate];
		if(cpt==0){
			str = obj['x']+','+obj['y'];}
		else
			str = str+';'+obj['x']+','+obj['y'];
		cpt = cpt+1;
	}

	$.ajax({
		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/drawlasso/saveAnnotations.php',
		type: 'POST',
		dataType: 'text',
		data: {'postid':postid,'coordinates':str,'color':ctx.strokeStyle}
	});
}

function drawExistingLasso(){

	$.get('qa-plugin/wysiwyg-editor/ckeditor/plugins/drawlasso/getAnnotations.php?postid='+postid,function(data){

		data = JSON.parse(data);  
		var currentStrokeStyle = ctx.strokeStyle;
		var points;
		for(var key in data){ 
			var coord = data[key].lasso_coordinates;
			var tmp = coord.split(";");
			points = [];

			for(var spl in tmp){
				var tmp2 = tmp[spl].split(",");
				points.push(tmp2);
			}
			ctx.strokeStyle = data[key].color;

			ctx.beginPath();
			for(var i=0;i<points.length;i++){
				ctx.lineTo(points[i][0],points[i][1]);
				if(i==points.length-1){
					ctx.lineTo(points[0][0],points[0][1]);
				}
				ctx.stroke();
			}
			ctx.closePath();
		}


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
		$.get('qa-plugin/wysiwyg-editor/ckeditor/plugins/drawlasso/getPostID.php',function(data){
			data = JSON.parse(data);
			postid =  parseInt(data.max_postid)+1;
		})		
	}

}