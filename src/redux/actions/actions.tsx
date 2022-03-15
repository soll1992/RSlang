import {
  CHANGE_SERIA,
  FROM_MENU,
  FROM_TEXTBOOK,
  SELECT_AUDIOCHALLENGE,
  SELECT_SPRINT,
  CHANGE_DIFFICULTY,
  CHANGE_PAGE,
  TITLE_CHANGE,
} from './consts';

export function changeDifficulty(payload: number) {
  return { type: CHANGE_DIFFICULTY, payload };
}

export function changePage(payload: number) {
  return { type: CHANGE_PAGE, payload };
}

export function selectSprint(payload: string) {
  return { type: SELECT_AUDIOCHALLENGE, payload };
}

export function selectAudiochallenge(payload: string) {
  return { type: SELECT_SPRINT, payload };
}

export function fromMenu() {
  return { type: FROM_MENU };
}

export function fromTextbook() {
  return { type: FROM_TEXTBOOK };
}

export function changeSeria(payload: number) {
  return { type: CHANGE_SERIA, payload };
}
export function titleChange(payload: string) {
  return { type: TITLE_CHANGE, payload };
}
