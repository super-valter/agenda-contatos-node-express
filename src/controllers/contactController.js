const { async } = require('regenerator-runtime');
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

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contact = await Contact.searchId(req.params.id);
    if (!contact)  return res.render('404');
    res.render('contato', { contact }) 
}

exports.edit = async (req, res) => {
    try {        
        if (!req.params.id) return res.render('404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect(`/contato/${req.params.id}`));
            return
        }
        req.flash('success', 'Contato editado com sucesso');
        req.session.save(() => res.redirect(`/contato/${contact.contact._id}`));
    } catch (error) {
        console.log(error);
        return res.render('404');    
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contact = await Contact.delete(req.params.id);
    if (!contact)  return res.render('404');

    req.flash('success', 'Contato apagado com sucesso');
    req.session.save(() => res.redirect(`/`));
    return
}