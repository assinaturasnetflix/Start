'use strict';

const e = React.createElement;

// --- Constantes Globais ---
const BRAND_NAME = "Eden Labs";
const WHATSAPP_NUMBER = "258865097696";
const CONTACT_EMAIL = "contato@edenlabs.co.mz"; // Sugestão
const HERO_IMAGE_PATH = "/assets/logo.jpg"; // Também usado para loading
const PORTFOLIO_IMAGES = [
    "/assets/portfolio1.jpg",
    "/assets/portfolio2.jpg",
    "/assets/portfolio3.jpg",
    "/assets/portfolio4.jpg" // Adicionando a quarta imagem conforme prompt
];

// --- Funções Utilitárias ---
// (Pode ser expandido depois)
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Componente de Animação de Carregamento ---
function LoadingAnimation({ isLoading }) {
    if (!isLoading) return null;

    const texts = ["Carregando Experiência...", "Otimizando Design...", "Preparando Inovação..."];
    const [currentText, setCurrentText] = React.useState(texts[0]);
    const [textIndex, setTextIndex] = React.useState(0);

    React.useEffect(() => {
        if (isLoading) {
            const intervalId = setInterval(() => {
                setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
            }, 1200); // Muda o texto a cada 1.2 segundos
            return () => clearInterval(intervalId);
        }
    }, [isLoading, texts.length]);

    React.useEffect(() => {
        setCurrentText(texts[textIndex]);
    }, [textIndex, texts]);

    return e(
        'div',
        {
            className: `loading-overlay fixed inset-0 bg-eden-white flex flex-col justify-center items-center z-50 transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
            'aria-live': 'polite',
            'aria-busy': isLoading
        },
        e('img', {
            src: HERO_IMAGE_PATH,
            alt: `${BRAND_NAME} Logo Carregando`,
            className: 'w-24 h-24 md:w-32 md:h-32 mb-6 animate-pulse' // Usando Tailwind para animação de pulso
        }),
        e('p', {
            className: 'text-eden-green-dark text-lg md:text-xl font-medium animate-fadeIn',
            key: currentText // Força re-render para animação do texto
        }, currentText),
        e('div', { className: 'mt-4 w-32 h-1 bg-eden-green-light rounded-full overflow-hidden'},
            e('div', {className: 'h-full bg-eden-green-DEFAULT animate-loading-bar w-full'}) // CSS para animação da barra
        )
    );
}
// Adicione ao style.css se não quiser usar JS para essa animação da barra:
/*
@keyframes loading-bar-animation {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loading-bar {
  animation: loading-bar-animation 2s infinite linear;
}
*/
// Para simplificar, vou usar a classe 'animate-pulse' do Tailwind para a imagem
// e a 'loading-image' do style.css para a imagem se precisar de algo mais customizado que 'animate-pulse'.
// A animação da barra de loading pode ser feita com CSS puro para mais controle,
// mas o exemplo acima usa JS para mostrar a mudança de texto,
// e uma barra simples pode ser feita com keyframes no Tailwind ou CSS.
// Por enquanto, uma animação de pulso na imagem e texto dinâmico.

// --- Componente Principal App ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('home');

    React.useEffect(() => {
        // Simula o carregamento
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: true, // Animação acontece apenas uma vez
                    offset: 50, // offset (em px) da janela original de disparo
                });
            } else {
                console.warn("AOS não está definido. As animações de scroll podem não funcionar.");
            }
        }, 2500); // Tempo de carregamento simulado (2.5 segundos)

        // Limpa o timer se o componente for desmontado
        return () => clearTimeout(timer);
    }, []);

    // Observador de interseção para atualizar a seção ativa no scroll (opcional, mas bom para nav)
    React.useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]); // Re-executa se o loading mudar, para garantir que as seções existam

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        // Header/Navbar será adicionado aqui
        // Hero Section será adicionado aqui
        // Outras seções virão aqui...
        e('main', null,
            e('p', { className: 'text-center p-10 text-2xl' }, 'Conteúdo Principal do Site Carregado!')
            // Aqui vamos começar a adicionar as seções reais
        )
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código da Parte 1: e, constantes, smoothScrollTo, LoadingAnimation) ...

// --- Ícones (Simples SVGs ou placeholders para React Icons) ---
// Para manter o JS puro e evitar a complexidade de importar React Icons sem um sistema de módulos robusto
// ou depender de CDN em todos os ícones, vou usar SVGs inline para os ícones mais críticos.
// Para uma solução mais escalável com build, React Icons seria carregado via npm.

const IconMenu = (props) => e(
    'svg',
    {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor", // Será controlado pela classe Tailwind
        ...props
    },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" })
);

const IconX = (props) => e(
    'svg',
    {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        ...props
    },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
);

const IconChevronDown = (props) => e(
    'svg',
    {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 2.5, // Ligeiramente mais grosso para destaque
        stroke: "currentColor",
        ...props
    },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" })
);

// --- Componente Header/Navbar ---
function Header({ activeSection, onNavigate }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const navLinks = [
        { id: 'home', label: 'Home', action: () => onNavigate('hero') },
        { id: 'services', label: 'Serviços', action: () => onNavigate('packages') },
        { id: 'blog', label: 'Blog', action: () => onNavigate('blog') },
        { id: 'portfolio', label: 'Portfólio', action: () => onNavigate('portfolio') },
        { id: 'contact', label: 'Contato', action: () => onNavigate('contact') },
    ];

    const linkClasses = (id) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ` +
        `${activeSection === id || (activeSection === 'hero' && id === 'home')
            ? 'bg-eden-green-light text-eden-green-dark' 
            : 'text-eden-green-dark hover:bg-eden-green-extralight hover:text-eden-green-DEFAULT'}`;

    const mobileLinkClasses = (id) =>
        `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ` +
        `${activeSection === id || (activeSection === 'hero' && id === 'home')
            ? 'bg-eden-green-light text-eden-green-dark'
            : 'text-eden-green-dark hover:bg-eden-green-extralight hover:text-eden-green-DEFAULT'}`;

    return e(
        'header',
        {
            id: 'navbar', // Adicionando ID para possível referência
            className: 'bg-eden-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300'
            // A classe `bg-eden-white/80` e `backdrop-blur-md` cria um efeito de vidro fosco
        },
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
            e('div', { className: 'flex items-center justify-between h-20' }, // Altura aumentada para 80px
                e('div', { className: 'flex items-center' },
                    e('a', { href: '#', onClick: (ev) => { ev.preventDefault(); onNavigate('hero'); }},
                        e('img', {
                            className: 'h-12 w-auto transition-transform duration-300 hover:scale-105', // Aumentado e com hover
                            src: HERO_IMAGE_PATH,
                            alt: `${BRAND_NAME} Logo`
                        })
                    ),
                    e('span', {className: 'ml-3 text-2xl font-serif text-eden-green-dark font-bold'}, BRAND_NAME) // Nome da marca estilizado
                ),
                e('div', { className: 'hidden md:block' }, // Menu para Desktop
                    e('div', { className: 'ml-10 flex items-baseline space-x-4' },
                        ...navLinks.map(link => e('a', {
                            key: link.id,
                            href: `#${link.id === 'home' ? 'hero' : link.id}`, // Aponta para o ID da seção
                            className: linkClasses(link.id),
                            onClick: (ev) => {
                                ev.preventDefault();
                                link.action();
                                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                            }
                        }, link.label))
                    )
                ),
                e('div', { className: 'md:hidden flex items-center' }, // Botão do Menu Mobile
                    e('button', {
                        type: 'button',
                        className: 'bg-eden-green-extralight inline-flex items-center justify-center p-2 rounded-md text-eden-green-DEFAULT hover:text-eden-green-dark hover:bg-eden-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-eden-green-light focus:ring-white transition-colors duration-300',
                        'aria-controls': 'mobile-menu',
                        'aria-expanded': isMobileMenuOpen,
                        onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen)
                    },
                        e('span', { className: 'sr-only' }, 'Abrir menu principal'),
                        isMobileMenuOpen ? e(IconX, {className: 'block h-6 w-6'}) : e(IconMenu, {className: 'block h-6 w-6'})
                    )
                )
            )
        ),
        // Menu Mobile Dropdown
        e('div', {
                className: `md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 shadow-lg' : 'max-h-0 opacity-0'}`,
                id: 'mobile-menu'
            },
            e('div', { className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-eden-white' }, // Fundo branco para o menu mobile
                ...navLinks.map(link => e('a', {
                    key: `mobile-${link.id}`,
                    href: `#${link.id === 'home' ? 'hero' : link.id}`,
                    className: mobileLinkClasses(link.id),
                    onClick: (ev) => {
                        ev.preventDefault();
                        link.action();
                        setIsMobileMenuOpen(false); // Fecha o menu ao clicar
                    }
                }, link.label))
            )
        )
    );
}


// --- Componente Hero Section ---
function HeroSection() {
    return e(
        'section',
        {
            id: 'hero', // ID para navegação
            className: 'bg-eden-green-extralight pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden' // Padding ajustado e overflow
        },
        e('div', { className: 'container mx-auto px-6 text-center' },
            e('div', {
                className: 'max-w-3xl mx-auto',
                'data-aos': 'fade-up', // Animação AOS
                'data-aos-delay': '100'
            },
                e('img', {
                    src: HERO_IMAGE_PATH, // Usando o logo principal aqui também
                    alt: `${BRAND_NAME} - Banner Principal`,
                    className: 'w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full shadow-xl border-4 border-eden-white' // Estilizado e maior
                }),
                e('h1', {
                    className: 'text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-eden-green-dark mb-6 leading-tight'
                }, 'Transforme seu negócio.'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT mb-10 leading-relaxed'
                }, 'Entre no mundo digital com soluções inovadoras. A Eden Labs leva sua empresa ao próximo nível.'),
                e('button', {
                    onClick: () => smoothScrollTo('packages'),
                    className: 'bg-eden-green-DEFAULT text-eden-white font-semibold py-3 px-8 rounded-lg text-lg ' +
                               'hover:bg-eden-green-dark transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none ' +
                               'focus:ring-2 focus:ring-eden-green-light focus:ring-opacity-50 shadow-lg hover:shadow-xl group'
                },
                    e('span', { className: 'mr-2' }, 'Conheça Nossos Pacotes'),
                    e(IconChevronDown, { className: 'inline-block h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' }) // Ícone de seta com animação no hover
                )
            )
        ),
        // Elementos decorativos sutis (opcional, para mais "robustez" visual)
        e('div', {className: 'absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-eden-green-light opacity-20 rounded-full -translate-x-1/3 -translate-y-1/3 filter blur-xl', 'aria-hidden': 'true'}),
        e('div', {className: 'absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-eden-green-light opacity-20 rounded-full translate-x-1/3 translate-y-1/3 filter blur-xl', 'aria-hidden': 'true'})
    );
}

