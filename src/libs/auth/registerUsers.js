const registerUser = async (data, token) => {
  try {
    const formData = new FormData();
    formData.append('name', data.fullname);
    formData.append('email', data.email);
    formData.append('biography', data.biography);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('organisation', data.organisation);
    formData.append('profilePicture', data.profilePicture); 
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      const error = await response.json();
      return { success: false, error: error.message || 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error: error.message || 'Error during registration' };
  }
};

export default registerUser;
