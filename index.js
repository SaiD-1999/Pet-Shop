import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let lista = [];
let listaP = [];
let listaAdc = [];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'A15bcf25',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 15
    }
}));
app.use(cookieParser());

function usuarioEstaAutenticado(requisicao, resposta, next){
    if (requisicao.session.usuarioAutenticado){
        next();
    }
    else{
        resposta.redirect('/login.html');
    }
}

app.post('/cadastrarInteressados', usuarioEstaAutenticado, cadastrarInteressados);

function cadastrarInteressados(requisicao, resp){
    const nome = requisicao.body.nome;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    if(nome && email && telefone){
        lista.push({
            nome: nome,
            email: email,
            telefone: telefone
        });
        resp.redirect('/listaInteressados');
    }
    else{
        resp.write(`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
        
        <body>
            <h1 class="text-center mt-3">Cadastro De Interessados</h1><br><br>
            <div class="container mb-5">
                <form method="POST" action='/cadastrarInteressados' class=" border row g-2">
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome:</label><br>
                        <input type="text" class="form-control" id="nome" name="nome" value="${nome}">`);
        if(nome == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe o nome!
        </div>`);
        }
        resp.write(`</div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail:</label><br>
            <input type="text" class="form-control" id="email" name="email" value="${email}">`);
        if(email == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe o E-mail!
        </div>`);
        } 
        resp.write(`</div>
        <div class="mb-3">
            <label for="telefone" class="form-label">Telefone:</label><br>
            <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}">`);
        if(telefone == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe o telefone!
        </div>`);
        }
        resp.write(`</div>
                <div class="text-center">
                <div class="col-12 mb-3 mt-3">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
                </div>  
            </form>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

        </html>`);
        resp.end();                       
    }
}

app.post('/cadastrarPets', usuarioEstaAutenticado, cadastrarPets);

function cadastrarPets(requisicao, resp){
    const nomePet = requisicao.body.nomePet;
    const raca = requisicao.body.raca;
    const idade = requisicao.body.idade;

    if(nomePet && raca && idade){
        listaP.push({
            nomePet: nomePet,
            raca: raca,
            idade: idade
        });
        resp.redirect('/listaPets');
    }
    else{
        resp.write(`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
        
        <body>
            <h1 class="text-center mt-3">Cadastro De Pets</h1><br><br>
            <div class="container mb-5">
                <form method="POST" action='/cadastrarPets' class=" border row g-2">
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome:</label><br>
                        <input type="text" class="form-control" id="nome" name="nomePet" value="${nomePet}">`);
        if(nomePet == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe o nome!
        </div>`);
        }
        resp.write(`</div>
        <div class="mb-3">
            <label for="raca" class="form-label">Raça:</label><br>
            <input type="text" class="form-control" id="raca" name="raca" value="${raca}">`);
        if(raca == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe a raça!
        </div>`);
        } 
        resp.write(`</div>
        <div class="mb-3">
            <label for="idade" class="form-label">Idade em anos:</label><br>
            <input type="text" class="form-control" id="idade" name="idade">`);
        if(idade == ""){
            resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe a Idade!
        </div>`);
        } 
        resp.write(`</div>
                <div class="text-center">
                <div class="col-12 mb-3 mt-3">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                    <a class="btn btn-secondary" href="/">Voltar</a>
                </div>
                </div>  
            </form>
        </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

        </html>`);
        resp.end();                      
    }
}

