let express = require('express');
let app = express();
let router = express.Router();


app.use('/sell' , require('./model/house'))
app.use('/rent' , require('./model/rent'))
app.use(router);
app.listen(3001);