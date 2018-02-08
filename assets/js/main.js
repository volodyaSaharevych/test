$( function () {

    var $form       = $('#form-submit'),
        $submit     = $('#btn-form-submit'),
        $submitForm = $(".wrap-submit-form"),
        $uploadForm = $(".wrap-upload-form"),
        $linkUpload = $('#upload'),
        $linkSubmit = $('#submit'),
        $file       = $('#file-img'),
        $pars       = window.Parsley;

    var $email       = $('#email'),
        $userName    = $('#user-name'),
        $problem     = $('#control-select'),
        $description = $('#custom-textarea');

        
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
    
    //file upload 
    $file.on('change', function () {
        var $that  = $( this );
            _files = this.files;

        if ( _files && _files[ 0 ] ) {

            var reader = new FileReader();

            reader.onload = function ( e ) {
                $('#img-upload').attr( 'src', e.target.result );
            };

            reader.readAsDataURL( _files[0] );
        }
    });

    // submit
    $form.submit( function ( event ) {
        
        event.preventDefault();

        var dataModel = {
            username    : $userName.val(),
            email       : $email.val(),
            problem     : $problem.val(),
            description : $description.val()

        };
        
        $.post({
            url  : 'https://www.google.com/',
            data : dataModel,
            crossDomain: true
        }).done( function ( data ) {

            $('.success-message').fadeIn().delay( 4000 ).fadeOut('slow');

        }).fail( function () {

            $('.error-message').fadeIn().delay( 4000 ).fadeOut('slow');

        }).always( function () {

             $userName.val('');
             $email.val('');
             $problem.val('');
             $description.val('');
             $('#img-upload').attr( 'src', '#' );

        });
        
    });
    
}());

