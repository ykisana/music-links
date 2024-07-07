export function getAuthHeader(accessToken: string) {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + accessToken);
  return headers;
}
