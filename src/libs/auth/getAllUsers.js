const getAllUsers = async (token, user) => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
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
        return { success: false, error: error.message || 'Failed to get users' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error during user retrieval' };
    }
  };
  
  export default getAllUsers;
  