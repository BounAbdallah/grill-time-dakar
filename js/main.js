/**
 * GRILL TIME DAKAR — Main Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Reveal on Scroll (Intersection Observer) ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--active');
                // stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. Mobile Menu Toggle ---
    const burger = document.querySelector('.nav__burger');
    const mobileMenu = document.querySelector('.nav__mobile');
    const nav = document.querySelector('.nav');
    
    if (burger) {
        burger.addEventListener('click', () => {
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
            
            if (mobileMenu) {
                mobileMenu.classList.toggle('nav__mobile--active');
                mobileMenu.setAttribute('aria-hidden', isExpanded);
            }
            
            // Animation for burger lines
            burger.classList.toggle('nav__burger--active');
        });
    }

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('nav__mobile--active');
            burger.classList.remove('nav__burger--active');
        });
    });


    // --- 3. Sticky Navigation Scroll Effect ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        // Optional: Hide nav on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translate(-50%, -150%)';
        } else {
            nav.style.transform = 'translate(-50%, 0)';
        }
        
        lastScroll = currentScroll;
    });


    // --- 4. Hero Title Staggered Animation ---
    // Specifically targets the .hero__title-line elements for a refined entrance
    const heroTitleLines = document.querySelectorAll('.hero__title-line');
    heroTitleLines.forEach((line, index) => {
        line.style.transitionDelay = `${index * 0.2}s`;
    });


    // --- 5. Magnetic CTA Button Effect (Simple version) ---
    const magneticBtns = document.querySelectorAll('.btn--primary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });


    // --- 6. Form Submission Handling (Mock) ---
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = reservationForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerText = 'Reservation Confirmee !';
                submitBtn.style.background = '#27ae60';
                submitBtn.style.borderColor = '#27ae60';
                
                setTimeout(() => {
                    reservationForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }

});
