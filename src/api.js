const API = 'https://api.graph.cool/simple/v1/cj2yv7d73ponq0110kirip4gn'

const query = (body) => {
  return window.fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `query { ${body} }` })
  }).then(r => r.json())
}

window.query = query

export { query }
