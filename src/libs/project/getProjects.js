const getAllProjects = async (token, user) => {
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
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
        return { success: false, error: error.message || 'Failed to get projects' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error during project retrieval' };
    }
  };
  
  export default getAllProjects;
  