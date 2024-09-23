const sendRequest = (method, url, headers, data, file, onSuccess, onError) => {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url, true)
  xhr.onreadystatechange = function () {
    if (this.readyState != 4) return

    const responseText = this.responseText
    const response = responseText === '' ? responseText : JSON.parse(responseText)

    if ((this.status < 200 || this.status >= 400) && onError) return onError(response)
    if (onSuccess) onSuccess(response)
  }

  if (headers)
    Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]))

  if (file) {
    const form = new FormData(data)
    form.append('attachment', file)
    return xhr.send(form)
  }

  xhr.send(JSON.stringify(data))
}

const request = {
  get: ({ url, headers, data, file, onSuccess, onError }) =>
    sendRequest('GET', url, headers, data, file, onSuccess, onError),
  post: ({ url, headers, data, file, onSuccess, onError }) =>
    sendRequest('POST', url, headers, data, file, onSuccess, onError),
  delete: ({ url, headers, data, file, onSuccess, onError }) => 
    sendRequest('DELETE', url, headers, data, file, onSuccess, onError),
}