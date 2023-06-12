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

app.use(function (req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых 
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

    // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const requestHeaders = req.headers['access-control-request-headers'];
    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию) 
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      // разрешаем кросс-доменные запросы с этими заголовками
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }

  }
  next();
});
app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

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
