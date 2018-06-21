export default class RootState {
  loadings;
  localization;
  locale = 'en';

  constructor() {
    this.loadings = void 0;
    this.loading = false;
    this.localization = null;
  }
}
