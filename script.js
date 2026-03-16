// Dark Mode Toggle with persistence
function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

// Restore saved theme or follow system preference
(function () {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// Close mobile menu on link click
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            var menu = document.querySelector('.nav-links');
            if (menu) menu.classList.remove('active');
        });
    });

// Close email dropdown when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.email-dropdown.open').forEach(function(dd) {
            if (!dd.contains(e.target) && !dd.previousElementSibling.contains(e.target)) {
                dd.classList.remove('open');
            }
        });
    });
});
