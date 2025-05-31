// main.js
const e = React.createElement;
const { motion, AnimatePresence } = window.FramerMotion; // Certifique-se que FramerMotion está no escopo global

// --- Constantes e Dados (semelhante ao anterior, mas podemos refinar) ---
const NOME_EMPRESA = "Eden Labs";
const WHATSAPP_NUMERO = "258865097696";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=`;
const EMAIL_CONTATO = "contato@edenlabs.co.mz";
const TELEFONE_CONTATO = `+${WHATSAPP_NUMERO}`;

const servicosData = [
    {
        id: "software",
        nome: "Soluções de Software Personalizadas",
        preco: "A partir de 8.000 Mt",
        descricao: "Desenvolvimento sob medida para suas necessidades. Inclui: suporte técnico por 3 meses, integração com sistemas existentes, design responsivo e painel administrativo intuitivo.",
        destaques: ["Plataformas Web", "Aplicativos Mobile", "Sistemas de Gestão", "APIs Robustas"],
        icon: () => e('svg', {xmlns:"http://www.w3.org/2000/svg", width:"32", height:"32", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round", className:"text-eden-green"}, e('path', {d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"}), e('polyline', {points:"14 2 14 8 20 8"}), e('line', {x1:"16", y1:"13", x2:"8", y2:"13"}), e('line', {x1:"16", y1:"17", x2:"8", y2:"17"}), e('line', {x1:"10", y1:"9", x2:"8", y2:"9"})),
        whatsappMsg: `Olá, gostaria de contratar o pacote de Soluções de Software Personalizadas`
    },
    {
        id: "ecommerce",
        nome: "E-commerce de Alta Performance",
        preco: "A partir de 15.000 Mt",
        descricao: "Lojas virtuais com design moderno, otimizadas para conversão. Integração com M-Pesa/Paypal, produtos ilimitados, dashboard completo e suporte técnico especializado.",
        destaques: ["Design Exclusivo", "Pagamentos Seguros", "Marketing Integrado", "Análise de Dados"],
        icon: () => e('svg', {xmlns:"http://www.w3.org/2000/svg", width:"32", height:"32", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round", className:"text-eden-green"}, e('circle', {cx:"8", cy:"21", r:"1"}), e('circle', {cx:"19", cy:"21", r:"1"}), e('path', {d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"})),
        whatsappMsg: `Olá, gostaria de contratar o pacote de E-commerce de Alta Performance`
    },
    {
        id: "corporativos",
        nome: "Websites Corporativos de Impacto",
        preco: "A partir de 6.500 Mt",
        descricao: "Presença online profissional para sua marca. Formulários personalizados, SEO otimizado, galerias dinâmicas e design que reflete sua identidade.",
        destaques: ["Identidade Visual Forte", "Conteúdo Otimizado (SEO)", "Integração com Mídias", "Manutenção Facilitada"],
        icon: () => e('svg', {xmlns:"http://www.w3.org/2000/svg", width:"32", height:"32", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.5", strokeLinecap:"round", strokeLinejoin:"round", className:"text-eden-green"}, e('path', {d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"}), e('path', {d:"m9 12 2 2 4-4"})), // Ícone de escudo com check
        whatsappMsg: `Olá, gostaria de contratar o pacote de Websites Corporativos de Impacto`
    }
];

// (Blog e Portfólio data podem ser mantidos como antes, ou melhorados com mais campos se necessário)
const blogPostsData = [ /* ... mesmo de antes ou melhorado ... */ ];
const portfolioData = [ /* ... mesmo de antes ou melhorado ... */ ];


// --- Framer Motion Variantes Comuns ---
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.15 * i, delayChildren: 0.1 * i },
    }),
};

const fadeInUpItem = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.7 },
    },
};

const fadeInLeftItem = {
    hidden: { x: -50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.7 },
    },
};

const fadeInRightItem = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.7 },
    },
};

const scaleUpItem = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.5 },
    }
};


// --- Componentes Auxiliares ---
// ... (IconWhatsApp, IconPhone podem ser mantidos, mas estilizados de forma diferente se necessário)
function IconWhatsApp(props) { /* ... Mantenha o SVG, ajuste classes se necessário ... */ }
function IconPhone(props) { /* ... Mantenha o SVG, ajuste classes se necessário ... */ }
function IconMail(props) {
    return e('svg', {xmlns:"http://www.w3.org/2000/svg", width: props.size || "20", height: props.size || "20", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", className: props.className || ''},
        e('rect', {width:"20", height:"16", x:"2", y:"4", rx:"2"}),
        e('path', {d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})
    );
}

function ScrollToLink(props) {
    // ... (Mantenha a lógica, mas estilize o link de forma mais "robusta")
    return e(motion.a, {
        href: props.href,
        className: `px-3 py-2 rounded-md text-sm font-medium text-eden-green-darker hover:text-eden-green hover:bg-eden-green-extralight transition-all duration-200 ease-in-out relative group ${props.className || ''}`,
        onClick: (event) => {
            event.preventDefault();
            const targetElement = document.querySelector(props.href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (props.onClick) props.onClick(); // Para fechar o menu mobile
        },
        whileHover: { y: -2 },
        whileTap: { scale: 0.95 }
    }, 
      props.children,
      e('span', {className: 'absolute bottom-0 left-0 w-full h-0.5 bg-eden-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out'})
    );
}

// --- Componentes de Seção (Refatorados) ---

function LoadingScreen() {
    // Animação de carregamento mais elaborada
    return e(AnimatePresence, null,
        e(motion.div, {
            key: 'loading',
            className: 'fixed inset-0 bg-eden-off-white flex flex-col justify-center items-center z-[100]',
            initial: { opacity: 1 },
            exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
        },
            e(motion.img, {
                src: 'logo.jpg',
                alt: 'Carregando Eden Labs...',
                className: 'w-32 h-32 md:w-40 md:h-40',
                initial: { scale: 0.5, opacity: 0 },
                animate: { scale: 1, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 150, damping: 10 } }
            }),
            e(motion.div, {
                className: 'mt-6 flex space-x-1.5',
                initial: "hidden",
                animate: "visible",
                variants: {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
                }
            },
                [...Array(3)].map((_, i) => 
                    e(motion.div, {
                        key: i,
                        className: 'w-3 h-3 bg-eden-green rounded-full',
                        variants: {
                            hidden: { y:0, opacity: 0.5 },
                            visible: { y: [0, -8, 0], opacity: [0.5, 1, 0.5], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        }
                    })
                )
            )
        )
    );
}

function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", text: "Início" },
        { href: "#solucoes", text: "Soluções" },
        { href: "#pacotes", text: "Pacotes" },
        // { href: "#blog", text: "Blog" }, // Adicionar depois
        // { href: "#portfolio", text: "Portfólio" }, // Adicionar depois
        { href: "#contato", text: "Contato" },
    ];

    return e(motion.header, {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? 'bg-eden-white/95 shadow-eden-md backdrop-blur-sm' : 'bg-transparent'}`,
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, delay: 0.5, ease: "easeOut" }
    },
        e('div', { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
            e('div', { className: 'flex items-center justify-between h-20' }, // Altura aumentada
                e(motion.a, {
                    href: '#home',
                    onClick: (event) => { event.preventDefault(); document.querySelector('#home').scrollIntoView({ behavior: 'smooth' }); },
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 }
                },
                    e('img', { className: `h-12 w-auto transition-all duration-300 ${scrolled ? 'filter brightness-100' : 'filter brightness-0 invert'}`, src: 'logo.jpg', alt: NOME_EMPRESA })
                ),
                e('nav', { className: 'hidden md:flex items-center space-x-2 lg:space-x-4' }, // Espaçamento ajustado
                    ...navLinks.map(link => e(ScrollToLink, { 
                        key: link.href, 
                        href: link.href,
                        className: scrolled ? 'text-eden-green-darker' : 'text-eden-white hover:text-eden-green-lightest' 
                    }, link.text))
                ),
                e('div', { className: '-mr-2 flex md:hidden' }, // Botão Hamburguer
                    e(motion.button, {
                        onClick: () => setIsOpen(!isOpen),
                        type: 'button',
                        className: `inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset ${scrolled ? 'text-eden-green hover:bg-eden-green-extralight focus:ring-eden-green' : 'text-eden-white hover:bg-eden-green-light/20 focus:ring-eden-white'}`,
                        'aria-controls': 'mobile-menu', 'aria-expanded': isOpen,
                        whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }
                    },
                        e('span', { className: 'sr-only' }, 'Abrir menu principal'),
                        // Ícone Hamburguer/Close animado
                        e('div', { className: 'w-6 h-6 relative' },
                            e(motion.span, { 
                                className: `block absolute h-0.5 w-full ${scrolled ? 'bg-eden-green' : 'bg-eden-white'} transform transition duration-300 ease-in-out`,
                                animate: isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 },
                                style: { top: '50%' }
                            }),
                            e(motion.span, { 
                                className: `block absolute h-0.5 w-full ${scrolled ? 'bg-eden-green' : 'bg-eden-white'} transform transition duration-300 ease-in-out`,
                                animate: isOpen ? { opacity: 0 } : { opacity: 1 },
                                style: { top: '50%' }
                            }),
                            e(motion.span, { 
                                className: `block absolute h-0.5 w-full ${scrolled ? 'bg-eden-green' : 'bg-eden-white'} transform transition duration-300 ease-in-out`,
                                animate: isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 },
                                style: { top: '50%' }
                            })
                        )
                    )
                )
            )
        ),
        // Mobile menu com AnimatePresence
        e(AnimatePresence, null, 
            isOpen && e(motion.div, {
                key: 'mobile-menu',
                className: 'md:hidden bg-eden-white shadow-eden-lg absolute top-full inset-x-0',
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.3, ease: "easeInOut" }
            },
                e('div', { className: 'px-2 pt-2 pb-3 space-y-1 sm:px-3' },
                    ...navLinks.map(link => e(ScrollToLink, { 
                        key: link.href, 
                        href: link.href, 
                        className: 'block w-full text-left text-eden-green-darker hover:bg-eden-green-extralight',
                        onClick: () => setIsOpen(false) // Fecha o menu ao clicar
                    }, link.text))
                )
            )
        )
    );
}

