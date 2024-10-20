const authService = {
  login: data => request.post({
    url: 'http://localhost:3001/auth',
    data,
  }),
  logout: () => request.delete({ url: 'http://localhost:3001/auth' }),
}
