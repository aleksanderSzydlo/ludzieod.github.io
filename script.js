document.addEventListener('DOMContentLoaded', function() {

    // === NOWOCZESNE EFEKTY I ANIMACJE ===
    
    // Progress bar dla przewijania
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Intersection Observer dla animacji scroll reveal
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Dodawanie delay dla kart w gridzie
                    const cards = entry.target.querySelectorAll('.service-card, .service-compact');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Obserwowanie wszystkich sekcji
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Obserwowanie kart usług
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.classList.add('animate-on-scroll');
            observer.observe(card);
        });
    }
    
    // Parallax efekt dla hero
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Smooth hover effects dla przycisków
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Typing effect dla tytułów
    function initTypingEffect() {
        const title = document.querySelector('.hero__title');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            title.style.opacity = '1';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Inicjalizacja wszystkich nowoczesnych efektów
    initScrollProgress();
    initScrollAnimations();
    initParallaxEffect();
    initButtonEffects();
    initTypingEffect();

    // Płynne przewijanie do sekcji - dla nawigacji i przycisków
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    scrollLinks.forEach(link => {
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

    // Inicjalizacja kalkulatora wycen
    initPriceCalculator();

    // Inicjalizacja galerii projektów
    initProjectsGallery();

});

// System projektów z prostym przełączaniem
function initProjectsGallery() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectsSlider = document.getElementById('projectsSlider');
    const projectsLoader = document.getElementById('projectsLoader');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const indicatorsContainer = document.getElementById('projectIndicators');
    
    let currentProjectIndex = 0;
    
    // Definicja projektów ze stałymi danymi
    const projects = [
        {
            id: 'Portfolio1',
            title: 'Projekt Eleganckich Wnętrz',
            description: 'Kolekcja najnowszych realizacji w zakresie nowoczesnych podłóg dla ekskluzywnych wnętrz mieszkalnych i komercyjnych.',
            images: [
                {
                    src: 'Galeria/Portfolio1/james-forbes-qgh5tuELdx4-unsplash.jpg',
                    alt: 'Portfolio1 - obraz 1',
                    title: 'Panele wodoodporne',
                    description: 'Kuchnia otwarta, 30m²'
                },
                {
                    src: 'Galeria/Portfolio1/jarek-ceborski-jn7uVeCdf6U-unsplash.jpg',
                    alt: 'Portfolio1 - obraz 2',
                    title: 'Parkiet jodełka',
                    description: 'Reprezentacyjny hall, 60m²'
                },
                {
                    src: 'Galeria/Portfolio1/wei-zhao-bjKNo2O7sAo-unsplash.jpg',
                    alt: 'Portfolio1 - obraz 3',
                    title: 'Posadzka PCV',
                    description: 'Biuro open-space, 120m²'
                }
            ]
        },
        {
            id: 'Portfolio2',
            title: 'Projekt Klasyczny',
            description: 'Prezentacja tradycyjnych rozwiązań podłogowych łączących ponadczasowy styl z najwyższą jakością wykonania.',
            images: [
                {
                    src: 'Galeria/Portfolio2/alex-gray-_WulGWc2aRs-unsplash.jpg',
                    alt: 'Portfolio2 - obraz 1',
                    title: 'Panele winylowe',
                    description: 'Nowoczesny salon, 45m²'
                },
                {
                    src: 'Galeria/Portfolio2/asia-culturecenter-3biXFHM4MZw-unsplash.jpg',
                    alt: 'Portfolio2 - obraz 2',
                    title: 'Posadzka żywiczna',
                    description: 'Garaż dwustanowiskowy, 40m²'
                }
            ]
        },
        {
            id: 'Portfolio3',
            title: 'Projekt Nowoczesny',
            description: 'Najnowsze trendy w dziedzinie podłóg - innowacyjne materiały i awangardowe wzornictwo.',
            images: [
                {
                    src: 'Galeria/Portfolio3/asia-culturecenter-2qv-Ot8gSIU-unsplash.jpg',
                    alt: 'Portfolio3 - obraz 1',
                    title: 'Nowoczesny design',
                    description: 'Designer loft, 80m²'
                },
                {
                    src: 'Galeria/Portfolio3/hood-klXmHLDDQWI-unsplash.jpg',
                    alt: 'Portfolio3 - obraz 2',
                    title: 'Minimalistyczne wnętrze',
                    description: 'Nowoczesny apartament, 50m²'
                },
                {
                    src: 'Galeria/Portfolio3/mitchell-luo-ubtbZcOuCwE-unsplash.jpg',
                    alt: 'Portfolio3 - obraz 3',
                    title: 'Przemysłowy styl',
                    description: 'Przestrzeń komercyjna, 150m²'
                },
                {
                    src: 'Galeria/Portfolio3/val-toch-u4PSeilirlw-unsplash.jpg',
                    alt: 'Portfolio3 - obraz 4',
                    title: 'Elegancka podłoga',
                    description: 'Reprezentacyjne biuro, 120m²'
                },
                {
                    src: 'Galeria/Portfolio3/waldemar-IFpDwnvLgpA-unsplash.jpg',
                    alt: 'Portfolio3 - obraz 5',
                    title: 'Stylowe wnętrze',
                    description: 'Nowoczesna rezydencja, 200m²'
                }
            ]
        },
        {
            id: 'Portfolio4',
            title: 'Projekt Premium',
            description: 'Ekskluzywne realizacje dla najbardziej wymagających klientów - luksusowe materiały i perfekcyjne wykonanie.',
            images: [
                {
                    src: 'Galeria/Portfolio4/andrew-neel-A9Msi-vUNKg-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 1',
                    title: 'Luksusowy parkiet',
                    description: 'Ekskluzywna willa, 300m²'
                },
                {
                    src: 'Galeria/Portfolio4/collov-home-design-xJ14RuLV9zI-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 2',
                    title: 'Designer podłoga',
                    description: 'Penthouse, 180m²'
                },
                {
                    src: 'Galeria/Portfolio4/john-salvino-yTX43WEBClE-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 3',
                    title: 'Premium winyl',
                    description: 'Luksusowy apartament, 150m²'
                },
                {
                    src: 'Galeria/Portfolio4/jorgen-berglund-BK5JSDp2Ovo-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 4',
                    title: 'Ekskluzywne wzory',
                    description: 'Boutique hotel, 500m²'
                },
                {
                    src: 'Galeria/Portfolio4/mateus-campos-felipe-c_aZgQrks8Q-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 5',
                    title: 'Artystyczne podłogi',
                    description: 'Galeria sztuki, 400m²'
                },
                {
                    src: 'Galeria/Portfolio4/sandro-kradolfer-9uzR9y_d5NU-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 6',
                    title: 'Luksusowy marmur',
                    description: 'Ekskluzywna klinika, 250m²'
                },
                {
                    src: 'Galeria/Portfolio4/steven-ungermann-CVTmLMv5oG4-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 7',
                    title: 'Premium design',
                    description: 'Luksusowy showroom, 350m²'
                },
                {
                    src: 'Galeria/Portfolio4/tommy-bond-SlpgFJWArNE-unsplash.jpg',
                    alt: 'Portfolio4 - obraz 8',
                    title: 'Najwyższa jakość',
                    description: 'Rezydencja VIP, 600m²'
                }
            ]
        }
    ];

    // Renderowanie projektów
    function renderProjects() {
        projectsLoader.style.display = 'none';
        projectsSlider.innerHTML = '';
        
        projects.forEach((project, projectIndex) => {
            const projectSlide = document.createElement('div');
            projectSlide.className = 'project-slide';
            
            projectSlide.innerHTML = `
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="gallery-grid">
                    ${project.images.map((image, imageIndex) => `
                        <div class="gallery-item" data-project="${projectIndex}" data-image="${imageIndex}">
                            <img src="${image.src}" alt="${image.alt}" loading="lazy">
                            <div class="gallery-overlay">
                                <h3>${image.title}</h3>
                                <p>${image.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            projectsSlider.appendChild(projectSlide);
        });

        // Inicjalizacja lightbox dla nowych obrazów
        initLightbox();
    }

    // Konfiguracja nawigacji
    function setupNavigation() {
        // Tworzenie wskaźników
        indicatorsContainer.innerHTML = '';
        projects.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `project-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToProject(index));
            indicatorsContainer.appendChild(indicator);
        });

        // Przyciski nawigacji
        prevBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            updateProjectView();
        });

        nextBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            updateProjectView();
        });

        // Klawiatura
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.lightbox')) return; // Nie interferuj z lightbox
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (currentProjectIndex > 0) {
                        currentProjectIndex--;
                        updateProjectView();
                    }
                    break;
                case 'ArrowRight':
                    if (currentProjectIndex < projects.length - 1) {
                        currentProjectIndex++;
                        updateProjectView();
                    }
                    break;
            }
        });

        updateNavigationButtons();
    }

    // Przejście do konkretnego projektu
    function goToProject(index) {
        currentProjectIndex = index;
        updateProjectView();
    }

    // Aktualizacja widoku projektu
    function updateProjectView() {
        const translateX = -currentProjectIndex * 100;
        projectsSlider.style.transform = `translateX(${translateX}%)`;
        
        // Dynamiczne dostosowanie wysokości kontenera do aktualnego projektu
        setTimeout(() => {
            const currentSlide = projectsSlider.children[currentProjectIndex];
            if (currentSlide) {
                const slideHeight = currentSlide.offsetHeight;
                projectsContainer.style.height = slideHeight + 'px';
            }
        }, 50); // Krótkie opóźnienie, aby elementy zdążyły się wyrenderować
        
        // Aktualizacja wskaźników
        document.querySelectorAll('.project-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentProjectIndex);
        });

        updateNavigationButtons();
    }

    // Aktualizacja stanu przycisków nawigacji
    function updateNavigationButtons() {
        prevBtn.disabled = currentProjectIndex === 0;
        nextBtn.disabled = currentProjectIndex === projects.length - 1;
    }

    // Inicjalizacja lightbox
    function initLightbox() {
        // Usuń stary lightbox jeśli istnieje
        const existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        createLightbox();
    }

    // Rozpocznij renderowanie projektów
    renderProjects();
    setupNavigation();
    
    // Inicjalizacja wysokości dla pierwszego projektu po załadowaniu
    setTimeout(() => {
        updateProjectView();
    }, 100);
    
    // Obsługa zmiany rozmiaru okna - dostosowanie wysokości galerii
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateProjectView();
        }, 100);
    });
}

// Lightbox dla galerii
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

    let currentImages = [];
    let currentImageIndex = 0;

    // Funkcja aktualizacji obrazów w lightbox
    function updateLightboxImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        currentImages = Array.from(galleryItems).map(item => ({
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt,
            title: item.querySelector('.gallery-overlay h3').textContent,
            description: item.querySelector('.gallery-overlay p').textContent
        }));

        // Dodaj event listenery do nowych obrazów galerii
        galleryItems.forEach((item, index) => {
            item.removeEventListener('click', handleImageClick); // Usuń stare listenery
            item.addEventListener('click', handleImageClick);
            item.dataset.lightboxIndex = index;
        });
    }

    // Handler kliknięcia na obraz
    function handleImageClick(e) {
        updateLightboxImages();
        currentImageIndex = parseInt(e.currentTarget.dataset.lightboxIndex);
        showLightbox();
    }

    // Funkcja pokazywania lightbox
    function showLightbox() {
        if (currentImages.length === 0) return;
        
        const image = currentImages[currentImageIndex];
        lightbox.querySelector('.lightbox-image').src = image.src;
        lightbox.querySelector('.lightbox-image').alt = image.alt;
        lightbox.querySelector('.lightbox-title').textContent = image.title;
        lightbox.querySelector('.lightbox-description').textContent = image.description;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Funkcja ukrywania lightbox
    function hideLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Następny obraz
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        showLightbox();
    }

    // Poprzedni obraz
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
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

    // Klawiatura dla lightbox
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

    // Inicjalna aktualizacja obrazów
    setTimeout(updateLightboxImages, 100);
}

// Kalkulator wycen
function initPriceCalculator() {
    const serviceCheckboxes = document.querySelectorAll('.services-compact-grid input[type="checkbox"]');
    const areaInput = document.getElementById('area-input');
    const cityInput = document.getElementById('city-input');
    const materialRadios = document.querySelectorAll('input[name="material-option"]');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultArea = document.getElementById('result-area');
    const resultCity = document.getElementById('result-city');
    const resultDuration = document.getElementById('result-duration');
    const resultServices = document.getElementById('result-services');
    const resultAdditional = document.getElementById('result-additional');
    const resultTotalCost = document.getElementById('result-total-cost');
    
    // Flaga informująca czy kalkulator coś policzył
    let hasCalculatedResult = false;
    
    // Funkcja aktualizacji stanu przycisku "Zamów"
    function updateOrderButton() {
        const orderBtn = document.getElementById('result-order-btn');
        if (orderBtn) {
            if (hasCalculatedResult) {
                orderBtn.style.opacity = '1';
                orderBtn.style.pointerEvents = 'auto';
                orderBtn.style.cursor = 'pointer';
                orderBtn.title = 'Kliknij, aby zamówić';
            } else {
                orderBtn.style.opacity = '0.5';
                orderBtn.style.pointerEvents = 'none';
                orderBtn.style.cursor = 'not-allowed';
                orderBtn.title = 'Najpierw oblicz wycenę';
            }
        }
    }

    // Dane usług z czasem realizacji
    const servicesData = {
        vinyl: { name: 'Układanie paneli winylowych', standard: 45, material: 35, timePerM2: 1/40 }, // 40m² dziennie
        pvc: { name: 'Montaż posadzki PCV', standard: 30, material: 22, timePerM2: 1/40 },
        parquet: { name: 'Układanie parkietu (jodełka)', standard: 120, material: 100, timePerM2: 1/30 }, // 30m² dziennie
        screed: { name: 'Wylewka samopoziomująca', standard: 40, material: 30, timePerM2: 1 }, // 1 dzień na dowolną powierzchnię
        resin: { name: 'Aplikacja posadzki żywicznej', standard: 90, material: 75, timePerM2: 1/35 } // 35m² dziennie
    };

    // Rozszerzona baza danych miast Polski z odległościami od Katowic (km)
    const polishCities = {
        // Województwo śląskie
        'katowice': 0, 'kraków': 75, 'sosnowiec': 10, 'gliwice': 15, 'zabrze': 20, 'bytom': 25,
        'bielsko-biała': 60, 'ruda śląska': 20, 'rybnik': 40, 'tychy': 25, 'dąbrowa górnicza': 30,
        'chorzów': 10, 'jaworzno': 30, 'mysłowice': 15, 'siemianowice śląskie': 15, 'będzin': 25,
        'piekary śląskie': 20, 'świętochłowice': 18, 'knurów': 35, 'żory': 35, 'mikołów': 30,
        'częstochowa': 60, 'jastrzębie-zdrój': 45, 'czechowice-dziedzice': 50, 'pszczyna': 35,
        'tarnowskie góry': 30, 'racibórz': 70, 'wodzisław śląski': 50, 'żywiec': 70,
        
        // Województwo małopolskie
        'nowy sącz': 120, 'tarnów': 110, 'oświęcim': 55, 'nowy targ': 140, 'chrzanów': 45,
        'olkusz': 50, 'gorlice': 130, 'wieliczka': 80, 'skawina': 70, 'wadowice': 65,
        'andrychów': 70, 'bochnia': 90, 'trzebinia': 40, 'kęty': 60, 'zakopane': 150,
        
        // Województwo mazowieckie
        'warszawa': 300, 'radom': 280, 'płock': 350, 'siedlce': 380, 'pruszków': 290,
        'legionowo': 310, 'ostrołęka': 400, 'ciechanów': 370, 'mińsk mazowiecki': 320,
        'żyrardów': 320, 'nowy dwór mazowiecki': 330, 'wołomin': 310, 'piaseczno': 290,
        'otwock': 310, 'grodzisk mazowiecki': 300, 'józefów': 315, 'marki': 305,
        
        // Województwo dolnośląskie
        'wrocław': 270, 'wałbrzych': 300, 'legnica': 320, 'jelenia góra': 350, 'lubin': 350,
        'głogów': 380, 'świdnica': 290, 'bolesławiec': 380, 'oleśnica': 280, 'kłodzko': 320,
        'dzierżoniów': 310, 'zgorzelec': 420, 'bielawa': 310, 'oława': 260, 'brzeg': 190,
        
        // Województwo wielkopolskie
        'poznań': 350, 'kalisz': 300, 'konin': 320, 'piła': 450, 'ostrów wielkopolski': 320,
        'gniezno': 380, 'leszno': 380, 'inowrocław': 380, 'koło': 350, 'turek': 310,
        'jarocin': 340, 'wągrowiec': 400, 'złotów': 430, 'chodzież': 420, 'środa wielkopolska': 360,
        
        // Województwo pomorskie
        'gdańsk': 650, 'gdynia': 660, 'słupsk': 580, 'sopot': 655, 'tczew': 630,
        'wejherowo': 680, 'rumia': 670, 'reda': 675, 'pruszcz gdański': 640, 'starogard gdański': 600,
        'kartuzy': 680, 'kwidzyn': 580, 'malbork': 620, 'lębork': 620, 'bytów': 550,
        
        // Województwo zachodniopomorskie
        'szczecin': 550, 'koszalin': 500, 'stargard': 530, 'kołobrzeg': 520, 'świnoujście': 600,
        'police': 560, 'goleniów': 570, 'gryfice': 530, 'białogard': 480, 'świdwin': 470,
        'wałcz': 460, 'choszczno': 520, 'pyrzyce': 540, 'łobez': 510, 'kamień pomorski': 580,
        
        // Województwo lubelskie
        'lublin': 350, 'chełm': 420, 'zamość': 400, 'biała podlaska': 380, 'puławy': 320,
        'świdnik': 360, 'kraśnik': 340, 'łuków': 400, 'tomaszów lubelski': 430, 'hrubieszów': 450,
        'łęczna': 380, 'janów lubelski': 360, 'włodawa': 410, 'parczew': 390, 'radzyń podlaski': 380,
        
        // Województwo podkarpackie
        'rzeszów': 250, 'przemyśl': 350, 'stalowa wola': 280, 'mielec': 220, 'tarnobrzeg': 260,
        'krosno': 300, 'jasło': 280, 'sanok': 320, 'dębica': 200, 'jarosław': 320,
        'ropczyce': 230, 'przeworsk': 270, 'leżajsk': 260, 'łańcut': 260, 'strzyżów': 240,
        
        // Województwo łódzkie
        'łódź': 220, 'piotrków trybunalski': 180, 'pabianice': 230, 'tomaszów mazowiecki': 200,
        'bełchatów': 160, 'zgierz': 230, 'radomsko': 140, 'sieradz': 250, 'skierniewice': 260,
        'kutno': 280, 'zduńska wola': 240, 'wieluń': 200, 'pajęczno': 150, 'brzeziny': 240,
        
        // Województwo świętokrzyskie
        'kielce': 180, 'ostrowiec świętokrzyski': 200, 'starachowice': 190, 'sandomierz': 220,
        'skarżysko-kamienna': 190, 'końskie': 220, 'busko-zdrój': 160, 'jędrzejów': 170,
        'kazimierza wielka': 140, 'staszów': 180, 'pińczów': 150, 'włoszczowa': 110,
        
        // Województwo podlaskie
        'białystok': 450, 'suwałki': 550, 'łomża': 480, 'augustów': 520, 'sokółka': 470,
        'zambrów': 460, 'bielsk podlaski': 470, 'hajnówka': 480, 'grajewo': 500, 'mońki': 460,
        'sejny': 570, 'wysokie mazowieckie': 490, 'siemiatycze': 450, 'wasilków': 450,
        
        // Województwo warmińsko-mazurskie
        'olsztyn': 500, 'elbląg': 570, 'ełk': 550, 'ostróda': 520, 'iława': 480,
        'giżycko': 580, 'kętrzyn': 600, 'mrągowo': 550, 'bartoszyce': 620, 'lidzbark warmiński': 580,
        'braniewo': 640, 'węgorzewo': 600, 'szczytno': 530, 'pisz': 560, 'nowe miasto lubawskie': 480,
        
        // Województwo kujawsko-pomorskie
        'bydgoszcz': 400, 'toruń': 380, 'włocławek': 340, 'grudziądz': 420, 'inowrocław': 380,
        'brodnica': 430, 'nakło nad notecią': 420, 'świecie': 410, 'żnin': 400, 'aleksandrów kujawski': 360,
        'rypin': 420, 'golub-dobrzyń': 410, 'lipno': 390, 'radziejów': 370, 'tuchola': 450,
        
        // Województwo lubuskie
        'zielona góra': 400, 'gorzów wielkopolski': 450, 'żary': 420, 'żagań': 380,
        'nowa sól': 360, 'świebodzin': 380, 'międzyrzecz': 420, 'słubice': 480, 'sulechów': 370,
        'czerwieńsk': 390, 'krosno odrzańskie': 440, 'gubien': 460, 'kostrzyn nad odrą': 470,
        
        // Województwo opolskie
        'opole': 90, 'kędzierzyn-koźle': 120, 'nysa': 130, 'brzeg': 110, 'kluczbork': 150,
        'prudnik': 140, 'strzelce opolskie': 100, 'krapkowice': 100, 'głubczyce': 110,
        'namysłów': 130, 'olesno': 120, 'praszka': 140, 'grodków': 110, 'lewin brzeski': 120
    };

    // Lista miast do autouzupełniania (posortowana alfabetycznie)
    const cityNames = Object.keys(polishCities).sort();

    let selectedCityName = '';
    let isValidCity = false;

    // Funkcja obliczająca odległość do miasta
    function getCityDistance(cityName) {
        if (!cityName) return 0;
        const normalizedCity = cityName.toLowerCase().trim();
        return polishCities[normalizedCity] || 0;
    }

    // Funkcja walidacji miasta
    function validateCity(cityName) {
        if (!cityName) return false;
        const normalizedCity = cityName.toLowerCase().trim();
        return polishCities.hasOwnProperty(normalizedCity);
    }

    // Funkcja wyszukiwania miast
    function searchCities(query) {
        if (!query || query.length < 2) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        return cityNames.filter(city => 
            city.toLowerCase().includes(normalizedQuery)
        ).slice(0, 8); // Ograniczamy do 8 wyników
    }

    // Funkcja wyświetlania podpowiedzi miast
    function showCitySuggestions(suggestions) {
        const suggestionsContainer = document.getElementById('city-suggestions');
        
        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        suggestionsContainer.innerHTML = suggestions.map(city => {
            const distance = polishCities[city];
            const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
            return `
                <div class="city-suggestion" data-city="${city}">
                    <span class="city-name">${capitalizedCity}</span>
                    <span class="city-distance">${distance} km</span>
                </div>
            `;
        }).join('');
        
        suggestionsContainer.style.display = 'block';
        
        // Dodaj event listeners do podpowiedzi
        suggestionsContainer.querySelectorAll('.city-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const cityName = suggestion.dataset.city;
                selectCity(cityName);
            });
        });
    }

    // Funkcja wybierania miasta
    function selectCity(cityName) {
        const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        cityInput.value = capitalizedCity;
        selectedCityName = cityName;
        isValidCity = true;
        
        document.getElementById('city-suggestions').style.display = 'none';
        updateCityValidation(true);
        
        // Automatyczne obliczanie jeśli wszystkie pola są wypełnione
        autoCalculateIfReady();
    }

    // Funkcja aktualizacji walidacji miasta
    function updateCityValidation(isValid) {
        const validationElement = document.getElementById('city-validation');
        const cityInputElement = document.getElementById('city-input');
        
        if (isValid) {
            validationElement.innerHTML = '<i class="fas fa-check"></i>Miasto zweryfikowane';
            validationElement.className = 'city-validation valid';
            cityInputElement.classList.remove('invalid');
            cityInputElement.classList.add('valid');
        } else if (cityInput.value.trim()) {
            validationElement.innerHTML = '<i class="fas fa-times"></i>Miasto nie zostało znalezione';
            validationElement.className = 'city-validation invalid';
            cityInputElement.classList.remove('valid');
            cityInputElement.classList.add('invalid');
        } else {
            validationElement.innerHTML = '';
            validationElement.className = 'city-validation';
            cityInputElement.classList.remove('valid', 'invalid');
        }
    }

    // Funkcja automatycznego obliczania gdy wszystkie pola są gotowe
    function autoCalculateIfReady() {
        const selectedServices = Array.from(serviceCheckboxes).filter(cb => cb.checked);
        if (selectedServices.length > 0 && areaInput.value && parseFloat(areaInput.value) > 0 && isValidCity) {
            calculateCost();
        }
    }

    // Funkcja obliczania kosztów
    function calculateCost() {
        const selectedServices = Array.from(serviceCheckboxes).filter(cb => cb.checked);
        const area = parseFloat(areaInput.value);
        const materialOption = document.querySelector('input[name="material-option"]:checked').value;

        // Walidacja danych
        if (selectedServices.length === 0) {
            alert('Proszę wybrać przynajmniej jedną usługę');
            return;
        }

        if (!area || area <= 0) {
            alert('Proszę wprowadzić poprawną powierzchnię (większą niż 0)');
            return;
        }

        if (!isValidCity) {
            alert('Proszę wybrać miasto z listy podpowiedzi');
            cityInput.focus();
            return;
        }

        let totalCost = 0;
        let totalDays = 0;
        const servicesResults = [];

        // Obliczanie kosztów i czasu dla każdej wybranej usługi
        selectedServices.forEach(serviceCheckbox => {
            const serviceType = serviceCheckbox.value;
            const serviceData = servicesData[serviceType];
            const pricePerM2 = materialOption === 'standard' ? serviceData.standard : serviceData.material;
            const serviceCost = area * pricePerM2;
            
            // Obliczanie czasu realizacji
            let serviceDays;
            if (serviceType === 'screed') {
                serviceDays = 1; // Wylewka zawsze 1 dzień
            } else {
                serviceDays = Math.ceil(area * serviceData.timePerM2);
            }
            
            totalDays = Math.max(totalDays, serviceDays); // Usługi mogą być równoległe, więc bierzemy najdłuższą
            
            totalCost += serviceCost;
            servicesResults.push({
                name: serviceData.name,
                pricePerM2: pricePerM2,
                cost: serviceCost,
                days: serviceDays
            });
        });

        // Obliczanie dodatkowych kosztów
        const distance = getCityDistance(selectedCityName);
        let travelCost = 0;
        let accommodationCost = 0;
        let accommodationNights = 0;

        if (distance > 100) {
            travelCost = (distance - 100) * 2; // 2 zł za km powyżej 100km
            
            if (totalDays > 1) {
                accommodationNights = totalDays - 1; // Nocleg od drugiej nocy
                accommodationCost = accommodationNights * 300; // 300 zł za noc
            }
        }

        const finalTotalCost = totalCost + travelCost + accommodationCost;

        // Aktualizacja wyników
        resultArea.textContent = `${area} m²`;
        const capitalizedCity = selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1);
        resultCity.textContent = `${capitalizedCity} (${distance} km od Katowic)`;
        
        // Formatowanie czasu realizacji
        if (totalDays === 1) {
            resultDuration.textContent = '1 dzień';
        } else {
            resultDuration.textContent = `${totalDays} dni`;
        }

        // Wyświetlanie usług
        resultServices.innerHTML = servicesResults.map(service => `
            <div class="result-service-item">
                <span class="result-service-name">${service.name} (${service.pricePerM2} zł/m²)</span>
                <span class="result-service-cost">${service.cost.toLocaleString('pl-PL')} zł</span>
            </div>
        `).join('');

        // Wyświetlanie dodatkowych kosztów
        let additionalHTML = '';
        if (distance > 100) {
            additionalHTML += `
                <div class="result-additional-item">
                    <span>Opłata za kilometrówkę (${distance - 100} km × 2 zł):</span>
                    <span class="result-additional-cost">${travelCost.toLocaleString('pl-PL')} zł</span>
                </div>
            `;
            
            if (accommodationNights > 0) {
                additionalHTML += `
                    <div class="result-additional-item">
                        <span>Nocleg (${accommodationNights} ${accommodationNights === 1 ? 'noc' : 'noce'} × 300 zł):</span>
                        <span class="result-additional-cost">${accommodationCost.toLocaleString('pl-PL')} zł</span>
                    </div>
                `;
            }
        }
        
        resultAdditional.innerHTML = additionalHTML;
        resultTotalCost.textContent = `${finalTotalCost.toLocaleString('pl-PL')} zł`;

        // Oznacz że kalkulator policzył wynik
        hasCalculatedResult = true;
        updateOrderButton();

        // Dodanie efektu wizualnego
        const resultCard = document.querySelector('.result-card');
        resultCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resultCard.style.transform = 'scale(1)';
        }, 150);
    }

    // Event listeners
    calculateBtn.addEventListener('click', calculateCost);

    // Obsługa autouzupełniania miast
    cityInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        selectedCityName = '';
        isValidCity = false;
        
        if (query.length >= 2) {
            const suggestions = searchCities(query);
            showCitySuggestions(suggestions);
            
            // Sprawdź czy wpisane miasto jest dokładnie zgodne z bazą
            const exactMatch = cityNames.find(city => 
                city.toLowerCase() === query.toLowerCase()
            );
            
            if (exactMatch) {
                selectedCityName = exactMatch;
                isValidCity = true;
                updateCityValidation(true);
                document.getElementById('city-suggestions').style.display = 'none';
                autoCalculateIfReady();
            } else {
                updateCityValidation(false);
            }
        } else {
            document.getElementById('city-suggestions').style.display = 'none';
            updateCityValidation(false);
        }
    });

    // Obsługa klawiatury w polu miasta
    cityInput.addEventListener('keydown', (e) => {
        const suggestions = document.querySelectorAll('.city-suggestion');
        const highlighted = document.querySelector('.city-suggestion.highlighted');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (highlighted) {
                highlighted.classList.remove('highlighted');
                const next = highlighted.nextElementSibling || suggestions[0];
                next.classList.add('highlighted');
            } else if (suggestions.length > 0) {
                suggestions[0].classList.add('highlighted');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (highlighted) {
                highlighted.classList.remove('highlighted');
                const prev = highlighted.previousElementSibling || suggestions[suggestions.length - 1];
                prev.classList.add('highlighted');
            } else if (suggestions.length > 0) {
                suggestions[suggestions.length - 1].classList.add('highlighted');
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlighted) {
                const cityName = highlighted.dataset.city;
                selectCity(cityName);
            } else if (isValidCity) {
                calculateCost();
            }
        } else if (e.key === 'Escape') {
            document.getElementById('city-suggestions').style.display = 'none';
        }
    });

    // Ukryj podpowiedzi przy kliknięciu poza element
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.city-input-wrapper')) {
            document.getElementById('city-suggestions').style.display = 'none';
        }
    });

    // Obliczanie na enter w polu powierzchni
    areaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (isValidCity) {
                calculateCost();
            } else {
                cityInput.focus();
            }
        }
    });
    
    // Obliczanie przy odkliknięciu pola powierzchni
    areaInput.addEventListener('blur', () => {
        if (areaInput.value && isValidCity) {
            calculateCost();
        }
    });

    // Funkcja resetująca stan obliczeń
    function resetCalculatedState() {
        hasCalculatedResult = false;
        updateOrderButton();
    }

    // Automatyczne obliczanie przy zmianie opcji materiału
    materialRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            resetCalculatedState();
            autoCalculateIfReady();
        });
    });

    // Automatyczne obliczanie przy zmianie usług
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            resetCalculatedState();
            autoCalculateIfReady();
        });
    });
    
    // Resetowanie przy zmianie powierzchni
    areaInput.addEventListener('input', () => {
        resetCalculatedState();
    });
    
    // Resetowanie przy zmianie miasta
    cityInput.addEventListener('input', () => {
        resetCalculatedState();
    });

    // Dodanie stylizacji do result-card
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.transition = 'transform 0.2s ease';
    }

    // Inicjalne wyświetlenie pustego stanu
    resultServices.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Wybierz usługi, aby zobaczyć wycenę</p>';
    
    // Obsługa przycisku "Zamów teraz"
    const orderBtn = document.getElementById('result-order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Zbieranie danych z kalkulatora
            const area = areaInput.value;
            const city = cityInput.value;
            const selectedServices = [];
            const materialOption = document.querySelector('input[name="material-option"]:checked')?.value;
            
            serviceCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const serviceName = checkbox.parentElement.querySelector('.service-name').textContent;
                    selectedServices.push(serviceName);
                }
            });
            
            const totalCost = document.getElementById('result-total-cost').textContent;
            
            // Przygotowanie wiadomości
            const message = `Dzień dobry! 

Na podstawie kalkulatora na stronie chciałbym zamówić następujące usługi:

📍 Miasto: ${city}
📐 Powierzchnia: ${area} m²
🏗️ Wybrane usługi: ${selectedServices.join(', ')}
💰 Opcja materiału: ${materialOption === 'standard' ? 'Standardowa cena (własny materiał)' : 'Z Waszym materiałem (rabat)'}
💵 Orientacyjny koszt: ${totalCost}

Proszę o kontakt w celu ustalenia szczegółów realizacji.

Pozdrawiam`;

            // Wypełnienie formularza kontaktowego
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = message;
            }
            
            // Płynne przewinięcie do formularza kontaktowego
            const contactSection = document.getElementById('kontakt');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus na pole imię po przewinięciu
                setTimeout(() => {
                    const nameField = document.getElementById('name');
                    if (nameField) {
                        nameField.focus();
                    }
                }, 800);
            }
        });
    }
    
    // Inicjalizacja stanu przycisku zamawiana przy ładowaniu strony
    updateOrderButton();
}
