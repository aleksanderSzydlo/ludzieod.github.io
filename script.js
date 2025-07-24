document.addEventListener('DOMContentLoaded', function() {

    // Płynne przewijanie do sekcji
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dodanie cienia do nawigacji podczas przewijania
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Symulacja wysłania formularza
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            // Prosta walidacja dla przykładu
            if (name.trim() === '' || document.getElementById('email').value.trim() === '' || document.getElementById('message').value.trim() === '') {
                 alert('Proszę wypełnić wszystkie pola formularza.');
                 return;
            }

            // Wyświetlenie komunikatu dla użytkownika
            alert(`Dziękujemy za wiadomość, ${name}! Skontaktujemy się z Tobą wkrótce.`);
            
            // Wyczyszczenie formularza
            contactForm.reset();
        });
    }

    // Lightbox dla galerii
    createLightbox();

});

function createLightbox() {
    // Stworzenie elementów lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-description"></p>
            </div>
            <button class="lightbox-prev">&#8249;</button>
            <button class="lightbox-next">&#8250;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Pobierz wszystkie obrazy z galerii
    const galleryItems = document.querySelectorAll('.gallery-item');
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        title: item.querySelector('.gallery-overlay h3').textContent,
        description: item.querySelector('.gallery-overlay p').textContent
    }));

    let currentImageIndex = 0;

    // Dodaj event listenery do obrazów galerii
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox();
        });
    });

    // Funkcja pokazywania lightbox
    function showLightbox() {
        const image = images[currentImageIndex];
        lightbox.querySelector('.lightbox-image').src = image.src;
        lightbox.querySelector('.lightbox-image').alt = image.alt;
        lightbox.querySelector('.lightbox-title').textContent = image.title;
        lightbox.querySelector('.lightbox-description').textContent = image.description;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Wyłącz scroll
    }

    // Funkcja ukrywania lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Włącz scroll
    }

    // Następny obraz
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightbox();
    }

    // Poprzedni obraz
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightbox();
    }

    // Event listenery
    lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
    lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);

    // Zamknij po kliknięciu na tło
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });

    // Klawiatura
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    hideLightbox();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
}
