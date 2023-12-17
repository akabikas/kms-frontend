const editAvatar = async (data, userID, token) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", data);
  
      const response = await fetch(
        `http://localhost:3000/api/edit-user-avatar?id=${userID}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
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
  
  export default editAvatar;