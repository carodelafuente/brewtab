const API = 'https://api.graph.cool/simple/v1/cj2yv7d73ponq0110kirip4gn'

const mutation = (mutation) => {
  return window.fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation {
        ${mutation}
      }`
    })
  }).then(r => r.json())
}

window.mutation = mutation

export { mutation }
