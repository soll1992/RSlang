import {MUTE_GAME, UNMUTE_GAME, SELECT_AUDIOCHALLENGE, SELECT_SPRINT, CHANGE_DIFFICULTY, CHANGE_PAGE } from './consts';

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

export function muteGame() {
  return { type: MUTE_GAME };
}

export function unMuteGame() {
  return { type: UNMUTE_GAME };
}