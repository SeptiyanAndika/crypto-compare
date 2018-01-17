const axios = require("axios");
const async = require("async");
const currenyLayerKey = '';

class Price{
	getGeminiTicker(currencyPair,cb){
		axios.get(`https://api.gemini.com/v1/pubticker/${currencyPair}`).then(result=>{
			cb(null,result.data)
		}).catch(err=>{
			if(err.response && err.response.data){
				cb(err.response.data,null);
			}else{
				cb(err,null);
			}
		});
	}

	getBitcoinIdTicker(currencyPair,cb){
		axios.get(`https://vip.bitcoin.co.id/api/${currencyPair}/ticker`).then(result=>{
			cb(null,result.data)
		}).catch(err=>{
			if(err.response && err.response.data){
				cb(err.response.data,null);
			}else{
				cb(err,null);
			}
		});
	}

	getCurrencyLayerPrice(source,currencies,cb){
		axios.get(`http://apilayer.net/api/live?access_key=${currenyLayerKey}&source=${source}&currencies=${currencies}`).then(result=>{
			cb(null,result.data)
		}).catch(err=>{
			if(err.response && err.response.data){
				cb(err.response.data,null);
			}else{
				cb(err,null);
			}
		});
	}

	compare(cb){
		let workers={};
		let self = this;
		workers['geminiBTC'] = function(cb){
				self.getGeminiTicker("BTCUSD",cb);
		}
		workers['geminiETH'] = function(cb){
				self.getGeminiTicker("ETHUSD",cb);
		}
		workers['botcoinIdBTC'] = function(cb){
				self.getBitcoinIdTicker("btc_idr",cb);
		}
		workers['botcoinIdETH'] = function(cb){
				self.getBitcoinIdTicker("eth_idr",cb);
		}
		workers['USDIDR'] = function(cb){
				self.getCurrencyLayerPrice("USD","IDR",cb);
		}

		async.parallel(workers,(err,result)=>{
			if(err){
				console.log(err);
				cb(err,null);
			}
			let BTCIDR_Gemini = Math.ceil(result['geminiBTC'].ask * result['USDIDR'].quotes["USDIDR"]);
			let ETHIDR_Gemini = Math.ceil(result['geminiETH'].ask * result['USDIDR'].quotes["USDIDR"]);
			let BTCIDR_BitcoinId = result['botcoinIdBTC'].ticker.sell;
			let ETHIDR_BitcoinId = result['botcoinIdETH'].ticker.sell;
			let diffBTC = BTCIDR_BitcoinId-BTCIDR_Gemini;
			let diffETH = ETHIDR_BitcoinId-ETHIDR_Gemini;
			let resultCompare ={
				BTC:{
					"Gemini":self.rupiahFormat(BTCIDR_Gemini),
					"Bitcoin.co.id":self.rupiahFormat(BTCIDR_BitcoinId),
					"difference":self.rupiahFormat(diffBTC),
					"percentage":((diffBTC/BTCIDR_Gemini)*100).toFixed(2)+"%"
				},
				ETH:{
					"Gemini":self.rupiahFormat(ETHIDR_Gemini),
					"Bitcoin.co.id":self.rupiahFormat(ETHIDR_BitcoinId),
					"difference":self.rupiahFormat(diffETH),
					"percentage":((diffETH/ETHIDR_Gemini)*100).toFixed(2)+"%"
				},
				
			}
			cb(null,resultCompare)
		})
	}

	rupiahFormat(bilangan){
		let	number_string = bilangan;
		if(number_string.toString){
			number_string = bilangan.toString();
		}
		let split	= number_string.split(',');
		let sisa 	= split[0].length % 3;
		let rupiah 	= split[0].substr(0, sisa);
		let ribuan 	= split[0].substr(sisa).match(/\d{1,3}/gi);
		
		if (ribuan) {
			let separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join('.');
		}
		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
		return "Rp. "+rupiah;
	}

	getCompareMessage(cb){
		this.compare((err,result)=>{
			if(err){
				cb("Error Getting Price, Plese try again later");
			}else{
				let message="";
				Object.keys(result).forEach(function(key) {
					let currency=result[key];
					message+=`*${key}*\n`;
					Object.keys(currency).forEach(function(key_currency) {
						message+=`${key_currency} : ${currency[key_currency]}\n`;
					});
				});
				cb(message);
			}
		});
	}
}

module.exports = new Price();