// --- Componente Principal App (Modificado para incluir Header e Hero) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero'); // Inicia com 'hero'

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false, // Mudar para false se quiser que a animação ocorra toda vez que rolar para o elemento
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
        // setActiveSection(sectionId); // O IntersectionObserver já faz isso
    };
    
    // Observador de interseção para atualizar a seção ativa no scroll
    React.useEffect(() => {
        if (isLoading) return; // Não executar se estiver carregando

        const sections = document.querySelectorAll('section[id]'); // Seleciona todas as seções com ID
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70; // Pega a altura da navbar

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                     // Ajusta qual seção é considerada "ativa" com base na visibilidade e proporção
                    if (entry.intersectionRatio > 0.3) { // Pode ajustar esse valor
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`, // Ajusta o topo para considerar a navbar fixa
            threshold: [0.1, 0.3, 0.5, 0.7] // Múltiplos thresholds para detecção mais fina
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]); // Re-executa quando o loading termina

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'}, // Adicionado ID ao main para possível foco
            e(HeroSection, null)
            // Sessão de Apresentação da Solução de Software virá aqui
            // Pacotes de Serviço virão aqui
            // Blog virá aqui
            // Portfólio virá aqui
            // Contato virá aqui
        )
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código da Parte 1 e 2: e, constantes, utilitários, Loading, Header, HeroSection, Ícones SVG) ...

// --- Ícones Adicionais para a Seção de Soluções (SVGs Inline) ---

const IconCog = (props) => e( // Ícone para "Automatize processos"
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0A2.25 2.25 0 0018 9.75l-.386-.577a2.25 2.25 0 00-3.828 0l-.386.577a2.25 2.25 0 00-1.59 2.275M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" }) // Engrenagem com detalhe
);

const IconShieldCheck = (props) => e( // Ícone para "Soluções seguras"
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622A11.99 11.99 0 0018.402 6a11.959 11.959 0 01-1.598-.785M12 2.25z" }) // Escudo com check
);

const IconLightBulb = (props) => e( // Ícone para "Do conceito à execução"
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a15.055 15.055 0 01-4.5 0M12 3v2.25m0 0A3.75 3.75 0 0012 9.75A3.75 3.75 0 0012 5.25zm0 0A3.75 3.75 0 0115.75 9a3.75 3.75 0 01-3.75-3.75zm0 0A3.75 3.75 0 008.25 9a3.75 3.75 0 003.75-3.75zM12 15.75a3.75 3.75 0 000-7.5M12 15.75a3.75 3.75 0 010-7.5M12 15.75v3.75A2.25 2.25 0 019.75 21h-3.375c-.621 0-1.125-.504-1.125-1.125V19.5M12 15.75A2.25 2.25 0 0014.25 18h3.375c.621 0 1.125.504 1.125 1.125V19.5m0 0a2.25 2.25 0 01-2.25 2.25H9.75" }) // Lâmpada (ideia, conceito)
);


// --- Componente Seção de Apresentação da Solução ---
function SolutionPresentationSection() {
    const features = [
        {
            icon: IconCog,
            title: "Automatize processos com inteligência",
            description: "Otimizamos seus fluxos de trabalho com automação inteligente, reduzindo custos operacionais e aumentando a eficiência da sua equipe.",
            aos: "fade-right"
        },
        {
            icon: IconShieldCheck,
            title: "Soluções seguras, escaláveis e de alto desempenho",
            description: "Desenvolvemos plataformas robustas que crescem com seu negócio, garantindo segurança de dados e performance superior.",
            aos: "fade-up"
        },
        {
            icon: IconLightBulb,
            title: "Do conceito à execução — com você em cada etapa",
            description: "Nossa parceria vai além do desenvolvimento. Acompanhamos seu projeto desde a ideação até a implementação e suporte contínuo.",
            aos: "fade-left"
        }
    ];

    return e(
        'section',
        {
            id: 'solution', // ID para navegação, se necessário
            className: 'py-16 md:py-24 bg-eden-white' // Fundo branco para alternar com a Hero
        },
        e('div', { className: 'container mx-auto px-6' },
            e('div', { className: 'text-center mb-12 md:mb-16' },
                e('h2', {
                    className: 'text-3xl md:text-4xl font-bold font-serif text-eden-green-dark mb-4',
                    'data-aos': 'fade-up'
                }, 'Inovação Digital Sob Medida'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT max-w-2xl mx-auto',
                    'data-aos': 'fade-up', 'data-aos-delay': '100'
                }, `Na ${BRAND_NAME}, transformamos ideias em realidade digital. Descubra como nossas soluções podem impulsionar seu crescimento.`)
            ),
            e('div', { className: 'grid md:grid-cols-3 gap-8 md:gap-12' }, // Grid para os cards de features
                features.map((feature, index) => e(
                    'div',
                    {
                        key: index,
                        className: 'flex flex-col items-center text-center p-6 bg-eden-green-extralight rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300',
                        'data-aos': feature.aos,
                        'data-aos-delay': (index * 100 + 200).toString() // Delay progressivo
                    },
                    e(feature.icon, { className: 'h-16 w-16 md:h-20 md:w-20 text-eden-green-DEFAULT mb-6' }),
                    e('h3', {
                        className: 'text-xl md:text-2xl font-semibold text-eden-green-dark mb-3'
                    }, feature.title),
                    e('p', {
                        className: 'text-eden-green-dark opacity-90 leading-relaxed text-sm md:text-base'
                    }, feature.description)
                ))
            )
        )
    );
}


// --- Componente Principal App (Modificado para incluir SolutionPresentationSection) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero');

    // ... (React.useEffect para isLoading e AOS init - da Parte 2) ...
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false,
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);


    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
    };
    
    // ... (React.useEffect para IntersectionObserver - da Parte 2) ...
    React.useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.3) { 
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`,
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]);

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'},
            e(HeroSection, null),
            e(SolutionPresentationSection, null) // <<-- NOVA SEÇÃO ADICIONADA AQUI
            // Pacotes de Serviço virão aqui
            // Blog virá aqui
            // Portfólio virá aqui
            // Contato virá aqui
        )
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código das Partes 1, 2 e 3: e, constantes, utilitários, Loading, Header, Hero, SolutionPresentation, Ícones SVG) ...

