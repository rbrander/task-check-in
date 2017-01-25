// utils.js -- utilities for application

export const apiGet = (url) =>
  fetch(url, {
    method: 'GET',
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
    redirect: 'follow',
    body: JSON.stringify(jsonData),
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
