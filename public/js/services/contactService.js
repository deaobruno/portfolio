const contactService = {
  sendMessage: ({ data, onSuccess, onError }) => request.post({
    url: 'http://localhost:3001/contact',
    data,
  })
    .then(response => onSuccess && onSuccess(response))
    .catch(error => onError && onError(error)),
}
