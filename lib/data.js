export const profile = {
  firstName: "Leonardo",
  lastName: "Torres Quelal",
  nickname: "Leo",
  photo: "/profile.jpg",
  resume: { en: "/cv/Leonardo_Torres_CV_EN.pdf", es: "/cv/Leonardo_Torres_CV_ES.pdf" },
  linkedin: "https://www.linkedin.com/in/leonardo-torres-quelal/",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/leonardo-torres-quelal/" },
    { name: "GitHub", url: "https://github.com/litomax01" },
  ],
};

export const projects = [
  {
    slug: "retroroom", title: "Zona Retro Gamer", isNew: true, color: "#7b2ff7", colorDark: "#3d1580",
    year: "2026", stack: "Angular 21, TypeScript, Three.js, GSAP",
    live: "https://retroroom-acme-cc59.vercel.app", repo: "https://github.com/litomax01/RetroRoomPortfolio",
    images: ["/projects/retroroom-1.jpg", "/projects/retroroom-2.jpg", "/projects/retroroom-3.jpg"],
    category: { en: "3D portfolio", es: "Portafolio 3D" },
    description: {
      en: "Interactive 3D portfolio set in a retro game room. Explore the room with the mouse: a pinball machine, an arcade cabinet with Pac-Man, a pool table, a chess table, a foosball table, a Super Nintendo and a CRT TV that are all playable, a jukebox with music, and a shelf of cartridges with my projects. Bilingual (Spanish/English), with downloadable CVs. Built with Angular, Three.js and GSAP.",
      es: "Portafolio 3D interactivo ambientado en una sala de videojuegos retro. Explora la sala con el mouse: un pinball, una máquina arcade con Pac-Man, una mesa de billar, una mesa de ajedrez, un futbolín, un Super Nintendo y una TV de tubo, todos jugables, una rockola con música y una estantería de cartuchos con mis proyectos. Bilingüe (español/inglés), con CV descargable. Hecho con Angular, Three.js y GSAP.",
    },
  },
  {
    slug: "gymflow", title: "GymFlow", isNew: true, color: "#0f9d58", colorDark: "#0a6b3c",
    year: "2026", stack: "Angular 21, Spring Boot, Java 21, PostgreSQL, Docker",
    live: null, repo: "https://github.com/litomax01/GymApp",
    images: ["/projects/gymflow.jpg", "/projects/gymflow-2.jpg", "/projects/gymflow-3.jpg", "/projects/gymflow-4.jpg"],
    category: { en: "Web app", es: "Aplicación web" },
    description: {
      en: "Gym management system: members, memberships and payments, entry check-in with a green or red result, and a retention radar that spots members about to leave and prepares the WhatsApp message.",
      es: "Sistema de gestión para gimnasios: socios, membresías y pagos, control de entrada con aviso en verde o rojo y un radar de retención que detecta socios a punto de irse y prepara el mensaje de WhatsApp.",
    },
  },
  {
    slug: "ecuadeals", title: "Ecuadeals", isNew: true, color: "#c2185b", colorDark: "#7b0f3a",
    year: "2026", stack: "Angular 21, Spring Boot, Java 21, Firebase, PayPal",
    live: null, repo: "https://github.com/litomax01/ProyectoEcuadealsAgosto2026",
    images: ["/projects/ecuadeals.jpg"],
    category: { en: "E-commerce", es: "Comercio electrónico" },
    description: {
      en: "Online store for perfumes and cosmetics in Ecuador: filtered catalog, cart, PayPal payments, configurable shipping zones and an admin panel. Sign-in with Firebase and Google.",
      es: "Tienda en línea de perfumes y cosméticos para Ecuador: catálogo con filtros, carrito, pagos con PayPal, envío por zonas configurables y panel de administración. Acceso con Firebase y Google.",
    },
  },
  {
    slug: "electrobodegon", title: "ElectroBodegón", isNew: true, color: "#c8102e", colorDark: "#7d0a1c",
    year: "2026", stack: "Angular 21, TypeScript, Tailwind CSS 4, Supabase, Docker",
    live: null, repo: "https://github.com/litomax01/ElectroBodegonEcommerce",
    images: ["/projects/electrobodegon.jpg", "/projects/electrobodegon-2.jpg", "/projects/electrobodegon-3.jpg", "/projects/electrobodegon-4.jpg", "/projects/electrobodegon-5.jpg"],
    category: { en: "E-commerce", es: "Comercio electrónico" },
    description: {
      en: "Online catalogue for an appliance store with two branches. Product catalogue with search and filters, product pages, branch pages with maps and hours, WhatsApp ordering and an admin panel. Built with Angular and Supabase, with a local JSON fallback.",
      es: "Catálogo en línea para una tienda de electrodomésticos con dos sucursales. Catálogo con búsqueda y filtros, fichas de producto, sucursales con mapas y horarios, pedidos por WhatsApp y panel de administración. Hecho con Angular y Supabase, con respaldo en JSON local.",
    },
  },
  {
    slug: "gestion-proyectos", title: "Gestión de Proyectos", isNew: true, color: "#3b5bdb", colorDark: "#22358a",
    year: "2026", stack: "Node.js 22, Express 5, EJS, SQLite, bcrypt",
    live: null, repo: "https://github.com/litomax01/projectManagementApp",
    images: ["/projects/gestion-1.png", "/projects/gestion-2.png", "/projects/gestion-3.png"],
    category: { en: "Web app", es: "Aplicación web" },
    description: {
      en: "Team project manager: sign-up and login, projects with members, a three-column task board (to do, in progress, done), task detail with assignee, due date and comments, and a progress bar. Server-rendered with Express and EJS, SQLite storage, hashed passwords and CSRF protection.",
      es: "Gestor de proyectos en equipo: registro e inicio de sesión, proyectos con miembros, tablero de tareas en tres columnas (por hacer, en curso, hecha), detalle de tarea con responsable, fecha límite y comentarios, y barra de progreso. Renderizado en servidor con Express y EJS, base de datos SQLite, contraseñas cifradas y protección CSRF.",
    },
  },
  {
    slug: "coffeeshop", title: "La Esquina de la 24", isNew: true, color: "#b86b5a", colorDark: "#6e3a2e",
    year: "2026", stack: "Angular 19, TypeScript, SCSS",
    live: null, repo: "https://github.com/litomax01/CoffeeShop",
    images: ["/projects/esquina24.jpg", "/projects/esquina24-2.jpg", "/projects/esquina24-3.jpg", "/projects/esquina24-4.jpg", "/projects/esquina24-5.jpg"],
    category: { en: "Website", es: "Sitio web" },
    description: {
      en: "Bilingual (Spanish/English) website for a family business that combines an artisanal coffee shop and a flower shop. Landing page with hero, about, gallery, menu preview and contact sections, plus a full menu page with categories, prices and dish descriptions. Built with Angular standalone components, lazy-loaded routes and a central site configuration.",
      es: "Sitio web bilingüe (español/inglés) para un emprendimiento familiar que une una cafetería artesanal y una florería. Página de inicio con portada, nosotros, galería, vista previa del menú y contacto, y una página de menú completo con categorías, precios y descripción de los platos. Hecho con componentes standalone de Angular, rutas con carga diferida y una configuración central del sitio.",
    },
  },
];

