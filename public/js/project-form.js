document
  .getElementById('projectForm')
  .addEventListener('submit', async element => {
    element.preventDefault()

    const form = element.target
    const inputs = form.getElementsByTagName('input')
    const data = {
      name: inputs['name'].value,
      description: inputs['description'].value,
      url: inputs['url'].value,
      repository: inputs['repository'].value,
    }
    const file = inputs['attachment'].files[0]

    inputs['project_id'] ? updateProject(inputs['project_id'].value, data, file) : createProject(data, file, form)
  })

document
  .getElementById('attachment')
  .onchange = event => {
    const [file] = event.target.files
    const cover = document.getElementById('cover')

    if (cover && file) {
      cover.src = URL.createObjectURL(file)
      cover.style.display = 'block'
    }
  }

async function createProject(data, file, form) {
  await request.post({
    url: '/projects',
    data,
    file,
  })
    .then(() => {
      form.reset()

      const cover = document.getElementById('cover')

      cover.style.display = 'none'
      cover.src = ''

      const inputs = form.getElementsByTagName('input')

      inputs['name'].parentElement.classList.remove('is-filled')
      inputs['description'].parentElement.classList.remove('is-filled')
      inputs['url'].parentElement.classList.remove('is-filled')
      inputs['repository'].parentElement.classList.remove('is-filled')
    })
    .catch(error => alert(JSON.stringify(error)))
}

async function updateProject(id, data, file) {
  await request.put({
    url: `/projects/${id}`,
    data,
    file,
  })
    .then(() => alert('Project updated'))
    .catch(error => alert(JSON.stringify(error)))
}
