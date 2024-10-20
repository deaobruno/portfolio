const contactService = {
  sendMessage: data => request.post({
    url: `${apiHost}/contact`,
    data,
  }),
}
