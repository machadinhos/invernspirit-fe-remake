class Loading {
  private value = $state(false);

  get isLoading(): boolean {
    return this.value;
  }

  startLoading(): void {
    this.value = true;
  }

  stopLoading(): void {
    this.value = false;
  }

  async withLoading<T>(func: () => T | Promise<T>, stopLoadingOnSuccess = true): Promise<T> {
    this.startLoading();
    let succeeded = false;
    try {
      const result = await func();
      succeeded = true;
      return result;
    } finally {
      if (succeeded && stopLoadingOnSuccess) this.stopLoading();
    }
  }
}

export const loading = new Loading();
