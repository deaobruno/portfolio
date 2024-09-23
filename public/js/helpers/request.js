const sendRequest = (method, url, headers, data, file) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url, true)

    if (headers)
      Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]))

    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0')

    if (file) {
      const form = new FormData(data)
      form.append('attachment', file)
      return xhr.send(form)
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return

      const responseText = xhr.responseText
      const response = responseText === '' ? responseText : JSON.parse(responseText)

      if (xhr.status < 200 || xhr.status >= 400) return reject(response)

      return resolve(response)
    }

    return xhr.send(JSON.stringify(data))
  })

const request = {
  get: ({ url, headers, data, file }) =>
    sendRequest('GET', url, headers, data, file),
  post: ({ url, headers, data, file }) =>
    sendRequest('POST', url, headers, data, file),
  put: ({ url, headers, data, file }) =>
    sendRequest('PUT', url, headers, data, file),
  delete: ({ url, headers, data, file }) => 
    sendRequest('DELETE', url, headers, data, file),
}
