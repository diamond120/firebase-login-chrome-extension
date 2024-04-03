interface AppState {
  scrapedData: any;
  urlData: any;
}

const initialState : AppState = {
  scrapedData: [],
  urlData: []
};

const rootReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_SCRAPED_DATA':
      return {
        ...state,
        scrapedData: [...state.scrapedData, action.payload],
      };
    case 'SET_URL_DATA':
      return {
        ...state,
        urlData: [...state.urlData, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
