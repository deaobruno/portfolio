document.getElementById('logout').addEventListener('click', async event => {
  event.preventDefault()

  await request.delete({
    url: 'http://localhost:3001/auth',
  })
    .then(({ url }) => window.location.replace(url))
    .catch(error => alert(JSON.stringify(error)))
})
