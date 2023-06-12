const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const {
  login,
  createUser,
} = require('./controllers/users');
const {
  loginValidation,
  createUserValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors }= require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://akum777.nomoredomains.rocks',
  'localhost:3000'
];
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', cors, createUserValidation, createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});
app.listen(PORT, () => {
  console.log('START APP MY TEST!');
});
