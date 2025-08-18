document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  // User avatar setup
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    updateUserAvatar(loggedInUser);
  }

  // Hero image scroll effect
  const heroImage = document.getElementById("heroImage");
  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const maxTilt = 40;
      const tiltAngle = Math.min((scrollY / maxScroll) * maxTilt, maxTilt);
      heroImage.style.transform = `rotateX(${tiltAngle}deg)`;
    });
  }

  // Vision Cards Interactivity
  const visionCards = document.querySelectorAll(".vision-card");
  visionCards.forEach((card, index) => {
    // Set card image based on data-tech
    const tech = card.dataset.tech;
    const cardImage = card.querySelector(".card-image");
    if (cardImage && techData[tech]) {
      cardImage.src = techData[tech].imageUrl;
      cardImage.alt = `${techData[tech].title} illustration`;
      cardImage.onerror = () => {
        console.warn(
          `Failed to load card image: ${techData[tech].imageUrl}, using fallback`
        );
        cardImage.src = fallbackImageUrl;
      };
    }

    // 3D Tilt Effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (centerY - y) / 20;
      const tiltY = (x - centerX) / 20;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;

      // Move particles with mouse
      const particles = card.querySelectorAll(".particle");
      particles.forEach((particle) => {
        const px = (x - centerX) / 50;
        const py = (y - centerY) / 50;
        particle.style.transform = `translate(${px}px, ${py}px)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      const particles = card.querySelectorAll(".particle");
      particles.forEach((particle) => {
        particle.style.transform = "translate(0, 0)";
      });
    });

    // Card Flip on Click
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card-cta")) {
        card.classList.toggle("flipped");
      }
    });

    // Keyboard Navigation
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });

    // Swipe Gesture for Mobile
    let touchStartX = 0;
    card.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    card.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (Math.abs(touchEndX - touchStartX) > 50) {
        card.classList.toggle("flipped");
      }
    });

    // Progress Circle Animation
    const progressCircle = card.querySelector(".progress-ring__circle");
    const progressText = card.querySelector(".progress-text");
    if (progressCircle && progressText) {
      const progressValue = parseInt(progressText.textContent);
      const radius = progressCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      progressCircle.style.strokeDashoffset = circumference;
      const offset = circumference - (progressValue / 100) * circumference;
      setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
      }, index * 200);
    }

    // Modal Trigger
    const ctaButton = card.querySelector(".card-cta");
    if (ctaButton) {
      ctaButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const tech = card.dataset.tech;
        console.log(`Opening modal for tech: ${tech}`);
        if (tech) {
          openModal(tech);
        } else {
          console.error("No data-tech attribute found on card:", card);
        }
      });
    } else {
      console.error("No .card-cta button found in card:", card);
    }

    // Particle Animation
    const particlesContainer = card.querySelector(".card-particles");
    if (particlesContainer) {
      particlesContainer.innerHTML = "";
      const particleCount = 10;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
      }
    }
  });

  // Accordion Interactivity
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = header.getAttribute("aria-expanded") === "true";

      // Close all other accordion items
      accordionHeaders.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.setAttribute("aria-expanded", "false");
          otherHeader.nextElementSibling.classList.remove("active");
        }
      });

      // Toggle current accordion item
      header.setAttribute("aria-expanded", !isOpen);
      content.classList.toggle("active");
    });

    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Modal Handling
  const modal = document.getElementById("visionModal");
  const modalClose = modal?.querySelector(".modal-close");
  if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
      console.log("Closing modal via close button");
      closeModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        console.log("Closing modal via background click");
        closeModal();
      }
    });

    // Focus trapping for accessibility
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, img, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        console.log("Closing modal via Escape key");
        closeModal();
      }
    });
  } else {
    console.error("Modal or modal-close not found in DOM");
  }
});

// Mock data for modal content with image URLs
const techData = {
  ai: {
    title: "ხელოვნური ინტელექტი",
    description:
      "ხელოვნური ინტელექტი (AI) ხსნის ახალ შესაძლებლობებს მონაცემთა ანალიზის, ავტომატიზაციისა და პერსონალიზაციის სფეროში. ის გარდაქმნის ინდუსტრიებს, როგორიცაა ჯანდაცვა, განათლება და ფინანსები, და საშუალებას აძლევს მანქანებს ისწავლონ, მოიფიქრონ და იმოქმედონ ადამიანის მსგავსად. AI-ის მეშვეობით ჩვენ ვქმნით უფრო ჭკვიან, ეფექტურ და ინოვაციურ სამყაროს.",
    imageUrl:
      "https://zenitech.co.uk/wp-content/uploads/2023/08/Introduction.jpg",
    progress: 85,
    stats: {
      impact: "90%",
      adoption: "80%",
      innovation: "95%",
    },
  },
  web3: {
    title: "Web3",
    description:
      "Web3 წარმოადგენს ინტერნეტის ახალ ეპოქას, რომელიც ეფუძნება ბლოკჩეინის ტექნოლოგიას. ის უზრუნველყოფს დეცენტრალიზებულ, გამჭვირვალე და უსაფრთხო გარემოს, სადაც მომხმარებლები ფლობენ თავიანთ მონაცემებს და იღებენ კონტროლს ციფრულ სამყაროზე. Web3 ხელს უწყობს ნდობისა და თანამშრომლობის ახალ ერას.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/024/674/636/small_2x/web-3-0-concept-with-businessman-in-suit-on-gradient-background-technology-and-web-concept-3-0-technology-global-network-website-internet-development-photo.jpg",
    progress: 70,
    stats: {
      impact: "85%",
      adoption: "65%",
      innovation: "90%",
    },
  },
  quantum: {
    title: "კვანტური გამოთვლები",
    description:
      "კვანტური გამოთვლები იყენებს კვანტური მექანიკის პრინციპებს, რათა გადაჭრას რთული ამოცანები, რომლებიც ტრადიციული კომპიუტერებისთვის შეუძლებელია. ეს ტექნოლოგია პოტენციურად გარდაქმნის კრიპტოგრაფიას, მასალების მეცნიერებასა და ხელოვნურ ინტელექტს, გვთავაზობს გამოთვლითი სიჩქარის ახალ დონეს.",
    imageUrl:
      "https://www.assetservicingtimes.com/assetservicesnews/images/FridaySeptember820231694183881.jpg",
    progress: 60,
    stats: {
      impact: "80%",
      adoption: "50%",
      innovation: "85%",
    },
  },
  biotech: {
    title: "ბიოტექნოლოგია",
    description:
      "ბიოტექნოლოგია ზრდის სამედიცინო ინოვაციებს, როგორიცაა გენური თერაპია, პერსონალიზებული მედიცინა და ორგანოების რეგენერაცია. ეს ტექნოლოგია გარდაქმნის ჯანდაცვის სფეროს, გვთავაზობს გადაწყვეტილებებს რთული დაავადებებისა და ხანგრძლივი სიცოცხლისთვის.",
    imageUrl:
      "https://www.ystu.ru/upload/iblock/743/3n2vqvrqpk77s0015f9qkt1s8x1y556f/5e10bbb48dda3948673412.jpeg",
    progress: 75,
    stats: {
      impact: "85%",
      adoption: "70%",
      innovation: "80%",
    },
  },
  arvr: {
    title: "AR/VR",
    description:
      "გაძლიერებული და ვირტუალური რეალობა (AR/VR) ქმნის ჩაძირვის გამოცდილებას განათლებაში, გართობასა და ტრენინგში. ეს ტექნოლოგიები ცვლიან ჩვენს ურთიერთქმედებას ციფრულ სამყაროსთან, გვთავაზობენ ახალ გზებს სწავლის, შემოქმედებისა და გართობისთვის.",
    imageUrl:
      "https://educentr-kudrovo.vsevobr.ru/images/Images/News/2021/3010/21.10.13.jpg",
    progress: 65,
    stats: {
      impact: "75%",
      adoption: "60%",
      innovation: "80%",
    },
  },
  spacetech: {
    title: "კოსმოსური ტექნოლოგიები",
    description:
      "კოსმოსური ტექნოლოგიები უზრუნველყოფს მდგრად კოსმოსურ მისიებს, თანამგზავრების განვითარებასა და პოტენციურ პლანეტარულ კოლონიზაციას. ეს ინოვაციები ხსნის კაცობრიობისთვის ახალ სამყაროებს და ხელს უწყობს კოსმოსის ათვისებას.",
    imageUrl:
      "https://avatars.dzeninfra.ru/get-zen_doc/9835822/pub_64b633bacd51f30273a5a43c_64b64ec7fff5626738d7e614/scale_1200",
    progress: 55,
    stats: {
      impact: "70%",
      adoption: "50%",
      innovation: "75%",
    },
  },
};

// Fallback image URL
const fallbackImageUrl =
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80";

function openModal(tech) {
  console.log("openModal called with tech:", tech);
  const modal = document.getElementById("visionModal");
  if (!modal || !techData[tech]) {
    console.error("Modal not found or invalid tech:", tech);
    return;
  }

  const modalTitle = modal.querySelector(".modal-title");
  const modalDescription = modal.querySelector(".modal-description");
  const modalImage = modal.querySelector(".modal-image");
  const modalImageError = modal.querySelector(".modal-image-error");
  const modalProgressBar = modal.querySelector(".modal-progress-bar");
  const modalStatImpact = modal.querySelector("#modalStatImpact");
  const modalStatAdoption = modal.querySelector("#modalStatAdoption");
  const modalStatInnovation = modal.querySelector("#modalStatInnovation");
  const modalCta = modal.querySelector(".modal-cta");
  const modalForm = modal.querySelector(".modal-form");
  const modalSuccess = modal.querySelector(".modal-success");
  const modalProgress = modal.querySelector(".modal-progress");
  const modalMedia = modal.querySelector(".modal-media");
  const modalStats = modal.querySelector(".modal-stats");

  const data = techData[tech];
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalDescription) modalDescription.textContent = data.description;
  if (modalProgressBar) {
    modalProgressBar.style.width = "0%";
    setTimeout(() => {
      modalProgressBar.style.transition = "width 1s ease-in-out";
      modalProgressBar.style.width = `${data.progress}%`;
    }, 100);
  }
  if (modalStatImpact) modalStatImpact.textContent = data.stats.impact;
  if (modalStatAdoption) modalStatAdoption.textContent = data.stats.adoption;
  if (modalStatInnovation)
    modalStatInnovation.textContent = data.stats.innovation;

  // Set modal image with fallback
  if (modalImage) {
    modalImage.classList.add("hidden");
    modalImage.src = data.imageUrl;
    modalImage.alt = `${data.title} illustration`;
    modalImage.onerror = () => {
      console.warn(
        `Failed to load modal image: ${data.imageUrl}, using fallback`
      );
      modalImage.src = fallbackImageUrl;
      modalImage.onerror = () => {
        console.error(`Failed to load fallback image: ${fallbackImageUrl}`);
        modalImage.classList.add("hidden");
        if (modalImageError) {
          modalImageError.textContent = "გამოსახულების ჩატვირთვა ვერ მოხერხდა.";
          modalImageError.classList.remove("hidden");
        }
      };
      modalImage.onload = () => {
        modalImage.classList.remove("hidden");
        if (modalImageError) modalImageError.classList.add("hidden");
      };
    };
    modalImage.onload = () => {
      modalImage.classList.remove("hidden");
      if (modalImageError) modalImageError.classList.add("hidden");
    };
  }

  // Reset modal state
  modalDescription.classList.remove("hidden");
  modalProgress.classList.remove("hidden");
  modalMedia.classList.remove("hidden");
  modalStats.classList.remove("hidden");
  modalCta.classList.remove("hidden");
  modalForm.classList.add("hidden");
  modalSuccess.classList.add("hidden");
  modalTitle.textContent = data.title;

  // Participation handler
  const participateHandler = () => {
    modalDescription.classList.add("hidden");
    modalProgress.classList.add("hidden");
    modalMedia.classList.add("hidden");
    modalStats.classList.add("hidden");
    modalCta.classList.add("hidden");
    modalForm.classList.remove("hidden");
    modalForm.classList.add("active");
    modalTitle.textContent = "მონაწილეობის ფორმა";
  };

  modalCta.addEventListener("click", participateHandler);

  // Form submission
  const form = document.getElementById("participationForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const reason = document.getElementById("reason").value.trim();

    let isValid = true;

    if (!name) {
      addError("name", "სახელი სავალდებულოა");
      isValid = false;
    }

    if (!email || !validateEmail(email)) {
      addError("email", "შეიყვანეთ სწორი ელ.ფოსტა");
      isValid = false;
    }

    if (!reason) {
      addError("reason", "მიზეზი სავალდებულოა");
      isValid = false;
    }

    if (isValid) {
      // Save to localStorage
      const participationData = {
        tech: tech,
        name,
        email,
        reason,
        date: new Date().toISOString(),
      };
      let participations =
        JSON.parse(localStorage.getItem("participations")) || [];
      participations.push(participationData);
      localStorage.setItem("participations", JSON.stringify(participations));

      // Show success
      modalForm.classList.add("hidden");
      modalForm.classList.remove("active");
      modalSuccess.classList.remove("hidden");
      modalCta.textContent = "დახურვა";
      modalCta.classList.remove("hidden");
      modalCta.removeEventListener("click", participateHandler);
      modalCta.addEventListener("click", closeModal);
      modalTitle.textContent = "გილოცავთ!";
      confetti();
    }
  });

  modal.classList.remove("hidden");
  modal.classList.add("active");
  console.log("Modal opened successfully for:", tech);
  modal.focus();

  function addError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement("p");
    error.classList.add("error-message");
    error.textContent = message;
    field.after(error);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

function closeModal() {
  const modal = document.getElementById("visionModal");
  if (modal) {
    modal.classList.remove("active");
    modal.classList.add("hidden");
    console.log("Modal closed");
  }
}

function updateUserAvatar(user) {
  const avatarImg = document.getElementById("avatarImg");
  const avatarInitials = document.getElementById("avatarInitials");
  const deleteAvatarItem = document.getElementById("deleteAvatar");
  const avatarImgMobile = document.getElementById("avatarImgMobile");
  const avatarInitialsMobile = document.getElementById("avatarInitialsMobile");
  const deleteAvatarItemMobile = document.getElementById("deleteAvatarMobile");

  if (!user) return;

  const nameParts = user.name?.trim().split(" ") || [];
  let initials = "";
  if (nameParts.length >= 1) {
    initials += nameParts[0][0]?.toUpperCase() || "";
  }
  if (nameParts.length >= 2) {
    initials += nameParts[1][0]?.toUpperCase() || "";
  }
  initials = initials || "??";

  if (avatarInitials) avatarInitials.textContent = initials;
  if (avatarInitialsMobile) avatarInitialsMobile.textContent = initials;

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
    if (deleteAvatarItemMobile) deleteAvatarItemMobile.classList.add("hidden");
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  if (dropdown) {
    dropdown.classList.toggle("active");
    if (mobileMenu) mobileMenu.classList.remove("active");
  }
}

function toggleMobileDropdown() {
  const dropdown = document.getElementById("dropdownMenuMobile");
  if (dropdown) dropdown.classList.toggle("active");
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const avatarDataUrl = e.target.result;
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    loggedInUser.avatar = avatarDataUrl;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    updateUserAvatar(loggedInUser);
    document.getElementById("dropdownMenu")?.classList.remove("active");
    document.getElementById("dropdownMenuMobile")?.classList.remove("active");
  };
  reader.readAsDataURL(file);
}

function deleteAvatar() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  delete loggedInUser.avatar;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  updateUserAvatar(loggedInUser);
  document.getElementById("dropdownMenu")?.classList.remove("active");
  document.getElementById("dropdownMenuMobile")?.classList.remove("active");
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
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownMobile = document.getElementById("dropdownMenuMobile");
  if (mobileMenu) mobileMenu.classList.toggle("active");
  if (burgerMenu) burgerMenu.classList.toggle("active");
  if (dropdown) dropdown.classList.remove("active");
  if (dropdownMobile) dropdownMobile.classList.remove("active");
}

document.addEventListener("click", (event) => {
  const userSection = document.querySelector(".user-section");
  const userSectionMobile = document.querySelector(".user-section-mobile");
  const mobileMenu = document.getElementById("mobileMenu");
  const burgerMenu = document.querySelector(".burger-menu");
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownMobile = document.getElementById("dropdownMenuMobile");

  // Close dropdown if clicking outside user section
  if (userSection && !userSection.contains(event.target) && dropdown) {
    dropdown.classList.remove("active");
  }

  // Close mobile dropdown and menu if clicking outside
  if (
    userSectionMobile &&
    !userSectionMobile.contains(event.target) &&
    mobileMenu &&
    !mobileMenu.contains(event.target) &&
    !burgerMenu?.contains(event.target)
  ) {
    mobileMenu.classList.remove("active");
    if (dropdownMobile) dropdownMobile.classList.remove("active");
    if (burgerMenu) burgerMenu.classList.remove("active");
  }
});
