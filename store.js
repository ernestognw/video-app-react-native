import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './reducers/videos';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blackList: [
    'selectedMovie',
  ]
}

const persistedReducer = persistReducer(persistConfig, reducer)

// const store = createStore(
//   reducer, 
//   initialState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
// )

const state = {
  // suggestionList: [],       // Lista de sugerencias
  // categoryList: [],         // Lista de categorías
  suggestionLoading: true,  // Estado de carga de la lista de sugerencias
  categoryLoading: true,    // Estado de carga de la lista de categorías
  videoLoading: true,       // Estado de carga del video
  // paused: false,            // Indicador de pausa
  // progress: 0,              // Progreso del video entre 0 y 1
  // currentTime: '0:00',      // Tiempo actual en segundos
  duration: 0,              // Duración del vídeo en segundos
  // changeActive: false,      // Activo mientras se cambia la posición del vídeo
  // fullscreen: false,        // Estado de fullscreen
  // selectedMovie: null,      // Movie to Display
  query: '',                // Término buscado
  noCoincidence: false,     // Indica si no hay coincidencia de búsqueda  
}

const store = createStore(
  persistedReducer,
  state,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistor = persistStore(store)

export { store, persistor };