const contactService = {
  sendMessage: data => request.post({
    url: 'http://localhost:3001/contact',
    data,
  }),
}
