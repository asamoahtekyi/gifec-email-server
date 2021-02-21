const cron = require('node-cron');



function cronsch ( req, res, next ){


    cron.schedule('10, *, *, *, *', function(){
        console.log( ' this is coming in every 10 sec' );
      });
      

}


module.exports = cronsch;