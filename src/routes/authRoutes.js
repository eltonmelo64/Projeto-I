// src/routes/authRoutes.js
const express = require('express');
const fs = require('fs');
const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo</title>
            <link rel="icon" href="/icone.ico"/>
            <link rel="stylesheet" href="/styles2.css">
        </head>
        <body>
            <div class="page">
    
                    <img src="/home.png" alt="início" class="header-image">
                    <h1>Bem-vindo!</h1>
                
                    <a href="/auth/login">Clique aqui para fazer login</a>
                </p>
                <p>
                    <a href="/auth/singUp">Clique aqui para registrar-se</a>
                </p>

            </div>
            <footer class="footer">
                <div class="footer-content">
                  <p>&copy; 2024 Uhuuu!!!. Todos os direitos reservados.</p>
                   </nav>
                </div>
            </footer>
        </body>
        </html>
    `);
});

// Rota para página de login
router.get('/auth/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="icon" href="/icone.ico"/>
            <link rel="stylesheet" href="/loginE.css">
        </head>
        <body>
            <div class="page">

                <div class="header">
                    <img src="/home.png" alt="início" class="header-image">
                    <p><a href="/" class="home-link">Página inicial</a></p>
                </div>

                <form method="POST" class="formLogin">
                    <h1>Login</h1>
                    <p>Digite os seus dados de acesso no campo abaixo.</p>
                    <label for="email">E-mail</label>
                    <input type="email" placeholder="Digite seu e-mail" autofocus="true" id="email" name="email" />
                    <label for="senha">Senha</label>
                    <input type="password" placeholder="Digite sua senha" id="senha" name="senha"/>
                    <a href="/">Esqueci minha senha</a>
                    <p id="QAccount">Não possui conta? <a href="/auth/singUp">Registrar-se</a></p>
                    <input type="submit" value="Acessar" class="btn" />
                </form>
            </div>
        </body>
        </html>
    `);
});

// Rota para página de registro
router.get('/auth/singUp', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registrar-se</title>
            <link rel="icon" href="/icone.ico"/>
            <link rel="stylesheet" href="/loginE.css">

            <script>
                document.getElementById('registrationForm').addEventListener('submit', function(event) {
                    event.preventDefault(); // Impede o envio do formulário

                    const nome = document.getElementById('NeS').value;
                    const contato = document.getElementById('contact').value;
                    const email = document.getElementById('email').value;
                    const senha = document.getElementById('senha').value;
                    const dataNascimento = document.getElementById('dob').value;
                    const genero = document.getElementById('genero').value;

                    // Verifica a idade
                    const dob = new Date(dataNascimento);
                    const today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    const m = today.getMonth() - dob.getMonth();

                    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                        age--;
                    }

                    if (age < 18) {
                        alert('Você deve ter pelo menos 18 anos para se cadastrar.');
                        return; // Impede o envio do formulário
                    }
                    
                    // Armazenar os dados no localStorage
                    const usuario = { nome, contato, email, senha, dataNascimento, genero };
                    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                    usuarios.push(usuario);
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));

                    alert('Usuário registrado com sucesso!');
                    this.reset(); // Limpa o formulário
                });
            </script>

        </head>
        <body>
            <div class="page">
                
                <div class="header">
                    <img src="/home.png" alt="início" class="header-image">
                    <p><a href="/" class="home-link">Página inicial</a></p>
                </div>
           
                <form method="POST" class="formLogin">
                    <h1>Registrar-se</h1>
                    <p>Digite os seus dados de cadastro no campo abaixo.</p>
                    <label for="NeS">Nome e Sobrenome</label>
                    <input type="text" placeholder="Digite seu nome e sobrenome" autofocus="true" id="NeS" name="nomeesobre">

                    <label for="contact">Contato</label>
                    <input type="text" placeholder="Digite seu número" id="contact" name="contato">

                    <label for="email">E-mail</label>
                    <input type="email" placeholder="Digite seu e-mail" id="email" name="email" />

                    <label for="senha">Senha</label>
                    <input type="password" placeholder="Digite sua senha" id="senha" name="senha"/>

                    <label for="confirm-senha">Confirme sua Senha</label>
                    <input type="password" placeholder="Confirmar senha" id="confirm-senha" name="confirm-senha">

                    <label for="dob">Data de Nascimento</label>
                    <input type="date" id="dob" name="data_nascimento" required>

                    <label for="genero">Gênero</label>
                    <select id="genero" name="genero">
                        <option value="" disabled selected>Escolha seu gênero</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outros">Outros</option>
                    </select>

                    <p id="QAccount">Já possui conta? <a href="/auth/login">Login</a></p>
                    <input type="submit" value="Registrar" class="btn" />
                </form>
            </div>
        </body>
        </html>
    `);
});


// Rota para registro de usuário
router.post('/auth/singUp', (req, res) => {
    const { nomeesobre, contato, email, senha, data_nascimento, genero } = req.body;

    // Verifica a idade
    const dob = new Date(data_nascimento);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18) {
        return res.status(400).send('<div class="message error">Você deve ter pelo menos 18 anos para se cadastrar.</div>');


        
    }

    // Lê os usuários existentes
    let usuarios = [];
    if (fs.existsSync('usuarios.json')) {
        usuarios = JSON.parse(fs.readFileSync('usuarios.json'));
    }

    // Adiciona o novo usuário
    usuarios.push({ nomeesobre, contato, email, senha, data_nascimento, genero });
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));

    res.send('<div class="message success">Usuário registrado com sucesso!</div>');
});


// Rota para listar usuários
router.get('/auth/users', (req, res) => {
    let usuarios = [];
    if (fs.existsSync('usuarios.json')) {
        usuarios = JSON.parse(fs.readFileSync('usuarios.json'));
    }
    const listaUsuarios = usuarios.map(usuario => `<div class="usuario">Nome: ${usuario.nomeesobre} - Contato: ${usuario.contato} - Email: ${usuario.email} - Senha: ${usuario.senha} - Nascimento: ${usuario.data_nascimento} - Gênero: ${usuario.genero}</div>`).join('');
    
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Usuários</title>
            <link rel="icon" href="/icone.ico"/>
            <link rel="stylesheet" href="/cadastrados.css">
        </head>
        <body>
            <div class="page">
                <img src="/home.png" alt="início" class="header-image">
                <h1>Lista de Usuários</h1>
                <div class="lista-usuarios">
                    ${listaUsuarios}
                    
                </div>
                <a href="/auth/singUp">Registrar novo usuário</a>
                <p>
                <a href="/auth/login">Voltar ao login</a>
                </p>
            </div>
        </body>
        </html>
    `);
});



module.exports = router;


