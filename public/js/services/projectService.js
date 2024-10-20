const projectService = {
  createProject: (data, file) => request
    .post({ url: 'http://localhost:3001/projects', data, file }),
  getProjects: () => request.get({ url: 'http://localhost:3001/projects' }),
  updateProject: ({ id, data, file }) => request
    .put({ url: `http://localhost:3001/projects/${id}`, data, file }),
  deleteProject: projectId => request
    .delete({ url: `http://localhost:3001/projects/${projectId}` }),
}
