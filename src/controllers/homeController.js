const Contacts = require('../models/ContactModel')
exports.index = async (req, res) => {
    let contacts = [];
    if (res.locals.user) {
        contacts = await Contacts.searchContacts(res.locals.user._id);
    }
    res.render('index', { contacts });
};