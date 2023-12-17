const editPassword = async (data, userID, token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/edit-user-password?id=${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
              oldPass: data.oldPass,
              newPass: data.newPass,
              confirmNewPass: data.confirmNewPass
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
          error: error.message || "Failed to update your password",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error while updating your password.",
      };
    }
  };
  
  export default editPassword;
  