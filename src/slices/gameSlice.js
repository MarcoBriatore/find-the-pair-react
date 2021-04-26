import { createSlice } from '@reduxjs/toolkit';
import shuffleArray from '../utils/shuffleArray'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    picked: [],
    flipped: [],
    level: null,
    cards: [],
    locked: null
  },
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload
      state.flipped = []

      for(let i = 0; i < state.level*state.level; i++) {
        state.flipped[i] = false;
      }
      state.cards = [...Array(Math.floor(state.level*state.level/2)).keys()]
      state.cards = [...state.cards, ...state.cards]
      shuffleArray(state.cards)
    },
    removeLevel: (state) => {
      state.level = null
    },
    flipAll: (state) => {
      state.flipped.forEach((el, index) => state.flipped[index] = true);
    },
    unflipAll: (state) => {
      state.flipped.forEach((el, index) => state.flipped[index] = false);
    },
    flip: (state, action) => {
      state.flipped[action.payload] = true;
    },
    unflip: (state, action) => {
      state.flipped[action.payload] = false;
    },
    pick: (state, action) => {
      state.picked.push(action.payload)
    },
    unpick: (state) => {
      state.picked = []
    },
    lock: (state, action) => {
      state.locked = action.payload
    },
    unlock: (state) => {
      state.locked = null
    }
  },
})

export const { setLevel, removeLevel } = gameSlice.actions

const { flipAll, unflipAll, pick, flip, unflip, unpick, lock, unlock } = gameSlice.actions

export const selectLevel = state => state.game.level

export const isFinished = state =>  {
  for (let card_is_flipped of state.game.flipped) {
    if(!card_is_flipped) return false
  }
  return !state.game.locked;
}

export const pickCard = index => (dispatch, getState) => {
  let state = getState().game
  if(state.flipped[index]) {
    return
  }
  if(state.locked != null) {
    clearTimeout(state.locked)
    state.picked.forEach(
      index => dispatch(unflip(index))
    )
    dispatch(unpick())
    dispatch(unlock())
    state = getState().game
  };
 
  if(state.picked.length === 0) {
    dispatch(pick(index))
    dispatch(flip(index))
  }
  else if(state.picked.length === 1) {
    if (state.picked[0] === index) {
      return;
    }
    else if(state.cards[state.picked[0]] === state.cards[index]) {
      dispatch(flip(index))
      dispatch(unpick())
    }
    else {
      dispatch(pick(index))
      dispatch(flip(index))
      dispatch(lock(setTimeout(() => {
        let state = getState().game
        state.picked.forEach(index => dispatch(unflip(index)))
        dispatch(unpick())
        dispatch(unlock())
      }, 1000)))
    }
  }
}

export const initGame = level => dispatch => {
  dispatch(lock(setTimeout(() => {
    dispatch(unflipAll());
    dispatch(unlock())
  }, 3000)))
  dispatch(setLevel(level));
  dispatch(flipAll());
}

export const endGame = () => dispatch => {
  dispatch(removeLevel())
}

export default gameSlice.reducer;
