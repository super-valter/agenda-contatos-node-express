exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        return res.render('404')
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Faça Login para continuar!<br>Você precisa estar logado para conseguir cadastrar ou alterar contatos, faça o login e depois retorne nessa pagina.<br><a class="nav-link active btn btn-primary d-inline-block px-2 py-1 mt-1" aria-current="Login" href="/login">Login</a>');
        req.session.save(() => res.redirect('/') );
        return;
    }
    next();
}