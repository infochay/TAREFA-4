const express = require('express')
const app = express()
app.use(express.json())

// Usuário pré-definido
const username = 'admin';
const password = 'senha123';
app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    // Verifica se o nome de usuário e a senha estão corretos
    if (user === username && pass === password) {
        return res.json({ message: 'Login bem-sucedido', token: 'seu-token-simples' });
    } else {
        return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
});
//

app.get('/tasks', (req, res) => {
    const token = req.headers['authorization'];
    // Verifica se o token existe e é válido
    if (token === 'seu-token-simples') {
        return res.json({ tasks: ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'] });
    } else {
        return res.status(403).json({ message: 'Acesso proibido. Token inválido.' });
    }
});

//

let tarefas = [
    {id: 1, titulo: "Estudar REST", concluida: false},
    {id: 2, titulo: "Praticar Node.js", concluida: false}
]

app.get('/tarefas', (req, res) => {res.json(tarefas)})
app.post('/tarefas', (req,res) => {
    const novaTarefa = req.body
    novaTarefa.id = tarefas.length + 1
    tarefas.push(novaTarefa)
    res.status(201).json(novaTarefa)
})

app.get('/', (req, res) => {
    res.send('API de Tarefas funcionando! Use /tarefas para ver as tarefas.');
});

app.put('/tarefas/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) return res.status(404).json({erro: "Tarefa não encontrada"})
    Object.assign(tarefa, req.body)
    res.json(tarefa)
})

app.delete('/tarefas/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    const index = tarefas.findIndex(t => t.id ===id)
    if (index === -1) return res.status(404).json({erro: "Tarefa não encontrada"})
    tarefas.splice(index, 1)
    res.json({mensagem: "Tarefa deletada com sucesso"})
})
app.listen(3000, () => {console.log('Servidor rolando em http://localhost:3000')})
