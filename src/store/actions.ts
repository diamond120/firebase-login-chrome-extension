export enum ActionType {
  SET_SCRAPED_DATA = 'SET_SCRAPED_DATA',
}

export interface Action {
  type: ActionType;
  payload: any;
};

export const setScrapedData = (data: any) : Action => ({
  type: ActionType.SET_SCRAPED_DATA,
  payload: data,
});