// --- Ícones Adicionais para Pacotes (SVGs Inline) ---

const IconCodeBracket = (props) => e( // Ícone para Soluções de Software
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" })
);

const IconShoppingCart = (props) => e( // Ícone para E-commerce
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" })
);

const IconBuildingOffice = (props) => e( // Ícone para Sites Corporativos
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6m-6 4.5h6m-6 4.5h6M6.75 21v-2.25a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25V21m-12-3.75V6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5" })
);

const IconWhatsApp = (props) => e( // Ícone do WhatsApp
    'svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", ...props }, // fill="currentColor" para que o Tailwind controle
    e("path", { d: "M19.004 4.998a9.856 9.856 0 00-13.939 0A9.856 9.856 0 004.998 19l-1.28 4.543a.75.75 0 00.917.917L9.18 23.18a9.856 9.856 0 0013.938-13.938l-.002-.002zm-12.48 12.48a8.356 8.356 0 011.667-11.144l.001-.001a8.356 8.356 0 0111.144 1.666c2.018 2.923 1.442 6.94-.84 9.223L17 18.62l.01.008a8.356 8.356 0 01-10.486 1.83zm5.102-4.814c-.21-.105-.766-.378-1.017-.504-.252-.126-.436-.189-.62.19-.183.378-.68.882-.837 1.057-.157.176-.315.189-.566.084-.252-.105-.916-.346-1.744-1.063C7.84 13.97 7.3 13.195 7.09 12.73c-.21-.464-.016-.716.142-.92.142-.189.314-.315.472-.488.157-.176.21-.293.315-.488.105-.19.052-.362-.026-.488-.078-.126-.62-.77-.853-1.042-.233-.272-.465-.233-.62-.233h-.515c-.183 0-.42.063-.647.315-.226.252-.869.84-1.017 2.008-.148 1.168.472 2.71 1.52 3.895 1.048 1.185 2.348 2.488 5.12 3.468.68.252 1.186.362 1.61.44.696.126 1.227.016 1.626-.233.444-.272.975-.96 1.213-1.57.237-.61.237-1.126.157-1.232-.078-.105-.262-.17-.514-.272z" })
);

