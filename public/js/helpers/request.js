const apiHost = 'http://localhost:3001'
const sendRequest = (method, url, headers, data, file) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    try {
      xhr.open(method, url, true)
      xhr.withCredentials = true
      // xhr.timeout = 30000

      if (headers)
        Object.keys(headers).forEach(header => xhr.setRequestHeader(header, headers[header]))

      xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0')
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return

        const response = xhr.responseText === '' ? xhr.responseText : JSON.parse(xhr.responseText)

        if (xhr.status < 200 || xhr.status >= 400) return reject(response)

        return resolve(response)
      }

      if (file) {
        const form = new FormData()

        Object.keys(data).forEach(key => form.append(key, data[key]))        
        form.append('attachment', file)

        return xhr.send(form)
      }

      xhr.setRequestHeader('Content-Type', 'application/json')

      return xhr.send(JSON.stringify(data))
    } catch (error) {
      console.log(error)
      xhr.abort()
    }
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
