//module dependencies
const express = require('express'); //從local取得express
const dotenv = require('dotenv');
const path = require('path');
const app = express();
////connect to mongodb
const connectDB = require('./server/database/connection');
// mongodb connection
connectDB();
//app.use('/js', express.static(path.resolve(__dirname, "public/js")))


const routes = require('./routes'); //等同於"./routes/index.js"，指定路徑返回內容，相當於MVC中的Controller
const http = require('http');

const partials = require('express-partials');

dotenv.config( { path : 'config.env'} )
//app.set('port', process.env.PORT || 3000);
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

app.set('views', path.join(__dirname, 'views'));
//
app.set('view engine', 'ejs');// set view engine
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());//解析client端請求，通常是透過POST發送的內容
app.use(express.cookieParser('123456789'));//記得設定key來傳遞資訊
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:user', routes.user);
//app.post('/post', routes.post);
// Register
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
// Login
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
// Logout
app.get('/logout', routes.logout );


/*http.createServer(app).listen(app.get('port'), function( req, res ){ 
	//launch app instance
	console.log('Express server listening on port ' + app.get('port'));
});
*/
