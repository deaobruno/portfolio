import NodeCache from 'node-cache'

const cache = new NodeCache()

export default {
  set: cache.set,
  get: cache.get,
  delete: cache.del,
}
