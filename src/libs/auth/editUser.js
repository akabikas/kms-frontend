const editUser = async (data, userID, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/edit-user-personal?id=${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
              name: data.fullname,
              email: data.email,
              biography: data.biography
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Failed to update your information",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error while deleting updating personal info",
      };
    }
  };
  
  export default editUser;
  