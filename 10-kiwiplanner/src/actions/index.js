import { SET_CARDS_VISIBLE } from "./types";

export const setCardsVisible = mode => {
  return { type: SET_CARDS_VISIBLE, payload: mode };
};
