/**
 * Portfolio — Johm Mark F. Lim
 * Main JavaScript: theme, language, navigation, scroll animations
 */

const translations = {
    en: {
        hero_desc: "3rd year Information Technology student passionate about crafting clean, responsive interfaces and turning designs into functional web and mobile experiences."
    },
    tl: {
        hero_desc: "3rd year Information Technology student na passionate sa paggawa ng malinis at responsive na interfaces, at pagiging functional ng mga design sa web at mobile."
    }
};

function setLanguage(lang) {
    document.getElementById('btn-en').classList.toggle('lang-active', lang === 'en');
    document.getElementById('btn-tl').classList.toggle('lang-active', lang === 'tl');
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    document.getElementById('hero-desc').textContent = translations[lang].hero_desc;
}

function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getPreferredTheme());
    setLanguage('en');

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile').addEventListener('click', toggleTheme);

    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('open');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('open');
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.fade-up, .stagger-parent').forEach(el => revealObs.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const scrollObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector(`.nav-link[data-section="${e.target.id}"]`)?.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(s => scrollObs.observe(s));
});
