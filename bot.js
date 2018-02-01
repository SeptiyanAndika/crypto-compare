module.exports = function(db,table,bot,price){
	bot.onText(/\/hi$/, (msg, match) => {  
		const chatId = msg.chat.id; 
		const start = new Date();
		price.getCompareAllMessage(resp=>{
			const end = new Date() - start;
			let message = resp;
			message+="\nExecution time: "+end+"ms";
			console.log(`Send message to ${chatId} with body\n${message}`);
			bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		});
 
	});

	bot.onText(/\/hi1$/, (msg, match) => {  
		const chatId = msg.chat.id; 
		const start = new Date();
		price.getCompareMessage(0,resp=>{
			const end = new Date() - start;
			let message = resp;
			message+="\nExecution time: "+end+"ms";
			console.log(`Send message to ${chatId} with body\n${message}`);
			bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		});
	});

	bot.onText(/\/hi2$/, (msg, match) => {  
		const chatId = msg.chat.id; 
		const start = new Date();
		price.getCompareMessage(1,resp=>{
			const end = new Date() - start;
			let message = resp;
			message+="\nExecution time: "+end+"ms";
			console.log(`Send message to ${chatId} with body\n${message}`);
			bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		});
	});

	bot.onText(/\/hi3$/, (msg, match) => {  
		const chatId = msg.chat.id; 
		const start = new Date();
		price.getCompareMessage(2,resp=>{
			const end = new Date() - start;
			let message = resp;
			message+="\nExecution time: "+end+"ms";
			console.log(`Send message to ${chatId} with body\n${message}`);
			bot.sendMessage(chatId, message, {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		});
	});

	bot.onText(/\/subscribe$/, (msg, match) => {
		const chatId = msg.chat.id; 
		var users = table.subscribers.find({chatId: chatId});
		if(users.length==0){
            table.subscribers.insert({
				chatId: chatId
			});
			db.saveDatabase();
			bot.sendMessage(chatId, "Success Subscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}else{
			bot.sendMessage(chatId, "Already Subscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}

	});


	bot.onText(/\/unsubscribe$/, (msg, match) => {
		const chatId = msg.chat.id; 
		var users = table.subscribers.find({chatId: chatId});
		if(users.length==0){
			bot.sendMessage(chatId, "User Not Subscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}else{
            table.subscribers.remove(users);
			db.saveDatabase();
			bot.sendMessage(chatId, "Success Unsubscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}

	});

	bot.onText(/\/status$/, (msg, match) => {
		const chatId = msg.chat.id; 
		var users = table.subscribers.find({chatId: chatId});
		if(users.length==0){
			bot.sendMessage(chatId, "Status Unsubscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}else{
			bot.sendMessage(chatId, "Status Subscribe", {parse_mode: 'Markdown'}).then(res=>{
				console.log("succes send message to "+chatId);
			}).catch(err=>{
				console.log(err);
			});
		}

	});

    bot.onText(/\/alert/, (msg, match) => {
        const chatId = msg.chat.id;
        var users = table.alert.find({chatId: chatId});
        if(users.length==0){
            table.alert.insert({
                chatId: chatId
            });
            db.saveDatabase();
            bot.sendMessage(chatId, "Success subscribe alert, will get notify if have different 5%", {parse_mode: 'Markdown'}).then(res=>{
                console.log("succes send message to "+chatId);
            }).catch(err=>{
                console.log(err);
            });
        }else{
            bot.sendMessage(chatId, "Already subscribe alert, will get notify if have different 5%", {parse_mode: 'Markdown'}).then(res=>{
                console.log("succes send message to "+chatId);
            }).catch(err=>{
                console.log(err);
            });
        }

    });


    bot.onText(/\/noalert/, (msg, match) => {
        const chatId = msg.chat.id;
        var users = table.alert.find({chatId: chatId});
        if(users.length==0){
            bot.sendMessage(chatId, "User not subscribe alert", {parse_mode: 'Markdown'}).then(res=>{
                console.log("succes send message to "+chatId);
            }).catch(err=>{
                console.log(err);
            });
        }else{
            table.alert.remove(users);
            db.saveDatabase();
            bot.sendMessage(chatId, "Success unsubscribe alert", {parse_mode: 'Markdown'}).then(res=>{
                console.log("succes send message to "+chatId);
            }).catch(err=>{
                console.log(err);
            });
        }

    });

}