// --- Componente Pacotes de Serviço ---
function ServicePackagesSection() {
    const packages = [
        {
            id: "software",
            name: "Soluções de Software",
            icon: IconCodeBracket,
            price: "A partir de 15.000 Mt",
            features: [
                "Análise de requisitos detalhada",
                "Design UI/UX focado em verde e branco",
                "Desenvolvimento ágil e moderno",
                "Testes rigorosos de qualidade",
                "Suporte grátis por 3 meses",
                "Integração com redes sociais",
                "Site de apresentação com blog",
                "Sessão de preços (opcional)"
            ],
            aos: "zoom-in-up",
            bgColor: "bg-eden-green-extralight",
            textColor: "text-eden-green-dark",
            buttonColor: "bg-eden-green-DEFAULT hover:bg-eden-green-dark",
            buttonTextColor: "text-eden-white"
        },
        {
            id: "ecommerce",
            name: "E-commerce Completo",
            icon: IconShoppingCart,
            price: "A partir de 25.000 Mt",
            features: [
                "Design moderno e responsivo (verde/branco)",
                "Integração com gateways de pagamento",
                "Cadastro ilimitado de produtos",
                "Painel de administração intuitivo",
                "Otimização para SEO (On-Page)",
                "Certificado SSL (segurança)",
                "Treinamento para uso da plataforma",
                "Suporte técnico dedicado"
            ],
            aos: "zoom-in-up",
            aosDelay: "200",
            bgColor: "bg-eden-green-DEFAULT", // Card de destaque
            textColor: "text-eden-white",
            buttonColor: "bg-eden-white hover:bg-eden-off-white",
            buttonTextColor: "text-eden-green-dark font-semibold"
        },
        {
            id: "corporate",
            name: "Sites Corporativos",
            icon: IconBuildingOffice,
            price: "A partir de 10.000 Mt",
            features: [
                "Presença online profissional (design verde/branco)",
                "Formulários de contato personalizados",
                "Otimização SEO básica",
                "Galeria de imagens/vídeos",
                "Páginas dinâmicas (Quem Somos, Serviços, etc.)",
                "Blog integrado para conteúdo",
                "Design responsivo para todos os dispositivos",
                "Integração Google Analytics"
            ],
            aos: "zoom-in-up",
            aosDelay: "400",
            bgColor: "bg-eden-green-extralight",
            textColor: "text-eden-green-dark",
            buttonColor: "bg-eden-green-DEFAULT hover:bg-eden-green-dark",
            buttonTextColor: "text-eden-white"
        }
    ];

    const whatsappLink = (packageName) => {
        const message = encodeURIComponent(`Olá, gostaria de contratar o pacote de ${packageName}`);
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    };

    return e(
        'section',
        {
            id: 'packages', // ID para navegação
            className: 'py-16 md:py-24 bg-eden-white' // Fundo branco
        },
        e('div', { className: 'container mx-auto px-6' },
            e('div', { className: 'text-center mb-12 md:mb-16' },
                e('h2', {
                    className: 'text-3xl md:text-4xl font-bold font-serif text-eden-green-dark mb-4',
                    'data-aos': 'fade-up'
                }, 'Nossos Pacotes de Serviço'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT max-w-2xl mx-auto',
                    'data-aos': 'fade-up', 'data-aos-delay': '100'
                }, 'Soluções pensadas para cada necessidade do seu negócio. Escolha o plano ideal e vamos começar!')
            ),
            e('div', { className: 'grid lg:grid-cols-3 gap-8 md:gap-10 items-stretch' }, // 'items-stretch' para cards terem mesma altura
                packages.map((pkg, index) => e(
                    'div',
                    {
                        key: pkg.id,
                        className: `flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 ${pkg.bgColor} ${pkg.textColor}`,
                        'data-aos': pkg.aos,
                        'data-aos-delay': pkg.aosDelay || (index * 150).toString()
                    },
                    // Cabeçalho do Card
                    e('div', { className: 'p-6 md:p-8 text-center border-b', style: { borderColor: pkg.textColor === 'text-eden-white' ? 'rgba(255,255,255,0.2)' : 'rgba(58,90,64,0.1)'} }, // Borda sutil
                        e(pkg.icon, { className: `h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 ${pkg.textColor === 'text-eden-white' ? 'text-eden-green-light' : 'text-eden-green-DEFAULT'}` }),
                        e('h3', { className: 'text-2xl md:text-3xl font-semibold mb-2' }, pkg.name),
                        e('p', { className: `text-xl font-medium ${pkg.textColor === 'text-eden-white' ? 'opacity-90' : 'text-eden-green-DEFAULT'}` }, pkg.price)
                    ),
                    // Lista de Features
                    e('div', { className: 'p-6 md:p-8 flex-grow' }, // flex-grow para empurrar o botão para baixo
                        e('ul', { className: 'space-y-3 mb-8' },
                            pkg.features.map((feature, idx) => e(
                                'li',
                                { key: idx, className: 'flex items-start' },
                                e('svg', { // SVG de checkmark
                                    className: `flex-shrink-0 h-5 w-5 mr-2 mt-0.5 ${pkg.textColor === 'text-eden-white' ? 'text-eden-green-light' : 'text-eden-green-DEFAULT'}`,
                                    xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2.5", stroke: "currentColor"
                                    },
                                    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
                                ),
                                e('span', { className: `text-sm md:text-base ${pkg.textColor === 'text-eden-white' ? 'opacity-90' : ''}` }, feature)
                            ))
                        )
                    ),
                    // Botão de Ação
                    e('div', { className: 'p-6 md:p-8 mt-auto' }, // mt-auto para garantir que o botão fique no final
                        e('a', {
                            href: whatsappLink(pkg.name),
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: `w-full flex items-center justify-center py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 group ${pkg.buttonColor} ${pkg.buttonTextColor} shadow-md hover:shadow-lg`
                        },
                            e(IconWhatsApp, { className: 'h-5 w-5 mr-2' }),
                            'Contratar via WhatsApp'
                        )
                    )
                ))
            )
        )
    );
}

