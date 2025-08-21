const aboutData = [
  {
    title: "შენი კარიერის მომავალი",
    descriptions: [
      "ჩვენი AI-ზე დაფუძნებული ალგორითმები გთავაზობს სამუშაოს, რომელიც შეესაბამება შენს უნარებს.",
      "ვაკავშირებთ შენს ამბიციებს თანამედროვე ინდუსტრიებთან.",
      "გარდაქმენი შენი პროფესიული გზა ჩვენი ინოვაციური პლატფორმით.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Innovation",
    reverse: false,
  },
  {
    title: "ჩვენი მისია",
    descriptions: [
      "Gojobs.ge ხელს უწყობს კავშირებს, რომლებიც ცვლის კარიერულ მომავალს თანამედროვე სამყაროში.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Collaboration",
    reverse: true,
  },
  {
    title: "ტექნოლოგიური წინსვლა",
    descriptions: [
      "ჩვენი პლატფორმა იყენებს უახლეს ტექნოლოგიებს სამუშაოს ძიების გასამარტივებლად.",
      "შევქმნათ ინოვაციური გადაწყვეტილებები შენი კარიერისთვის.",
      "აღმოაჩინე შესაძლებლობები, რომლებიც შენს მიზნებს ემსახურება.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Technology",
    reverse: false,
  },
  {
    title: "ჩვენი საზოგადოება",
    descriptions: [
      "ჩვენ ვაერთიანებთ პროფესიონალებს გლობალური შესაძლებლობებისთვის.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Community",
    reverse: true,
  },
  {
    title: "შენი შანსი",
    descriptions: [
      "Gojobs.ge გაძლევს წვდომას მრავალფეროვან კარიერულ შესაძლებლობებზე.",
      "ჩვენი ხელსაწყოები გეხმარება გამოარჩიო შენი უნარები.",
      "იპოვე სამუშაო, რომელიც შთაგაგონებს ყოველდღე.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Opportunity",
    reverse: false,
  },
  {
    title: "ინოვაციების ცენტრი",
    descriptions: [
      "ჩვენ ვქმნით სივრცეს, სადაც იდეები და შესაძლებლობები ერთმანეთს ხვდება.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Innovation Hub",
    reverse: true,
  },
  {
    title: "კარიერული ზრდა",
    descriptions: [
      "ჩვენი პლატფორმა გთავაზობს ხელსაწყოებს პროფესიული განვითარებისთვის.",
      "ვეხმარებით შენს უნარების გაძლიერებას თანამედროვე ბაზარზე.",
      "აღმოაჩინე შენი პოტენციალი ჩვენთან ერთად.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Career Growth",
    reverse: false,
  },
  {
    title: "გლობალური მიზნები",
    descriptions: [
      "Gojobs.ge გაძლევს საშუალებას, მიაღწიო გლობალურ კარიერულ მიზნებს.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Global Reach",
    reverse: true,
  },
  {
    title: "შენი გაძლიერება",
    descriptions: [
      "ჩვენი მიზანია, მოგცეთ ხელსაწყოები შენი ოცნებების სამუშაოს მისაღწევად.",
      "ვქმნით შესაძლებლობებს, რომლებიც შენს ხელშია.",
      "იპოვე სამუშაო, რომელიც შენს ცხოვრებას ცვლის.",
    ],
    image:
      "https://avatars.mds.yandex.net/i?id=8a3fcefcecb521894b3563ddd0d2ae95_l-5235970-images-thumbs&n=13",
    alt: "Empowerment",
    reverse: false,
  },
];

const aboutSection = document.getElementById("about-section");

aboutData.forEach((item) => {
  const row = document.createElement("div");
  row.className = `about-row ${item.reverse ? "reverse" : ""}`;

  const imageDiv = document.createElement("div");
  imageDiv.className = "about-image";
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.alt;
  imageDiv.appendChild(img);

  const contentDiv = document.createElement("div");
  contentDiv.className = "about-content";
  const title = document.createElement("h2");
  title.textContent = item.title;
  contentDiv.appendChild(title);

  item.descriptions.forEach((desc) => {
    const p = document.createElement("p");
    p.textContent = desc;
    contentDiv.appendChild(p);
  });

  row.appendChild(imageDiv);
  row.appendChild(contentDiv);
  aboutSection.appendChild(row);
});

// Scroll animation logic
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px", // Trigger earlier for smoother vertical scroll
  threshold: 0.15, // Increased threshold for earlier animation trigger
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Unobserve to optimize performance
    }
  });
}, observerOptions);

const sections = document.querySelectorAll(
  ".hero-section, .about-row, .new-section"
);
sections.forEach((section) => {
  observer.observe(section);
});
