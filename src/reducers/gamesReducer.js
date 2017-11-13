import * as c from "../actions/constants";

const initialState = {
  list: [
    {
      id: "1",
      name: "Fotbal",
      genre: "BALL_GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "2",
      name: "Basketbal",
      genre: "BALL_GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "3",
      name: "Hokej",
      genre: "BALL_GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "4",
      name: "Hra",
      genre: "GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "5",
      name: "Hra",
      genre: "GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "6",
      name: "Hra",
      genre: "GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "7",
      name: "Hra",
      genre: "GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    },
    {
      id: "8",
      name: "Hra",
      genre: "GAME",
      created: 1510000000000,
      modes: "Nějaké módy",
      publisher: "Vydavatel hry"
    }
  ],
  activeGame: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.GAMES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
