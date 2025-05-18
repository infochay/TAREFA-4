# API de Lista de Tarefas com Autenticação Simples

## ROTA DE LOGIN

(JSON)
{
  "user": "admin",
  "pass": "senha123"
}

APARECERÁ:

{
  "message": "Login bem-sucedido",
  "token": "seu-token-simples"
}

### ROTA DE TAREFAS

Enviar esse token no cabeçalho da requisição:
Authorization: seu-token-simples

APARECERÁ:

{
  "tasks": ["Tarefa 1", "Tarefa 2", "Tarefa 3"]
}

OU

{
  "message": "Acesso proibido. Token inválido."
}


