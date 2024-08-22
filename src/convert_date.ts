const dayjs = require('dayjs');

(async () => {


    const dateString = "2024-08-21T07:48:53Z";
    const epochTimestamp = dayjs(dateString).valueOf(); // In milliseconds
    

// Convert to epoch timestamp
console.log(epochTimestamp);
    // const now = Date.now();
    // console.log('now: ', now);
    
})()