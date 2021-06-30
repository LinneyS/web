const state = {
  options: {
    hideSearchBar: false
  }
}

const getters = {
  options: (state: unknown): unknown => {
    return (state as any).options
  }
}

export default {
  state,
  getters
}
