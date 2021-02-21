const cron = require('node-cron');
const axios = require('axios').default;
const mailer = require('./mailer');



function cronsch ( req, res, next ){


    cron.schedule('5 * * * * *', function(){
        console.log( ' this is coming in every 10 sec' );
        mailer();
      });
      

}


module.exports = cronsch;