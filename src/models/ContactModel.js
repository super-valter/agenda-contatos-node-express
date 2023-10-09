const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    userId: { type: String, required: true },
    createdIn: { type: Date, default: Date.now },    
});

/* Examplo criado com Construct Function */
const ContactModel = mongoose.model('Contact', ContactSchema);
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
/* Examplo criado com Construct Function */

/* Validações Contato */
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
        telefone: this.body.telefone,
        userId: this.body.userId
    };
}
/* Validações Contato */

/* Editar Contato */
Contact.prototype.edit = async function(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true});
}
/* Editar Contato */

/* Metodos Estaticos */
/* Seta Informações cadastro */
Contact.searchId = async (id) => {
    if (typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
}
/* Seta Informações cadastro */

/* Busca Informações cadastro */
Contact.searchContacts = async (userId) => {
    const contacts = await ContactModel.find({ userId: userId }).sort({createdIn: -1});
    return contacts;
}
/* Busca Informações cadastro */

/* Delte cadastro */
Contact.delete = async (id) => {
    if (typeof id !== 'string') return;
    const contact = await ContactModel.findOneAndDelete({_id: id})
    return contact;
}
/* Delte cadastro */

module.exports = Contact;

