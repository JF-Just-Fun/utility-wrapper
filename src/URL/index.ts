export function getUrlQuery(url: string) {
  const queryParams: { [key: string]: string | undefined } = {};
  const urlObj = new URL(url);
  urlObj.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
}

export function removeUrlQuery(url: string, key?: string) {
  const urlObj = new URL(url);
  if (key) {
    urlObj.searchParams.delete(key);
  } else {
    urlObj.search = "";
  }
  return urlObj.toString();
}
