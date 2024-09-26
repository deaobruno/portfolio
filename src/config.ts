export default {
  http: {
    port: 3000,
  },
  auth: {
    email: 'root@email.com',
    password: '$2b$10$aZlL9InHPqMZWo1wG9mqgepX.HdLFE/P8gsdl4rcfNq8o6SsXbgMq',
  },
  token: {
    access: {
      secret: 'access-token-secret',
      ttl: 3600,
    },
    refresh: {
      secret: 'refresh-token-secret',
      ttl: 7200,
    },
  },
  db: {
    mongo: {
      url: 'mongodb://127.0.0.1:27017/portfolio',
    },
  },
}
