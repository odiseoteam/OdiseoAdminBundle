/*
 * Backend
 */
(function ( $ ) {
    'use strict';

    $(document).ready(function() 
    {
        //Enable iCheck plugin for checkboxes
        //iCheck for checkbox and radio inputs
        $('input[type="checkbox"]:not([data-toggle="toggle"])').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue'
        });

        $('[data-requires-confirmation]').requireConfirmation();
    });
})( jQuery );
