const express = require("express");
const client = require("./config/redis");
const csv = require('csv-parser');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const asyncHelper = require('./helpers/asyncHelper')

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false, limit: '50mb' }));

const results = [];

async function fillRedisDb (){
  fs.createReadStream('NSEBhav.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end',async () => {
    // flush the db before adding anything
    await client.flushdbAsync();
    asyncHelper(results);
  });
}

// to send list of rows with same symbol
app.get('/search',async (req,res) => {
  let value =  await client.getAsync(req.body.symbol)
  return res.status(200).send({'value':JSON.parse(value)});
});

// to send list of all rows
app.get('/',async (req,res) => {
 let list = [];
  client.keys('*',async function (err, keys) {
    if (err) return console.log(err);
    if(keys){
        for(var i=0;i<keys.length;i++){
          let item =  await client.getAsync(keys[i]);
          item = JSON.parse(item);
          list = list.concat(item.list);
        }
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
    // once the server is start fill the DB
    fillRedisDb();
})
