const express = require('express');
const mailer = require('./mailer');
const getWeather = require('./weather');
const sendSms = require('./sms');
const outlookmailer = require('./outlookmailer');
const cronsch = require('./cronsch');
require('dotenv').config();

const port = process.env.PORT;

const app = express();
//<a href="/api/sms"> send sms </a>  <a href="/api/outlookmailer"> send outlook</a>

app.get('/',(req,res)=>res.send(`welcome home <a href="/api/mailer">send mail</a> 
<a href="/api/weather"> get weather</a> <br>
<a href="/api/runscheduler"> run scheduler</a>
`));


  app.get('/api/mailer', mailer, (req,res)=>{
    
    if (req.error){
         res.send( `mail error  ${req.error} 
         <br>
         <a href='/'>return home</a>
         ` );
      }
      else{

         res.send(`mail sent as ${req.info} <br>
                   <a href='/'>return home</a>   `);
      }

  }  );

  app.get('/api/outlookmailer', outlookmailer,(req,res)=>{

      res.send( console.log('mail sent success') );       
  }
  
  );

  app.get('/api/weather',getWeather, (req, res) =>{
         res.send( `this is the temperature
                 ${req.wResponse.data.main.temp},
                 humidity as is 
                 ${req.wResponse.data.main.humidity} 
                 and wind is as
                 ${  JSON.stringify(req.wResponse.data.wind) }
          
          and ${req.error} 
          <br>
                   <a href='/'>return home</a>` );
  } )

  app.get('/api/sms', sendSms, (req, res) =>{
    
    res.send( console.log('sent') );
       

  } );
   
  app.get('/api/runscheduler', cronsch,(req,res) =>{
     res.send( console.log('running') );
  } );

app.listen( port, ()=> console.log(`listening on ${port}`) );

