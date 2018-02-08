$( function () {

    var $form       = $('#form-submit'),
        $submit     = $('#btn-form-submit'),
        $submitForm = $(".wrap-submit-form"),
        $uploadForm = $(".wrap-upload-form"),
        $linkUpload = $('#upload'),
        $linkSubmit = $('#submit'),
        $pars       = window.Parsley;

        
    // validation for submit form 
    $form.parsley().subscribe( 'parsley:field:validate', function () {
        if ( $form.parsley().isValid() ) {
            $submit.prop( 'disabled', false );
        } else {
            $submit.prop( 'disabled', true );
        }
    });
    // name user 
    $pars.addValidator('stringtype', {
        validateString: function( value ) {
           return /^[a-zA-Z\s]*$/.test(value)
        },
        messages : {
            en : 'Please only letters'
        }
    });
    // email user
    $pars.addValidator('emailtype', {
        validateString: function( value ) {
            return value == 'gmail.com' || value == 'outlook.com';
        },
        messages : {
          en : 'Please enter a valid email address'
        }
    });

    // tabs
    $linkSubmit.click( function ( e ) {
		$submitForm.delay( 100 ).fadeIn( 100 );
        $uploadForm.fadeOut( 100 );
		$linkUpload.removeClass('active');
		$( this ).addClass('active');
		e.preventDefault();
    });
    
	$linkUpload.click( function( e ) {
		$uploadForm.delay( 100 ).fadeIn( 100 );
        $submitForm.fadeOut( 100 );
        $linkSubmit.removeClass('active');
		$( this ).addClass('active');
		e.preventDefault();
    });
    
}());
