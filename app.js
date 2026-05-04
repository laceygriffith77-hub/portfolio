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

if (document.querySelector('form')) {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted, sending to Formspree...');
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xdayvbrq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        console.log('Success, redirecting to thanks.html');
        window.location.href = 'thanks.html';
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    }
  });
}

// Redirect from thanks.html after 5 seconds
if (window.location.pathname.includes('thanks.html')) {
  setTimeout(function() {
    window.location.href = 'index.html';
  }, 5000);
}
