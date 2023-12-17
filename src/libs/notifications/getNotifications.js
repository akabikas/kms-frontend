const getAllNotifications = async (token, userID, status = '') => {
    try {
      let url = `http://localhost:3000/api/notifications?id=${userID}`;
      
      if (status) {
        url += `&status=${status}`;
      }
  
      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Failed to get notifications",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error while getting notifications",
      };
    }
  };
  
  
  export default getAllNotifications;
  