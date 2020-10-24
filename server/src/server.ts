import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Listagem de usuários');

  // enviando string
  // response.send("Hello World");

  // JSON, geralmente array ou objeto
  response.json([
    'Diego',
    'Hugo',
    'Junior',
    'Tiago'
  ]);
}); 

app.listen(314);