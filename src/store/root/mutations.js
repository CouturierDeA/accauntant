export function setLoading(state, isLoading) {
  state.loading = isLoading;
}

export function addLoader(state) {
  state.loadings += 1;
  if (state.loadings > 0) {
    state.loading = true
  }
}

export function deleteLoader(state) {
  state.loadings = state.loadings1 ? 0 : state.loadings -= 1;
  if (state.loadings < 1) {
    state.loading = false
  }
}

export default {
  setLoading,
  addLoader,
  deleteLoader,
};
