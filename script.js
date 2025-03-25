document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'linear',
        once: true
    });

    const showcaseItems = document.querySelectorAll('.showcase-item');
    let currentIndex = 0;
    const transitionSpeed = 3000; // Increased from 1500 to 2000 milliseconds

    // Preload all images for smooth playback
    function preloadImages() {
        showcaseItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.style.display = 'block';
                item.style.display = 'flex';
            }
        });
    }

    function showItem(index) {
        // Remove all classes first
        showcaseItems.forEach(item => {
            item.classList.remove('active', 'exit-left', 'exit-right');
        });

        // Get current and next items
        const currentItem = showcaseItems[currentIndex];
        const nextItem = showcaseItems[index];

        // Always move from right to left
        if (currentItem) {
            currentItem.classList.add('exit-left');
        }

        // Show next item
        if (nextItem) {
            nextItem.classList.add('active');
        }

        currentIndex = index;

        // Schedule next transition
        setTimeout(() => {
            // Always go to next item, or back to first if at end
            const nextIndex = (currentIndex + 1) % showcaseItems.length;
            showItem(nextIndex);
        }, transitionSpeed);
    }

    // Initialize
    preloadImages();
    showcaseItems[0].classList.add('active');

    // Start the sequence
    setTimeout(() => {
        showItem(1);
    }, 100);

    // Keyboard navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % showcaseItems.length;
            showItem(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            const nextIndex = (currentIndex - 1 + showcaseItems.length) % showcaseItems.length;
            showItem(nextIndex);
        }
    });

    // Smooth keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % showcaseItems.length;
            currentIndex = nextIndex;
            showItem(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            const nextIndex = (currentIndex - 1 + showcaseItems.length) % showcaseItems.length;
            currentIndex = nextIndex;
            showItem(nextIndex);
        }
    });

    // Subtle parallax effect
    document.addEventListener('mousemove', (e) => {
        const activeItem = document.querySelector('.showcase-item.active img');
        if (!activeItem) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 150;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 150;

        activeItem.style.transform = `scale(1.02) translate(${xAxis}px, ${yAxis}px)`;
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        const activeItem = document.querySelector('.showcase-item.active img');
        if (activeItem) {
            activeItem.style.transform = 'scale(1)';
        }
    });

    // Header Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Smooth scroll handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Update navigation active state
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Floating elements animation
    const floatingIcons = document.querySelector('.floating-icons');
    const createFloatingIcon = () => {
        const icon = document.createElement('img');
        icon.src = 'assets/3D Icons.png';
        icon.alt = '3D Icon';
        icon.classList.add('floating-element');
        icon.style.left = Math.random() * 100 + '%';
        icon.style.top = Math.random() * 100 + '%';
        icon.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        icon.style.opacity = Math.random() * 0.5 + 0.3;
        floatingIcons.appendChild(icon);

        // Remove icon after animation
        setTimeout(() => {
            icon.remove();
        }, 6000);
    };

    // Create initial floating icons
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingIcon, i * 1000);
    }

    // Continuously create new floating icons
    setInterval(createFloatingIcon, 3000);

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Navigation highlighting
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('contactModal');
    const modalContent = modal.querySelector('.modal-content');
    const knowMoreLink = document.querySelector('.know-more-link');
    const closeButton = document.querySelector('.modal-close');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    knowMoreLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent clicks inside modal content from closing the modal
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Enhanced Smooth Scroll Animation
    const imageShowcase = document.querySelector('.image-showcase');
    const aboutSection = document.querySelector('.about-section');
    const aboutContent = document.querySelector('.about-content');
    
    let lastScrollY = window.scrollY;
    let currentTranslateY = 0;
    let targetTranslateY = 0;
    let scrollVelocity = 0;
    let animationFrame;
    let scrollProgress = 0;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function smoothScroll() {
        // Calculate scroll velocity
        const scrollDelta = window.scrollY - lastScrollY;
        scrollVelocity = clamp(scrollDelta, -50, 50);
        
        // Calculate scroll progress (0 to 1)
        scrollProgress = clamp(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 0, 1);
        
        // Calculate target position with dynamic parallax factor
        const baseParallaxFactor = 0.5; // Reduced from 0.65 to match character.studio
        const velocityFactor = Math.abs(scrollVelocity) / 50;
        const dynamicParallaxFactor = baseParallaxFactor + (velocityFactor * 0.1);
        
        targetTranslateY = -window.scrollY * dynamicParallaxFactor;
        
        // Smooth transition using lerp with variable smoothness
        const baseSmoothFactor = 0.08; // Reduced for smoother animation
        const velocitySmoothFactor = velocityFactor * 0.04;
        const smoothFactor = baseSmoothFactor + velocitySmoothFactor;
        
        currentTranslateY = lerp(currentTranslateY, targetTranslateY, smoothFactor);
        
        // Apply transform with eased value
        const scale = 1 + (scrollProgress * 0.1); // Subtle scale effect
        imageShowcase.style.transform = `translate3d(0, ${currentTranslateY}px, 0) scale(${scale})`;
        
        // Update about section
        if (window.scrollY > window.innerHeight * 0.5) {
            aboutSection.style.transform = `translateY(${-window.innerHeight * 0.4}px)`;
        } else {
            aboutSection.style.transform = 'translateY(0)';
        }
        
        // Show about content when it comes into view
        const aboutRect = aboutSection.getBoundingClientRect();
        if (aboutRect.top < window.innerHeight * 0.8) {
            aboutContent.classList.add('visible');
        }
        
        lastScrollY = window.scrollY;
        
        // Continue animation
        animationFrame = requestAnimationFrame(smoothScroll);
    }

    // Optimized scroll handler with debounce
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(smoothScroll);
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }, 150);
    }, { passive: true });

    // Initialize scroll position
    smoothScroll();

    // Add smooth mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function updateMouseParallax() {
        currentMouseX = lerp(currentMouseX, mouseX, 0.05);
        currentMouseY = lerp(currentMouseY, mouseY, 0.05);
        
        const activeItem = document.querySelector('.showcase-item.active img');
        if (activeItem) {
            const translateX = currentMouseX * 20;
            const translateY = currentMouseY * 20;
            activeItem.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(1.05)`;
        }
        
        requestAnimationFrame(updateMouseParallax);
    }

    updateMouseParallax();
});