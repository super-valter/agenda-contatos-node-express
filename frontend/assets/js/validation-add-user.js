const addUser = document.querySelectorAll('.needs-validation-add-user')

if (addUser.length > 0) {
  Array.from(addUser).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
}