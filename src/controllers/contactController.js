const Contact = require('../models/ContactModel');
exports.index = (req, res) => {
    res.render('contato', { contact: {} });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contato'));
            return
        }
        req.flash('success', 'Contato adicionado com sucesso');
        req.session.save(() => res.redirect(`/contato/${contact.contact._id}`));
    } catch (error) {
        console.log(error);
        return res.render('404');
    }

};

exports.editindex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contact = await Contact.searchId(req.params.id);
    if (!contact)  return res.render('404');
    res.render('contato', { contact }) 
}