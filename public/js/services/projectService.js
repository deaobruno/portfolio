const projectService = {
  createProject: (data, file) => request
    .post({ url: `${apiHost}/projects`, data, file }),
  getProjects: () => request.get({ url: `${apiHost}/projects` }),
  updateProject: ({ id, data, file }) => request
    .put({ url: `${apiHost}/projects/${id}`, data, file }),
  deleteProject: projectId => request
    .delete({ url: `${apiHost}/projects/${projectId}` }),
}
