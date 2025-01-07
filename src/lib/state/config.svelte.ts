import { bffClient } from '$service';

class Config {
  done = $state(false);

  init = async (): Promise<void> => {
    await bffClient.config({});
    this.done = true;
  };
}

export const config = new Config();
