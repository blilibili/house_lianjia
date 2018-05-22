module.exports = {
    addSql:'insert into houses_info(info , unque , timestamp) values(? , ? , ?)',
    queryHouseByUnqueue:'select unque from houses_info where unque = ?',
    queryLentHouseByUnique:'select unique_house from houses_rent where unique_house = ?',
    addRentHouse:'insert into houses_rent(info , address , price , area , thumb , timestamp , unique_house) values(? , ? , ? , ? , ? , ? , ?)'
}