let globalAccessToken = '';

export function setAccessToken(accessToken: string): void {
  globalAccessToken = accessToken;
}

export function getAccessToken(): string {
  return globalAccessToken;
}
