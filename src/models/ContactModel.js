const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now },    
});

const ContactModel = mongoose.model('Contact', ContactSchema);

/* Examplo criado com Construct Function */
function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.prototype.register = async function() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body)
}

Contact.prototype.valida = function() {
    this.cleanUp();
    //Validações

    // O Nome precisa ser válido
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    
    // O e-mail precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    
    // O Nome precisa ser válido
    if (!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato ser cadastrado: e-mail ou telefone');
    
};

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
}

/*  */
Contact.searchId = async (id) => {
    if (typeof id !== 'string') return;    
    const contact = await ContactModel.findById(id);
    return contact;
}

module.exports = Contact;

