class FooterComponent {
  constructor() {
    this.footerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <p class="footer-copyright">&copy; 2025 ციფრული მომავალი. ყველა უფლება დაცულია.</p>
        </div>
      </footer>
    `;
  }

  init() {
    document.body.insertAdjacentHTML("beforeend", this.footerHTML);
  }
}

window.FooterComponent = new FooterComponent();

document.addEventListener("DOMContentLoaded", () => {
  window.FooterComponent.init();
});
