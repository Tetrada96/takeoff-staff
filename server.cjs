const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


// аутентификация пользователя
server.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = router.db
    .get('users')
    .find({ login, password })
    .value();
  console.log(user)
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ message: 'Неверный логин и/или пароль' });
  }
});

const getContacts = () => {
  const contacts = router.db
  .get('contacts')
  .value();
  return contacts
  
}

// получить список контактов
server.get('/contacts', (req, res) => {
  res.status(200).json({contacts: getContacts()});
});

// добавить новый контакт
server.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  const id = Date.now().toString();
  router.db.get('contacts').push({ id, name, phone, email }).write();
  res.status(201).json({contacts: getContacts()});
});

// удалить контакт
server.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  router.db.get('contacts').remove({ id }).write();
  res.status(200).json({contacts: getContacts()});
});

// обновить контакт
server.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  router.db
    .get('contacts')
    .find({ id })
    .assign({ name, phone, email })
    .write();
  res.status(200).json({contacts: getContacts()});
});

// поиск контакта по имени,, номеру телефона и email
server.post('/contacts/search', (req, res) => {
  const data = req.body;
  console.log(data)
  const results = router.db
    .get('contacts')
    .filter((contact) => {
      return (
        contact.name?.toLowerCase().includes(data?.name.toLowerCase()) &&
        contact.email?.toLowerCase().includes(data?.email.toLowerCase()) &&
        contact.phone?.toLowerCase().includes(data?.phone.toLowerCase())
      );
    })
    .value();

  res.status(200).json({contacts: results});
})

server.use(router);
server.listen(8000, () => {});