// --- Componente Principal App (Modificado para incluir ServicePackagesSection) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero');

    // ... (React.useEffect para isLoading e AOS init - da Parte 2) ...
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false, 
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
    };
    
    // ... (React.useEffect para IntersectionObserver - da Parte 2) ...
    React.useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.3) { 
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`,
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]);

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'},
            e(HeroSection, null),
            e(SolutionPresentationSection, null),
            e(ServicePackagesSection, null) // <<-- NOVA SEÇÃO ADICIONADA AQUI
            // Blog virá aqui
            // Portfólio virá aqui
            // Contato virá aqui
        ),
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código das Partes 1, 2, 3 e 4: e, constantes, utilitários, Loading, Header, Hero, SolutionPresentation, Packages, Ícones SVG) ...

// --- Ícones Adicionais para Blog e Portfólio (SVGs Inline) ---

const IconArrowRight = (props) => e( // Ícone de seta para "Ler mais"
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" })
);

const IconCalendarDays = (props) => e( // Ícone de calendário para data do post
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" })
);

const IconTag = (props) => e( // Ícone de tag para categoria
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" }),
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 6h.008v.008H6V6z" })
);

// --- Componente Blog Section ---
function BlogSection() {
    const simulatedPosts = [
        {
            id: 1,
            title: "Por que digitalizar sua empresa em 2025?",
            category: "Estratégia Digital",
            date: "15 de Julho, 2024",
            excerpt: "Descubra os imperativos da digitalização para se manter competitivo e inovador no próximo ano, explorando tendências e benefícios.",
            // Imagem placeholder para o blog, pode ser uma cor sólida ou um SVG simples
            // Para manter simples, não vou adicionar imagens reais aqui, mas o local está preparado.
            // image: "/assets/blog_placeholder1.jpg",
            aos: "fade-right"
        },
        {
            id: 2,
            title: `5 Ferramentas que usamos na ${BRAND_NAME}`,
            category: "Tecnologia",
            date: "22 de Julho, 2024",
            excerpt: "Conheça as ferramentas e tecnologias que impulsionam nossa produtividade e a qualidade dos projetos que entregamos.",
            // image: "/assets/blog_placeholder2.jpg",
            aos: "fade-up"
        },
        {
            id: 3,
            title: "Design Verde e Branco: Elegância e Modernidade",
            category: "Design UI/UX",
            date: "29 de Julho, 2024",
            excerpt: "Explore como a paleta de cores verde e branco pode criar uma identidade visual forte, transmitindo confiança e sofisticação.",
            // image: "/assets/blog_placeholder3.jpg",
            aos: "fade-left"
        }
    ];

    return e(
        'section',
        {
            id: 'blog', // ID para navegação
            className: 'py-16 md:py-24 bg-eden-green-extralight' // Fundo verde extra claro para alternar
        },
        e('div', { className: 'container mx-auto px-6' },
            e('div', { className: 'text-center mb-12 md:mb-16' },
                e('h2', {
                    className: 'text-3xl md:text-4xl font-bold font-serif text-eden-green-dark mb-4',
                    'data-aos': 'fade-up'
                }, 'Nosso Blog'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT max-w-2xl mx-auto',
                    'data-aos': 'fade-up', 'data-aos-delay': '100'
                }, `Fique por dentro das últimas novidades, dicas e insights do mundo digital e da ${BRAND_NAME}.`)
            ),
            e('div', { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10' },
                simulatedPosts.map((post, index) => e(
                    'div', // Card do Post
                    {
                        key: post.id,
                        className: 'bg-eden-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1',
                        'data-aos': post.aos,
                        'data-aos-delay': (index * 150 + 200).toString()
                    },
                    // e('img', { src: post.image || `https://via.placeholder.com/400x250/${index % 2 === 0 ? '5C946E' : 'A7D7C5'}/FFFFFF?text=Artigo+Blog`, alt: post.title, className: 'w-full h-48 object-cover' }),
                    // Placeholder visual para a imagem do post, usando um div colorido
                    e('div', {
                        className: `w-full h-40 md:h-48 ${index % 2 === 0 ? 'bg-eden-green-light' : 'bg-eden-green-DEFAULT'} flex items-center justify-center`,
                    }, e('span', { className: `text-2xl font-bold ${index % 2 === 0 ? 'text-eden-green-dark' : 'text-eden-white'} opacity-50`}, `Artigo ${index + 1}`)),

                    e('div', { className: 'p-6 flex flex-col flex-grow' }, // flex-grow para empurrar o link para baixo
                        e('div', { className: 'mb-3 flex items-center space-x-3 text-xs text-eden-green-DEFAULT' },
                            e(IconTag, { className: 'h-4 w-4' }),
                            e('span', { className: 'font-medium uppercase' }, post.category),
                            e('span', {}, '|'),
                            e(IconCalendarDays, { className: 'h-4 w-4' }),
                            e('span', {}, post.date)
                        ),
                        e('h3', {
                            className: 'text-xl md:text-2xl font-semibold text-eden-green-dark mb-3 hover:text-eden-green-DEFAULT transition-colors duration-200'
                        }, 
                            e('a', {href: '#', onClick: (ev) => ev.preventDefault(), className: 'stretched-link-dummy'}, post.title) // Link dummy
                        ),
                        e('p', {
                            className: 'text-eden-green-dark opacity-90 text-sm leading-relaxed mb-4 flex-grow'
                        }, post.excerpt),
                        e('a', {
                            href: '#', // Link simulado
                            onClick: (ev) => ev.preventDefault(),
                            className: 'mt-auto inline-flex items-center text-eden-green-DEFAULT hover:text-eden-green-dark font-semibold group transition-colors duration-200'
                        },
                            'Ler mais',
                            e(IconArrowRight, { className: 'ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1' })
                        )
                    )
                ))
            )
        )
    );
}