// Detailed case-study info per project (problem, contribution, key features).
const details = {
  retroroom: {
    tech: [
      { name: "Angular 21", why: { en: "Standalone components and lazy loading keep the app organized and the initial load light.", es: "Componentes standalone y carga diferida mantienen la app ordenada y la carga inicial ligera." } },
      { name: "Three.js", why: { en: "Renders the whole room, lights and models in real time in the browser, with no plugins.", es: "Dibuja toda la sala, las luces y los modelos en tiempo real en el navegador, sin plugins." } },
      { name: "GSAP", why: { en: "Smooth camera movements between the shelf, the jukebox and the rest of the room.", es: "Movimientos de cámara suaves entre la estantería, la rockola y el resto de la sala." } },
      { name: "Embedded games", why: { en: "Pinball, Pac-Man, chess, pool, foosball and Super Nintendo run inside the room so visitors can actually play.", es: "Pinball, Pac-Man, ajedrez, billar, futbolín y Super Nintendo corren dentro de la sala para que el visitante juegue de verdad." } },
      { name: "Vercel", why: { en: "Static deployment with long cache headers for models, textures and audio.", es: "Publicación estática con caché larga para modelos, texturas y audio." } },
    ],
    problem: { en: "A portfolio that is memorable: instead of a flat list of links, visitors walk into a game room where each object opens a part of my work.", es: "Un portafolio memorable: en lugar de una lista de enlaces, el visitante entra a una sala de videojuegos donde cada objeto abre una parte de mi trabajo." },
    contribution: { en: "Design and full development: 3D scene, camera and interactions, playable games, music player, bilingual content and downloadable CVs.", es: "Diseño y desarrollo completo: escena 3D, cámara e interacciones, juegos jugables, reproductor de música, contenido bilingüe y CV descargable." },
    features: { en: ["Interactive 3D room built with Three.js", "Playable pinball, Pac-Man arcade, pool, chess, foosball and Super Nintendo", "Jukebox with music and volume control", "Cartridge shelf with my projects", "Bilingual (Spanish/English) with downloadable CVs"], es: ["Sala 3D interactiva hecha con Three.js", "Pinball, arcade de Pac-Man, billar, ajedrez, futbolín y Super Nintendo jugables", "Rockola con música y control de volumen", "Estantería de cartuchos con mis proyectos", "Bilingüe (español/inglés) con CV descargable"] },
  },
  gymflow: {
    tech: [
      { name: "Angular 21", why: { en: "Fast reactive interface for reception, with separate views for check-in, members and plans.", es: "Interfaz reactiva y rápida para recepción, con vistas separadas para entradas, socios y planes." } },
      { name: "Spring Boot + Java 21", why: { en: "Robust REST API with validation, roles and a clear service layer.", es: "API REST robusta con validaciones, roles y una capa de servicios clara." } },
      { name: "PostgreSQL", why: { en: "Relational data fits members, memberships, payments and entries with integrity.", es: "Los datos relacionales encajan con socios, membresías, pagos y entradas con integridad." } },
      { name: "JWT", why: { en: "Stateless authentication with roles, so reception and admin see different things.", es: "Autenticación sin estado con roles, para que recepción y administración vean cosas distintas." } },
      { name: "Docker Compose", why: { en: "One command starts the database, the API and the interface on any machine.", es: "Un solo comando levanta la base de datos, la API y la interfaz en cualquier equipo." } },
    ],
    problem: { en: "Reception and administration needed a single tool for members, dues, entries and retention.", es: "Recepción y administración necesitaban una sola herramienta para socios, cuotas, entradas y retención." },
    contribution: { en: "Full development: API with roles and JWT, 27 backend integration tests, 11 frontend tests and Docker Compose deployment.", es: "Desarrollo completo: API con roles y JWT, 27 pruebas de integración en el servidor, 11 en la interfaz y despliegue con Docker Compose." },
    features: { en: ["Members, memberships and payments", "Entry check-in with a green or red result", "Retention radar that spots members about to leave", "Prepared WhatsApp message for each member", "Role-based access with JWT"], es: ["Socios, membresías y pagos", "Control de entrada con aviso en verde o rojo", "Radar de retención que detecta socios a punto de irse", "Mensaje de WhatsApp preparado para cada socio", "Acceso por roles con JWT"] },
  },
  ecuadeals: {
    tech: [
      { name: "Angular 21", why: { en: "Catalog, cart and checkout as a fast single-page store.", es: "Catálogo, carrito y pago como una tienda rápida de una sola página." } },
      { name: "Spring Boot + Java 21", why: { en: "Backend that owns orders, shipping zones and payment confirmation, so prices are never trusted from the browser.", es: "Backend que controla pedidos, zonas de envío y confirmación de pago, de modo que los precios nunca se toman del navegador." } },
      { name: "Firebase", why: { en: "Google sign-in and managed storage without running my own auth server.", es: "Acceso con Google y almacenamiento administrado sin mantener un servidor de autenticación propio." } },
      { name: "PayPal", why: { en: "Secure payments that customers already trust, confirmed on the server.", es: "Pagos seguros en los que el cliente ya confía, confirmados en el servidor." } },
    ],
    problem: { en: "Selling beauty products online across the country, with zone-based shipping and secure payment.", es: "Vender productos de belleza por internet en todo el país, con envío por zonas y pago seguro." },
    contribution: { en: "Frontend and backend: catalog, orders, payments with PayPal confirmation and management of products, orders and users.", es: "Interfaz y servidor: catálogo, pedidos, pagos con confirmación de PayPal y administración de productos, pedidos y usuarios." },
    features: { en: ["Catalog with filters", "Shopping cart and PayPal payments", "Configurable shipping zones", "Admin panel for products, orders and users", "Sign-in with Firebase and Google"], es: ["Catálogo con filtros", "Carrito y pagos con PayPal", "Envío por zonas configurables", "Panel de administración de productos, pedidos y usuarios", "Acceso con Firebase y Google"] },
  },
  electrobodegon: {
    tech: [
      { name: "Angular 21 + TypeScript", why: { en: "Typed components for a catalogue with search and filters that has to stay maintainable.", es: "Componentes tipados para un catálogo con búsqueda y filtros que debe seguir siendo mantenible." } },
      { name: "Tailwind CSS 4", why: { en: "Fast, consistent styling for product cards and branch pages.", es: "Estilos rápidos y consistentes para las tarjetas de producto y las sucursales." } },
      { name: "Supabase", why: { en: "Database and authentication for the admin panel without building a backend, with a local JSON fallback if it is unavailable.", es: "Base de datos y autenticación para el panel de administración sin construir un backend, con respaldo en JSON local si no está disponible." } },
      { name: "Docker", why: { en: "Reproducible builds and deployment.", es: "Compilación y despliegue reproducibles." } },
      { name: "WhatsApp ordering", why: { en: "Customers already use WhatsApp, so orders go straight to the store.", es: "Los clientes ya usan WhatsApp, así que los pedidos llegan directo a la tienda." } },
    ],
    problem: { en: "The business needed to show its catalogue online, control its inventory and sell more.", es: "El negocio necesitaba mostrar su catálogo en internet, controlar su inventario y vender más." },
    contribution: { en: "Full design and development: interface, catalogue, admin panel, authentication and deployment.", es: "Diseño y desarrollo completo: interfaz, catálogo, panel de administración, autenticación y publicación." },
    features: { en: ["Catalogue with search and filters by category and brand", "Product pages", "Two branches with maps and hours", "Ordering through WhatsApp", "Admin panel to manage inventory"], es: ["Catálogo con búsqueda y filtros por categoría y marca", "Fichas de producto", "Dos sucursales con mapas y horarios", "Pedidos por WhatsApp", "Panel de administración para el inventario"] },
  },
  "gestion-proyectos": {
    tech: [
      { name: "Node.js 22 + Express 5", why: { en: "Simple, fast server for a classic request/response web app.", es: "Servidor simple y rápido para una aplicación web clásica de petición y respuesta." } },
      { name: "EJS", why: { en: "Server-side rendering: pages arrive ready, with no heavy front-end framework.", es: "Renderizado en servidor: las páginas llegan listas, sin un framework pesado en el cliente." } },
      { name: "SQLite", why: { en: "Zero-setup database, ideal for a small team tool and easy to back up.", es: "Base de datos sin configuración, ideal para una herramienta de equipo pequeño y fácil de respaldar." } },
      { name: "bcrypt", why: { en: "Passwords are stored hashed, never in plain text.", es: "Las contraseñas se guardan cifradas, nunca en texto plano." } },
      { name: "CSRF protection", why: { en: "Prevents forged requests on forms such as moving or editing tasks.", es: "Evita peticiones falsificadas en formularios como mover o editar tareas." } },
    ],
    problem: { en: "Teams needed to see in one place who does what and how much of each project is left.", es: "Los equipos necesitaban ver en un solo lugar quién hace qué y cuánto falta de cada proyecto." },
    contribution: { en: "Full development: server-side rendering with Express and EJS, SQLite database, hashed passwords and CSRF protection.", es: "Desarrollo completo: renderizado en servidor con Express y EJS, base de datos SQLite, contraseñas cifradas y protección CSRF." },
    features: { en: ["Sign-up and login", "Projects with members", "Three-column task board (to do, in progress, done)", "Task detail with assignee, due date and comments", "Progress bar per project"], es: ["Registro e inicio de sesión", "Proyectos con miembros", "Tablero de tareas en tres columnas (por hacer, en curso, hecha)", "Detalle de tarea con responsable, fecha límite y comentarios", "Barra de progreso por proyecto"] },
  },
  coffeeshop: {
    tech: [
      { name: "Angular 19 + standalone components", why: { en: "Small reusable pieces for the landing page and the full menu.", es: "Piezas pequeñas y reutilizables para la portada y el menú completo." } },
      { name: "Lazy-loaded routes", why: { en: "The menu page loads only when the visitor opens it.", es: "La página del menú solo se carga cuando el visitante la abre." } },
      { name: "SCSS", why: { en: "Organized styles with variables for the coffee and flower brand colors.", es: "Estilos organizados con variables para los colores de la marca de café y flores." } },
      { name: "Central site configuration", why: { en: "Texts, prices and contact data live in one place, in Spanish and English.", es: "Textos, precios y datos de contacto viven en un solo lugar, en español e inglés." } },
    ],
    problem: { en: "A family business wanted to present its coffee shop and its flower shop on a single site, in two languages.", es: "Un negocio familiar quería presentar su cafetería y su florería en un solo sitio, en dos idiomas." },
    contribution: { en: "Full design and development: Angular standalone components, lazy-loaded routes and a central site configuration.", es: "Diseño y desarrollo completo: componentes standalone de Angular, rutas con carga diferida y una configuración central del sitio." },
    features: { en: ["Landing page with hero, about, gallery, menu preview and contact", "Full menu page with categories, prices and descriptions", "Bilingual (Spanish/English)", "Lazy-loaded routes"], es: ["Página de inicio con portada, nosotros, galería, vista previa del menú y contacto", "Menú completo con categorías, precios y descripciones", "Bilingüe (español/inglés)", "Rutas con carga diferida"] },
  },
};
projects.forEach((p) => Object.assign(p, details[p.slug]));

