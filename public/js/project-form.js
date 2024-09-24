document.getElementById('projectForm').addEventListener('submit', async element => {
  element.preventDefault()

  const form = element.target
  const inputs = form.getElementsByTagName('input')
  const data = {
    name: inputs['name'].value,
    description: inputs['description'].value,
    url: inputs['url'].value,
    repository: inputs['repository'].value,
  }

  await request.post({
    url: '/projects',
    data,
  })
    .then(() => form.reset())
    .catch(error => alert(error.error))
})
