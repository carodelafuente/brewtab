import auth from './auth'

const API = 'https://api.graph.cool/simple/v1/cj2yv7d73ponq0110kirip4gn'

const query = (body) => {
  let headers = { 'Content-Type': 'application/json' }
  if (auth && auth.isSignedIn) {
    headers['Authorization'] = `Bearer ${auth.token}`
  }
  return window.fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: `query { ${body} }` })
  }).then(r => r.json())
}

const mutation = (mutation) => {
  let headers = { 'Content-Type': 'application/json' }
  if (auth && auth.isSignedIn) {
    headers['Authorization'] = `Bearer ${auth.token}`
  }
  return window.fetch(API, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `mutation {
        ${mutation}
      }`
    })
  }).then(r => r.json())
}

window.query = query
window.mutation = mutation

export { query, mutation }
