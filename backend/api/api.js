import Router from 'koa-router';
import KoaBody from 'koa-body';

const https = require('https');
const router = new Router({
    prefix: '/'
});

router
    .get('/', (ctx, next) => {
        ctx.body = {
            "message": "welcome to the api"
        }
    })
    .post('/breaches', KoaBody(), async () => {
        https.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email} hibp-api-key: 11a561d02d894b5ba7239d6d1500e73a`, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              console.log(JSON.parse(data).explanation);
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
    });

export default router;