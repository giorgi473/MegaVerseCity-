# Reusable Header Component

ეს არის მრავალჯერადი გამოყენების ჰედერის კომპონენტი, რომელიც შექმნილია vanilla HTML, CSS და JavaScript-ით.

## როგორ გამოვიყენოთ

### 1. ფაილების სტრუქტურა

\`\`\`
project/
├── css/
│ └── style.css
├── js/
│ ├── header-component.js
│ └── header.js
├── index.html
├── profile.html
└── settings.html
\`\`\`

### 2. ნებისმიერ გვერდზე ჰედერის დამატება

თქვენს HTML ფაილში უბრალოდ დაამატეთ:

\`\`\`html

<!DOCTYPE html>
<html lang="ka">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>თქვენი გვერდის სათაური</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <!-- Header ავტომატურად ჩაისვამს აქ -->
    
    <main class="main-container">
      <!-- თქვენი კონტენტი -->
    </main>

    <!-- ჰედერის სკრიპტები -->
    <script src="js/header-component.js"></script>
    <script src="js/header.js"></script>

  </body>
</html>
\`\`\`

### 3. ფუნქციონალობა

ჰედერი შეიცავს:

- ლოგოს და ნავიგაციას
- თემის გადამრთველს (მუქი/ნათელი)
- მომხმარებლის ავატარს და dropdown მენიუს
- მობილური მენიუს (burger menu)
- ავატარის ატვირთვის ფუნქციას
- გამოსვლის ფუნქციას

### 4. კასტომიზაცია

ჰედერის შესაცვლელად, შეცვალეთ `js/header-component.js` ფაილში `headerHTML` ცვლადი.

ნავიგაციის ლინკების შესაცვლელად, განაახლეთ:
\`\`\`html

<nav class="navigation">
  <a href="index.html" class="nav-link">მთავარი</a>
  <a href="profile.html" class="nav-link">პროფილი</a>
  <a href="settings.html" class="nav-link">პარამეტრები</a>
</nav>
