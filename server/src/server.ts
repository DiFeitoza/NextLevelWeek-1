import express, { response } from 'express';

const app = express();

app.use(express.json());
/* '.use' serve como se fosse para adicionar um plugin ao app
.json é function, se não abrir '()' trava o código */

/* 
Rota: Endereço completo da requisção
Recurso: Quanl entidade do sistema estamos acessando

GET: Buscar uma ou mais informações do back-end
POST: Criar uma nova informação no back-end
PUT: Atualizar uma informação existente no back-end
DELETE: Remover uma informação do beck-end

Request Param: Parâmetros que vêm na própria rota que identificam um recurso
Query Param: Parâmetros que vêm na própria rota. Geralmente opcionais para filtros, paginação
Request Body: PArâmetros para criação/atualização de informações

SELECT * FROM users WHERE name = 'Diego'
knex('users').where('name', 'Diego').select('*')
*/

const users = [
  {
    name : 'Diego'
  },
  {
    name: 'Tiago'
  },
  {
    name: 'Junior'
  },
  {
    name: 'Hugo'
  }
]

/* app.get('/html', (request, response) => {
  console.log("enviando string como html");
  return response.send("<!DOCTYPE HTML><head></head><body><h1><div style = 'color:#00f; text-align: center'>Olá Rianny</div></h1><div><img style = 'width: 1000px; display: block; margin-left: auto; margin-right: auto;' src='https://i.pinimg.com/originals/e5/7e/87/e57e871c830c9ec1e1ae51c07a9f7c56.jpg'></div></body>");
}); */

app.get('/users', (request, response) => {
  console.log('List users');
  // query permite que eu receba um par 'chave':'valor' na mesma rota, sem ser por parametro de recurso
  const valueSearch = request.query.search;

  const filteredUsers = valueSearch ?
    users.filter(
      user => user.name.includes(String(valueSearch))
    ) : users;

  return response.json({
    filteredUsers
  })
});

app.get('/users/:id', (request, response) => {
  // preciso colocar ':' antes do recurso para poder acessá-lo com o método request.params
  // será retornado como strig
  console.log('Acess user by id');
  
  return response.json(
    users[Number(request.params.id)]
  )
});

app.post('/users', (request, response) => {
  console.log("Add user");

  const data = request.body;
  console.log(data);

  const newUser = {
    name : data.name,
    email : data.email
  };

  return response.json(newUser);
});

app.listen(314);