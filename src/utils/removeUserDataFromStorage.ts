function removeUserDataFromStorage() {
  localStorage.removeItem('userData');
  window.dispatchEvent(new CustomEvent('localStorageChange'));
}

export default removeUserDataFromStorage;
