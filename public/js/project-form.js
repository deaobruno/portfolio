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

    if (file)
      document.getElementById('cover').src = URL.createObjectURL(file)
  }

document
  .getElementById('removeImage')
  .addEventListener('click', async element => {
    element.preventDefault()

    const projectId = document.getElementById('projectId')
    
    if (!projectId) {
      document.getElementById('attachment').value = null
      document.getElementById('cover').src = '/images/default-project.jpeg'
      return
    }
    
    await request
      .put({ url: `/projects/${projectId.value}/remove-cover` })
      .then(() => {
        document.getElementById('attachment').value = null
        document.getElementById('cover').src = '/images/default-project.jpeg'
      })
      .catch(error => alert(JSON.stringify(error)))
  })

async function createProject(data, file, form) {
  await projectService.createProject(data, file)
    .then(() => {
      form.reset()

      document.getElementById('cover').src = '/images/default-project.jpeg'

      const inputs = form.getElementsByTagName('input')

      inputs['name'].parentElement.classList.remove('is-filled')
      inputs['description'].parentElement.classList.remove('is-filled')
      inputs['url'].parentElement.classList.remove('is-filled')
      inputs['repository'].parentElement.classList.remove('is-filled')
    })
    .catch(error => alert(JSON.stringify(error)))
}

async function updateProject(id, data, file) {
  await projectService.updateProject({
    id,
    data,
    file,
  })
    .then(() => alert('Project updated'))
    .catch(error => alert(JSON.stringify(error)))
}
