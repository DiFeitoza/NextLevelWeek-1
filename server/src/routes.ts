import express, { Router } from 'express';

const routes = express.Router();

const users = [
  {
    id: '0',
    name: 'diego'
  },
  {
    id: '1',
    name: 'tiago'
  },
  {
    id: '2',
    name : 'junior'
  }
];

routes.get('/html', (request, response) => {
  console.log("enviando string como html");
  return response.send("<!DOCTYPE HTML><head></head><body><h1><div style = 'color:#00f; text-align: center'>Olá Rianny</div></h1><div><img style = 'width: 1000px; display: block; margin-left: auto; margin-right: auto;' src='https://i.pinimg.com/originals/e5/7e/87/e57e871c830c9ec1e1ae51c07a9f7c56.jpg'></div></body>");
});

/* routes.get('/users', (request, response) => {
  console.log('List users');
  // query permite que eu receba um par 'chave':'valor' na mesma rota, sem ser por parâmetro de recurso
  const valueSearch = request.query.search;

  const filteredUsers = valueSearch ?
    users.filter(
      user => user.name.includes(String(valueSearch))
    ) : users;

  return response.json({
    filteredUsers
  })
}); */

routes.get('/users', (request, response) => {
  console.log('GET /users');
  return response.json(users);
});

routes.get('/users/:id', (request, response) => {
  // preciso colocar ':' antes do recurso para poder acessá-lo com o método request.params
  console.log('GET /users/' + request.params.id);
  return response.json(users[Number(request.params.id)])
});

routes.post('/users', (request, response) => {
  console.log('POST /users' + request.body);
  return response.json(users.push(request.body) ? users : "fail");
});

routes.put('/users/:id',  (request, response) => {
  let id = request.params.id;
  let data = request.body;
  console.log('PUT /user/' + id + ' dados: ' + data);

  let idxUser = users.findIndex(
      (user) => { return user.id === id }
  );
 
  return response.json(
    idxUser != -1 ? users[idxUser].name = data.name : 'not find'
  );
});

routes.delete('/users/:id', (request, response) => {
  console.log('DELETE /users/' + request.params.id);

  let indDel = users.findIndex(
    (user) => { return user.id === request.params.id }
  );

  return response.json(users.splice(indDel, 1));
});

export default routes;