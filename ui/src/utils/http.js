const makeRequest = (url, options) =>
  fetch(url, options).then(response =>
    convertResponse(response).then(data =>
      response.ok ? Promise.resolve(data) : Promise.reject(data)
    )
  );

function convertResponse(response) {
  const contentType = response.headers.get('content-type').toLowerCase();

  return contentType.includes('json')
    ? response.json()
    : contentType.includes('html')
    ? response.text()
    : Promise.reject(new Error(`content-type: ${contentType} is not supported`));
}

const jsonOptions = data => ({
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(data)
});
export default {
  get(url) {
    return makeRequest(url, { method: 'GET' });
  },

  post(url, data) {
    return makeRequest(url, { method: 'POST', ...jsonOptions(data) });
  }
};
