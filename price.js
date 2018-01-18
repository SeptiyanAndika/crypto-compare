const async = require("async");
const adapter = require("./adapter");

class Price{
	
	compareGeminiBitcoinId(cb){
		let workers ={};
		let self = this;
		workers['Gemini_BTC'] = function(cb){
			adapter.getGeminiTicker("BTCUSD",cb);
		}
		workers['Gemini_ETH'] = function(cb){
			adapter.getGeminiTicker("ETHUSD",cb);
		}
		workers['BitcoinId_BTC'] = function(cb){
			adapter.getBitcoinIdTicker("btc_idr",cb);
		}
		workers['BitcoinId_ETH'] = function(cb){
			adapter.getBitcoinIdTicker("eth_idr",cb);
		}
		workers['Rate'] = function(cb){
			adapter.getCurrencyLayerPrice("USD","IDR",cb);
		}

		async.parallel(workers,(err,result)=>{
			if(err){
				console.log(err);
				cb(err,null);
			}
			let resultCompare={};
			result['BitcoinId_BTC'] = self.bitcoinCoIdPriceToUSD(result['BitcoinId_BTC'],result['Rate']);
			result['BitcoinId_ETH'] = self.bitcoinCoIdPriceToUSD(result['BitcoinId_ETH'],result['Rate']);
			if(Number(result['Gemini_BTC'].mid)<Number(result['BitcoinId_BTC'].mid)){
				let diff = Number(result['BitcoinId_BTC'].bid)- Number(result['Gemini_BTC'].ask);
				resultCompare['BTC']= {
					"Gemini":result['Gemini_BTC'].ask,
					"BitcoinId":result['BitcoinId_BTC'].bid,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Gemini_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"Gemini ask BitcoinId bid"
				};
			}else{
				let diff = Number(result['Gemini_BTC'].bid)- Number(result['BitcoinId_BTC'].ask);
				resultCompare['BTC']= {
					"Gemini":result['Gemini_BTC'].bid,
					"BitcoinId":result['BitcoinId_BTC'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['BitcoinId_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"BitcoinId ask Gemini bid"
				};
			}

			if(Number(result['Gemini_ETH'].mid)<Number(result['BitcoinId_ETH'].mid)){
				let diff = Number(result['BitcoinId_ETH'].bid)- Number(result['Gemini_ETH'].ask);
				resultCompare['ETH']= {
					"Gemini":result['Gemini_ETH'].ask,
					"BitcoinId":result['BitcoinId_ETH'].bid,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Gemini_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"Gemini ask BitcoinId bid"
				};
			}else{
				let diff = Number(result['Gemini_ETH'].bid)- Number(result['BitcoinId_ETH'].ask);
				resultCompare['ETH']= {
					"Gemini":result['Gemini_ETH'].bid,
					"BitcoinId":result['BitcoinId_ETH'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['BitcoinId_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"BitcoinId ask Gemini bid"
				};
			}
			
			cb(null,{compare:resultCompare,rate:result['Rate']["USDIDR"]})
		})
	}

	compareQuioneBitcoinId(cb){
		let workers ={};
		let self = this;
		workers['Quoine_BTC'] = function(cb){
			adapter.getQuoineTicker("BTCUSD",cb);
		}
		workers['Quoine_ETH'] = function(cb){
			adapter.getQuoineTicker("ETHUSD",cb);
		}
		workers['BitcoinId_BTC'] = function(cb){
			adapter.getBitcoinIdTicker("btc_idr",cb);
		}
		workers['BitcoinId_ETH'] = function(cb){
			adapter.getBitcoinIdTicker("eth_idr",cb);
		}
		workers['Rate'] = function(cb){
			adapter.getCurrencyLayerPrice("USD","IDR",cb);
		}

		async.parallel(workers,(err,result)=>{
			if(err){
				console.log(err);
				cb(err,null);
			}
			let resultCompare={};
			result['BitcoinId_BTC'] = self.bitcoinCoIdPriceToUSD(result['BitcoinId_BTC'],result['Rate']);
			result['BitcoinId_ETH'] = self.bitcoinCoIdPriceToUSD(result['BitcoinId_ETH'],result['Rate']);
			if(Number(result['Quoine_BTC'].mid)<Number(result['BitcoinId_BTC'].mid)){
				let diff = Number(result['BitcoinId_BTC'].bid)- Number(result['Quoine_BTC'].ask);
				resultCompare['BTC']= {
					"Quoine":result['Quoine_BTC'].ask,
					"BitcoinId":result['BitcoinId_BTC'].bid,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Quoine_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"Quoine ask BitcoinId bid"
				};
			}else{
				let diff = Number(result['Quoine_BTC'].bid)- Number(result['BitcoinId_BTC'].ask);
				resultCompare['BTC']= {
					"Quoine":result['Quoine_BTC'].bid,
					"BitcoinId":result['BitcoinId_BTC'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['BitcoinId_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"BitcoinId ask Quoine bid"
				};
			}

			if(Number(result['Quoine_ETH'].mid)<Number(result['BitcoinId_ETH'].mid)){
				let diff = Number(result['BitcoinId_ETH'].bid)- Number(result['Quoine_ETH'].ask);
				resultCompare['ETH']= {
					"Quoine":result['Quoine_ETH'].ask,
					"BitcoinId":result['BitcoinId_ETH'].bid,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Quoine_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"Quoine ask BitcoinId bid"
				};
			}else{
				let diff = Number(result['Quoine_ETH'].bid)- Number(result['BitcoinId_ETH'].ask);
				resultCompare['ETH']= {
					"Quoine":result['Quoine_ETH'].bid,
					"BitcoinId":result['BitcoinId_ETH'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['BitcoinId_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"BitcoinId ask Quoine bid"
				};
			}
			
			cb(null,{compare:resultCompare,rate:result['Rate']["USDIDR"]})
		})
	}

	compareGeminiQuione(cb){
		let workers ={};
		let self = this;
		workers['Gemini_BTC'] = function(cb){
			adapter.getGeminiTicker("BTCUSD",cb);
		}
		workers['Gemini_ETH'] = function(cb){
			adapter.getGeminiTicker("ETHUSD",cb);
		}

		workers['Quoine_BTC'] = function(cb){
			adapter.getQuoineTicker("BTCUSD",cb);
		}
		workers['Quoine_ETH'] = function(cb){
			adapter.getQuoineTicker("ETHUSD",cb);
		}

		async.parallel(workers,(err,result)=>{
			if(err){
				console.log(err);
				cb(err,null);
			}
			let resultCompare={};
			if(Number(result['Gemini_BTC'].mid)<Number(result['Quoine_BTC'].mid)){
				let diff = Number(result['Quoine_BTC'].bid)- Number(result['Gemini_BTC'].ask);
				resultCompare['BTC']= {
					"Gemini":result['Gemini_BTC'].ask,
					"Quoine":result['Quoine_BTC'].bid,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Gemini_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"Gemini ask Quoine bid"
				};
			}else{
				let diff = Number(result['Gemini_BTC'].bid)- Number(result['Quoine_BTC'].ask);
				resultCompare['BTC']= {
					"Gemini":result['Gemini_BTC'].bid,
					"Quoine":result['Quoine_BTC'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Quoine_BTC'].ask))*100).toFixed(2)+"%",
					"Message":"Quoine ask Gemini bid"
				};
			}

			if(Number(result['Gemini_ETH'].mid)<Number(result['Quoine_ETH'].mid)){
				let diff = Number(result['Quoine_ETH'].bid)- Number(result['Gemini_ETH'].ask);
				resultCompare['ETH']= {
					"Gemini":result['Gemini_ETH'].bid,
					"Quoine":result['Quoine_ETH'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Gemini_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"Gemini ask Quoine bid"
				};
			}else{
				let diff = Number(result['Gemini_ETH'].bid)- Number(result['Quoine_ETH'].ask);
				resultCompare['ETH']= {
					"Gemini":result['Gemini_ETH'].bid,
					"Quoine":result['Quoine_ETH'].ask,
					"difference":diff.toFixed(2),
					"percentage":((diff/Number(result['Quoine_ETH'].ask))*100).toFixed(2)+"%",
					"Message":"Gemini ask Quoine bid"
				};
			}
			cb(null,{compare:resultCompare,rate:null})
		})
	}

	bitcoinCoIdPriceToUSD(result,rates){
		let temp = result;
		temp['bid'] = temp.sell/rates['USDIDR']; 
		temp['bid'] = temp['bid'].toFixed(2);
		temp['ask'] = temp.buy/rates['USDIDR']; 
		temp['ask'] = temp['ask'].toFixed(2);
		temp['mid'] = ((Number(temp['ask'])+Number(temp['bid']))/2).toFixed(2);
		delete temp['buy'];
		delete temp['sell'];
		return temp;
	}
	

	getCompareMessage(index,cb){
		let functionNames=['compareGeminiBitcoinId','compareQuioneBitcoinId','compareGeminiQuione'];
		this[functionNames[index]]((err,result)=>{
			if(err){
				cb("Error Getting Price, Plese try again later");
			}else{
				let message="";
				Object.keys(result.compare).forEach(function(key) {
					let currency=result.compare[key];
					message+=`*${key}*\n`;
					Object.keys(currency).forEach(function(key_currency) {
						message+=`${key_currency} : ${currency[key_currency]}\n`;
					});
					message+=`\n`;
				});
				if(result.rate!=null){
					message+=`*Rate* : ${result.rate} USDIDR`;
				}
				cb(message);
			}
		});
	}

	getCompareAllMessage(cb){
		let workers ={};
		let self = this;
		workers['Gemini BitcoinId']= function(cb){
			self.getCompareMessage(0,message=>{
				cb(null,message);
			})
		}
		workers['Quione BitcoinId']= function(cb){
			self.getCompareMessage(1,message=>{
				cb(null,message);
			})
		}

		workers['Gemini Quione']= function(cb){
			self.getCompareMessage(2,message=>{
				cb(null,message);
			})
		}
		async.parallel(workers,(err,result)=>{
			if(err){
				cb("Error Getting Price, Plese try again later");
			}else{
				let message="";
				Object.keys(result).forEach(function(key) {
					message+=`\n\n*${key}*\n\n`;
					message+=`${result[key]}`;
				});
				cb(message);
			}
		});
	}
}

module.exports = new Price();
