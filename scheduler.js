const schedule = require('node-schedule');
const async = require('async');

module.exports = function(subscribers,bot,price){
	
	var jobs = schedule.scheduleJob('*/15 * * * *', function(fireDate){
		console.log("schedule start "+new Date().toISOString())
		var allIds = subscribers.data.reduce(function (allId, item) { 
			allId.push(item.chatId)
			return allId;
		}, []);
		let workers =[];
		if(allIds.length>0){
			price.getCompareAllMessage(message=>{
				allIds.forEach(chatId => {
					workers.push(function(cb){
						bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res=>{
							cb(null,"success send "+chatId);
						}).catch(err=>{
							cb(err,null);
						})
					})
			
				});
			
				async.parallel(workers,(err,result)=>{
					if(err){
						console.log(err);
					}else{
						console.log(result);
					}
				});
			});
		}else{
			console.log("subscribers "+allIds.length);
		}
	
	});
}