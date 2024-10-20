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

    await authService.login({
      data,
      onSuccess: ({ url }) => window.location.replace(url),
      onError: error => alert(JSON.stringify(error)),
    })
  })
