import fs from "fs";
import http from "http";
import url from "url";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import templatesTags from './modules/templatesTags.js';


const host = "localhost";
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const baseTemplate = fs.readFileSync(`${__dirname}/templates/pizzas.html`, "utf-8");
const pizzaCard = fs.readFileSync(`${__dirname}/templates/pizza-card.html`, "utf-8");
const pizzaDetail = fs.readFileSync(`${__dirname}/templates/pizza-detail.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);



const server = http.createServer((req,res)=>{
    console.log(req.url);
    const {query, pathname} =url.parse(req.url, true);

    if ((pathname === "/") || (pathname === '/pizzas')){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHTML = dataObj.map(el => templatesTags(pizzaCard, el)).join('');
        const output = baseTemplate.replace('{% pizzaCards %}', cardsHTML)
        res.end(output);

    } else if (pathname === "/pizza") {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id]
        const output = templatesTags(pizzaDetail, product)
        res.end(output);
    } else {
        res.writeHead(404, {
            'Content':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page cannot be found</h1>')
    }
});

server.listen(port, host, ()=>{
    console.log(`Server started at http://${host}:${port}`)
})