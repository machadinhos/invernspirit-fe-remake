import { bffClient } from '$service';

class Config {
  private readonly initializationPromise: Promise<void>;
  private completeInitialization!: () => void;

  constructor() {
    this.initializationPromise = new Promise((resolve) => {
      this.completeInitialization = resolve;
    });
  }

  init = async (countryCode: string): Promise<void> => {
    await bffClient.config({}, countryCode);
    this.completeInitialization();
  };

  async afterInitialization(callback: () => void): Promise<void> {
    await this.initializationPromise;
    callback();
  }
}

export const config = new Config();
