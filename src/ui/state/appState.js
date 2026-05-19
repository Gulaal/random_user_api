export const appState = {
  currentUser: null,
  listeners: [],
  
  setUser(user) {
    this.currentUser = user;
    this.notify();
  },
  
  subscribe(listener) {
    this.listeners.push(listener);
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
};