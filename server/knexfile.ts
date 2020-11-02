import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    // buscando o arquivo connection.ts partindo da patch atual.
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    // localizando o path para os arquivos migrations
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true,
};

//O nome da pasta precisa ser igual à chave que o retorna. p.ex migrations: ... 'migrations')