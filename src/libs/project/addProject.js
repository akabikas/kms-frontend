const addProject = async (data, token) => {
  try {
    const formData = new FormData();
    data.assignedTo.forEach((assignedId, index) => {
      formData.append(`assignedTo[${index}]`, assignedId);
    });

    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("name", data.title);
    formData.append("emailConversation", data.assignedEmail)

    data.documents.forEach((file) => {
      formData.append("documents", file.fileObject, file.originalname);
    });

    const response = await fetch("http://localhost:3000/api/add-project", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to add the project",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error while adding project",
    };
  }
};

export default addProject;
