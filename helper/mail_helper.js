var nodemailer = require('nodemailer');

module.exports = function mailSend(toMail, title, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'app4u.tester@gmail.com',
          pass: 'hrlt imlc ctmr mzxq'
        }
      });
      
      var mailOptions = {
        from: 'app4u.tester@gmail.com',
        to: toMail,
        subject: title,
        text: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
