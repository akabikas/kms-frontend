const getEmailsById = async (token, id) => {
  try {
    console.log(id)
    const response = await fetch(`http://localhost:3000/api/emails?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to get converstaions",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error during converstaions retrieval",
    };
  }
};

export default getEmailsById;
