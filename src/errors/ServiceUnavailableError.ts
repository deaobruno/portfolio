export default (message = 'Service Unavailable') => 
  Object.assign(new Error(message), { statusCode: 503 })
