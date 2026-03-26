document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') body.classList.add('light-mode');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // --- Language Switcher ---
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'jp';

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-en][data-jp]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        localStorage.setItem('lang', lang);
    };

    updateLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'jp' ? 'en' : 'jp';
        updateLanguage(currentLang);
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Image Modal (Enlarge) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');

    document.querySelectorAll('.gallery-item img, .gui-card img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            const caption = this.parentElement.querySelector('.caption') || this.parentElement.querySelector('h3');
            captionText.innerText = caption ? caption.innerText : "";
        }
    });

    const closeBtn = document.querySelector(".close");
    closeBtn.onclick = () => modal.style.display = "none";

    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none";
    };
});
