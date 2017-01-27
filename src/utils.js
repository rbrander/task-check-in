// utils.js -- utilities for application

export const apiGet = (url) =>
  fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: new Headers({ 'Accept': 'application/json' })
  }).then(response => {
    if (response.status < 400) {
      return response.json();
    } else {
      throw response.statusText;
    }
  });

export const apiPost = (url, jsonData) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    credentials: 'same-origin',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  }).then(response => {
    if (response.status < 400) {
      return response.json();
    } else {
      throw response.statusText;
    }
  });
};
