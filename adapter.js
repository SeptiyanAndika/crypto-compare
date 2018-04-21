const axios = require("axios");
const currenyLayerKey = '';
const _ = require('lodash');
class Adapter {
    getGeminiTicker(currencyPair, cb) {
        axios.get(`https://api.gemini.com/v1/pubticker/${currencyPair}`).then(result => {
            if (result.data != null) {
                cb(null, {
                    bid: result.data.bid,
                    ask: result.data.ask,
                    mid: ((Number(result.data.ask) + Number(result.data.bid)) / 2).toFixed(2)
                });
            } else {
                cb(null, result.data)
            }
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }

    getBitcoinIdTicker(currencyPair, cb) {
        axios.get(`https://vip.bitcoin.co.id/api/${currencyPair}/ticker`).then(result => {
            cb(null, {
                bid: result.data.ticker.buy,
                ask: result.data.ticker.sell,
                mid: ((Number(result.data.ticker.buy) + Number(result.data.ticker.sell)) / 2).toFixed(2)
            })
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }

    getTokoTicker(currencyPair, cb) {
        axios.get(`https://service.tokocrypto.com/client/rates/ticker?currencyPair=${currencyPair}`).then(result => {
            cb(null, {
                bid: result.data.data.Open,
                ask: result.data.data.Open,
                mid: result.data.data.Open,
            })
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }

    getLunoTicker(currencyPair, cb) {
        axios.get(`https://www.luno.com/ajax/1/price_chart?currency=${currencyPair}`).then(result => {
            let price = _.filter(result.data.availablePairs,{counterCode:'IDR'})
            price=price[0];
            cb(null, {
                bid: Number(price.price),
                ask: Number(price.price),
                mid: Number(price.price),
            })
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }

    getQuoineTicker(currencyPair, cb) {
        let productsId = {
            BTCUSD: 1,
            ETHUSD: 27,
            BTCSGD: 7,
            ETHSGD: 30
        };
        let productId = productsId[currencyPair];
        axios.get(`https://api.quoine.com/products/${productId}`).then(result => {
            cb(null, {
                ask: result.data.market_ask.toFixed(2),
                bid: result.data.market_bid.toFixed(2),
                mid: ((Number(result.data.market_ask) + Number(result.data.market_bid)) / 2).toFixed(2)
            })
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }

    getCurrencyLayerPrice(source, currencies, cb) {
        axios.get(`http://apilayer.net/api/live?access_key=${currenyLayerKey}&source=${source}&currencies=${currencies}`).then(result => {
            if (result.data.success == false) {
                cb(result.data.error, null)
            } else {
                cb(null, result.data.quotes)
            }
        }).catch(err => {
            if (err.response && err.response.data) {
                cb(err.response.data, null);
            } else {
                cb(err, null);
            }
        });
    }
}


module.exports = new Adapter();