document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");
  const additionalSectionTab1 = document.querySelector("#tab1-section");
  const dynamicContentTab1 = document.querySelector("#dynamic-content");
  const descriptionSectionTab1 = document.querySelector("#tab1-description");
  const descriptionContentTab1 = document.querySelector("#description-content");
  const ctaSectionTab1 = document.querySelector("#tab1-cta");
  const ctaContentTab1 = document.querySelector("#cta-content");
  const additionalSectionTab2 = document.querySelector("#tab2-section");
  const dynamicContentTab2 = document.querySelector("#tab2-dynamic-content");

  // Data arrays for sections
  const sectionsTab1 = [
    {
      type: "row",
      title: "ჩვენი სერვისის უპირატესობები",
      descriptions: [
        "1. მაღალი ხარისხის მომსახურება ყველა კლიენტისთვის.",
        "2. სწრაფი და ეფექტური გადაწყვეტილებები.",
        "3. პერსონალიზებული მიდგომა თქვენს საჭიროებებზე.",
      ],
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      imageAlt: "Service Image 1",
      reverse: false,
    },
    {
      type: "row",
      title: "რატომ ავირჩიოთ ჩვენ",
      descriptions: [
        "1. გამოცდილი გუნდი თქვენს სამსახურში.",
        "2. თანამედროვე ტექნოლოგიების გამოყენება.",
        "3. მუდმივი მხარდაჭერა 24/7.",
        "4. კონკურენტული ფასები ხარისხის გარანტიით.",
      ],
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      imageAlt: "Service Image 2",
      reverse: true,
    },
    {
      type: "row",
      title: "ჩვენი უნიკალური მიდგომა",
      descriptions: [
        "1. ინოვაციური გადაწყვეტილებები თქვენი ბიზნესისთვის.",
        "2. მოქნილი და მარტივი თანამშრომლობა.",
        "3. გრძელვადიანი პარტნიორობა.",
      ],
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      imageAlt: "Service Image 3",
      reverse: false,
    },
    {
      type: "description",
      title: "ჩვენი მისია",
      descriptions: [
        "ჩვენი მიზანია მივაწოდოთ თქვენს ბიზნესს საუკეთესო გადაწყვეტილებები, რომლებიც ხელს უწყობს თქვენს წარმატებას. ჩვენ ვმუშაობთ თქვენთან ერთად, რათა შევქმნათ ისეთი სერვისები, რომლებიც თქვენს საჭიროებებს სრულად პასუხობს.",
      ],
      imageUrl: null,
      imageAlt: null,
      reverse: false,
    },
    {
      type: "cta",
      title: "შემოგვიერთდით",
      descriptions: ["აღმოაჩინეთ ჩვენი სერვისების სრული პოტენციალი დღესვე!"],
      buttonText: "დაგვიკავშირდით",
      imageUrl: null,
      imageAlt: null,
      reverse: false,
    },
  ];

  const sectionsTab2 = [
    {
      type: "row",
      title: "ჩვენი სერვისი 2-ის უპირატესობები",
      descriptions: [
        "1. მოწინავე ტექნოლოგიების ინტეგრაცია.",
        "2. სწრაფი და ეფექტური მომსახურება.",
        "3. მომხმარებლისთვის მორგებული გადაწყვეტილებები.",
        "4. 24/7 მხარდაჭერა ყველა კლიენტისთვის.",
      ],
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      imageAlt: "Service 2 Image",
      reverse: false,
    },
  ];

  // Function to render additional section content for Tab 1
  function renderAdditionalSectionTab1() {
    dynamicContentTab1.innerHTML = ""; // Clear existing content
    const wrapper = document.createElement("div");
    wrapper.className = "section-wrapper";

    sectionsTab1.forEach((section) => {
      if (section.type === "row") {
        const row = document.createElement("div");
        row.className = `section-row${section.reverse ? " reverse" : ""}`;

        const imageDiv = document.createElement("div");
        imageDiv.className = "section-image";
        const img = document.createElement("img");
        img.src = section.imageUrl;
        img.alt = section.imageAlt;
        imageDiv.appendChild(img);

        const textDiv = document.createElement("div");
        textDiv.className = "section-text";
        const title = document.createElement("h3");
        title.textContent = section.title;
        textDiv.appendChild(title);
        section.descriptions.forEach((desc) => {
          const p = document.createElement("p");
          p.textContent = desc;
          textDiv.appendChild(p);
        });

        row.appendChild(imageDiv);
        row.appendChild(textDiv);

        wrapper.appendChild(row);
      }
    });

    dynamicContentTab1.appendChild(wrapper);
  }

  // Function to render description section content for Tab 1
  function renderDescriptionSectionTab1() {
    descriptionContentTab1.innerHTML = ""; // Clear existing content
    const wrapper = document.createElement("div");
    wrapper.className = "description-wrapper";

    const descriptionSectionData = sectionsTab1.find(
      (section) => section.type === "description"
    );
    if (descriptionSectionData) {
      const title = document.createElement("h3");
      title.textContent = descriptionSectionData.title;
      wrapper.appendChild(title);
      descriptionSectionData.descriptions.forEach((desc) => {
        const p = document.createElement("p");
        p.textContent = desc;
        wrapper.appendChild(p);
      });
    }

    descriptionContentTab1.appendChild(wrapper);
  }

  // Function to render call-to-action section content for Tab 1
  function renderCallToActionSectionTab1() {
    ctaContentTab1.innerHTML = ""; // Clear existing content
    const wrapper = document.createElement("div");
    wrapper.className = "cta-wrapper";

    const ctaSectionData = sectionsTab1.find(
      (section) => section.type === "cta"
    );
    if (ctaSectionData) {
      const title = document.createElement("h3");
      title.textContent = ctaSectionData.title;
      wrapper.appendChild(title);
      ctaSectionData.descriptions.forEach((desc) => {
        const p = document.createElement("p");
        p.textContent = desc;
        wrapper.appendChild(p);
      });
      const button = document.createElement("button");
      button.className = "cta-button";
      button.textContent = ctaSectionData.buttonText;
      wrapper.appendChild(button);
    }

    ctaContentTab1.appendChild(wrapper);
  }

  // Function to render additional section content for Tab 2
  function renderAdditionalSectionTab2() {
    dynamicContentTab2.innerHTML = ""; // Clear existing content
    const wrapper = document.createElement("div");
    wrapper.className = "section-wrapper";

    sectionsTab2.forEach((section) => {
      if (section.type === "row") {
        const row = document.createElement("div");
        row.className = `section-row${section.reverse ? " reverse" : ""}`;

        const imageDiv = document.createElement("div");
        imageDiv.className = "section-image";
        const img = document.createElement("img");
        img.src = section.imageUrl;
        img.alt = section.imageAlt;
        imageDiv.appendChild(img);

        const textDiv = document.createElement("div");
        textDiv.className = "section-text";
        const title = document.createElement("h3");
        title.textContent = section.title;
        textDiv.appendChild(title);
        section.descriptions.forEach((desc) => {
          const p = document.createElement("p");
          p.textContent = desc;
          textDiv.appendChild(p);
        });

        row.appendChild(imageDiv);
        row.appendChild(textDiv);

        wrapper.appendChild(row);
      }
    });

    dynamicContentTab2.appendChild(wrapper);
  }

  // Function to update tab and section visibility
  function updateTabs(activeTabId) {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));
    document
      .querySelector(`[data-tab="${activeTabId}"]`)
      .classList.add("active");
    document.getElementById(activeTabId).classList.add("active");

    if (activeTabId === "tab1") {
      additionalSectionTab1.classList.add("active");
      descriptionSectionTab1.classList.add("active");
      ctaSectionTab1.classList.add("active");
      additionalSectionTab2.classList.remove("active");
      renderAdditionalSectionTab1();
      renderDescriptionSectionTab1();
      renderCallToActionSectionTab1();
      dynamicContentTab2.innerHTML = "";
    } else if (activeTabId === "tab2") {
      additionalSectionTab1.classList.remove("active");
      descriptionSectionTab1.classList.remove("active");
      ctaSectionTab1.classList.remove("active");
      additionalSectionTab2.classList.add("active");
      dynamicContentTab1.innerHTML = "";
      descriptionContentTab1.innerHTML = "";
      ctaContentTab1.innerHTML = "";
      renderAdditionalSectionTab2();
    }
  }

  // Set initial state based on active tab
  const initialActiveTab = document
    .querySelector(".tab.active")
    .getAttribute("data-tab");
  updateTabs(initialActiveTab);

  // Handle tab clicks
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      updateTabs(tabId);
    });
  });
});
