(function(){
	var isvalid = {

		init: function() {
			if ( ! window.jQuery ) {
				var script = document.createElement( 'script' );
				script.type = 'text/javascript';
				script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js';
				script.onload = script.onreadystatechange = function() {
					if ( ! this.readyState || this.readyState == "loaded" || this.readyState == 'complete' )
						isvalid.ready();
				};
				document.getElementsByTagName( 'head' )[0].appendChild( script );
			}
			else {
				isvalid.ready();
			}
		},

		ready: function(){
			isvalid.reset();
			isvalid.header.create();
			jQuery(document).click( isvalid.click );
			jQuery('*').hover( isvalid.mouseEnter, isvalid.mouseLeave );
		},

		click: function( event ) {
			var text = event.target.innerHTML,
				number = parseInt( text.replace( ',', '' ), 10 );

			if ( ! isvalid.selectable( number ) )
				return;

			isvalid.selected.push( number );
			jQuery(event.target).css( 'background-color', 'rgba(50, 200, 80, 0.7)' ).addClass( 'isvalid-clicked' );
			jQuery('.isvalid-steps').text( isvalid.nextStep() );

			if ( 4 == isvalid.selected.length ) {
				window.open( 'http://isvalid.org/' +
					'?sc=' + isvalid.selected[0] +
					'&cc=' + isvalid.selected[1] +
					'&se=' + isvalid.selected[2] +
					'&ce=' + isvalid.selected[3]
				);

				isvalid.reset();
			}

			isvalid.header.update();
			return false;
		},

		mouseLeave: function( event ) {
			var element = jQuery(this);
			if ( ! element.hasClass( 'isvalid-clicked' ) && ! element.hasClass( 'isvalid-steps' ) )
				element.css( 'background-color', '' );
		},

		mouseEnter: function( event ) {
			var element = jQuery(this);
			if ( element.hasClass( 'isvalid-clicked' ) )
				return;

			var text = event.target.innerHTML,
				number = parseInt( text.replace( ',', '' ), 10 );

			if ( ! isvalid.selectable( number ) )
				return;

			event.stopPropagation();
			element.css( 'background-color', 'rgba(50, 200, 80, 0.25)' );
			event.target.style.cursor = 'pointer';
		},

		selectable: function( string ) {
			return ! isNaN( parseFloat( string ) ) && isFinite( string );
		},

		nextStep: function() {
			var step = isvalid.selected.length;

			if ( 0 === step )
				return 'Control samples';
			else if ( 1 == step )
				return 'Control conversions';
			else if ( 2 == step )
				return 'Experiment samples';
			else if ( 3 == step )
				return 'Experiment conversions';
			else
				return 'This should never happen';

		},

		header: {
			create: function() {
				var header = jQuery('<div>');
				header.css( {
					'top':'0px',
					'left': '0px',
					'background-color':'rgba(50, 200, 80, 0.8)',
					'z-index':'10000',
					'width':'100%',
					'height':'60px',
					'position':'fixed',
					'text-align': 'center',
					'padding-top': '20px',
					'font-size': '30px'
				} );

				header.addClass( 'isvalid-steps' );
				header.prependTo( 'body' );
				this.update();
			},
			update: function() {
				jQuery('.isvalid-steps').text( isvalid.nextStep() );
			}
		},

		reset: function() {
			jQuery('.isvalid-clicked').removeClass( 'isvalid-clicked' ).css( 'background-color', '' );
			jQuery(document).unbind( 'click', isvalid.click );
			jQuery('*').unbind( 'mouseleave', isvalid.mouseLeave ).unbind( 'mouseenter', isvalid.mouseEnter );
			jQuery('.isvalid-steps').remove();
			isvalid.selected = [];
		}

	};

	isvalid.init();
}());