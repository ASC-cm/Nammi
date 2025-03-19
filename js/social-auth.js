// ✅ Google Authentication
function handleGoogleLogin() {
  google.accounts.id.prompt(); // Open Google login prompt
}

// Google Callback Function
function handleGoogleCallback(response) {
  const token = response.credential; // Get JWT token
  axios
    .post("https://yourbackend.com/api/auth/google", { token })
    .then((response) => {
      console.log("Google Login Successful:", response.data);
      Toastify({
        text: "Google Login Successful!",
        backgroundColor: "green",
      }).showToast();
      window.location.href = "/select-role.html"; // Redirect user
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
      Toastify({
        text: "Google Login Failed!",
        backgroundColor: "red",
      }).showToast();
    });
}

// Initialize Google Login on Page Load
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleGoogleCallback,
  });
};

// ✅ Apple Authentication
function handleAppleLogin() {
  AppleID.auth
    .signIn()
    .then((response) => {
      console.log("Apple Login Success:", response);
      Toastify({
        text: "Apple Login Successful!",
        backgroundColor: "green",
      }).showToast();
      window.location.href = "/select-role.html"; // Redirect user
    })
    .catch((error) => {
      console.error("Apple Login Error:", error);
      Toastify({
        text: "Apple Login Failed!",
        backgroundColor: "red",
      }).showToast();
    });
}
