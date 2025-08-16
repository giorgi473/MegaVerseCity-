// Reusable Header Component
class HeaderComponent {
  constructor() {
    const isInPagesDirectory = window.location.pathname.includes("/pages/");
    const basePath = isInPagesDirectory ? "../" : "";

    this.headerHTML = `
      <header class="header">
        <div class="header-container">
          <div class="logo-container">
            <h1 class="header-title">ციფრული მომავალი</h1>
          </div>
          <div class="burger-menu" onclick="window.HeaderComponent.toggleBurgerMenu()">
            <svg
              class="burger-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              class="close-icon hidden"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div class="right-section">
            <nav class="navigation">
              <!-- Removed SPA navigation, using simple links -->
              <a href="${basePath}dashboard.html" class="nav-link">მთავარი</a>
              <a href="${basePath}pages/profile.html" class="nav-link">პროფილი</a>
              <a href="${basePath}pages/settings.html" class="nav-link">პარამეტრები</a>
            </nav>
            <div class="theme-toggle" onclick="window.HeaderComponent.toggleTheme()">
              <svg
                class="theme-icon dark-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg
                class="theme-icon light-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <div class="user-section">
              <div class="avatar-container" onclick="window.HeaderComponent.toggleDropdown()">
                <img
                  id="avatarImg"
                  class="avatar hidden"
                  src=""
                  alt="Avatar"
                />
                <div id="avatarInitials" class="avatar-initials">მმ</div>
              </div>
              <div id="dropdownMenu" class="dropdown">
                <label class="dropdown-item" for="avatarUpload">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  ატვირთვა
                </label>
                <div
                  id="deleteAvatar"
                  class="dropdown-item hidden"
                  onclick="window.HeaderComponent.deleteAvatar()"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M6 6h12v12a2 2 0 0 1-2-2V6z" />
                  </svg>
                  სურათის წაშლა
                </div>
                <div class="dropdown-item" onclick="window.HeaderComponent.logout()">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  გამოსვლა
                </div>
              </div>
            </div>
          </div>
          <div id="mobileMenu" class="mobile-menu">
            <nav class="navigation-mobile">
              <!-- Removed SPA navigation from mobile menu -->
              <a href="${basePath}dashboard.html" class="nav-link">მთავარი</a>
              <a href="${basePath}pages/profile.html" class="nav-link">პროფილი</a>
              <a href="${basePath}pages/settings.html" class="nav-link">პარამეტრები</a>
            </nav>
            <div class="theme-toggle-mobile" onclick="window.HeaderComponent.toggleTheme()">
              <svg
                class="theme-icon dark-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg
                class="theme-icon light-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <div class="user-section-mobile">
              <div class="avatar-container" onclick="window.HeaderComponent.toggleMobileDropdown()">
                <img
                  id="avatarImgMobile"
                  class="avatar hidden"
                  src=""
                  alt="Avatar"
                />
                <div id="avatarInitialsMobile" class="avatar-initials">მმ</div>
              </div>
            </div>
            <div id="dropdownMenuMobile" class="dropdown-mobile">
              <div class="dropdown-item" onclick="window.HeaderComponent.triggerFileUpload()">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                ატვირთვა
              </div>
              <div
                id="deleteAvatarMobile"
                class="dropdown-item hidden"
                onclick="window.HeaderComponent.deleteAvatar()"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M6 6h12v12a2 2 0 0 1-2-2V6z" />
                </svg>
                სურათის წაშლა
              </div>
              <div class="dropdown-item" onclick="window.HeaderComponent.logout()">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                გამოსვლა
              </div>
            </div>
          </div>
        </div>
      </header>
      <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        class="hidden"
        onchange="window.HeaderComponent.handleAvatarUpload(event)"
      />
    `;
  }

  // Initialize header component
  init() {
    // Insert header HTML at the beginning of body
    document.body.insertAdjacentHTML("afterbegin", this.headerHTML);

    // Add padding-top to body to account for fixed header
    document.body.style.paddingTop = "80px";

    // Initialize user avatar and theme
    this.initializeUserAvatar();
    this.initializeTheme();
    this.initializeEventListeners();
    this.setActiveNavigation();
  }