// --- Componente Principal App (Modificado para incluir BlogSection) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero');

    // ... (React.useEffect para isLoading e AOS init - da Parte 2) ...
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false, 
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
    };
    
    // ... (React.useEffect para IntersectionObserver - da Parte 2) ...
    React.useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.3) { 
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`,
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]);

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'},
            e(HeroSection, null),
            e(SolutionPresentationSection, null),
            e(ServicePackagesSection, null),
            e(BlogSection, null) // <<-- NOVA SEÇÃO ADICIONADA AQUI
            // Portfólio virá aqui
            // Contato virá aqui
        ),
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código das Partes 1, 2, 3, 4 e 5: e, constantes, utilitários, Loading, Header, Hero, SolutionPresentation, Packages, Blog, Ícones SVG) ...

// --- Ícones Adicionais para Portfólio (SVGs Inline) ---
const IconEye = (props) => e( // Ícone para "Ver Projeto" ou detalhe
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" }),
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
);

const IconExternalLink = (props) => e( // Ícone para link externo (se fosse um projeto real)
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.75A.75.75 0 0112.75 6h3.75a.75.75 0 01.75.75v3.75M13.5 12l6.75-6.75" })
);


// --- Componente Portfólio Section ---
function PortfolioSection() {
    const simulatedProjects = [
        {
            id: 1,
            name: "Projeto Alpha Verde",
            category: "Identidade Visual & Web Design",
            image: PORTFOLIO_IMAGES[0] || `https://via.placeholder.com/600x400/5C946E/FFFFFF?text=Projeto+Alpha`, // Usa a constante
            description: "Uma simulação de um design web moderno e limpo, focado na experiência do usuário e na paleta verde e branca.",
            aos: "fade-up-right"
        },
        {
            id: 2,
            name: "Eco Soluções App",
            category: "Aplicativo Mobile",
            image: PORTFOLIO_IMAGES[1] || `https://via.placeholder.com/600x400/A7D7C5/3A5A40?text=Projeto+Beta`,
            description: "Interface de aplicativo mobile simulada, demonstrando navegação intuitiva e design responsivo com tons de verde.",
            aos: "fade-up"
        },
        {
            id: 3,
            name: "Plataforma Eden Growth",
            category: "Software como Serviço (SaaS)",
            image: PORTFOLIO_IMAGES[2] || `https://via.placeholder.com/600x400/3A5A40/FFFFFF?text=Projeto+Gama`,
            description: "Exemplo conceitual de uma plataforma SaaS, destacando clareza, organização da informação e estética verde.",
            aos: "fade-up-left"
        },
        // Você pode adicionar um quarto projeto se desejar e tiver a PORTFOLIO_IMAGES[3]
        {
            id: 4,
            name: "WhiteLeaf E-commerce",
            category: "Loja Virtual",
            image: PORTFOLIO_IMAGES[3] || `https://via.placeholder.com/600x400/E0F2E9/3A5A40?text=Projeto+Delta`,
            description: "Simulação de uma loja virtual elegante, com foco na apresentação de produtos e usabilidade, usando a paleta branco e verde.",
            aos: "fade-up"
        }
    ];

    // Estado para o modal/lightbox
    const [selectedProject, setSelectedProject] = React.useState(null);

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto'; // Restaura scroll do body
    };

    // Fechar modal com tecla ESC
    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);


    return e(
        'section',
        {
            id: 'portfolio', // ID para navegação
            className: 'py-16 md:py-24 bg-eden-white' // Fundo branco
        },
        e('div', { className: 'container mx-auto px-6' },
            e('div', { className: 'text-center mb-12 md:mb-16' },
                e('h2', {
                    className: 'text-3xl md:text-4xl font-bold font-serif text-eden-green-dark mb-4',
                    'data-aos': 'fade-up'
                }, 'Nosso Portfólio (Simulado)'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT max-w-3xl mx-auto',
                    'data-aos': 'fade-up', 'data-aos-delay': '100'
                }, 'Apresentamos alguns exemplos visuais para ilustrar nosso estilo e a qualidade que podemos entregar. Estas são simulações para referência de design.'),
                e('p', {
                    className: 'text-sm text-eden-green-dark opacity-75 mt-2',
                    'data-aos': 'fade-up', 'data-aos-delay': '150'
                }, '* Imagens meramente ilustrativas.')
            ),
            e('div', { className: 'grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10' }, // Ajustado para 2 colunas no LG para imagens maiores
                simulatedProjects.map((project, index) => e(
                    'div', // Card do Projeto
                    {
                        key: project.id,
                        className: 'group bg-eden-green-extralight rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer',
                        'data-aos': project.aos,
                        'data-aos-delay': (index * 100 + 200).toString(),
                        onClick: () => openModal(project)
                    },
                    e('div', { className: 'relative overflow-hidden' },
                        e('img', {
                            src: project.image,
                            alt: `Simulação do projeto ${project.name}`,
                            className: 'w-full h-64 md:h-80 object-cover transform transition-transform duration-500 group-hover:scale-110'
                        }),
                        e('div', { // Overlay no hover
                            className: 'absolute inset-0 bg-eden-green-dark bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex flex-col items-center justify-center p-4 text-center'
                        },
                            e(IconEye, { className: 'h-12 w-12 text-eden-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300 delay-100' }),
                            e('h3', { className: 'mt-2 text-xl font-semibold text-eden-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200' }, project.name),
                            e('p', { className: 'text-sm text-eden-green-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300' }, project.category)
                        )
                    )
                ))
            )
        ),
        // Modal/Lightbox para exibir detalhes do projeto
        selectedProject && e(
            'div',
            {
                className: 'fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fadeIn',
                onClick: closeModal // Fecha ao clicar fora da imagem
            },
            e('div',
                {
                    className: 'bg-eden-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative animate-slide-in-left',
                    onClick: (ev) => ev.stopPropagation() // Impede que o clique dentro do modal feche-o
                },
                e('button', {
                    onClick: closeModal,
                    className: 'absolute top-4 right-4 text-eden-green-dark hover:text-eden-green-DEFAULT transition-colors p-1 bg-eden-white/50 rounded-full'
                }, e(IconX, { className: 'h-7 w-7' })),

                e('h2', { className: 'text-2xl md:text-3xl font-bold font-serif text-eden-green-dark mb-4' }, selectedProject.name),
                e('p', { className: 'text-sm text-eden-green-DEFAULT mb-4 font-medium' }, selectedProject.category),
                e('img', {
                    src: selectedProject.image,
                    alt: `Detalhe da simulação do projeto ${selectedProject.name}`,
                    className: 'w-full h-auto max-h-[50vh] object-contain rounded-lg mb-6 shadow-md border-2 border-eden-green-light'
                }),
                e('p', { className: 'text-eden-green-dark leading-relaxed mb-6' }, selectedProject.description),
                e('a', {
                    href: '#', // Link simulado
                    onClick: (ev) => ev.preventDefault(),
                    className: 'inline-flex items-center bg-eden-green-DEFAULT text-eden-white font-semibold py-2 px-6 rounded-lg text-base hover:bg-eden-green-dark transition-colors duration-300 group'
                },
                    'Ver Detalhes (Simulado)',
                    e(IconExternalLink, { className: 'ml-2 h-5 w-5 transform transition-transform group-hover:rotate-3' })
                )
            )
        )
    );
}


