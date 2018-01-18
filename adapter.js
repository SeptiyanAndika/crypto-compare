const axios = require("axios");
const currenyLayerKey = '';
class Adapter{
    getGeminiTicker(currencyPair,cb){
		axios.get(`https://api.gemini.com/v1/pubticker/${currencyPair}`).then(result=>{
			if(result.data!=null){
				cb(null,{
					bid:result.data.bid,
                    ask:result.data.ask,
                    mid:((Number(result.data.ask)+Number(result.data.bid))/2).toFixed(2)
				});
			}else{
				cb(null,result.data)
			}
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
			cb(null,{
				buy:result.data.ticker.buy,
				sell:result.data.ticker.sell,
                mid:((Number(result.data.ticker.buy)+Number(result.data.ticker.sell))/2).toFixed(2)
			})
		}).catch(err=>{
			if(err.response && err.response.data){
				cb(err.response.data,null);
			}else{
				cb(err,null);
			}
		});
	}

	getQuoineTicker(currencyPair,cb){
		let productsId = {
			BTCUSD:1,
			ETHUSD:27
		};
		let productId =productsId[currencyPair];
		axios.get(`https://api.quoine.com/products/${productId}`).then(result=>{
			cb(null,{
				ask:result.data.market_ask.toFixed(2),
				bid:result.data.market_bid.toFixed(2),
                mid:((Number(result.data.market_ask)+Number(result.data.market_bid))/2).toFixed(2)
			})
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
			if(result.data.success==false){
				cb(result.data.error,null)
			}else{	
				cb(null,result.data.quotes)
			}
		}).catch(err=>{
			if(err.response && err.response.data){
				cb(err.response.data,null);
			}else{
				cb(err,null);
			}
		});
	}
}


module.exports = new Adapter();