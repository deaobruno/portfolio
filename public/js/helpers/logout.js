document.getElementById('logout').addEventListener('click', async event => {
  event.preventDefault()

  await authService.logout({
    onSuccess: ({ url }) => window.location.replace(url),
    onError: error => alert(JSON.stringify(error))
  })
})
