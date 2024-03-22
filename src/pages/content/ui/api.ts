export const callAPI = (url:string, method:string, data:any ):any => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
  }).then(res => res.json());
};
