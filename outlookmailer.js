var nodeoutlook = require('nodejs-nodemailer-outlook')


function outlookmailer( req, res,next ){ 

nodeoutlook.sendEmail({
    auth: {
        user: "support.it@gifec.gov.gh",
        pass: "RaveWe3#$"
    },
    from: 'support.it@gifec.gov.gh',
    to: 'samueltekyi@gmail.com',
    subject: 'Hey you, awesome!',
    html: '<b>This is bold text</b>',
    text: 'This is text version!',
    replyTo: 'samuel.tekyi@gifec.gov.gh',
    attachments: [{} ],
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
}


);
}


module.exports = outlookmailer;