function HeroSection() {
    const titleParts = "Transforme seu negócio.".split(" ");
    const subtitleParts = "Entre no mundo digital com soluções inovadoras.".split(" ");

    return e(motion.section, { 
        id: 'home', 
        className: 'min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-eden-green-darkest via-eden-green-dark to-eden-green-medium text-eden-white',
        // Adicionando um padrão de fundo sutil
        style: { backgroundImage: `linear-gradient(to bottom right, var(--tw-color-eden-green-darkest), var(--tw-color-eden-green-dark), var(--tw-color-eden-green-medium)), url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.03'%3E%3Cpath d='M30 0h1v60h-1zM0 30h60v1h-60z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }
    },
        // Elementos decorativos animados no fundo
        [...Array(5)].map((_, i) => 
            e(motion.div, {
                key: `deco-${i}`,
                className: 'absolute rounded-full bg-eden-green-light/10',
                style: {
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                },
                animate: {
                    scale: [1, 1.2 + Math.random() * 0.5, 1],
                    opacity: [0, 0.5, 0],
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                },
                transition: { duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }
            })
        ),

        e(motion.div, {
            className: 'relative z-10 max-w-4xl mx-auto',
            variants: staggerContainer,
            initial: "hidden",
            animate: "visible"
        },
            e(motion.img, { 
                src: 'logo.jpg', 
                alt: `${NOME_EMPRESA} Logo`, 
                className: 'w-28 h-28 md:w-36 md:h-36 mx-auto mb-8 rounded-full shadow-eden-2xl border-4 border-eden-white/50 bg-eden-white p-1',
                variants: scaleUpItem,
                drag: true, dragConstraints: { left: -20, right: 20, top: -20, bottom: 20 },
                dragElastic: 0.2,
                whileHover: { scale: 1.1, boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }
            }),
            e(motion.h1, { 
                className: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-eden-white mb-6 leading-tight tracking-tighter',
                variants: staggerContainer // Para animar as palavras
            },
                titleParts.map((part, index) => 
                    e(motion.span, { key: index, className: 'inline-block mr-3', variants: fadeInUpItem }, part)
                ),
                e('br'),
                subtitleParts.map((part, index) => 
                    e(motion.span, { key: `sub-${index}`, className: 'inline-block mr-2 text-eden-green-light opacity-90', variants: fadeInUpItem }, part)
                )
            ),
            e(motion.p, { 
                className: 'max-w-2xl mx-auto text-lg sm:text-xl text-eden-white/80 mb-12 font-light',
                variants: fadeInUpItem
            },
                `A ${NOME_EMPRESA} leva sua empresa ao próximo nível com tecnologia de ponta, design focado em resultados e paixão por inovação digital.`
            ),
            e(motion.button, {
                onClick: () => document.getElementById('pacotes').scrollIntoView({ behavior: 'smooth', block: 'start' }),
                className: 'px-10 py-4 bg-eden-white text-eden-green-darker font-bold rounded-lg shadow-eden-xl hover:bg-eden-green-lightest transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-eden-green-light focus:ring-opacity-60 text-lg relative overflow-hidden group transform hover:-translate-y-1',
                variants: fadeInUpItem,
                whileHover: { 
                    boxShadow: "0 10px 20px rgba(255, 255, 255, 0.2)",
                },
                whileTap: { scale: 0.95 }
            }, 
                e('span', {className: 'relative z-10'}, 'Conheça Nossos Pacotes'),
                // Efeito de fundo no hover
                e(motion.span, {
                    className: 'absolute inset-0 w-full h-full bg-eden-green opacity-0 group-hover:opacity-10 transition-opacity duration-300'
                })
            )
        ),
        // Indicador de scroll para baixo
        e(motion.div, {
            className: 'absolute bottom-10 left-1/2 -translate-x-1/2 z-10',
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0, transition: { delay: 2, duration: 0.8 } },
            whileHover: { scale: 1.2 }
        },
            e('a', {href: '#solucoes', onClick: (ev) => {ev.preventDefault(); document.querySelector('#solucoes').scrollIntoView({behavior: 'smooth', block: 'start'})}},
                e('div', {className: 'w-8 h-14 border-2 border-eden-white/50 rounded-full flex justify-center items-start p-1'},
                    e(motion.div, {
                        className: 'w-1.5 h-3 bg-eden-white rounded-full',
                        animate: { y: [0, 18, 0] },
                        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    })
                )
            )
        )
    );
}


function SolucoesSection() {
    const features = [
        { icon: '🧠', title: "Inteligência Artificial Aplicada", text: "Automatize processos e tome decisões mais inteligentes com IA e Machine Learning." },
        { icon: '🔒', title: "Segurança e Escalabilidade", text: "Soluções robustas, seguras e prontas para crescer com o seu negócio." },
        { icon: '🚀', title: "Performance Otimizada", text: "Aplicações rápidas e eficientes para a melhor experiência do usuário." },
        { icon: '🤝', title: "Parceria Estratégica", text: "Do conceito à execução e além – somos seu parceiro de tecnologia dedicado." },
        { icon: '🎨', title: "Design Centrado no Usuário", text: "Interfaces intuitivas e designs atraentes que convertem e encantam." },
        { icon: '📊', title: "Análise e Insights", text: "Transforme dados em conhecimento para impulsionar o crescimento contínuo." }
    ];

    return e(motion.section, { 
        id: 'solucoes', 
        className: 'py-20 md:py-32 bg-eden-off-white px-4 sm:px-6 lg:px-8 relative overflow-hidden',
        // style: { backgroundImage: `url("data:image/svg+xml,...")` } // Padrão de fundo sutil se desejar
    },
        e('div', { className: 'absolute top-0 left-0 w-full h-48 bg-section-fade-white z-10 transform rotate-180'}), // Efeito de fade no topo
        e('div', { className: 'absolute bottom-0 left-0 w-full h-48 bg-section-fade-white z-10'}), // Efeito de fade na base

        e(motion.div, { 
            className: 'max-w-6xl mx-auto text-center relative z-20',
            initial: "hidden",
            whileInView: "visible", // Anima quando a seção entra na viewport
            viewport: { once: true, amount: 0.3 },
            variants: staggerContainer
        },
            e(motion.h2, { 
                className: 'text-4xl sm:text-5xl font-extrabold text-eden-green-darker mb-6 tracking-tight',
                variants: fadeInUpItem
            }, 'Soluções Digitais que Impulsionam Resultados'),
            e(motion.p, { 
                className: 'text-lg md:text-xl text-eden-gray-darker max-w-3xl mx-auto mb-16 md:mb-20',
                variants: fadeInUpItem
            }, `Na ${NOME_EMPRESA}, unimos expertise técnica com uma visão estratégica para criar soluções digitais que não apenas resolvem problemas, mas abrem novas oportunidades para o seu negócio florescer no ambiente digital.`),
            
            e(motion.div, { 
                className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left',
                variants: staggerContainer // Para animar os cards em sequência
            },
                features.map((feature, index) => 
                    e(motion.div, { 
                        key: index, 
                        className: 'bg-eden-white p-6 md:p-8 rounded-xl shadow-eden-lg hover:shadow-eden-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group',
                        variants: scaleUpItem,
                        whileHover: {
                            // backgroundColor: "var(--tw-color-eden-green-extralight)" // ou outra cor sutil
                        }
                    },
                        e('div', { className: 'flex items-center mb-5' },
                            e('div', { className: 'text-3xl mr-4 p-3 bg-eden-green-extralight rounded-full text-eden-green group-hover:bg-eden-green group-hover:text-eden-white transition-colors duration-300' }, feature.icon),
                            e('h3', { className: 'text-xl font-semibold text-eden-green-darker group-hover:text-eden-green transition-colors duration-300' }, feature.title)
                        ),
                        e('p', { className: 'text-eden-gray-dark text-sm leading-relaxed' }, feature.text)
                    ))
                )
            )
        )
    );
}


function PacotesSection() {
    return e(motion.section, {
        id: 'pacotes',
        className: 'py-20 md:py-32 bg-eden-green-extralight px-4 sm:px-6 lg:px-8 relative overflow-hidden',
        // Adicionar um padrão de fundo sutil de linhas ou pontos verdes claros
        style: { backgroundImage: 'var(--tw-bg-hero-subtle-dots)' }
    },
        e('div', { className: 'absolute top-0 left-0 w-full h-64 bg-section-fade-green z-0 transform rotate-180 opacity-70'}), 
        e('div', { className: 'absolute bottom-0 left-0 w-full h-64 bg-section-fade-green z-0 opacity-70'}),

        e(motion.div, {
            className: 'max-w-7xl mx-auto text-center relative z-10',
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.2 },
            variants: staggerContainer
        },
            e(motion.h2, {
                className: 'text-4xl sm:text-5xl font-extrabold text-eden-green-darker mb-6 tracking-tight',
                variants: fadeInUpItem
            }, 'Pacotes Sob Medida Para Seu Sucesso'),
            e(motion.p, {
                className: 'text-lg md:text-xl text-eden-gray-darker max-w-3xl mx-auto mb-16 md:mb-20',
                variants: fadeInUpItem
            }, 'Escolha o plano ideal para iniciar sua jornada digital ou elevar sua presença online. Todos os pacotes são flexíveis e podem ser personalizados.'),

            e(motion.div, {
                className: 'grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch', // items-stretch para cards de mesma altura
                variants: staggerContainer
            },
                servicosData.map((servico, index) =>
                    e(motion.div, {
                        key: servico.id,
                        className: `bg-eden-white rounded-2xl shadow-eden-xl hover:shadow-eden-2xl p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-105 group ${index === 1 ? 'border-4 border-eden-green shadow-eden-2xl scale-105 lg:scale-110 z-10' : 'opacity-95 hover:opacity-100'}`, // Destaque para o pacote do meio
                        variants: fadeInUpItem,
                        // Adicionar um brilho sutil no hover com Framer Motion
                        whileHover: {
                            boxShadow: `0 0 0 3px var(--tw-color-eden-green-light), var(--tw-shadow-eden-2xl)`
                        }
                    },
                        e('div', { className: 'mb-6 text-center' },
                            e('div', {className: 'inline-block p-4 bg-eden-green-extralight rounded-full mb-4 group-hover:bg-eden-green transition-colors duration-300'},
                                servico.icon ? servico.icon() : e('span', {className:'text-3xl text-eden-green group-hover:text-white'}, '⭐') // Placeholder icon
                            ),
                            e('h3', { className: 'text-2xl font-bold text-eden-green-darker mb-2' }, servico.nome),
                            e('p', { className: 'text-2xl font-extrabold text-eden-green mb-3' }, servico.preco),
                            e('p', { className: 'text-sm text-eden-gray-dark h-20 overflow-y-auto custom-scrollbar' }, servico.descricao) // Altura fixa e scroll se necessário
                        ),
                        e('ul', { className: 'space-y-2 text-sm text-eden-gray-darker mb-8 flex-grow' },
                            servico.destaques.map((destaque, i) =>
                                e('li', { key: i, className: 'flex items-center' },
                                    e('svg', { xmlns:"http://www.w3.org/2000/svg", width:"18", height:"18", viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2.5", strokeLinecap:"round", strokeLinejoin:"round", className:"text-eden-green mr-2.5 flex-shrink-0"}, e('polyline', {points:"20 6 9 17 4 12"})),
                                    destaque
                                )
                            )
                        ),
                        e(motion.a, {
                            href: `${WHATSAPP_BASE_URL}${encodeURIComponent(servico.whatsappMsg)}`,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            className: `mt-auto w-full inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-lg shadow-eden-md transition-all duration-300 ease-in-out text-base ${index === 1 ? 'bg-eden-green text-eden-white hover:bg-eden-green-dark' : 'bg-eden-green-light text-eden-green-darkest hover:bg-eden-green hover:text-eden-white'}`,
                            whileHover: { scale: 1.03, y: -2 },
                            whileTap: { scale: 0.98 }
                        },
                            e(IconWhatsApp, { size: "20", className: 'mr-2.5' }),
                            'Contratar Agora'
                        ),
                        index === 1 && e('div', {className: 'absolute -top-3 left-1/2 -translate-x-1/2 bg-eden-green text-eden-white text-xs font-bold px-3 py-1 rounded-full shadow-md'}, 'MAIS POPULAR')
                    ))
                )
            )
        )
    );
}


// --- Componente Principal App ---
function App() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--tw-color-eden-green-darkest', '#064E3B'); // Exemplo de como setar vars CSS se necessário
        root.style.setProperty('--tw-color-eden-green-dark', '#047857');
        root.style.setProperty('--tw-color-eden-green-medium', '#059669');
        root.style.setProperty('--tw-color-eden-green-light', '#6EE7B7');
        root.style.setProperty('--tw-color-eden-green-extralight', '#D1FAE5');
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Aumentar o tempo de loading para apreciar a animação

        // AOS pode ser inicializado aqui se ainda for usado para algumas coisas
        // AOS.init({ duration: 800, offset: 100, once: true, easing: 'ease-in-out-sine' });
        
        return () => clearTimeout(timer);
    }, []);


    return e(React.Fragment, null,
        e(AnimatePresence, { exitBeforeEnter: true }, // Para animações de saída do loading screen
            loading && e(LoadingScreen, { key: 'loadingScreen' })
        ),
        !loading && e(motion.div, { // Wrapper para animar a entrada do site inteiro
                key: 'mainContent',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.5 }
            },
            e(Header),
            e(HeroSection),
            e(SolucoesSection),
            e(PacotesSection)
            // e(BlogSection), // Adicionar depois
            // e(PortfolioSection), // Adicionar depois
            // e(Footer) // Adicionar depois
        )
    );
}

// Renderiza o componente App
ReactDOM.render(e(App), document.getElementById('root'));