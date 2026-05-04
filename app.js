var menu = document.querySelector('#mobile-menu');
var menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

const tabs = document.querySelectorAll(".portfolio-tab");
const panels = document.querySelectorAll(".portfolio-panel");

function openPortfolioTab(targetId) {
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  panels.forEach((panel) => {
    panel.classList.remove("active");
  });

  const activeTab = document.querySelector(`.portfolio-tab[data-target="${targetId}"]`);
  const activePanel = document.getElementById(targetId);

  if (activeTab && activePanel) {
    activeTab.classList.add("active");
    activePanel.classList.add("active");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.getAttribute("data-target");
    openPortfolioTab(targetId);
    history.replaceState(null, "", `#${targetId}`);
  });
});

const startingTab = window.location.hash.replace("#", "");

if (startingTab) {
  openPortfolioTab(startingTab);
}

const imageLinks = document.querySelectorAll(".project-images a");
const imageModal = document.getElementById("image-modal");
const imageModalImg = document.getElementById("image-modal-img");
const imageModalClose = document.getElementById("image-modal-close");

if (imageModal && imageModalImg && imageModalClose && imageLinks.length > 0) {
  imageLinks.forEach((link) => {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const image = link.querySelector("img");

      imageModalImg.src = link.getAttribute("href");
      imageModalImg.alt = image ? image.alt : "Expanded portfolio image";

      imageModal.classList.add("active");
    });
  });

  function closeImageModal() {
    imageModal.classList.remove("active");
    imageModalImg.src = "";
    imageModalImg.alt = "";
  }

  imageModalClose.addEventListener("click", closeImageModal);

  imageModal.addEventListener("click", function(event) {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && imageModal.classList.contains("active")) {
      closeImageModal();
    }
  });
}
