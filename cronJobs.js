const cron = require('node-cron');
const axios = require('axios');

//with axios, or fetch, we can call our own apis on a set schedule

const initScheduledJobs = () => {
      const testJob = cron.schedule(" */30 * * * *", () => {
        console.log("cron test");
        // runs every 1 minute, if we put ("1 * * * *") -> it would run every minute 1 of every hour
            //-> to run every second we would do "*/1 * * * * *"
      });
      testJob.start();


}

module.exports = {initScheduledJobs}