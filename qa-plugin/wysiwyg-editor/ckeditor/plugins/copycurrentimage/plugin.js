// Plugin permettant de copier l'image de la question dans un canvas

var current_imageLink,
	current_imageHeight,
	current_imageWidth,
	current_canvas_insered = false,
	current_ctx,
	current_canvas,
	current_base_image;

CKEDITOR.plugins.add('copycurrentimage', {
	icons : 'copycurrentimage',
	init  : function (editor) {


	// ajout du bouton dans la toolbar
	editor.ui.addButton('copycurrentimage', {
		label   : 'Copie image courante',
		command : 'copycurrentimageCommand',
		toolbar : 'copycurrentimage'
	});

	// bind de la commande au bouton
	editor.addCommand('copycurrentimageCommand',{ exec: function( editor ) {
		
		if(editor.getData().search("canvas") == -1){
			current_canvas_insered = false;
		}

		getCurrentImageLink(editor);

		if(current_imageLink !== undefined && current_canvas_insered == false){


			current_canvas = new CKEDITOR.dom.element("canvas");
			current_canvas.width = current_imageWidth;
			current_canvas.height = current_imageHeight;
			current_canvas.id = 'current_image';

			var element = editor.getSelection().getStartElement().getParent();
			element.append(current_canvas);
			
			current_ctx = current_canvas.$.getContext("2d");
			current_ctx.strokeStyle = '#000';
			current_ctx.canvas.height = current_imageHeight;
			current_ctx.canvas.width = current_imageWidth;
			current_ctx.canvas.id = 'current_image';

			current_base_image = new Image();
			current_base_image.onload = function()
					{
				current_ctx.drawImage(current_base_image, 0, 0, current_imageWidth, current_imageHeight);
					}
			current_base_image.src = current_imageLink;


			current_canvas_insered = true;
			
//			var img = document.getElementsByTagName("img");
//			element.remove(img);
//			console.log(element);
//			
		}

		
		
	}}
			);

}
});

// récupère le lien de l'image de la question
function getCurrentImageLink(editor){

			var editor_data = editor.getData();
			
			current_imageWidth = editor_data.substring(editor_data.indexOf("width: ")+7,editor_data.indexOf("px"));

			var current_heightBuffer = editor_data.substring(editor_data.indexOf("height: ")+8,editor_data.length);
			current_imageHeight = current_heightBuffer.substring(0,current_heightBuffer.indexOf("px"));

			var img_src_index = editor_data.indexOf("src=");

			editor_data = editor_data.substring(img_src_index+5,editor_data.length);
			
			var img_end_src_index = editor_data.indexOf(">");

			editor_data = editor_data.substring(0,img_end_src_index-1);
			
			var img_style_index = editor_data.indexOf("style");
			
			editor_data = editor_data.substring(0,img_style_index-2);

			editor_data = editor_data.replace('amp;','');

			current_imageLink = editor_data;

}

