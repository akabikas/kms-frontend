const updateNotification = async (token, userID, notificationID, status) => {
  try {
    const url = `http://localhost:3000/api/notifications?id=${userID}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: notificationID, status }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to update notification",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error while updating notification",
    };
  }
};

export default updateNotification;
