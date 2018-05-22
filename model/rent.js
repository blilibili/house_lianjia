//select.js
const express = require('express');
const sql = require('../config/sql')
const app = express()
let router = express.Router();
const connection = require('../config/config');//导入mysq配置文件
let httpGetHouse = require('../config/requestHouse');
let globalConfig = require('../config/global');
//创建一个connection连接
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!'); //如果连接成功 控制台输出 success 了
});


app.get('/', function(req, res) {
    let count = 0;
    function getRentDataCurrent(){
        console.log('请稍等当前第' + (count+1) + ' 页 \n');
        if(count == globalConfig.page){
            res.send({'code':1 , msg:'数据更新完成'});
            return false;
        }else{
            httpGetHouse.getLentData(httpGetHouse.rentUrl + '/pg' + count + 1).then((result) => {
                result.forEach((v , k) => {
                    let temp = [v.unique];
                    connection.query(sql.queryLentHouseByUnique , temp , function(err, rows, fields){
                        if (err) {
                            console.log('[query] - :' + err);
                            return;
                        }

                        //有相同的数据 略过
                        if(!rows.length == 1){
                            let tmp = [v.info , v.address , v.price , v.area , v.thumb , v.timestamp , v.unique];
                            connection.query(sql.addRentHouse, tmp,  function(err, rows, fields) {
                                if (err) {
                                    console.log('[query] - :' + err);
                                    return;
                                }

                            });
                        }
                    });
                });
                count++;
                getRentDataCurrent();
            })
        }
    }
    getRentDataCurrent();
})


module.exports = app