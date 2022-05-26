//module dependencies
var express = require('express'); //從local取得express
var routes = require('./routes'); //等同於"./routes/index.js"，指定路徑返回內容，相當於MVC中的Controller
var http = require('http');
var path = require('path');
var app = express();
var partials = require('express-partials');

/*
app.set是express的參數設置工具，接受key-value，可用的參數如下：
	- basepath：即Base Path，通常用於res.redirect()跳轉
	- views：存放view的資料夾
	- view engine：view engine類型
	- view options：global view參數
	- view cache：啟用view快取
	- case sensitive routes：路徑區分大小寫
	- strict routing：嚴格路徑，啟用後不會忽略路徑結尾的 "/"
	- jsonp callback：開啟支援透明的JSONP
*/

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));//設計頁面模板位置，在views子目錄下
app.set('view engine', 'ejs');//表明要使用的模板引擎(樣板引擎，Template Engine)是ejs
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

/*
app.js中並沒有一個路由規則指派到/stylesheets/style.css，但應用程序通過
app.use(express.static(__dirname + '/public'))配置了靜態文件服務器，因此
/stylesheets/style.css會定向到app.js所在目錄的子目錄中的文件public/stylesheets/style.css中
*/

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
// Register
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
// Login
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
// Logout
app.get('/logout', routes.logout );

http.createServer(app).listen(app.get('port'), function( req, res ){ 
	//launch app instance
	console.log('Express server listening on port ' + app.get('port'));
});


/*
建立一個HTTP的實例，在其請求處理函數中手動編寫REQ對象的事件監聽器。
當客戶端數據到達時，將POST數據暫存在閉包的變量中，直到結束。
事件觸發，解析POST請求，處理後返回客戶端。
*/