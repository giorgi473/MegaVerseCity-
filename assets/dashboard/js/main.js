window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Hide loader after minimum display time
  setTimeout(() => {
    loader.classList.add("hidden");

    // Remove loader from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 1500); // Show loader for at least 1.5 seconds
});

document.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.getElementById("avatarImg");
  const avatarInitials = document.getElementById("avatarInitials");
  const deleteAvatarItem = document.getElementById("deleteAvatar");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    updateUserAvatar(loggedInUser);
  }

  const heroImage = document.getElementById("heroImage");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = 500;
    const maxTilt = 40;

    const tiltAngle = Math.min((scrollY / maxScroll) * maxTilt, maxTilt);

    heroImage.style.transform = `rotateX(${tiltAngle}deg)`;
  });
});

function updateUserAvatar(user) {
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
  const avatarInitialsMobile = document.getElementById("avatarInitialsMobile");
  const deleteAvatarItemMobile = document.getElementById("deleteAvatarMobile");

  avatarInitials.textContent = initials || "??";
  avatarInitialsMobile.textContent = initials || "??";

  if (user.avatar) {
    avatarImg.src = user.avatar;
    avatarImg.classList.remove("hidden");
    avatarInitials.classList.add("hidden");
    deleteAvatarItem.classList.remove("hidden");

    avatarImgMobile.src = user.avatar;
    avatarImgMobile.classList.remove("hidden");
    avatarInitialsMobile.classList.add("hidden");
    deleteAvatarItemMobile.classList.remove("hidden");
  } else {
    avatarImg.classList.add("hidden");
    avatarInitials.classList.remove("hidden");
    deleteAvatarItem.classList.add("hidden");

    avatarImgMobile.classList.add("hidden");
    avatarInitialsMobile.classList.remove("hidden");
    deleteAvatarItemMobile.classList.add("hidden");
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("active");
}

function toggleMobileDropdown() {
  const dropdown = document.getElementById("dropdownMenuMobile");
  dropdown.classList.toggle("active");
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const avatarDataUrl = e.target.result;
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      loggedInUser.avatar = avatarDataUrl;
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      updateUserAvatar(loggedInUser);

      document.getElementById("dropdownMenu").classList.remove("active");
      document.getElementById("dropdownMenuMobile").classList.remove("active");
    };
    reader.readAsDataURL(file);
  }
}

function deleteAvatar() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  delete loggedInUser.avatar;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  updateUserAvatar(loggedInUser);

  document.getElementById("dropdownMenu").classList.remove("active");
  document.getElementById("dropdownMenuMobile").classList.remove("active");
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../../index.html";
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

function toggleBurgerMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const burgerMenu = document.querySelector(".burger-menu");

  mobileMenu.classList.toggle("active");
  burgerMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
});

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
    document.getElementById("dropdownMenuMobile").classList.remove("active");
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

function triggerFileUpload() {
  document.getElementById("avatarUpload").click();
}