// --- Componente Principal App (Modificado para incluir PortfolioSection) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero');

    // ... (React.useEffect para isLoading e AOS init - da Parte 2) ...
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false,
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
    };
    
    // ... (React.useEffect para IntersectionObserver - da Parte 2) ...
    React.useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.3) { 
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`,
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]);

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'},
            e(HeroSection, null),
            e(SolutionPresentationSection, null),
            e(ServicePackagesSection, null),
            e(BlogSection, null),
            e(PortfolioSection, null) // <<-- NOVA SEÇÃO ADICIONADA AQUI
            // Contato virá aqui
        ),
        // Footer será adicionado aqui
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}
'use strict';

// ... (código das Partes 1 a 6: e, constantes, utilitários, Loading, Header, Hero, SolutionPresentation, Packages, Blog, Portfolio, Ícones SVG) ...

// --- Ícones Adicionais para Contato e Rodapé (SVGs Inline) ---

const IconPhone = (props) => e(
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.018-.926-.055-1.291-.037-.365-.093-.691-.164-.982-.07-.291-.16-.543-.265-.766a10.724 10.724 0 00-.287-.535c-.124-.204-.27-.386-.434-.545a5.475 5.475 0 00-.647-.482c-.225-.153-.465-.273-.716-.362-.251-.089-.516-.142-.792-.158a28.355 28.355 0 00-1.86-.073H14.25c-.623 0-1.219.043-1.786.128a22.449 22.449 0 01-1.786.338 23.041 23.041 0 01-1.52.407 23.33 23.33 0 01-1.208.437c-.387.15-.736.296-1.045.437a9.95 9.95 0 00-.978.494c-.295.176-.55.375-.766.597a7.434 7.434 0 00-.647.78A7.42 7.42 0 006 12.25c0 .832.167 1.634.482 2.367.315.732.743 1.39 1.263 1.962.52.571 1.134 1.058 1.812 1.442.678.384 1.39.683 2.124.893.734.21 1.492.328 2.25.347.758.02 1.507-.04 2.232-.176.725-.136 1.42-.362 2.072-.677.652-.315 1.248-.714 1.776-1.188.529-.474.984-1.018 1.352-1.622.37-.604.643-1.282.824-1.999.18-.717.27-1.459.27-2.213V6.75M2.25 6.75S3 6 5.25 6h13.5S21 6.75 21 9v1.5M2.25 6.75H21" })
);

const IconEnvelope = (props) => e(
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" })
);

const IconMapPin = (props) => e( // Ícone para endereço (se houvesse)
    'svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
    e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
);


// --- Componente Contato Section ---
function ContactSection() {
    const contactInfo = [
        {
            icon: IconWhatsApp,
            label: "WhatsApp",
            value: `+${WHATSAPP_NUMBER.slice(0,3)} ${WHATSAPP_NUMBER.slice(3,5)} ${WHATSAPP_NUMBER.slice(5,8)} ${WHATSAPP_NUMBER.slice(8)}`, // Formatação do número
            href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, estou interessado em criar um site com a ${BRAND_NAME}.`)}`,
            aos: "fade-right"
        },
        {
            icon: IconPhone,
            label: "Telefone",
            value: `+${WHATSAPP_NUMBER.slice(0,3)} ${WHATSAPP_NUMBER.slice(3,5)} ${WHATSAPP_NUMBER.slice(5,8)} ${WHATSAPP_NUMBER.slice(8)}`, // Mesmo número
            href: `tel:+${WHATSAPP_NUMBER}`,
            aos: "fade-up"
        },
        {
            icon: IconEnvelope,
            label: "Email",
            value: CONTACT_EMAIL,
            href: `mailto:${CONTACT_EMAIL}`,
            aos: "fade-left"
        }
        // Pode adicionar endereço se necessário
        // {
        //     icon: IconMapPin,
        //     label: "Endereço",
        //     value: "Av. Exemplo, 123, Maputo, Moçambique",
        //     href: "#", // Link para mapa, se houver
        //     aos: "fade-up",
        //     aosDelay: "100"
        // }
    ];

    return e(
        'section',
        {
            id: 'contact', // ID para navegação
            className: 'py-16 md:py-24 bg-eden-green-extralight' // Fundo verde extra claro
        },
        e('div', { className: 'container mx-auto px-6' },
            e('div', { className: 'text-center mb-12 md:mb-16' },
                e('h2', {
                    className: 'text-3xl md:text-4xl font-bold font-serif text-eden-green-dark mb-4',
                    'data-aos': 'fade-up'
                }, 'Entre em Contato'),
                e('p', {
                    className: 'text-lg md:text-xl text-eden-green-DEFAULT max-w-2xl mx-auto',
                    'data-aos': 'fade-up', 'data-aos-delay': '100'
                }, `Pronto para levar seu negócio ao próximo nível? Fale conosco! Estamos ansiosos para entender suas necessidades e propor a melhor solução.`)
            ),
            e('div', { className: 'max-w-4xl mx-auto grid md:grid-cols-3 gap-8 md:gap-10 text-center' },
                contactInfo.map((item, index) => e(
                    'a', // Tornar o card de contato clicável
                    {
                        key: index,
                        href: item.href,
                        target: item.label === 'WhatsApp' || item.label === 'Email' ? '_blank' : '_self',
                        rel: item.label === 'WhatsApp' || item.label === 'Email' ? 'noopener noreferrer' : '',
                        className: 'block p-6 md:p-8 bg-eden-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group',
                        'data-aos': item.aos,
                        'data-aos-delay': (index * 100 + 200).toString()
                    },
                    e(item.icon, { className: 'h-12 w-12 md:h-16 md:w-16 text-eden-green-DEFAULT mx-auto mb-4 transition-transform duration-300 group-hover:scale-110' }),
                    e('h3', { className: 'text-xl md:text-2xl font-semibold text-eden-green-dark mb-1' }, item.label),
                    e('p', { className: 'text-eden-green-dark opacity-90' }, item.value)
                ))
            )
            // Opcional: Formulário de contato (mais complexo sem bibliotecas de formulário)
            // Se for adicionar, seria aqui. Para JS puro, seria um desafio maior de validação e envio.
        )
    );
}

// --- Componente Footer ---
function Footer({ onNavigate }) {
    const currentYear = new Date().getFullYear();
    const footerLinks = [
        { label: 'Home', action: () => onNavigate('hero') },
        { label: 'Serviços', action: () => onNavigate('packages') },
        { label: 'Blog', action: () => onNavigate('blog') },
        { label: 'Portfólio', action: () => onNavigate('portfolio') },
        { label: 'Contato', action: () => onNavigate('contact') }
    ];

    // Ícones sociais (simplificados)
    const socialLinks = [
        { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, ${BRAND_NAME}!`)}`, icon: IconWhatsApp },
        // Adicionar outros links sociais se existirem (Facebook, Instagram, LinkedIn)
        // Exemplo:
        // { label: "Instagram", href: "#", icon: IconInstagram }, 
        // { label: "Facebook", href: "#", icon: IconFacebook },
    ];

    return e(
        'footer',
        { className: 'bg-eden-green-dark text-eden-white' },
        e('div', { className: 'container mx-auto px-6 py-12 md:py-16' },
            e('div', { className: 'grid md:grid-cols-3 gap-8 items-center' },
                // Coluna 1: Logo e Nome
                e('div', { className: 'text-center md:text-left mb-6 md:mb-0' },
                    e('a', { href: '#', onClick: (ev) => {ev.preventDefault(); onNavigate('hero');} },
                        e('img', {
                            src: HERO_IMAGE_PATH, // Usar o logo aqui
                            alt: `${BRAND_NAME} Logo Rodapé`,
                            className: 'h-12 w-auto mx-auto md:mx-0 mb-3 invert filter brightness-0' // Invertido para branco
                        })
                    ),
                    e('p', { className: 'text-lg font-semibold font-serif' }, BRAND_NAME),
                    e('p', { className: 'text-sm text-eden-green-light' }, "Soluções Digitais Inovadoras")
                ),

                // Coluna 2: Links Úteis
                e('div', { className: 'text-center mb-6 md:mb-0' },
                    e('h3', { className: 'text-lg font-semibold mb-4 text-eden-green-light uppercase tracking-wider' }, 'Links Úteis'),
                    e('ul', { className: 'space-y-2' },
                        footerLinks.map(link => e('li', { key: link.label },
                            e('a', {
                                href: `#${link.label.toLowerCase()}`,
                                onClick: (ev) => { ev.preventDefault(); link.action(); },
                                className: 'hover:text-eden-green-light transition-colors duration-200'
                            }, link.label)
                        ))
                    )
                ),

                // Coluna 3: Contato Rápido / Social
                e('div', { className: 'text-center md:text-right' },
                    e('h3', { className: 'text-lg font-semibold mb-4 text-eden-green-light uppercase tracking-wider' }, 'Conecte-se'),
                     e('p', { className: 'mb-1' },
                        e('a', {href: `tel:+${WHATSAPP_NUMBER}`, className: 'hover:text-eden-green-light transition-colors'}, `Tel: +${WHATSAPP_NUMBER.slice(0,3)} ${WHATSAPP_NUMBER.slice(3,5)} ${WHATSAPP_NUMBER.slice(5,8)} ${WHATSAPP_NUMBER.slice(8)}`)
                    ),
                    e('p', { className: 'mb-4' },
                        e('a', {href: `mailto:${CONTACT_EMAIL}`, className: 'hover:text-eden-green-light transition-colors'}, `Email: ${CONTACT_EMAIL}`)
                    ),
                    e('div', { className: 'flex justify-center md:justify-end space-x-4' },
                        socialLinks.map(social => e('a', {
                            key: social.label,
                            href: social.href,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            'aria-label': social.label,
                            className: 'text-eden-green-light hover:text-eden-white transition-colors'
                        }, e(social.icon, { className: 'h-6 w-6' })))
                    )
                )
            ),
            e('div', { className: 'mt-10 pt-8 border-t border-eden-green-DEFAULT/30 text-center text-sm text-eden-green-light' },
                e('p', {}, `© ${currentYear} ${BRAND_NAME}. Todos os direitos reservados.`),
                e('p', {className: 'mt-1 opacity-70'}, `Design e Desenvolvimento com 💚 pela ${BRAND_NAME}`)
            )
        )
    );
}

