document.addEventListener("DOMContentLoaded", function () {
  const avatarImg = document.getElementById("avatarImg");
  const avatarInitials = document.getElementById("avatarInitials");
  const welcomeText = document.getElementById("welcomeText");
  const deleteAvatarItem = document.getElementById("deleteAvatar");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    // Extract first letters of first name and last name
    const nameParts = loggedInUser.name.trim().split(" ");
    let initials = "";
    if (nameParts.length >= 1) {
      initials += nameParts[0][0]?.toUpperCase() || "";
    }
    if (nameParts.length >= 2) {
      initials += nameParts[1][0]?.toUpperCase() || "";
    }
    avatarInitials.textContent = initials || "??";

    if (loggedInUser.avatar) {
      avatarImg.src = loggedInUser.avatar;
      avatarImg.classList.remove("hidden");
      avatarInitials.classList.add("hidden");
      deleteAvatarItem.classList.remove("hidden");
    } else {
      avatarImg.classList.add("hidden");
      avatarInitials.classList.remove("hidden");
      deleteAvatarItem.classList.add("hidden");
    }

    welcomeText.textContent = `კეთილი იყოს თქვენი მობრძანება, ${loggedInUser.name}!`;
  } else {
    window.location.href = "index.html";
  }
});

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("active");
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const avatarDataUrl = e.target.result;
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      loggedInUser.avatar = avatarDataUrl;
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      document.getElementById("avatarImg").src = avatarDataUrl;
      document.getElementById("avatarImg").classList.remove("hidden");
      document.getElementById("avatarInitials").classList.add("hidden");
      document.getElementById("deleteAvatar").classList.remove("hidden");
      toggleDropdown(); // Close dropdown after upload
    };
    reader.readAsDataURL(file);
  }
}

function deleteAvatar() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  delete loggedInUser.avatar;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  document.getElementById("avatarImg").classList.add("hidden");
  document.getElementById("avatarInitials").classList.remove("hidden");
  document.getElementById("deleteAvatar").classList.add("hidden");
  toggleDropdown(); // Close dropdown after deletion
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../../index.html";
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const userSection = document.querySelector(".user-section");
  if (!userSection.contains(event.target)) {
    document.getElementById("dropdownMenu").classList.remove("active");
  }
});
