export default {
  async InputMobileonSubmit() {
    try {
      // Step 1: Check if the new mobile number already exists
      const checkResult = await check_user_mobile_number_exist.run();
      
      if (checkResult[0]?.count > 0) {
        showAlert("This mobile number is already in use. Please enter a different number.", "warning");
        return; // Stop execution if mobile number already exists
      }
      
      // Step 2: Update the mobile number
      const updateResult = await update_user_mobileNumber.run();
      
      if (updateResult) {
        showAlert("Mobile number updated successfully!", "success");
      } else {
        showAlert("Failed to update mobile number. Try again.", "error");
      }
      
    } catch (error) {
      showAlert("An error occurred: " + error.message, "error");
    }
  }
};