import React from 'react';
import cron from 'node-cron';
const CronJobs = () => {
	function logMessage() {
		console.log('Cron job executed at:', new Date().toLocaleString());
	}

	// cron.schedule('* * * * *', () => {
	// 	logMessage();
	// });
	return <div>Cron</div>;
};

export default CronJobs;
