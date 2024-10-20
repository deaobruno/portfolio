const authService = {
  login: data => request.post({
    url: `${apiHost}/auth`,
    data,
  }),
  logout: () => request.delete({ url: `${apiHost}/auth` }),
}
