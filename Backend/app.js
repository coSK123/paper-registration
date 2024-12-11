const express = require('express');
const cors = require('cors');
const port = 3000
const app = express();
const verifyJWT = require('./middleware/verifyJWT.ts')
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4100'],  // or use '*' to allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(cookieParser());

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use(verifyJWT);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})