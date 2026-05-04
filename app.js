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
