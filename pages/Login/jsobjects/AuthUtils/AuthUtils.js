export default {
  signin: async () => {
    try {
      await login_api.run(); // Run the login query
      const headers = login_api.responseMeta.headers; // Access response headers
      const setCookie = headers['Set-Cookie']; // Get the Set-Cookie header
			console.log(setCookie[0])
      let token = null;

      if (setCookie) {
        // Extract token from Set-Cookie (it's a string with attributes)
        const cookieParts = setCookie[0].split(';');
        const authTokenPart = cookieParts.find(part => part.trim().startsWith('auth_token='));
        if (authTokenPart) {
          token = authTokenPart.split('=')[1]; // Extract the token value after "auth_token="
        }
      }

      if (token) {
        storeValue('auth_token', token); // Store the token in Appsmith
        navigateTo('Users'); // Redirect to admin panel
      } else {
        showAlert('No auth_token found in Set-Cookie header', 'error');
      }
    } catch (error) {
      showAlert('Login failed: ' + error.message, 'error');
    }
  }
}