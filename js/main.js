(function () {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

    // Responsive nav toggle (hamburger)
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-navigation');
    if (navToggle && nav) {
        function toggleNav() {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        }
        navToggle.addEventListener('click', toggleNav);
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // Simple carousel for projects page
    const carousel = document.querySelector('[data-carousel]');
    if (carousel) {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const slides = Array.from(track.children);
        const dotsContainer = carousel.querySelector('[data-carousel-dots]');
        let index = 0;

        function update() {
            const offset = -index * carousel.clientWidth;
            track.style.transform = `translateX(${offset}px)`;
            // Dots
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.setAttribute('aria-selected', String(i === index));
                dot.setAttribute('tabindex', i === index ? '0' : '-1');
            });
        }

        // Setup dots
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-label', `Show slide ${i + 1}`);
            b.addEventListener('click', () => { index = i; update(); });
            dotsContainer.appendChild(b);
        });

        function next() { index = (index + 1) % slides.length; update(); }
        function prev() { index = (index - 1 + slides.length) % slides.length; update(); }

        nextBtn?.addEventListener('click', next);
        prevBtn?.addEventListener('click', prev);
        window.addEventListener('resize', update);

        // Keyboard support
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });

        update();
    }

    // Contact form validation
    const form = document.getElementById('contact-form');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const success = document.getElementById('form-success');

        function setError(id, message) {
            const el = document.getElementById(id);
            if (el) el.textContent = message;
        }

        function validateEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            setError('name-error', '');
            setError('email-error', '');
            setError('message-error', '');

            if (!nameInput.value.trim()) { setError('name-error', 'Please enter your name.'); valid = false; }
            if (!emailInput.value.trim()) { setError('email-error', 'Please enter your email.'); valid = false; }
            else if (!validateEmail(emailInput.value.trim())) { setError('email-error', 'Please enter a valid email.'); valid = false; }
            if (!messageInput.value.trim()) { setError('message-error', 'Please enter a message.'); valid = false; }

            if (valid) {
                success.hidden = false;
                form.reset();
            }
        });
    }
})();


