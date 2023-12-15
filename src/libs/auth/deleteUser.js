const deleteUser = async (token, userID) => {
    try {
      const response = await fetch('http://localhost:3000/api/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: userID
        }),
      });
  
      if (response.ok) {
        const data = await response.json();

        console.log(data)
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to delete users' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error while deleting the user' };
    }
  };
  
  export default deleteUser;
  