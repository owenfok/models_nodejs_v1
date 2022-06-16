//get home page

//Mockup
var postList = [
	{ id: 1, name: "Apple", msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬" },
	{ id: 2, name: "Zoe", msg: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta." },
	{ id: 3, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" }
]; 
var count = postList.length;

//檢查User Login狀態
var isLogin = false;
var checkLoginStatus = function(req, res){
	isLogin = false;
	if(req.signedCookies.userid && req.signedCookies.password){
		isLogin = true;
	}
};
//首頁
exports.index = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'index', {
		title : '歡迎來到 Microblog', 
		loginStatus : isLogin,
		posts : postList
	});	
};
//Register頁面
exports.reg = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'reg', {
		title : 'Register',
		loginStatus : isLogin
	});
};
//執行Register
exports.doReg = function(req, res){
	const { password, password_repeat } = req.body;
    let errors = [];
    // Check password
    if (password !== password_repeat) {
        errors.push({ msg: 'Passwords do not match' });
    }
    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if (errors.length > 0) {
        return res.render('reg', {
			title : 'Register',
			loginStatus : isLogin,			
            errors,
            password,
            password_repeat
        });
    }
	else{
		//register success, redirect to index

		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};
//Login頁面
exports.login = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'login', {
		title : 'Login',
		loginStatus : isLogin
	});
};
//執行Login
exports.doLogin = function(req, res){
	const { password, password_repeat } = req.body;
    let errors = [];
    // Check password
    if (password !== password_repeat) {
        errors.push({ msg: 'Passwords do not match' });
    }
    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if (errors.length > 0) {
        return res.render('login', {
			title : 'Login',
			loginStatus : isLogin,			
            errors,
            password,
            password_repeat
        });
    }
	else{
		//register success, redirect to index
		res.cookie('userid', req.body['username'], { path: '/', signed: true});		
		res.cookie('password', req.body['password'], { path: '/', signed: true });
		return res.redirect('/');
	}
};
//執行登出
exports.logout = function(req, res){
	res.clearCookie('userid', { path: '/' });
	res.clearCookie('password', { path: '/' });
	return res.redirect('/');
};

//發表訊息
exports.post = function(req, res){
	var element = { id: count++, name: req.signedCookies.userid, msg: req.body['post'] };
	postList.push(element);

	return res.redirect('/');	
};

//User 頁面
exports.user = function(req, res){
	var userName = req.params.user;
	var userPosts = [];
	
	for (var i = 0; i < postList.length; i++) { 
		if(postList[i].name == userName){
			userPosts.push(postList[i]);
		}
	}
	
	checkLoginStatus(req, res);
	res.render( 'user', {
		title : userName + '的頁面',
		loginStatus : isLogin,
		posts : userPosts
	});
	
};

// contact page
exports.contact = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'contact', {
		title : 'contact',
		loginStatus : isLogin
	});
};