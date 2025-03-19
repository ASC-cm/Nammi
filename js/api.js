//signup api
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Send signup request
      const response = await axios.post(
        "https://backend-url.com/api/signup",
        {
          email,
          password,
        }
      );

      showToast("OTP sent! Verify your email.", "success");

      // Redirect to OTP verification page (pass email as a query param)
      setTimeout(() => {
        window.location.href = `otp-verification.html?email=${encodeURIComponent(
          email
        )}`;
      }, 1500);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Signup failed. Try again.",
        "error"
      );
    }
  });

  // Toast function
  function showToast(message, type = "error") {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: type === "success" ? "#28a745" : "#ff5f57",
    }).showToast();
  }
});


  //login api
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await axios.post(
      "https://backend-url.com/api/login",
      {
        email,
        password,
      }
    );

    console.log("Login successful:", response.data);
    localStorage.setItem("token", response.data.token); 
    window.location.href = "select-role.html"; 
  } catch (error) {
    showToast(error);
  }
});

// Toggle Password Visibility
document
  .getElementById("togglePassword")
  ?.addEventListener("click", function () {
    const passwordInput = document.getElementById("login-password");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  });

// Toast Error Display Function
function showToast(error) {
  const errorMessage = error.response
    ? error.response.data.message || "Invalid login credentials"
    : "Network error!";

  Toastify({
    text: errorMessage,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: "#ff5f57",
  }).showToast();
}


//OTP verification api
document.addEventListener("DOMContentLoaded", function () {
  const otpInputs = document.querySelectorAll(".otp-input");
  const verifyBtn = document.querySelector(".verify-btn");
  const successModal = document.getElementById("successModal");
  const proceedBtn = document.querySelector(".proceed-btn");

  // Get email from URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  verifyBtn.addEventListener("click", async () => {
    const otp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("");

    if (otp.length < 5) {
      showToast("Please enter a complete OTP code.");
      return;
    }

    try {
      // Send OTP verification request
      const response = await axios.post(
        "https://backend-url.com/api/verify-otp",
        { email, otp }
      );

      showToast("Account verified! You can now log in.", "success");

      setTimeout(() => {
        successModal.style.display = "block";
      }, 500);
    } catch (error) {
      showToast("Invalid OTP. Please try again.", "error");
    }
  });

  proceedBtn.addEventListener("click", () => {
    window.location.href = "login.html"; // Redirect to login page
  });

  function showToast(message, type = "error") {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: type === "success" ? "#28a745" : "#ff5f57",
    }).showToast();
  }
});

//forgot password api
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("forgot-password")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.getElementById("forgot-email").value.trim();

      if (!email) {
        showToast("Please enter your email!", "error");
        return;
      }

      try {
        const response = await fetch("/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast("OTP sent! Redirecting...", "success");

          // Redirect to OTP Verification page
          setTimeout(() => {
            window.location.href = `otp-verification.html?email=${encodeURIComponent(
              email
            )}`;
          }, 2000);
        } else {
          showToast(data.message || "Failed to send OTP!", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        showToast("Something went wrong. Try again!", "error");
      }
    });

  // Reset Password Form
  document
    .getElementById("reset-password")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const newPassword = document.getElementById("reset-password-new").value;
      const confirmPassword = document.getElementById(
        "reset-password-confirm"
      ).value;

      if (!newPassword || !confirmPassword) {
        showToast("Please fill all fields!", "error");
        return;
      }

      if (newPassword !== confirmPassword) {
        showToast("Passwords do not match!", "error");
        return;
      }

      try {
        const response = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast("Password reset successful! Redirecting...", "success");

          // Redirect to login page
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        } else {
          showToast(data.message || "Failed to reset password!", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        showToast("Something went wrong. Try again!", "error");
      }
    });
});

// Function to show toast messages
function showToast(message, type) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
  }).showToast();
}
