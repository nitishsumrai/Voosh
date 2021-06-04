const express = require("express");
const redis = require("redis");
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
var Promise = require("bluebird");

const app = express();

app.use(bodyParser.json({ strict: false, limit: '50mb' }));

const results = [];

const client = redis.createClient({
   host: 'redis-server',
   port:6379
});

Promise.promisifyAll(redis.RedisClient.prototype);

async function fillRedisDb (){
  fs.createReadStream('NSEBhav.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end',async () => {
    console.log(results.length);
    const res =  await client.flushdbAsync();
    console.log("flush",res);
  asyncHelper(results);
  });
}


app.get('/search',async (req,res) => {
  let value =  await client.getAsync(req.body.symbol)
  return res.status(200).send({'value':JSON.parse(value)});
});

app.get('/',async (req,res) => {
 let list = [];
  client.keys('*',async function (err, keys) {
    if (err) return console.log(err);
    if(keys){
        for(var i=0;i<keys.length;i++){
          let item =  await client.getAsync(keys[i]);
          item = JSON.parse(item);
          console.log(item.list[0]);
          list = list.concat(item.list);
        }
        console.log(list.length);
        return res.status(200).send({list});
      }
});
})

app.listen(8081,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Listening on port 8081");
     fillRedisDb();
})

const asyncHelper = async  (results)=>{

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
    console.log({
      isExists,
      key
    });
    if(isExists){
      console.log(isExists);
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