function autenticarUsuario(requisicao, resposta){
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario == 'admin' && senha == '123'){
        requisicao.session.usuarioAutenticado = true;
        resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(),{
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        resposta.redirect('/');
    }
    else{
        resposta.write('<!DOCTYPE html>');
        resposta.write('<html lang="pt-br">');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Erro ao logar</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<p>Usuario ou senha invalidos!</p>');
        resposta.write('<script type="text/javascript">   function Redirect() { window.location="/login.html"; }  setTimeout(\'Redirect()\', 5000);</script>');
        resposta.write(`<script type="text/javascript"> document.write("Voce vai ser redirecionado pra tela de login");</script>`);
        if (requisicao.cookies.dataUltimoAcesso){
            resposta.write('<p>');
            resposta.write('Seu último acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
            resposta.write('</p>');
        }
        resposta.write('</body>');
        resposta.write('</html>');
        resposta.end();
    }
}

app.post('/login', autenticarUsuario);

app.get('/login', (req,resp)=>{
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
});

app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(usuarioEstaAutenticado,express.static(path.join(process.cwd(), 'protegido')));

app.get('/listaInteressados', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar Interessados</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Lista de Interessados</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Nome</th>');
    resp.write('<th class="text-center">E-mail</th>');
    resp.write('<th class="text-center">Telefone</th>');
    resp.write('</tr>');
    for(let i=0; i<lista.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${lista[i].nome}</td>`);
        resp.write(`<td>${lista[i].email}</td>`);
        resp.write(`<td>${lista[i].telefone}</td>`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Inicio</a><br><br>');
    resp.write('<a href="/cadastro-Interessados.html">Cadastrar Interessado</a>');
    resp.write('</div>');
    if (req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.get('/listaPets', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar Pets</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Lista de Pets</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Nome</th>');
    resp.write('<th class="text-center">Raça</th>');
    resp.write('<th class="text-center">Idade em anos</th>');
    resp.write('</tr>');
    for(let i=0; i<listaP.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaP[i].nomePet}</td>`);
        resp.write(`<td>${listaP[i].raca}</td>`);
        resp.write(`<td>${listaP[i].idade}</td>`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Inicio</a><br><br>');
    resp.write('<a href="/cadastro-Pets.html">Cadastrar Pets</a>');
    resp.write('</div>');
    if (req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.get('/adotar', (req,resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Cadastrar desejo</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write(`<form method="POST" action="/gravar" class=" border row g-2">`);
    resp.write('<div>');
    resp.write('<label for="Interessados" class="form-label">Interessados</label><br>');
    resp.write('<select class="form-select" id="interessadoNome" name="interessadoNome">');
    resp.write('<option selected disabled>Opções</option>');
    for(let i = 0; i<lista.length; i++){
        resp.write(`<option>${lista[i].nome}</option>`);
    }
    resp.write('</select>');
    resp.write('</div>');
    resp.write('<div>');
    resp.write('<label for="Pets" class="form-label">Pets</label><br>');
    resp.write('<select class="form-select" id="petnome" name="petnome">');
    resp.write('<option selected disabled>Opções</option>');
    for(let i = 0; i<listaP.length; i++){
        resp.write(`<option>${listaP[i].nomePet}</option>`);
    }
    resp.write('</select>');
    resp.write('</div>');
    resp.write(`<div class="text-center">
            <div class="col-12 mb-3 mt-3">
                <button type="submit" class="btn btn-primary">Adotar</button><br><br>
                <a href="/listarAdc">Lista Adoção</a>
              </div>
            </div>`);
    resp.write('</form>');
    resp.write('</div>');
    if (req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write(`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>`); 
    resp.write('</html>'); 
    resp.end();       
});

app.post('/gravar', usuarioEstaAutenticado, gravar);

function gravar(requisicao,resp){
    const data = new Date();
    const dataF = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    const interessadoNome = requisicao.body.interessadoNome;
    const petnome = requisicao.body.petnome;

    if(interessadoNome && petnome){
        listaAdc.push({
            interessadoNome: interessadoNome,
            petnome: petnome,
            dataF: dataF
        });
        resp.redirect('/listarAdc');
    }
    else{
        resp.write('<!DOCTYPE html>');
        resp.write('<html>');
        resp.write('<head>');
        resp.write('<meta charset="utf-8">');
        resp.write('<title>Listar</title>');
        resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
        resp.write('</head>');
        resp.write('<body>');
        resp.write("<h1 class='text-center mt-3'>Cadastrar desejo</h1>");
        resp.write('<br>');
        resp.write('<br>');
        resp.write('<div class="container">');
        resp.write(`<form method="POST" action="/gravar" class=" border row g-2">`);
        resp.write('<div>');
        resp.write('<label for="Interessados" class="form-label">Interessados</label><br>');
        resp.write('<select class="form-select" id="interessadoNome" name="interessadoNome">');
        resp.write('<option selected disabled>Opções</option>');
        for(let i = 0; i<lista.length; i++){
            resp.write(`<option>${lista[i].nome}</option>`);
        }
        resp.write('</select>');
        resp.write('</div>');
        resp.write('<div>');
        resp.write('<label for="Pets" class="form-label">Pets</label><br>');
        resp.write('<select class="form-select" id="petnome" name="petnome">');
        resp.write('<option selected disabled>Opções</option>');
        for(let i = 0; i<listaP.length; i++){
            resp.write(`<option>${listaP[i].nomePet}</option>`);
        }
        resp.write(`<div m-2 class="alert alert-danger" role="alert">
            Por favor, informe o nome!
        </div>`);
        resp.write('</select>');
        resp.write('</div>');
        resp.write(`<div class="text-center">
                <div class="col-12 mb-3 mt-3">
                    <button type="submit" class="btn btn-primary">Adotar</button><br><br>
                    <a href="/listarAdc">Lista Adoção</a>
                </div>
                </div>`);
        resp.write('</form>');
        resp.write('</div>');
        if (requisicao.cookies.dataUltimoAcesso){
            resp.write('<p>');
            resp.write('Seu último acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
            resp.write('</p>');
        }
        resp.write('</body>');
        resp.write(`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"></script>`); 
        resp.write('</html>'); 
        resp.end();
    }
} 

app.use ('/listarAdc', usuarioEstaAutenticado, (requisicao, resp)=>{
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="utf-8">');
    resp.write('<title>Listar</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write("<h1 class='text-center mt-3'>Lista de Adoção</h1>");
    resp.write('<br>');
    resp.write('<br>');
    resp.write('<div class="container">');
    resp.write('<table class="table table-dark table-striped-columns">');
    resp.write('<tr>');
    resp.write('<th class="text-center">Nome do interessado</th>');
    resp.write('<th class="text-center">Pet</th>');
    resp.write('<th class="text-center">Data</th>');
    resp.write('</tr>');
    for(let i=0; i<listaAdc.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaAdc[i].interessadoNome}</td>`);
        resp.write(`<td>${listaAdc[i].petnome}</td>`);
        resp.write(`<td>${listaAdc[i].dataF}</td>`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a href="/">Inicio</a><br><br>');
    resp.write('<a href="/cadastro-Pets.html">Cadastrar Pets</a>');
    resp.write('</div>');
    if (requisicao.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});