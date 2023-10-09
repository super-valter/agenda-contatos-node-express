const login = document.querySelectorAll('.needs-validation-login')

if (login.length > 0) {
  Array.from(login).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
}