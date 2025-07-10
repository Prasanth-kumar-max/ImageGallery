// Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Modal and Tab Management
    const authModal = document.getElementById('authModal');
    const profileBtn = document.getElementById('profile-btn');
    const mobileProfileBtn = document.getElementById('mobile-profile-btn');

    function openModal(tabName) {
      authModal.style.display = 'block';
      openAuthTab(tabName);
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    }

    function closeModal() {
      authModal.style.display = 'none';
    }

    function openAuthTab(tabName) {
      document.getElementById('loginForm').classList.remove('active');
      document.getElementById('registerForm').classList.remove('active');
      document.getElementById(tabName + 'Form').classList.add('active');
      document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
      document.querySelector(`.tab-buttons button[onclick="openAuthTab('${tabName}')"]`).classList.add('active');
    }

    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
    });
    mobileProfileBtn.addEventListener('click', (e) => {
      e.preventDefault();
    });

    // Login Function
    function login() {
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      if (!username || !password) {
        alert('Please fill in all fields.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        alert(`Welcome, ${username}! Login successful.`);
        closeModal();
        document.getElementById('upload-link').classList.remove('hidden');
        document.getElementById('mobile-upload-link').classList.remove('hidden');
        profileBtn.textContent = 'Logout';
        mobileProfileBtn.textContent = 'Logout';
        profileBtn.onclick = logout;
        mobileProfileBtn.onclick = logout;
        document.querySelector('.profile-dropdown-content').innerHTML = '<a href="#" onclick="logout()">Logout</a>';
      } else {
        alert('Invalid username or password.');
      }
    }

    // Register Function
    function register() {
      const username = document.getElementById('registerUsername').value.trim();
      const password = document.getElementById('registerPassword').value.trim();
      const email = document.getElementById('registerEmail').value.trim();

      if (!username || !password || !email) {
        alert('Please fill in all fields.');
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.username === username)) {
        alert('Username already exists.');
        return;
      }

      users.push({ username, password, email });
      localStorage.setItem('users', JSON.stringify(users));
      alert(`Registration successful for ${username}. You can now log in.`);
      openAuthTab('login');
    }

    // Logout Function
    function logout() {
      alert('You have been logged out.');
      document.getElementById('upload-link').classList.add('hidden');
      document.getElementById('mobile-upload-link').classList.add('hidden');
      profileBtn.textContent = '👤';
      mobileProfileBtn.textContent = '👤';
      profileBtn.onclick = () => {};
      mobileProfileBtn.onclick = () => {};
      document.querySelector('.profile-dropdown-content').innerHTML = '<a href="#" onclick="openModal(\'login\')">Log in</a><a href="#" onclick="openModal(\'register\')">Sign up</a>';
      closeModal();
    }

    // Enter Key Support
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && authModal.style.display === 'block') {
        const activeForm = document.querySelector('.form-section.active');
        if (activeForm.id === 'loginForm') login();
        else if (activeForm.id === 'registerForm') register();
      }
    });

     // Logout Function
    function logout() {
      alert('You have been logged out.');
      document.getElementById('upload-link').classList.add('hidden');
      document.getElementById('mobile-upload-link').classList.add('hidden');
      profileBtn.textContent = '👤';
      mobileProfileBtn.textContent = '👤';
      profileBtn.onclick = () => {};
      mobileProfileBtn.onclick = () => {};
      document.querySelector('.profile-dropdown-content').innerHTML = '<a href="#" onclick="openModal(\'login\')">Log in</a><a href="#" onclick="openModal(\'register\')">Sign up</a>';
      closeModal();
    }

    // Forgot Password Function
    function forgotPassword() {
      const email = prompt('Please enter your email address to reset your password:');
      if (email && /^\S+@\S+\.\S+$/.test(email)) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        if (user) {
          alert('A password reset link has been sent to ' + email + '. Please check your inbox.');
        } else {
          alert('No account found with that email address.');
        }
      } else {
        alert('Please enter a valid email address.');
      }
    }

    // Continue with Google Function (Mock Implementation)
    function continueWithGoogle() {
      alert('Continue with Google functionality is not yet implemented. Please use username/password for now.');
      // For real implementation, integrate Google OAuth here (e.g., using Google Sign-In API)
    }

    // Enter Key Support
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && authModal.style.display === 'block') {
        const activeForm = document.querySelector('.form-section.active');
        if (activeForm.id === 'loginForm') login();
        else if (activeForm.id === 'registerForm') register();
      }
    });

  
  // Existing mobile menu, modal, and auth functions...

  // Initialize Google Sign-In
  function initGoogleSignIn() {
    window.google.accounts.id.initialize({
      client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com", // Replace with your Client ID
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.querySelector(".google-btn"),
      { theme: "outline", size: "large" } // Customize button appearance
    );
    // Optional: Render One Tap (auto-sign-in)
    window.google.accounts.id.prompt();
  }

  // Handle the response from Google Sign-In
  function handleCredentialResponse(response) {
    const idToken = response.credential;
    // Send idToken to your backend to validate and create/login user
    console.log("ID Token:", idToken);
    // Example: AJAX call to backend
    fetch("/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Login successful!");
          closeModal();
          // Update UI (e.g., show logout, unhide upload link)
          document.getElementById("upload-link").classList.remove("hidden");
          document.getElementById("mobile-upload-link").classList.remove("hidden");
          profileBtn.textContent = "Logout";
          mobileProfileBtn.textContent = "Logout";
          profileBtn.onclick = logout;
          mobileProfileBtn.onclick = logout;
          document.querySelector(".profile-dropdown-content").innerHTML =
            '<a href="#" onclick="logout()">Logout</a>';
        } else {
          alert("Login failed: " + data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Update continueWithGoogle to trigger Google Sign-In
  function continueWithGoogle() {
    // Ensure Google Sign-In is initialized
    if (window.google && window.google.accounts && !window.google.accounts.id.initialized) {
      initGoogleSignIn();
    }
    // Programmatically trigger the sign-in flow
    window.google.accounts.id.prompt((notification) => {
      if (notification.isDisplayed()) {
        console.log("Sign-in prompt displayed.");
      } else if (notification.isSkipped()) {
        console.log("Sign-in prompt skipped.");
      } else if (notification.isNotDisplayed()) {
        console.log("Sign-in prompt not displayed (e.g., already signed in).");
      }
    });
  }

  // Call initGoogleSignIn when the page loads
  window.onload = function () {
    initGoogleSignIn();
    // Existing event listeners...
  };

  // Existing login, register, logout, and other functions...
// Open modal and set active tab


  


