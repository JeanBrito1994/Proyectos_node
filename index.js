const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
app.use(express.json());


app.get('/',(req, res)=>{
  res.send('Hola mi server en express');
})

app.get('/nuevaRuta',(req, res)=>{
  res.send('Hola soy otro end point');
})


app.listen(port,()=>{
  console.log('Mi port '+ port);
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


