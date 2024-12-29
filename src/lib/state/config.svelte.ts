import { bffClient, getAccessToken, setAccessToken } from '$service';

class Config {
  done = $state(false);

  init = async () => {
    const accessToken = sessionStorage.getItem('access-token');
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      await bffClient.config({});
      sessionStorage.setItem('access-token', getAccessToken());
    }
    this.done = true;
  };
}

export const config = new Config();
