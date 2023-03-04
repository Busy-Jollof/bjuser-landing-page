$('document').ready(function () {
    $('body').on('click', '#submit', function () {
        var formData = {
            contact_email: $('#contactEmail').val(),
            form_type: $('#formType').val(),
        }

        $.ajax({
            url: "https://partners.busyjollof.com/api/v1/signup-submit",
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
                    $('#contactEmail').val('')
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
