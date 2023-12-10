import SessionStorageService from "../../services/sessionStorage";

const logoutUser = async ({token}) => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        SessionStorageService.removeItem('token')
        SessionStorageService.removeItem('user')
        return { success: true, message: 'Logout successful' };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Logout failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error during logout' };
    }
  };
  
  export default logoutUser;
  