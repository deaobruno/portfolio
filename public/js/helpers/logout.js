document.getElementById('logout').addEventListener('click', async event => {
  event.preventDefault()

  await authService.logout()
    .then(({ url }) => window.location.replace(url))
    .catch(error => alert(JSON.stringify(error)))
})
