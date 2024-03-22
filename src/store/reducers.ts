interface AppState {
  scrapedData: any;
}

const initialState : AppState = {
  scrapedData: [],
};

const rootReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_SCRAPED_DATA':
      return {
        ...state,
        scrapedData: [...state.scrapedData, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
