export enum ActionType {
  SET_SCRAPED_DATA = 'SET_SCRAPED_DATA',
  SET_URL_DATA = 'SET_URL_DATA',
}

export interface Action {
  type: ActionType;
  payload: any;
};

export const setScrapedData = (data: any) : Action => ({
  type: ActionType.SET_SCRAPED_DATA,
  payload: data,
});

export const setUrlData = (data: any) : Action => ({
  type: ActionType.SET_URL_DATA,
  payload: data,
});
