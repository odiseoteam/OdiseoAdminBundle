/*
 * Backend
 */
(function ( $ ) {
    'use strict';

    var setupDateRangePicker = function(dateInput)
    {
        var $fromDate = $('#'+$(dateInput).data('fromDateId'));
        var $toDate = $('#'+$(dateInput).data('toDateId'));

        var datePickerOptions = {
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY'
            }
        };

        console.log($toDate.val());
        if ($fromDate.val()) {
            datePickerOptions.startDate = moment($fromDate.val(), "YYYY-MM-DD");
        }

        if ($toDate.val()) {
            datePickerOptions.endDate = moment($toDate.val(), "YYYY-MM-DD");
        }

        console.log(datePickerOptions);

        $(dateInput).daterangepicker(datePickerOptions, function(start, end, label) {
            $fromDate.val(start.format('YYYY-MM-DD'));
            $toDate.val(end.format('YYYY-MM-DD'));
        });

        if ($fromDate.val() == '' && $toDate.val() == '') {
            $(dateInput).val('');
        }
    };

    $(document).ready(function() 
    {
        //Enable iCheck plugin for checkboxes
        //iCheck for checkbox and radio inputs
        $('input[type="checkbox"]:not([data-toggle="toggle"])').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue'
        });

        $('[data-requires-confirmation]').requireConfirmation();
        $('[data-form-type="collection"]').CollectionForm();

        //Initialize Select2 Elements
        $('.select2').select2();

        $('.time-range-group .date-range').each(function (index, dateInput) {
            setupDateRangePicker(dateInput);
        });
    });
})( jQuery );