  initializeUserAvatar() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      this.updateUserAvatar(loggedInUser);
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light");
    }
  }

  initializeEventListeners() {
    document.addEventListener("click", (event) => {
      const userSection = document.querySelector(".user-section");
      const userSectionMobile = document.querySelector(".user-section-mobile");
      const mobileMenu = document.getElementById("mobileMenu");
      const burgerMenu = document.querySelector(".burger-menu");

      if (userSection && !userSection.contains(event.target)) {
        document.getElementById("dropdownMenu").classList.remove("active");
      }

      if (
        userSectionMobile &&
        !userSectionMobile.contains(event.target) &&
        !mobileMenu.classList.contains("active")
      ) {
        document
          .getElementById("dropdownMenuMobile")
          .classList.remove("active");
      }

      if (
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        !burgerMenu.contains(event.target)
      ) {
        mobileMenu.classList.remove("active");
        burgerMenu.classList.remove("active");
      }
    });
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const linkPath = new URL(link.href).pathname;

      // Check if current page matches the link
      if (currentPath === linkPath) {
        link.classList.add("active");
      }
      // Handle home page cases - when we're on root or index.html and link points to index.html
      else if (
        (currentPath === "/" ||
          currentPath === "/index.html" ||
          currentPath.endsWith("/index.html")) &&
        linkPath.endsWith("/index.html")
      ) {
        link.classList.add("active");
      }
      // Handle pages directory navigation
      else if (
        currentPath.includes("/pages/profile.html") &&
        linkPath.includes("/pages/profile.html")
      ) {
        link.classList.add("active");
      } else if (
        currentPath.includes("/pages/settings.html") &&
        linkPath.includes("/pages/settings.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  updateUserAvatar(user) {
    const nameParts = user.name.trim().split(" ");
    let initials = "";
    if (nameParts.length >= 1) {
      initials += nameParts[0][0]?.toUpperCase() || "";
    }
    if (nameParts.length >= 2) {
      initials += nameParts[1][0]?.toUpperCase() || "";
    }

    // Update desktop avatar
    const avatarImg = document.getElementById("avatarImg");
    const avatarInitials = document.getElementById("avatarInitials");
    const deleteAvatarItem = document.getElementById("deleteAvatar");

    const avatarImgMobile = document.getElementById("avatarImgMobile");
    const avatarInitialsMobile = document.getElementById(
      "avatarInitialsMobile"
    );
    const deleteAvatarItemMobile =
      document.getElementById("deleteAvatarMobile");

    if (avatarInitials) avatarInitials.textContent = initials || "??";
    if (avatarInitialsMobile)
      avatarInitialsMobile.textContent = initials || "??";

    if (user.avatar) {
      if (avatarImg) {
        avatarImg.src = user.avatar;
        avatarImg.classList.remove("hidden");
      }
      if (avatarInitials) avatarInitials.classList.add("hidden");
      if (deleteAvatarItem) deleteAvatarItem.classList.remove("hidden");

      if (avatarImgMobile) {
        avatarImgMobile.src = user.avatar;
        avatarImgMobile.classList.remove("hidden");
      }
      if (avatarInitialsMobile) avatarInitialsMobile.classList.add("hidden");
      if (deleteAvatarItemMobile)
        deleteAvatarItemMobile.classList.remove("hidden");
    } else {
      if (avatarImg) avatarImg.classList.add("hidden");
      if (avatarInitials) avatarInitials.classList.remove("hidden");
      if (deleteAvatarItem) deleteAvatarItem.classList.add("hidden");

      if (avatarImgMobile) avatarImgMobile.classList.add("hidden");
      if (avatarInitialsMobile) avatarInitialsMobile.classList.remove("hidden");
      if (deleteAvatarItemMobile)
        deleteAvatarItemMobile.classList.add("hidden");
    }
  }

  toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    if (dropdown) dropdown.classList.toggle("active");
  }

  toggleMobileDropdown() {
    const dropdown = document.getElementById("dropdownMenuMobile");
    if (dropdown) dropdown.classList.toggle("active");
  }

  handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarDataUrl = e.target.result;
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        loggedInUser.avatar = avatarDataUrl;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        this.updateUserAvatar(loggedInUser);

        document.getElementById("dropdownMenu").classList.remove("active");
        document
          .getElementById("dropdownMenuMobile")
          .classList.remove("active");
      };
      reader.readAsDataURL(file);
    }
  }

  deleteAvatar() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    delete loggedInUser.avatar;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    this.updateUserAvatar(loggedInUser);

    document.getElementById("dropdownMenu").classList.remove("active");
    document.getElementById("dropdownMenuMobile").classList.remove("active");
  }

  logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = window.location.origin + "/index.html";
  }

  toggleTheme() {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  toggleBurgerMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const burgerMenu = document.querySelector(".burger-menu");

    if (mobileMenu) mobileMenu.classList.toggle("active");
    if (burgerMenu) burgerMenu.classList.toggle("active");
  }

  triggerFileUpload() {
    document.getElementById("avatarUpload").click();
  }
}

// Create global instance
window.HeaderComponent = new HeaderComponent();

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.HeaderComponent.init();
});
