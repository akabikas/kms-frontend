const loginUser = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error: error.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Error during login' };
    }
  };
  
  export default loginUser;
  