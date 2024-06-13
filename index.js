import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let lista = [];
let listaP = [];

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
        resp.redirect('/#');
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
                <form method="POST" action='/cadastrarProduto' class=" border row g-2">
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
        resp.redirect('/#');
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
                <form method="POST" action='/cadastrarProduto' class=" border row g-2">
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

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});