// Extra depth: why each project was made, how it was built, and a richer "what I used and why".
const t2 = (name, en, es) => ({ name, why: { en, es } });
const extra = {
  retroroom: {
    motive: { en: "Most developer portfolios look the same. I wanted mine to show, not just say, that I can build interactive, polished experiences: the portfolio itself is the proof of the work.", es: "La mayoría de portafolios se parecen. Quería que el mío demostrara, y no solo dijera, que puedo construir experiencias interactivas y cuidadas: el portafolio en sí es la prueba del trabajo." },
    howBuilt: { en: ["Modeled the room as a Three.js scene: lighting, floor and wood textures, neon signs and a ceiling fan.", "Imported 3D models for the pinball, arcade, pool table, foosball, jukebox, CRT TV and Super Nintendo.", "Added camera transitions with GSAP so each menu button flies to its object (about me, projects, music, contact).", "Embedded playable games inside overlays and a music player with volume control in the jukebox.", "Translated all content to Spanish and English and deployed it as a static site on Vercel."], es: ["Modelé la sala como una escena de Three.js: iluminación, texturas de piso y madera, letreros de neón y un ventilador de techo.", "Importé modelos 3D del pinball, arcade, billar, futbolín, rockola, TV de tubo y Super Nintendo.", "Agregué transiciones de cámara con GSAP para que cada botón del menú vuele a su objeto (sobre mí, proyectos, música, contacto).", "Integré juegos jugables en ventanas superpuestas y un reproductor de música con control de volumen en la rockola.", "Traduje todo el contenido a español e inglés y lo publiqué como sitio estático en Vercel."] },
  },
  gymflow: {
    motive: { en: "Many small gyms keep dues in Excel: people get in with an expired fee, payments are forgotten and nobody knows who is about to stop coming. GymFlow solves the daily operation on a single screen.", es: "Muchos gimnasios pequeños llevan las cuotas en Excel: se cuela gente con la cuota vencida, los cobros se olvidan y nadie sabe quién está dejando de venir. GymFlow resuelve la operación diaria en una sola pantalla." },
    howBuilt: { en: ["Analysed the product and designed the data model before coding, and wrote down each technical decision and its reason.", "Built a modular Spring Boot monolith (auth, members, plans, memberships, check-in, dashboard) on PostgreSQL with Flyway migrations.", "Implemented memberships that chain periods without overlapping, with a frozen price per membership, and partial payments that reject overpayments.", "Built the Angular interface with standalone components, signals, reactive forms and lazy-loaded features.", "Wrote 27 backend integration tests against a real PostgreSQL and 11 frontend unit tests, then packaged everything with Docker Compose and nginx."], es: ["Analicé el producto y diseñé el modelo de datos antes de programar, y documenté cada decisión técnica y su motivo.", "Construí un monolito modular en Spring Boot (acceso, socios, planes, membresías, entradas, panel) sobre PostgreSQL con migraciones Flyway.", "Implementé membresías que encadenan periodos sin solaparse, con precio congelado por membresía, y cobros parciales que rechazan sobrepagos.", "Hice la interfaz en Angular con componentes standalone, signals, formularios reactivos y módulos con carga diferida.", "Escribí 27 pruebas de integración del servidor contra un PostgreSQL real y 11 pruebas unitarias de la interfaz, y lo empaqueté con Docker Compose y nginx."] },
    tech: [
      t2("Angular 21", "Standalone components, signals, reactive forms and lazy loading give a fast interface for reception, with separate features for check-in, members and plans.", "Componentes standalone, signals, formularios reactivos y carga diferida dan una interfaz rápida para recepción, con módulos separados para entradas, socios y planes."),
      t2("Spring Boot + Java 21", "A modular monolith keeps the business rules (overlapping memberships, overpayments) in one place with a clear service layer, without the cost of microservices.", "Un monolito modular mantiene las reglas de negocio (membresías solapadas, sobrepagos) en un solo lugar con una capa de servicios clara, sin el costo de los microservicios."),
      t2("PostgreSQL 16 + Flyway", "Relational data fits members, memberships, payments and entries with integrity; Flyway versions every schema change.", "Los datos relacionales encajan con socios, membresías, pagos y entradas con integridad; Flyway versiona cada cambio del esquema."),
      t2("Spring Security + JWT", "Stateless login with ADMIN and RECEPTION roles, so reception cannot see revenue figures. Passwords hashed with BCrypt and a mandatory 32+ character secret.", "Inicio de sesión sin estado con roles ADMIN y RECEPTION, para que recepción no vea los ingresos. Contraseñas con BCrypt y un secreto obligatorio de 32+ caracteres."),
      t2("JUnit 5 + MockMvc", "Tests run against a real PostgreSQL, including a concurrent-race case for overlapping memberships, so the rules are proven and not assumed.", "Las pruebas corren contra un PostgreSQL real, incluida una carrera concurrente de membresías solapadas, de modo que las reglas están probadas y no supuestas."),
      t2("Docker Compose + nginx", "One command starts the database, the API and the interface; nginx serves the app and proxies /api.", "Un solo comando levanta la base de datos, la API y la interfaz; nginx sirve la app y redirige /api."),
    ],
    features: { en: ["Members: create, edit, paginated partial search and soft delete that keeps history", "Plans and memberships that chain periods without overlapping, with a frozen price", "Full or partial payments with pending balance and overpayment rejection", "Entry check-in that validates the fee instantly: green or red with the reason; denied entries are logged too", "Dashboard: members up to date, upcoming expirations, today's entries and monthly revenue (admin only)", "Retention radar: members with a valid fee who have not come in 14+ days, with a prefilled WhatsApp message"], es: ["Socios: alta, edición, búsqueda parcial paginada y baja lógica que conserva el historial", "Planes y membresías que encadenan periodos sin solaparse, con precio congelado", "Cobros totales o parciales con saldo pendiente y rechazo de sobrepagos", "Check-in que valida la cuota al instante: verde o rojo con el motivo; los accesos denegados también se registran", "Panel: socios al día, vencimientos próximos, entradas de hoy e ingresos del mes (solo ADMIN)", "Radar de retención: socios con cuota vigente que no vienen hace 14+ días, con mensaje de WhatsApp prellenado"] },
  },
  ecuadeals: {
    motive: { en: "A store in Ecuador wanted to sell perfumes, cosmetics and Yanbal products online across the whole country, with shipping that depends on the zone and payments customers can trust.", es: "Una tienda de Ecuador quería vender perfumes, cosméticos y productos Yanbal por internet en todo el país, con envío que dependa de la zona y pagos en los que el cliente confíe." },
    howBuilt: { en: ["Split the project into an Angular 21 frontend and a Spring Boot 3.3 / Java 21 backend that talk through a REST API.", "Modelled the Firestore collections: users, products, categories, carts, orders and shipping zones, with prices stored in cents.", "Connected Firebase Authentication (email and Google): the frontend sends the ID token and the backend verifies it with the Admin SDK and reads the role from custom claims.", "Built checkout with PayPal: the backend validates the cart with real prices and stock, creates the order, and confirms the payment before marking it paid.", "Added the admin panel to manage products, orders and users, and configurable shipping zones with price and estimated days."], es: ["Dividí el proyecto en un frontend Angular 21 y un backend Spring Boot 3.3 / Java 21 que se comunican por API REST.", "Modelé las colecciones de Firestore: usuarios, productos, categorías, carritos, pedidos y zonas de envío, con precios guardados en centavos.", "Conecté Firebase Authentication (correo y Google): el frontend envía el ID token y el backend lo verifica con el Admin SDK y lee el rol de los custom claims.", "Construí el pago con PayPal: el backend valida el carrito con precios y stock reales, crea el pedido y confirma el pago antes de marcarlo como pagado.", "Agregué el panel de administración de productos, pedidos y usuarios, y zonas de envío configurables con precio y días estimados."] },
    tech: [
      t2("Angular 21 + Signals", "Reactive state for the cart and catalog filters with standalone components, so the store feels instant.", "Estado reactivo para el carrito y los filtros del catálogo con componentes standalone, para que la tienda se sienta inmediata."),
      t2("Spring Boot 3.3 + Java 21", "The backend owns orders, shipping zones and payments. Prices are always recalculated on the server, never trusted from the browser.", "El backend controla pedidos, zonas de envío y pagos. Los precios siempre se recalculan en el servidor, nunca se toman del navegador."),
      t2("Spring Security", "Two roles, CUSTOMER and ADMIN. Public sign-up always creates CUSTOMER, only an ADMIN can assign roles, and the backend checks the order belongs to the user to prevent IDOR.", "Dos roles, CUSTOMER y ADMIN. El registro público siempre crea CUSTOMER, solo un ADMIN asigna roles, y el backend verifica que el pedido sea del usuario para evitar IDOR."),
      t2("Firebase (Auth, Firestore, Storage)", "Google sign-in, a managed database and product image storage without running my own auth server or database.", "Acceso con Google, base de datos administrada y almacenamiento de imágenes de productos sin mantener un servidor de autenticación ni una base propia."),
      t2("PayPal SDK", "Payments customers already trust; the webhook signature is verified and the payment is confirmed on the server.", "Pagos en los que el cliente ya confía; se verifica la firma del webhook y el pago se confirma en el servidor."),
      t2("SCSS", "Custom styling for a beauty brand, with secrets kept only in the backend, never in Angular.", "Estilos propios para una marca de belleza, con los secretos guardados solo en el backend, nunca en Angular."),
    ],
  },
  electrobodegon: {
    motive: { en: "An appliance store with two branches had no online presence: customers could not see what was in stock and the owners had no easy way to update the catalogue.", es: "Una tienda de electrodomésticos con dos sucursales no tenía presencia en internet: los clientes no veían qué había en stock y los dueños no tenían una forma sencilla de actualizar el catálogo." },
    howBuilt: { en: ["Designed the catalogue and product pages with search and filters by category and brand.", "Built the branch pages with maps and opening hours, and WhatsApp ordering that sends the product straight to the store.", "Added an admin panel with authentication to manage inventory through Supabase.", "Kept a local JSON copy of the catalogue as a fallback if the database is unavailable.", "Containerised the app with Docker and published it on Vercel."], es: ["Diseñé el catálogo y las fichas de producto con búsqueda y filtros por categoría y marca.", "Construí las páginas de sucursales con mapas y horarios, y pedidos por WhatsApp que envían el producto directo a la tienda.", "Agregué un panel de administración con autenticación para gestionar el inventario con Supabase.", "Mantuve una copia local del catálogo en JSON como respaldo si la base de datos no está disponible.", "Contenericé la app con Docker y la publiqué en Vercel."] },
  },
  "gestion-proyectos": {
    motive: { en: "Teams lose track of who is doing what. I wanted one simple place to see every task, its owner, its due date and how much of the project is left.", es: "Los equipos pierden el hilo de quién hace qué. Quería un solo lugar sencillo para ver cada tarea, su responsable, su fecha límite y cuánto falta del proyecto." },
    howBuilt: { en: ["Designed the data model: users, projects, members, tasks and comments, stored in SQLite.", "Built sign-up and login with hashed passwords and sessions.", "Rendered the pages on the server with EJS: project list, three-column task board and task detail.", "Added a progress bar that is calculated from the done tasks of each project.", "Protected every form against forged requests with CSRF tokens."], es: ["Diseñé el modelo de datos: usuarios, proyectos, miembros, tareas y comentarios, guardados en SQLite.", "Construí el registro y el inicio de sesión con contraseñas cifradas y sesiones.", "Rendericé las páginas en el servidor con EJS: lista de proyectos, tablero de tareas en tres columnas y detalle de tarea.", "Agregué una barra de progreso calculada con las tareas hechas de cada proyecto.", "Protegí todos los formularios contra peticiones falsificadas con tokens CSRF."] },
  },
  coffeeshop: {
    motive: { en: "A family business that sells artisanal coffee and flowers wanted one site to present both, for Spanish and English-speaking customers.", es: "Un negocio familiar que vende café artesanal y flores quería un solo sitio para presentar ambos, para clientes de habla hispana e inglesa." },
    howBuilt: { en: ["Structured the landing page in sections: hero, about, gallery, menu preview and contact.", "Built a separate full-menu page with categories, prices and dish descriptions, loaded lazily.", "Moved all texts, prices and contact data into one central configuration file.", "Added the Spanish/English switch on top of that configuration.", "Styled everything with SCSS variables for the brand colors."], es: ["Estructuré la página de inicio en secciones: portada, nosotros, galería, vista previa del menú y contacto.", "Construí una página aparte con el menú completo, categorías, precios y descripción de platos, con carga diferida.", "Moví todos los textos, precios y datos de contacto a un único archivo de configuración central.", "Agregué el cambio español/inglés sobre esa configuración.", "Di estilo a todo con variables SCSS para los colores de la marca."] },
  },
};
projects.forEach((p) => Object.assign(p, extra[p.slug]));
