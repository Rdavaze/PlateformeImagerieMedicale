// Plugin permettant de copier l'image de la question dans un canvas

var imageLink,
	imageHeight,
	imageWidth,
	canvas_insered = false,
	ctx,
	canvas,
	base_image,
	current_editor,
	element;

//$(".qa-form-tall-button.qa-form-tall-button-answer").click(function(){
////	if(canvas !== undefined){
////		alert('toto');
//		var dataURL = canvas.$.toDataURL("image/png");
//	//	dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
//		console.log(dataURL);
//		//alert(dataURL);
//		var image = new Image();
//		image.src = dataURL;
//		//document.body.appendChild(image);
//		current_editor.insertHtml("<img src="+dataURL+" width="+imageWidth+" height="+imageHeight);
//		current_editor.updateElement();
////	}
//		
//		
//});



CKEDITOR.plugins.add('copyimage', {
	icons : 'copyimage',
	init  : function (editor) {


	// ajout du bouton dans la toolbar
	editor.ui.addButton('copyimage', {
		label   : 'Copie image question',
		command : 'copyimageCommand',
		toolbar : 'copyimage'
	});

	// bind de la commande au bouton
	editor.addCommand('copyimageCommand',{ exec: function( editor ) {
		current_editor = editor;
		if(editor.getData().search("canvas") == -1){
			canvas_insered = false;
		}
		
		var title = getQuestionTitle();

		getImageLink(title);

		if(imageLink !== undefined && canvas_insered == false){

//		canvas = document.createElement('canvas');
			canvas = new CKEDITOR.dom.element("canvas");
			canvas.width = imageWidth;
			canvas.height = imageHeight;
			canvas.id = 'question_image';
			element = editor.getSelection().getStartElement().getParent();
			element.append(canvas);
			
//			ctx = canvas.getContext("2d");
			ctx = canvas.$.getContext("2d");
			ctx.strokeStyle = '#000';
			ctx.canvas.height = imageHeight;
			ctx.canvas.width = imageWidth;
			ctx.canvas.id = 'question_image';

			base_image = new Image();
			base_image.onload = function()
					{
				ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);
					}
			base_image.src = imageLink;
			
			canvas_insered = true;

		    
		    var dataURL = canvas.$.toDataURL("image/png");
			
			$.ajax({
				url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/copyimage/saveImage.php',
				type: 'POST',
				dataType: 'text',
				data: {'data':dataURL}
			});
		    

//			var dataURL = canvas.$.toDataURL("image/png");
//			dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
////				//console.log(dataURL);
////				//alert(dataURL);
//				var image = new Image();
//				image.src = dataURL;
//				$.post()
////				//document.body.appendChild(image);
//				editor.insertHtml("<img src="+dataURL+" width="+imageWidth+" height="+imageHeight+"/>");
////				//editor.updateElement();
////		
//			var blob = b64toBlob(dataURL,'image/png',512);
//			var blobUrl = URL.createObjectURL(blob);
//			console.log(blobUrl);
//			//window.location = blobUrl;
			
		}

		
		
	}}
			);

}
});

// récupère le titre de la question
function getQuestionTitle(){
	var title = encodeURI(document.title);
	title = title.replace(/%20/g," ");
	title = title.replace (' - Annotation d\'imagerie m%C3%A9dicale','');
	return title;	
}

// récupère le lien de l'image de la question
function getImageLink(title){

	var xhr = new XMLHttpRequest();

	// Lorsqu'un réponse est émise par le serveur
	xhr.onreadystatechange = function() {
		if (xhr.status == 200 && xhr.readyState == 4) {

			// xhr.responseText contient exactement ce que la page PHP renvoi
			var answer = xhr.responseText;

			imageWidth = answer.substring(answer.indexOf("width: ")+7,answer.indexOf("px"));

			heightBuffer = answer.substring(answer.indexOf("height: ")+8,answer.length);
			imageHeight = heightBuffer.substring(0,heightBuffer.indexOf("px"));

			var answer_src_index = answer.indexOf("src=");

			answer = answer.substring(answer_src_index+5,answer.length);
			var answer_end_src_index = answer.indexOf(">");

			answer = answer.substring(0,answer_end_src_index-1);

			answer = answer.replace('amp;','');

			imageLink = answer;

		}
	};

	xhr.open('GET', 'qa-plugin/wysiwyg-editor/ckeditor/plugins/copyimage/copyImage.php?title='+title);
	xhr.send('');	


}

//function saveContent(data){
//	
//	// TODO : Trouver un moyen de catch le post_id pour update le content + affichage html
//	var post_id;
//	$.ajax({
//		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/copyimage/saveContent.php',
//		type: 'POST',
//		dataType: 'text',
//		data: 'data=' + data + '&post_id=2'
//	});
//}
