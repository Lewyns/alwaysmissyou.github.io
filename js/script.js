// Custom Cursor
const cursor = document.querySelector('.circle-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const speed = 0.1;

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * speed;
    cursorY += dy * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                });
            });
        });
    }
});

// Smooth Scrolling (updated for only two sections)
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id="about"], section[id="skills"]');
    const navLinks = document.querySelectorAll('nav a');
    
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // ลบด้วยความสูงของ header เพื่อไม่ให้ถูกบัง
                behavior: 'smooth'
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});