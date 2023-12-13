$(document).ready(function() {
  "use strict";

  $('form.contactForm').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input, textarea').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (!ferror) {
      var formData = $(this).serializeArray(); // Get form data as array
      var jsonData = {};
      $.each(formData, function() {
        jsonData[this.name] = this.value;
      });

      // Construct mailto link
      var receiverEmail = 'arbazkhaan.cs@gmail.com'; // Replace with recipient's email
      var subject = jsonData['subject']; // Subject line
      var emailBody = 'Dear Receiver,\n\n'; // Initial email body

      $.each(jsonData, function(key, value) {
        emailBody += key + ': ' + value + '\n'; // Add form data to email body
      });

      emailBody += '\nRegards,\n'+jsonData['name'];

      var mailtoLink = 'mailto:' + receiverEmail + '?subject=' + subject + '&body=' + encodeURIComponent(emailBody);

      // Open user's email client
      window.location.href = mailtoLink;
      
      alert('Opening your email client with prefilled data.'); // Inform the user

      // Reset the form fields
      $(this)[0].reset();
    }
  });
});
