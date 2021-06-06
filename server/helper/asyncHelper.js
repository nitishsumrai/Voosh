const client = require("../config/redis");

// row with same symbol is going to be pushed in a single array then
// that array will be added as a value and symbol as a key in db together

module.exports = async  (results)=>{

    for(var i = 0;i<results.length;i++){
      let item = results[i];
      let key = item.SYMBOL;
      let value = { ...item }
      delete value.TOTALTRADES;
      delete value.TIMESTAMP;
      delete value.TOTTRDVAL;
      delete value.TOTTRDQTY;
      delete value.PREVCLOSE;
      delete value.LAST;
      delete value[""];
      let isExists = await client.getAsync(key);

      if(isExists){
        isExists = JSON.parse(isExists);
        isExists.list.push(value);
       await client.setAsync(key,JSON.stringify(isExists));

      }else{
        var obj = {
          list:[value]
        }
       await client.setAsync(key,JSON.stringify(obj));
      }
    }
   }