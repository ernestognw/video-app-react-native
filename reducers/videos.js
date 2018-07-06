function videos(state = {}, action) {
  switch (action.type) {
    case 'SET_SUGGESTION_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_CATEGORY_LIST': {
      return {...state, ...action.payload}
    }
    case 'PLAY_PAUSE_VIDEO': {
      return {...state, ...action.payload}
    }
    case 'VIDEO_STOP_LOADING': {
      return {...state, ...action.payload}
    }
    case 'UPDATE_PROGRESS': {
      return {...state, ...action.payload}
    }
    case 'CHANGE_SLIDER_STARTED': {
      return {...state, ...action.payload}
    }
    case 'CHANGE_SLIDER_FINISHED': {
      return {...state, ...action.payload}
    }
    case 'SET_FULLSCREEN': {
      return {...state, ...action.payload}
    }
    case 'SET_SELECTED_MOVIE': {
      return {...state, selectedMovie: action.payload.selectedMovie}
    }
    case 'SET_SEARCHED_MOVIE': {
      return {
        ...state, 
        selectedMovie: action.payload.selectedMovie,
        noCoincidence: action.payload.noCoincidence,
      }
    }
    case 'NO_COINCIDENCE_FOUND': {
      return {...state, noCoincidence: action.payload.noCoincidence}
    }
    case 'SET_SEARCH_TERM': {
      return {
        ...state, 
        query: action.payload.query,
        noCoincidence: action.payload.noCoincidence}
    }
    default:
      return state;
  }
}

export default videos;