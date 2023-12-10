const SessionStorageService = {
    setItem: (key, value) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting item in session storage:', error);
      }
    },
  
    getItem: (key) => {
      try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error getting item from session storage:', error);
        return null;
      }
    },
  
    getAllItems: () => {
      try {
        const keys = Object.keys(sessionStorage);
        const items = keys.reduce((acc, key) => {
          const item = sessionStorage.getItem(key);
          acc[key] = item ? JSON.parse(item) : null;
          return acc;
        }, {});
        return items;
      } catch (error) {
        console.error('Error getting all items from session storage:', error);
        return null;
      }
    },
  
    removeItem: (key) => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from session storage:', error);
      }
    },
  };
  
  export default SessionStorageService;
  