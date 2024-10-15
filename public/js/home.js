const projectsElement = document.getElementById('projects')
const contentAnchors = [...document.getElementsByClassName('content-anchor')]
const contactForm = document.getElementById('contactForm')
const formTextArea = document.getElementsByTagName('textarea').message
const formSubmit = document.getElementById('formSubmit')
const formLoading = document.getElementsByClassName('loading')[0]
const formOkMessage = document.getElementsByClassName('sent-message')[0]
const formErrorMessage = document.getElementsByClassName('error-message')[0]

contentAnchors.forEach(anchor => anchor.addEventListener('click', scrollToElement))

document.addEventListener('DOMContentLoaded', async () => {
  if (!projectsElement) return

  projectsElement.style = ''
  projectsElement.innerHTML = ''

  await request.get({ url: 'http://localhost:3000/projects' })
    .then(({ projects }) => {
      if (!projects || projects.length <= 0) return showNoProjects()

      projects.forEach(renderProject)
    })
    .catch(error => {
      console.log(error)
      showNoProjects()
    })
})

formSubmit.addEventListener('click', async element => {
  element.preventDefault()

  showFormLoading()

  const inputs = contactForm.getElementsByTagName('input')
  const data = {
    name: inputs['name'].value,
    email: inputs['email'].value,
    subject: inputs['subject'].value,
    message: formTextArea.value,
  }

  await request.post({
    url: '/contact',
    data,
  })
    .then(() => {
      contactForm.reset()
      showOkMessage()
    })
    .catch(error => showErrorMessage(error.error ? error.error : JSON.stringify(error)))
})

function renderProject(project) {
  const projectElement = document.createElement('div')

  projectElement.className = 'col-lg-3 col-md-6 portfolio-item'

  const projectImage = document.createElement('img')

  projectImage.className = 'img-fluid'
  projectImage.src = project.cover
  projectImage.alt = 'project cover'
  projectElement.appendChild(projectImage)

  const projectCard = document.createElement('div')

  projectCard.className = 'portfolio-info'
  projectElement.appendChild(projectCard)

  const projectName = document.createElement('h4')

  projectName.appendChild(document.createTextNode(project.name))
  projectCard.appendChild(projectName)

  const projectDescription = document.createElement('p')

  projectDescription.appendChild(document.createTextNode(project.description))
  projectCard.appendChild(projectDescription)

  if (project.repository) {
    const projectRepository = document.createElement('a')

    projectRepository.className = 'preview-link'
    projectRepository.href = project.repository
    projectRepository.target = '_blank'

    const projectRepositoryIcon = document.createElement('i')

    projectRepositoryIcon.className = 'bi bi-github'
    projectRepository.appendChild(projectRepositoryIcon)
    projectCard.appendChild(projectRepository)
  }

  if (project.url) {
    const projectUrl = document.createElement('a')

    projectUrl.className = 'details-link'
    projectUrl.href = project.url
    projectUrl.target = '_blank'

    const projectUrlIcon = document.createElement('i')

    projectUrlIcon.className = 'bi bi-link-45deg'
    projectUrl.appendChild(projectUrlIcon)
    projectCard.appendChild(projectUrl)
  }

  projectsElement.appendChild(projectElement)
}

function showNoProjects() {
  if (!projectsElement) return

  const col = document.createElement('div')

  col.className = 'col-12'

  const paragraph = document.createElement('p')

  paragraph.appendChild(document.createTextNode('No projects to show'))
  col.appendChild(paragraph)
  projectsElement.innerHTML = col.outerHTML
}

function scrollToElement(element) {
  element.preventDefault()

  const target = element.target.closest('a')

  if (target.classList.contains('active'))
    return

  const elementTargets = {
    hero: document.getElementById('hero'),
    about: document.getElementById('about'),
    skills: document.getElementById('skills'),
    portfolio: document.getElementById('portfolio'),
    contact: document.getElementById('contact'),
  }

  contentAnchors.forEach(anchor => anchor.classList.remove('active'))

  const [host, elementId] = target.href.split('#')
  const elementTarget = elementTargets[elementId]

  window.history.replaceState(null, '', host)

  scrollTo(0, elementTarget.offsetTop)

  target.classList.add('active')
}

function showFormLoading() {
  clearMessages()
  formLoading.style.display = 'block'
}

function hideFormLoading() {
  formLoading.style.display = 'none'
}

function showOkMessage() {
  clearMessages()
  formOkMessage.style.display = 'block'
  setTimeout(() => clearMessages(), 5000)
}

function hideOkMessage() {
  formOkMessage.style.display = 'none'
}

function showErrorMessage(message) {
  clearMessages()
  formErrorMessage.innerHTML = message
  formErrorMessage.style.display = 'block'
  setTimeout(() => clearMessages(), 5000)
}

function hideErrorMessage() {
  formErrorMessage.style.display = 'none'
}

function clearMessages() {
  hideFormLoading()
  hideOkMessage()
  hideErrorMessage()
}
