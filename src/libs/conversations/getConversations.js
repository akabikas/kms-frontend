const getAllConversations = async (token, user) => {
    try {
      const response = await fetch('http://localhost:3000/api/get-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to get converstaions' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error during converstaions retrieval' };
    }
  };
  
  export default getAllConversations;
  