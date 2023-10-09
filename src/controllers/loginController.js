const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if (req.session.user) {
        req.flash('success', 'Usuário Logado');
        return res.redirect('/')
    }
    return res.render('login')
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => { return res.redirect('/login') });
            return;
        }

        req.flash('success', 'Usuário foi criado com sucesso');
        req.session.save(() => { return res.redirect('/login') });

    } catch (error) {
        console.log(error);
        return res.render('404')
    }
};

exports.auth = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.authentic();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login') );
            return;
        }

        req.flash('success', 'Usuário logado com sucesso');
        req.session.user = login.user;
        req.session.save(() => { return res.redirect('/login') });

    } catch (error) {
        console.log(error);
        return res.render('404')
    }
};

exports.logout = async (req, res) =>{
    await req.session.destroy();
    res.redirect('/')
};