const express = require('express');
const cors = require('cors');
const app = express();    
app.use(cors());     
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
     //host     : 'localhost',       port     : 3306,       user     : 'root',       
    //password : 'Senaisp@2021',       database : 'senai115'     });
    host     : 'mysql743.umbler.com',       port     : 41890,       user     : 'herbert',       
    password : 'Senai115',       database : 'senaidb'     });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });   }

router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM clientes', res); })

router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE id=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes' + filter, res); })

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM clientes WHERE id=' + parseInt(req.params.id), res);
    
  })

router.post('/clientes', (req, res) =>{
  const nome = req.body.nome.substring(0,150);
  const cpf = req.body.cpf.substring(0,11);
  execSQLQuery(`INSERT INTO clientes(nome, cpf) VALUES('${nome}','${cpf}')`, res);
  });

router.patch('/clientes/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0,150);
  const cpf = req.body.cpf.substring(0,11);
  execSQLQuery(`UPDATE clientes SET nome='${nome}', cpf='${cpf}' WHERE id=${id}`, res);
})




