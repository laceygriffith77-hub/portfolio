var menu = document.querySelector('#mobile-menu');
var menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

const tabs = document.querySelectorAll('.portfolio-tab');
  const panels = document.querySelectorAll('.portfolio-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      const isActive = tab.classList.contains('active');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));

      if (!isActive) {
        tab.classList.add('active');
        targetPanel.classList.add('active');
      }
    });
  });

