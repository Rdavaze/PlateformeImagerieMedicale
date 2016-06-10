/**
 * @license Copyright © 2013 Stuart Sillitoe <stuart@vericode.co.uk>
 * This work is mine, and yours. You can modify it as you wish.
 *
 * Stuart Sillitoe
 * stuartsillitoe.co.uk
 *
 */

CKEDITOR.plugins.add('strinsert',
{
	requires : ['richcombo'],
	init : function( editor )
	{
		
		var strings = [];
		strings.push(['Bleu', 'Bleu']);
		strings.push(['Rouge', 'Rouge']);
		strings.push(['Jaune', 'Jaune']);
		strings.push(['Vert', 'Vert']);

		// ajout du menu à l'éditeur
		editor.ui.addRichCombo('strinsert',
		{
			label: 		'Couleur',
			title: 		'Couleur',
			voiceLabel: 'Couleur',
			className: 	'cke_format',
			multiSelect:false,
			panel:
			{
				css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
				voiceLabel: editor.lang.panelVoiceLabel
			},

			init: function()
			{
				this.startGroup( "Couleur" );
				for (var i in strings)
				{
					this.add(strings[i][0], strings[i][1], strings[i][2]);
				}
			},

			onClick: function( value )
			{
				if(ctx !== undefined){
					
				switch(value){
				
				case 'Bleu': ctx.strokeStyle = '#00F';break;
				case 'Rouge': ctx.strokeStyle = '#F00';break;
				case 'Jaune': ctx.strokeStyle = '#FF0';break;
				case 'Vert': ctx.strokeStyle = '#0F0';break;
				default: ctx.strokeStyle = '#00F'; 
				}
								
								
				
				}
				
			}
		});
	}
});