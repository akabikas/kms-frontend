const deleteProject = async (token, projectID) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete-project?id=${projectID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Failed to delete project' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error while deleting the project' };
    }
  };
  
  export default deleteProject;
  