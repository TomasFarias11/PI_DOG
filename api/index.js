//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn , Temperaments} = require('./src/db.js');
const {default: axios} = require("axios");
const YOUR_API_KEY = process.env.YOUR_API_KEY;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
      .then(res => res.data)
      .then(results => {
        let temperaments = []
        results.forEach((e) => {
           temperaments.push(e.temperament && e.temperament)
        })
        let temperamentsDB = temperaments.map(e => e && e.split(', ')).flat();
          temperamentsDB.map(async(e) => {
               await Temperaments.findOrCreate({
                    where: {name: e ? e : 'Temperamento indefinido'}
                })
            })
      })
  });
});
