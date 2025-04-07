export default {
	async login() {
		if (!MobileInput.text || !PasswordInput.text) {
			showAlert('Please enter both username and password', 'warning');
			return;
		}
		try {
			const setCookieHeader = LoginApi.responseMeta;
			let authToken = '';
			if (setCookieHeader && setCookieHeader.length > 0) {
				const cookieString = setCookieHeader[0];
				const tokenMatch = cookieString.match(/auth_token=([^;]+)/);
				authToken = tokenMatch ? tokenMatch[1] : '';
			}
			if (authToken) {
				await storeValue('auth_token', authToken);
				showAlert('Login successful', 'success');
				MobileInput.setText('');
				PasswordInput.setValue('');
				navigateTo('Users');
			}
		} catch (error) {
			showAlert('Login failed: ' + error.message, 'error');
		}
	}
}