$(document).ready(function(){
    
    (function($) {
        "use strict";
    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "ээ, у цябе ж ёсць імя, так?",
                    minlength: "ваша імя павінна складацца з як мінімум 2х знакаў"
                },
                subject: {
                    required: "ліст трэба абавязкова назваць",
                    minlength: "назва ліста павінна складацца з як мінімум 4х знакаў"
                },
                number: {
                    required: "come on, you have a number, don't you?",
                    minlength: "your Number must consist of at least 5 characters"
                },
                email: {
                    required: "email абавязкова патрэбны"
                },
                message: {
                    required: "эм... такс, патэбна што-небудзь надрукаваць, каб даслаць паведамленне.",
                    minlength: "гэта ўсё што вы хацелі сказаць? :("
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_process.php",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        })
                    }
                })
            }
        })
    })

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        Email.send({
        SecureToken : "ba6cc92c-5b3e-42ac-bd9e-cf3a4882c3d7",
        To : 'rabinzonim@gmail.com',
        From : document.getElementById('email').value,
        Subject : document.getElementById('subject').value,
        Body : `Name: ${document.getElementById('name').value}
                Message: ${document.getElementById('message').value}`
        }).then(
            message => alert(message)
        );
    })
        
 })(jQuery)
})