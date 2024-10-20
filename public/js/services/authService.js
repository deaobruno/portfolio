const authService = {
  login: ({ data, onSuccess, onError }) => request.post({
    url: 'http://localhost:3001/auth',
    data,
  })
    .then(response => onSuccess && onSuccess(response))
    .catch(error => onError && onError(error)),
  logout: ({ onSuccess, onError }) => request.delete({
    url: 'http://localhost:3001/auth',
  })
    .then(response => onSuccess && onSuccess(response))
    .catch(error => onError && onError(error)),
}
