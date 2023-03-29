$('document').ready(function () {
    $('body').on('click', '#submit', function () {

        var error  = 0;
        // form common fields
		var contactName = $('#contactName').val();
		var contactEmail = $('#contactEmail').val();
		var contactPhone = $('#contactPhone').val();
		var contactState = $('#contactState :selected').text();
		var contactCity = $('#contactCity').val();

        var Emailregex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var phoneRegex = /^(?=.*[0-9])[- +()0-9]+$/

        $('#ErrorName').attr('style','');
        $('#contactName').attr('style','');
        $('#ErrorEmail').attr('style','');
        $('#contactEmail').attr('style','');
        $('#ErrorPhone').attr('style','');
        $('#contactPhone').attr('style','');
        $('#ErrorState').attr('style','');
        $('#contactState').attr('style','');
        $('#ErrorCity').attr('style','');
        $('#contactCity').attr('style','');

        if(contactName == '') {
            //$('#ErrorName').css('display','block');
            $('#ErrorName').attr('style','display: block !important');
            $('#contactName').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactEmail == '') {
            //$('#ErrorName').css('display','block');
            $('#ErrorEmail').attr('style','display: block !important');
            $('#ErrorEmail').html('Email is required.');
            $('#contactEmail').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactEmail != '' && !Emailregex.test(contactEmail)) {
            $('#ErrorEmail').html('Invalid email address');
            $('#ErrorEmail').attr('style','display: block !important');
            $('#contactEmail').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactPhone == '') {
            $('#ErrorPhone').html('Phone number is required');
            $('#ErrorPhone').attr('style','display: block !important');
            $('#contactPhone').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactPhone != '' &&  !phoneRegex.test(contactPhone)) {
            $('#ErrorPhone').html('Invalid phone number address');
            $('#ErrorPhone').attr('style','display: block !important');
            $('#contactPhone').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactState == '') {
            $('#ErrorState').attr('style','display: block !important;');
            $('#contactState').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

        if(contactCity == '') {
            $('#ErrorCity').attr('style','display: block !important');
            $('#contactCity').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

        // delivery page extra fields
        var contactLastName = $('#contactLastName').val();
        var is_current_delivery = $('#is_current_delivery').val();

        $('#ErrorLastName').attr('style','');
        $('#contactLastName').attr('style','');
        $('#is_current_delivery_error').attr('style','');
        $('#is_current_delivery').attr('style','');

        if(contactLastName == '') {
            $('#ErrorLastName').attr('style','display: block !important');
            $('#contactLastName').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

        if(is_current_delivery == '') {
            $('#is_current_delivery_error').attr('style','display: block !important');
            $('#is_current_delivery').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        var havePhysicalRestaurant = $('#havePhysicalRestaurant').val();
        var offerCateringService = $('#offerCateringService').val();

        $('#ErrorhavePhysicalResturant').attr('style','');
        $('#havePhysicalResturant').attr('style','');
        $('#ErrorofferCateringService').attr('style','');
        $('#offerCateringService').attr('style','');

        if(havePhysicalRestaurant == '') {
            $('#ErrorhavePhysicalResturant').attr('style','display: block !important');
            $('#havePhysicalResturant').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

        if(offerCateringService == '') {
            $('#ErrorofferCateringService').attr('style','display: block !important');
            $('#offerCateringService').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

        // contactus field
        var reasonForContact = $('#reasonForContact').val();
        var contactUsState = $('#contactUsState').val();
        if(reasonForContact == '') {
            $('#ErrorReasonState').attr('style','display: block !important');
            $('#reasonForContact').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }
        if(contactUsState == '') {
            $('#ErrorcontactUsState').attr('style','display: block !important;');
            $('#contactUsState').attr('style','border-bottom: 2.5px solid #A02724');
            error = 1;
        }

		var formType = $('#formtype').val();
		if(error == 0) {
            contactLastName = (contactLastName === undefined ? '' : contactLastName)
            var formData = {
                contact_name: $('#contactName').val() + ' ' + contactLastName ?? '',
                contact_email: $('#contactEmail').val(),
                reason_for_contact: $('#reasonForContact').val(),
                contact_state: contactState,
                contact_phone: $('#contactPhone').val(),
                form_type: formType,
                contact_city: contactCity,
            }

            if(formType == 'everyone')  {
                formData['is_customer'] = true;
            }

            if(formType == 'delivery-drivers')  {
                formData['is_delivery_men'] = true;
                formData['is_current_delivery'] = is_current_delivery;
            }

            if(formType == 'restaurant')  {
                formData['is_restaurant'] = true;
                formData['have_physical_restaurant'] = havePhysicalRestaurant;
                formData['offer_catering_service'] = offerCateringService;
            }
            console.log(formData);
            $.ajax({
                url: "https://partners.busyjollof.com/api/v1/contact-submit",
                type: 'POST',
                data: formData,
                cache: false,
                success: function (data) {
                    if (data.errors) {
                        var error = '';
                        $.each(data.errors, function (i, val) {
                            console.log(val)
                            error += val.message + '<br>';
                        })
                        $('#error').html(error)
                        $('#success').html('')
                        $('#success').css('display', 'none');
                        $('#error').css('display', 'block');
                    } else {
                        $('#error').css('display', 'none');
                        $('#success').css('display', 'block');
                        $('#error').html('')
                        $('#success').html(data.success)
                        $('#contactName').val('')
                        $('#contactLastName').val('')
                        $('#contactEmail').val('')
                        $('#reasonForContact').val('')
                        $('#is_current_delivery').val('');
                        $('#have_physical_restaurant').val('');
                        $('#offer_catering_service').val('');
                        $('#contactCity').val('')
                        $('#contactState').val('')
                        $('#contactPhone').val('')
                    }
                },
                error: function (data) {
                    var error = '';
                    $.each(data.errors, function (i, val) {
                        console.log(val)
                        error += val.message + '<br>';
                    })
                    $('#error').html(error)
                }
            });
        }

    })
});
