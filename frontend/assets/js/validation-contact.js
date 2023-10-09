const addContato = document.querySelectorAll('.needs-validation-add-contato');

if (addContato.length > 0) {
    document.getElementById('phone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
    const someValidation = () => {
        const validEmail = document.querySelector('.valid-email');
        const validaTelefone = document.querySelector('.valid-telefone');
        if (validEmail.value || validaTelefone.value) return true
        return false
    }
    Array.from(addContato).forEach(form => {
        form.addEventListener('submit', event => {
            const mesangemTelEmail = document.querySelector('.message-tel-email');
            if (!someValidation()) {
                event.preventDefault()
                mesangemTelEmail.classList.remove("d-none");
            }
            if (someValidation()) {
                mesangemTelEmail.classList.add("d-none");
            }

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
}