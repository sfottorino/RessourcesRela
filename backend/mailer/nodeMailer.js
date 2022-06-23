const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3b65bce4977f80",
        pass: "aa30e34c5d1039"
    }
});

module.exports = function (to, subject, text){
    const options={
        from:'"NoReply" <NoReply@ressources-relationnelle.fr>',
        to:to,
        subject:subject,
        html:text
    }

    transporter.sendMail(options, function(err, info){
        if(err){
            return err;
        }else{
            return info.response;
        }
    })
}