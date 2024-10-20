const projectService = {
  createProject: (data, file) => request
    .post({ url: `${apiHost}/projects`, data, file }),
  getProjects: ({ page, count } = {}) => request
    .get({
      url: `${apiHost}/projects?${page ? 'page=' + page + '&' : ''}${count ? 'count=' + count : ''}`
    }),
  updateProject: ({ id, data, file }) => request
    .put({ url: `${apiHost}/projects/${id}`, data, file }),
  deleteProject: projectId => request
    .delete({ url: `${apiHost}/projects/${projectId}` }),
}
