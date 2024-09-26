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
  const file = inputs['attachment'].files[0]

  inputs['project_id'] ? updateProject(inputs['project_id'].value, data, file) : createProject(data, file, form)
})

document.getElementById('attachment').onchange = event => {
  const [file] = event.target.files

  if (file)
    document.getElementById('cover').src = URL.createObjectURL(file)
}

async function createProject(data, file, form) {
  await request.post({
    url: '/projects',
    data,
    file,
  })
    .then(() => form.reset())
    .catch(error => alert(error.error))
}

async function updateProject(id, data, file) {
  await request.put({
    url: `/projects/${id}`,
    data,
    file,
  })
    .then(() => alert('Project updated'))
    .catch(error => alert(error.error))
}
