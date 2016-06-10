
CKEDITOR.plugins.add('cancellasso', {
	icons : 'cancellasso',
	init  : function (editor) {


		editor.ui.addButton('cancellasso', {
			label   : 'Annuler dernier lasso',
			command : 'cancellassoCommand',
			toolbar : 'cancellasso'
		});

		editor.addCommand('cancellassoCommand',{ exec: function( editor ) {

			if(postid === undefined){
				getPostID();
				postid -= 1;
			}

			removeLastLassoAnnotation();
			ctx.clearRect(0, 0, imageWidth, imageHeight);
			ctx.drawImage(base_image, 0, 0, imageWidth, imageHeight);

			drawExistingLasso();
		}
		});
	}
});

function removeLastLassoAnnotation(){
	$.ajax({
		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/cancellasso/removeLastLassoAnnotation.php',
		type: 'POST',
		dataType: 'text',
		data: {'postid':postid}
	});

}