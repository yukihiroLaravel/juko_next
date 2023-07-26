export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok == false) {
      throw res.status;
    }
    return res.json();
  });
