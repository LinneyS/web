const state = {
  options: {
    hideSearchBar: false
  }
}

const getters = {
  options: state => {
    return state.options
  }
}

export default {
  state,
  getters
}