// --- Componente Principal App (Modificado para incluir ContactSection e Footer) ---
function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState('hero');

    // ... (React.useEffect para isLoading e AOS init - da Parte 2) ...
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: false,
                    offset: 50,
                });
            } else {
                console.warn("AOS não está definido.");
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (sectionId) => {
        smoothScrollTo(sectionId);
    };
    
    // ... (React.useEffect para IntersectionObserver - da Parte 2) ...
    React.useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio > 0.3) { 
                         setActiveSection(entry.target.id);
                    }
                }
            });
        }, { 
            rootMargin: `-${navbarHeight + 20}px 0px 0px 0px`,
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, [isLoading]);

    if (isLoading) {
        return e(LoadingAnimation, { isLoading: true });
    }

    return e(
        'div',
        { className: 'bg-eden-white text-eden-green-dark min-h-screen antialiased' },
        e(Header, { activeSection: activeSection, onNavigate: handleNavigation }),
        e('main', {id: 'main-content'},
            e(HeroSection, null),
            e(SolutionPresentationSection, null),
            e(ServicePackagesSection, null),
            e(BlogSection, null),
            e(PortfolioSection, null),
            e(ContactSection, null) // <<-- NOVA SEÇÃO ADICIONADA AQUI
        ),
        e(Footer, { onNavigate: handleNavigation }) // <<-- NOVO COMPONENTE ADICIONADO AQUI
    );
}

// --- Montar o App no DOM ---
// ... (código da Parte 1 para montar o App) ...
const domContainer = document.querySelector('#root');
if (domContainer) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(App));
} else {
    console.error('Elemento root não encontrado no DOM.');
}