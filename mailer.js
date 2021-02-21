const nodemailer = require('nodemailer');
const axios = require('axios').default;
const { json } = require('express');

var emailto;
var mess;
var id;
var subject;

   require('dotenv').config();

   const mailHost = JSON.parse(process.env.EMAIL);
   
async  function mailer(req, res, next){


await axios.get('https://qfrucfvqrp17bzk-gifecpm.adb.us-ashburn-1.oraclecloudapps.com/ords/returns/email/email').then(
    async (response)=> {
        emailto = response.data.items[0].emailto;
        mess = response.data.items[0].mess;
        id = response.data.items[0].id;
        subject = response.data.items[0].subject;


    }

);


let transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user : mailHost.mail,
            pass : mailHost.pass
        }
    }
);


let mailOptions = {
    from: mailHost.mail,
    to: emailto, //'asamoahtekyi@gmail.com',
    subject: subject,
    text: mess   
};

await  transporter.sendMail(mailOptions,(error, info)=>{
   
    if(  error){
        
        console.log(error);  // ERROR LOG FROM NODEMAILER
       
     // async function logerr(){ 
       
        axios.put('https://qfrucfvqrp17bzk-gifecpm.adb.us-ashburn-1.oraclecloudapps.com/ords/returns/email/email',
        {     id: id, status: 'E'    }      
        ).then((response)=>{

     }).catch((error)=>{
         console.log( '  update error ' + error);  // ERROR LOG FROM APEX
     });  
  //      }

//logerr;

     // ELSE IF THE MAIL WENT THRU

    } else{
        console.log('sent  as' + info.response);
        console.log('put email 1');

      // async function logsuss(){
          
        console.log('put email 1');
         axios.put('https://qfrucfvqrp17bzk-gifecpm.adb.us-ashburn-1.oraclecloudapps.com/ords/returns/email/email',
        {     p_id: id, p_status: 'S'    }      
        ).then((response)=>{

     }).catch((error)=>{
         console.log( '  update error ' + error);  // ERROR LOG FROM APEX
     });
     // }

      console.log('put email 2');
      // logsuss;
      console.log('put email 3');

    };

    req.error = error;
console.log(info);

  //  req.info =  JSON.stringify(info.to);

    console.log(req.info);
      
});

next();
}


module.exports = mailer;