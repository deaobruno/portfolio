const projectsElement = document.getElementById('projects')
const contentAnchors = [...document.getElementsByClassName('content-anchor')]

contentAnchors.forEach(anchor => anchor.addEventListener('click', scrollToElement))

document.addEventListener('DOMContentLoaded', async () => {
  await request.get({ url: 'http://localhost:3000/projects' })
    .then(({ projects }) => {
      if (!projectsElement) return
      if (!projects || projects.length <= 0) return showNoProjects()

      projectsElement.innerHTML = ''

      projects.forEach(renderProject)
    })
    .catch(error => {
      console.log(error)
      showNoProjects()
    })
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

  if (project.url) {
    const projectUrl = document.createElement('a')

    projectUrl.className = 'glightbox preview-link'
    projectUrl.href = project.url
    projectUrl.target = '_blank'

    const projectUrlIcon = document.createElement('i')

    projectUrlIcon.className = 'bi bi-link-45deg'
    projectUrl.appendChild(projectUrlIcon)
    projectCard.appendChild(projectUrl)
  }

  if (project.repository) {
    const projectRepository = document.createElement('a')

    projectRepository.className = 'details-link'
    projectRepository.href = project.repository
    projectRepository.target = '_blank'

    const projectRepositoryIcon = document.createElement('i')

    projectRepositoryIcon.className = 'bi bi-link-45deg'
    projectRepository.appendChild(projectRepositoryIcon)
    projectCard.appendChild(projectRepository)
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
