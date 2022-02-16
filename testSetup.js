const fetch = (resource) => {
  switch (resource) {
    case (resource.match(/www.google-analytics.com/) || {}).input:
      return new Promise((resolve) => {
        window.setTimeout(() => {
          resolve({
            ok: true,
            text() {
              return Promise.resolve('')
            },
          })
        })
      })
  }
}

if (typeof window.fetch === 'undefined') {
  Object.defineProperty(window, 'fetch', { value: fetch, writable: true })
}
