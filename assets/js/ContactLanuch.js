$('document').ready(function () {
    $('body').on('click', '#submit', function () {
        var formData = {
            contact_name: $('#contactName').val(),
            contact_email: $('#contactEmail').val(),
            reason_for_contact: $('#reasonForContact').val(),
            contact_state: $('#contactState :selected').text(),
            contact_phone: $('#contactPhone').val(),
            is_restaurant: $("#isRestaurant").is(':checked') == false ? null : true,
            is_delivery_men: $('#isDeliveryMen').is(':checked') == false ? null : true,
            is_customer: $('#isCustomer').is(':checked') == false ? null : true,
            is_just_asking_question: $('#isJustAskingQuestion').is(':checked') == false ? null : true,
            form_type: $('#formType').val(),
        }

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
                    $('#contactEmail').val('')
                    $('#reasonForContact').val('')
                    $('#contactState').val('')
                    $('#contactPhone').val('')
                    $("#isRestaurant").prop('checked', false)
                    $('#isDeliveryMen').prop('checked', false)
                    $('#isCustomer').prop('checked', false)
                    $('#isJustAskingQuestion').prop('checked', false)
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
    })
});
