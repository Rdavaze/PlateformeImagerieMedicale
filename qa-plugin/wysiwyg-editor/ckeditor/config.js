/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbar = [

	                  { name: 'basic', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ] },
	                  { name: 'color', items: [ 'TextColor', 'BGColor' ] },
	                  { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
	                  { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	                  { name: 'font', items: [ 'Font', 'FontSize', 'Format' ] },
	                  { name: 'cancel', items: [ 'cancelellipse']},
	                  '/',
	                  { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote' ] },
	                  { name: 'links', items: [ 'Link', 'Unlink' ] },
	                  { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Smiley' ] },
	                  { name: 'last', items: [ 'RemoveFormat', 'Maximize' ] },
	                  { name: 'image_editor', items: [ 'copyimage', 'drawellipse', 'drawpolygon','strinsert' ] }
	                  ];


	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Se the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	config.allowedContent = true;

	config.extraPlugins = 'copyimage,drawellipse,drawpolygon,richcombo,strinsert,cancelellipse';
};
