
//Plugin permettant de dessiner une ellipse dans un canvas
CKEDITOR.plugins.add('cancelellipse', {
	icons : 'cancelellipse',
	init  : function (editor) {


		editor.ui.addButton('cancelellipse', {
			label   : 'Annuler dernière ellipse',
			command : 'cancelellipseCommand',
			toolbar : 'cancelellipse'
		});

		editor.addCommand('cancelellipseCommand',{ exec: function( editor ) {

			if(postid === undefined){
				getPostID();
				postid -= 1;
			}

			removeLastEllipseAnnotation();
		}
		});
	}
});

function removeLastEllipseAnnotation(){
	$.ajax({
		url: 'qa-plugin/wysiwyg-editor/ckeditor/plugins/cancelellipse/removeLastEllipseAnnotation.php',
		type: 'POST',
		dataType: 'text',
		data: {'postid':postid}
	});

}