// Função de debounce para otimização de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Efeito Parallax otimizado
const parallaxBg = document.querySelector('.parallax-bg');
const handleParallax = debounce(() => {
    if (parallaxBg) {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
    }
}, 10);

window.addEventListener('scroll', handleParallax);

// Animação de Revelação usando Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    revealObserver.observe(element);
});

// Botão Voltar ao Topo
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(button);

    const handleScroll = debounce(() => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createBackToTopButton();

// Indicador de Progresso de Leitura
const createProgressIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'progress-indicator';
    document.body.appendChild(indicator);

    const handleProgress = debounce(() => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        indicator.style.width = `${progress}%`;
    }, 10);

    window.addEventListener('scroll', handleProgress);
};

createProgressIndicator();