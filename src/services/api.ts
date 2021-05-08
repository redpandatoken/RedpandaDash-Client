import { apiProvider } from './net';

class FrogeApi {
  async getStats() {
    return apiProvider.get('stats');
  }
}

export default new FrogeApi();
