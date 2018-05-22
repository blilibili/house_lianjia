let request = require('request');
let cheerio = require('cheerio');

function getSellData(url){
    let saveData = [];
    return new Promise((resolve => {
        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
            let len = $(".title a").length;
            saveData['unqueKey'] = [];
            saveData['house_info'] = [];
            for(let i = 0;i < len; i++){
                let unqueKey = $(".title a").eq(i).attr('data-housecode');
                saveData[i] = {
                    unqueKey : unqueKey || '10001',
                    house_info:$(".title a").eq(i).text(),
                    timestamp:parseInt(Date.parse( new Date()) / 1000)
                }
            }
            //删除未登录状态
            if(saveData[len - 1]    ['unqueKey'] == '10001'){
                saveData.pop();
            }
            resolve(saveData);
        });
    }))
}

function getLentData(url){
    let saveData = [];
    return new Promise((resolve => {
        request(url, function (error, response, body) {
            let $ = cheerio.load(body);
            let len = $(".house-lst").children('li').length;
            for(let i = 0;i < len; i++){
                saveData[i] = {
                    unique:$(".house-lst").children('li').eq(i).attr('data-id'),
                    houseHref:$(".info-panel h2 a").eq(i).attr('href'),
                    info : $(".info-panel h2 a").eq(i).text(),
                    address:$(".con").eq(i).text(),
                    price:$(".price").eq(i).text(),
                    area:$(".where").eq(i).text(),
                    thumb:$(".pic-panel a img").eq(i).attr('data-img'),
                    timestamp:parseInt(Date.parse( new Date()) / 1000)
                }
            }
            resolve(saveData);
        });
    }))
}

let commonFunc = {
    getSellData:getSellData,
    getLentData:getLentData,
    sellHouseUrl:'https://gz.lianjia.com/ershoufang',
    rentUrl:'https://gz.lianjia.com/zufang'
}

module.exports = commonFunc