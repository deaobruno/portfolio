document
  .getElementById('loginForm')
  .addEventListener('submit', async element => {
    element.preventDefault()

    const form = element.target
    const inputs = form.getElementsByTagName('input')
    const data = {
      email: inputs['email'].value,
      password: inputs['password'].value,
    }

    await authService.login(data)
      .then(({ url }) => window.location.replace(url))
      .catch(error => alert(JSON.stringify(error)))
  })
