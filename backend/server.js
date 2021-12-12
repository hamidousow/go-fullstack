const http = require('http'); //importer le package http de node 

// const server = http.createServer((req, res) => {
//     res.end('voila la reponse du serveur');
// }); 

const app = require('./app');

app.set('port', process.env.PORT || 3000 );
const server = http.createServer(app)

server.listen(process.env.PORT || 3000); // process.env.PORT > variable environnement 