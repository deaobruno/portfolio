function showNoProjects() {
  const tableDiv = document.getElementsByClassName('table-responsive')[0]

  if (!tableDiv) return

  tableDiv.style.display = 'none'

  const cardBody = document.getElementsByClassName('card-body')[0]

  if (!cardBody) return

  const row = document.createElement('div')
    
  row.className = 'row'
  row.id = 'noProjects'

  const col = document.createElement('div')
    
  col.className = 'col'

  const paragraph = document.createElement('p')

  paragraph.appendChild(document.createTextNode('No projects to show'))
  col.appendChild(paragraph)
  row.appendChild(col)
  cardBody.appendChild(row)
  row.style.display = 'flex'
}

function renderEmptyCell(row) {
  row.insertCell().appendChild(document.createTextNode(''))
}

function renderProjectName(row, name) {
  if (!name) return renderEmptyCell(row)

  row.insertCell().appendChild(document.createTextNode(name || ''))
}

function renderProjectUrl(row, url) {
  if (!url) return renderEmptyCell(row)

  const anchor = document.createElement('a')

  anchor.href = url
  anchor.innerHTML = 'Link'
  anchor.setAttribute('target', '_blank')
        
  row.insertCell().appendChild(anchor)
}

function renderProjectGithub(row, github) {
  if (!github) return renderEmptyCell(row)

  row.insertCell().appendChild(document.createTextNode(github || ''))
}

function renderProjectStatus(row, status) {
  if (!status) return renderEmptyCell(row)

  row.insertCell().appendChild(document.createTextNode(status || ''))
}

function renderProjectActions(row) {
  const anchor = document.createElement('a')
        
  anchor.className = 'cursor-pointer'
  anchor.id = 'dropdownTable'
  anchor.setAttribute('data-bs-toggle', 'dropdown')
  anchor.setAttribute('aria-expanded', 'false')

  const anchorDiv = document.createElement('div')

  anchorDiv.className = 'text-white text-center me-2 d-flex align-items-center justify-content-center'

  const icon = document.createElement('i')

  icon.className = 'fa fa-ellipsis-v text-secondary'
  anchorDiv.appendChild(icon)
  anchor.appendChild(anchorDiv)

  const unorderedList = document.createElement('ul')

  unorderedList.className = 'dropdown-menu px-2 py-3 ms-sm-n4 ms-n5'
  unorderedList.setAttribute('aria-labelledby', 'dropdownTable')

  const updateListItem = document.createElement('li')
  const updateListItemAnchor = document.createElement('a')

  updateListItemAnchor.className = 'dropdown-item border-radius-md'
  updateListItemAnchor.href = 'javascript:;'
  updateListItemAnchor.innerHTML = 'Update'
  updateListItem.appendChild(updateListItemAnchor)

  const deleteListItem = document.createElement('li')
  const deleteListItemAnchor = document.createElement('a')

  deleteListItemAnchor.className = 'dropdown-item border-radius-md'
  deleteListItemAnchor.href = 'javascript:;'
  deleteListItemAnchor.innerHTML = 'Delete'
  deleteListItem.appendChild(deleteListItemAnchor)

  unorderedList.append(updateListItem, deleteListItem)

  row.insertCell().append(anchor, unorderedList)
}

document.addEventListener('DOMContentLoaded', () => {
  request.get({
    url: 'http://localhost:3000/projects',
    onSuccess: response => {
      const noProjects = document.getElementById('noProjects')

      if (noProjects) noProjects.style.display = 'none'

      const tableDiv = document.getElementsByClassName('table-responsive')[0]

      if (!tableDiv) return

      const table = tableDiv.getElementsByClassName('table')[0]

      if (!table) return

      const tableBody = table.getElementsByTagName('tbody')[0]

      if (!tableBody) return

      if (response.length <= 0) return showNoProjects()

      response.forEach(project => {
        const row = tableBody.insertRow()

        renderProjectName(row, project.name)
        renderProjectUrl(row, project.url)
        renderProjectGithub(row, project.github)
        renderProjectStatus(row, project.status)
        renderProjectActions(row)
      })

      tableDiv.style.display = 'block'
    },
    onError: error => {
      console.log(error)
      showNoProjects()
    }
  })
})
