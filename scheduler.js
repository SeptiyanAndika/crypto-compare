const schedule = require('node-schedule');
const async = require('async');
const limitAlert = 5; // 5%
module.exports = function(table,bot,price){
	
	var jobsSubscribers = schedule.scheduleJob('*/15 * * * *', function(fireDate){
		console.log("schedule start "+new Date().toISOString())
		var allIds = table.subscribers.data.reduce(function (allId, item) {
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


    var jobsAlert0= schedule.scheduleJob('*/5 * * * *', function(fireDate){
        console.log("schedule alert 0 start "+new Date().toISOString())
        var allIds = table.alert.data.reduce(function (allId, item) {
            allId.push(item.chatId)
            return allId;
        }, []);
        let workers =[];
        if(allIds.length>0){
            price.getCompareMessageWithLimit(0,limitAlert,message=>{
                if(message!=="") {
                    allIds.forEach(chatId => {
                        workers.push(function (cb) {
                            bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res => {
                                cb(null, "success send " + chatId);
                            }).catch(err => {
                                cb(err, null);
                            })
                        })
                    });

                    async.parallel(workers, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                    });
                }else {
                    console.log("percentega bellow than "+limitAlert);
                }
            });
        }else{
            console.log("subscribers "+allIds.length);
        }
    });

    var jobsAlert1= schedule.scheduleJob('*/5 * * * *', function(fireDate){
        console.log("schedule alert 1 start "+new Date().toISOString())
        var allIds = table.alert.data.reduce(function (allId, item) {
            allId.push(item.chatId)
            return allId;
        }, []);
        let workers =[];
        if(allIds.length>0){
            price.getCompareMessageWithLimit(1,limitAlert,message=>{
                if(message!=="") {
                    allIds.forEach(chatId => {
                        workers.push(function (cb) {
                            bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res => {
                                cb(null, "success send " + chatId);
                            }).catch(err => {
                                cb(err, null);
                            })
                        })
                    });

                    async.parallel(workers, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                    });
                }else {
                    console.log("percentega bellow than "+limitAlert);
                }
            });
        }else{
            console.log("subscribers "+allIds.length);
        }
    });


    var jobsAlert2= schedule.scheduleJob('*/5 * * * *', function(fireDate){
        console.log("schedule alert 2 start "+new Date().toISOString())
        var allIds = table.alert.data.reduce(function (allId, item) {
            allId.push(item.chatId)
            return allId;
        }, []);
        let workers =[];
        if(allIds.length>0){
            price.getCompareMessageWithLimit(2,limitAlert,message=>{
                if(message!=="") {
                    allIds.forEach(chatId => {
                        workers.push(function (cb) {
                            bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res => {
                                cb(null, "success send " + chatId);
                            }).catch(err => {
                                cb(err, null);
                            })
                        })
                    });

                    async.parallel(workers, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(result);
                        }
                    });
                }else {
                	console.log("percentega bellow than "+limitAlert);
				}
            });
        }else{
            console.log("subscribers "+allIds.length);
        }
    });

}