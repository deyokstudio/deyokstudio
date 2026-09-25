document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. DICȚIONAR COMPLET DE TRADUCERI (RO / RU / EN) ==================== */
    const translations = {
        ro: {
            // Navigație & Global
            "nav.home": "Acasă",
            "nav.about": "Despre",
            "nav.services": "Servicii",
            "nav.contact": "Contact",
            
            // Pagina Principală (Index)
            "hero.label": "Studio creativ / România",
            "hero.title": "Design care transformă <span>ideile</span> în experiențe digitale.",
            "hero.description": "Creăm website-uri, identități vizuale și materiale digitale care ajută brandurile să arate profesionist și să se facă remarcate.",
            "hero.button": "Începe un proiect",
            "hero.services": "Descoperă serviciile",
            "hero.visual": "DESIGN",
            
            "marquee.web": "WEB DESIGN",
            "marquee.graphic": "GRAPHIC DESIGN",
            "marquee.branding": "BRANDING",
            "marquee.social": "SOCIAL MEDIA",
            
            "services.label": "Servicii",
            "services.title": "Ce putem crea <span>împreună.</span>",
            "service.web.title": "Web Design",
            "service.web.description": "Website-uri moderne, responsive și personalizate.",
            "service.graphic.title": "Design Grafic",
            "service.graphic.description": "Materiale vizuale pentru promovarea brandului.",
            "service.social.title": "Social Media Design",
            "service.social.description": "Postări, carousels, stories, bannere și template-uri.",
            "service.branding.title": "Branding",
            "service.branding.description": "Elemente vizuale care construiesc o identitate coerentă.",
            "services.more": "Vezi toate serviciile",
            
            "statement.small": "DeyokStudio",
            "statement.title": "Nu facem doar design. <br> Construim <span>prezențe digitale.</span>",
            
            "cta.label": "Ai un proiect în minte?",
            "cta.title": "Hai să construim <span>ceva care rămâne.</span>",
            "cta.button": "Scrie-ne",
            
            // Pagina Despre
            "about.label": "Despre DeyokStudio",
            "about.title": "Design simplu. <br> Idei clare. <br> <span>Rezultate reale.</span>",
            "about.intro": "DeyokStudio este un studio creativ axat pe design web, design grafic și identitate vizuală. Ne concentrăm pe soluții moderne, clare și potrivite pentru fiecare proiect.",
            "about.story.label": "Cine suntem",
            "about.story.title": "Construim imaginea digitală a afacerilor.",
            "about.story.text1": "Credem că un design bun trebuie să fie mai mult decât frumos. Trebuie să transmită mesajul potrivit, să fie ușor de înțeles și să ajute o afacere să se prezinte profesionist.",
            "about.story.text2": "De la un website simplu până la materiale pentru social media, fiecare proiect este construit în funcție de obiectivele și nevoile clientului.",
            "about.story.text3": "Lucrăm cu atenție la detalii și încercăm să păstrăm procesul cât mai simplu și transparent.",
            "about.approach.label": "Abordarea noastră",
            "about.approach.title": "Simplu. <span>Clar.</span> Eficient.",
            "about.approach.step1.title": "Înțelegem",
            "about.approach.step1.text": "Începem prin a înțelege ideea, obiectivele și ceea ce are nevoie proiectul.",
            "about.approach.step2.title": "Creăm",
            "about.approach.step2.text": "Transformăm ideile în designuri moderne și funcționale.",
            "about.approach.step3.title": "Ajustăm",
            "about.approach.step3.text": "Analizăm rezultatul și facem modificările necesare pentru ca proiectul să fie exact cum trebuie.",
            "about.approach.step4.title": "Livrăm",
            "about.approach.step4.text": "Predăm proiectul final pregătit pentru utilizare.",
            "about.values.label": "Principii",
            "about.values.title": "Câteva lucruri în care <span>credem.</span>",
            "about.value1": "Simplitate",
            "about.value2": "Claritate",
            "about.value3": "Creativitate",
            "about.value4": "Atenție la detalii",

            // Pagina Servicii & Prețuri
            "services.page.label": "Serviciile noastre",
            "services.page.title": "Design pentru <span>idei care merită văzute.</span>",
            "services.page.intro": "Oferim servicii de design web și grafic pentru afaceri, branduri și persoane care vor să aibă o prezență digitală profesionistă.",
            "services.web.label": "Web Design",
            "services.web.title": "Website-uri moderne <span>și responsive.</span>",
            "services.web.description": "Creăm website-uri adaptate telefonului, tabletei și calculatorului, cu un design potrivit pentru afacerea ta.",
            "price.landing.title": "Landing Page",
            "price.landing.description": "O pagină modernă pentru prezentarea unei afaceri, unui produs sau serviciu.",
            "price.presentation.title": "Site de prezentare",
            "price.presentation.description": "Website cu mai multe pagini pentru prezentarea completă a unei afaceri.",
            "price.from": "de la",
            "services.graphic.label": "Design Grafic",
            "services.graphic.title": "Vizualuri care <span>comunică.</span>",
            "services.graphic.description": "Materiale grafice create pentru promovarea afacerii și comunicarea cu publicul.",
            "price.logo.title": "Logo",
            "price.logo.description": "Un logo simplu și memorabil pentru identitatea afacerii.",
            "price.identity.title": "Identitate vizuală",
            "price.identity.description": "Elemente vizuale pentru o imagine coerentă a brandului.",
            "price.banner.title": "Banner",
            "price.banner.description": "Banner pentru website, promovare sau reclame.",
            "services.social.label": "Social Media Design",
            "services.social.title": "Conținut vizual pentru <span>social media.</span>",
            "services.social.description": "Designuri pentru postări, stories și alte materiale folosite pe platformele sociale.",
            "price.post.title": "Postare statică",
            "price.post.description": "Design pentru o postare social media.",
            "price.carousel.small.title": "Carousel 3–5 slide-uri",
            "price.carousel.small.description": "Carousel pentru Instagram, Facebook sau LinkedIn.",
            "price.carousel.large.title": "Carousel 6–10 slide-uri",
            "price.carousel.large.description": "Carousel mai complex pentru conținut educativ sau promoțional.",
            "price.story.title": "Story",
            "price.story.description": "Design pentru Instagram sau Facebook Story.",
            "price.cover.title": "Facebook / LinkedIn Cover",
            "price.cover.description": "Imagine de copertă pentru pagina sau profilul social.",
            "price.youtube.title": "YouTube Thumbnail",
            "price.youtube.description": "Thumbnail creat pentru a atrage atenția asupra videoclipului.",
            "price.reel.title": "Reel Cover",
            "price.reel.description": "Copertă pentru Instagram Reels.",
            "services.packages.label": "Pachete",
            "services.packages.title": "Mai multe materiale, <span>un singur pachet.</span>",
            "price.posts5.title": "Set 5 postări",
            "price.posts5.description": "Cinci designuri pentru social media.",
            "price.posts10.title": "Set 10 postări",
            "price.posts10.description": "Zece designuri pentru o comunicare vizuală constantă.",
            "price.stories10.title": "Set 10 Stories",
            "price.stories10.description": "Zece designuri pentru Stories.",
            "price.template.title": "Template",
            "price.template.description": "Template personalizat care poate fi reutilizat.",

            // Pagina Contact & Formular
            "contact.label": "Contact",
            "contact.title": "Ai o idee? <br> Hai să o transformăm <span>în ceva real.</span>",
            "contact.intro": "Spune-ne câteva lucruri despre proiectul tău și vom reveni cu un răspuns.",
            "contact.form.label": "Trimite o solicitare",
            "contact.form.name": "Nume",
            "contact.form.email": "Email",
            "contact.form.phone": "Telefon",
            "contact.form.service": "Serviciul dorit",
            "contact.form.budget": "Buget estimativ",
            "contact.form.message": "Mesaj",
            "contact.form.submit": "Trimite solicitarea",
            "contact.info.emailLabel": "Email",
            "contact.info.socialLabel": "Social Media",
            "contact.info.locationLabel": "Locație",
            "contact.info.location": "Chișinău, Moldova",
            "contact.info.responseLabel": "Răspuns",
            "contact.info.response": "Vom reveni cât mai curând posibil după primirea solicitării.",
            "contact.statement.label": "DeyokStudio",
            "contact.statement.title": "Hai să facem <span>ceva diferit.</span>",

            // Placeholders & Form Options
            "contact.form.namePlaceholder": "Numele tău",
            "contact.form.emailPlaceholder": "adresa@email.com",
            "contact.form.phonePlaceholder": "+373 ...",
            "contact.form.servicePlaceholder": "Selectează un serviciu",
            "contact.form.serviceWeb": "Web Design",
            "contact.form.serviceGraphic": "Design Grafic",
            "contact.form.serviceSocial": "Social Media Design",
            "contact.form.serviceBranding": "Branding",
            "contact.form.serviceOther": "Altceva",
            "contact.form.budgetPlaceholder": "Selectează bugetul",
            "contact.form.budget1": "Sub 100€",
            "contact.form.budget2": "100–300€",
            "contact.form.budget3": "300–500€",
            "contact.form.budget4": "Peste 500€",
            "contact.form.budget5": "Nu sunt sigur încă",
            "contact.form.messagePlaceholder": "Spune-ne câteva detalii despre proiect...",

            // Footer
            "footer.description": "Design digital. Website-uri. Identitate vizuală.",
            "footer.copyright": "© 2026 DeyokStudio. Toate drepturile rezervate.",
            "footer.location": "Chișinău / Moldova"
        },
        ru: {
            // Navigatie & Global
            "nav.home": "Главная",
            "nav.about": "О нас",
            "nav.services": "Услуги",
            "nav.contact": "Контакты",
            
            // Pagina Principală (Index)
            "hero.label": "Креативная студия / Молдова",
            "hero.title": "Дизайн, который превращает <span>идеи</span> в цифровой опыт.",
            "hero.description": "Мы создаем сайты, визуальные идентичности и цифровые материалы, которые помогают брендам выглядеть профессионально.",
            "hero.button": "Начать проект",
            "hero.services": "Узнать услуги",
            "hero.visual": "ДИЗАЙН",
            
            "marquee.web": "WEB DESIGN",
            "marquee.graphic": "GRAPHIC DESIGN",
            "marquee.branding": "BRANDING",
            "marquee.social": "SOCIAL MEDIA",
            
            "services.label": "Услуги",
            "services.title": "Что мы можем создать <span>вместе.</span>",
            "service.web.title": "Веб-дизайн",
            "service.web.description": "Современные, адаптивные и кастомные сайты.",
            "service.graphic.title": "Графический дизайн",
            "service.graphic.description": "Визуальные материалы для продвижения бренда.",
            "service.social.title": "Дизайн соцсетей",
            "service.social.description": "Посты, карусели, сторис, баннеры и шаблоны.",
            "service.branding.title": "Брендинг",
            "service.branding.description": "Визуальные элементы для единой идентичности.",
            "services.more": "Смотреть все услуги",
            
            "statement.small": "DeyokStudio",
            "statement.title": "Мы не просто делаем дизайн. <br> Мы строим <span>цифровое присутствие.</span>",
            
            "cta.label": "Есть проект на уме?",
            "cta.title": "Давайте создадим <span>что-то долговечное.</span>",
            "cta.button": "Написать нам",
            
            // Pagina Despre
            "about.label": "О DeyokStudio",
            "about.title": "Простой дизайн. <br> Четкие идеи. <br> <span>Реальные результаты.</span>",
            "about.intro": "DeyokStudio — это креативная студия, специализирующаяся на веб-дизайне, графическом дизайне и визуальной идентичности.",
            "about.story.label": "Кто мы",
            "about.story.title": "Мы строим цифровой имидж бизнеса.",
            "about.story.text1": "Мы верим, что хороший дизайн должен быть больше, чем просто красивым. Он должен передавать правильный месседж.",
            "about.story.text2": "От простого сайта до материалов для соцсетей, каждый проект строится в зависимости от целей клиента.",
            "about.story.text3": "Мы работаем с вниманием к деталям и стараемся делать процесс максимально простым.",
            "about.approach.label": "Наш подход",
            "about.approach.title": "Просто. <span>Понятно.</span> Эффективно.",
            "about.approach.step1.title": "Понимаем",
            "about.approach.step1.text": "Начинаем с понимания идеи, целей и потребностей проекта.",
            "about.approach.step2.title": "Создаем",
            "about.approach.step2.text": "Превращаем идеи в современный и функциональный дизайн.",
            "about.approach.step3.title": "Корректируем",
            "about.approach.step3.text": "Анализируем результаты и вносим необходимые изменения.",
            "about.approach.step4.title": "Доставляем",
            "about.approach.step4.text": "Передаем готовый проект, полностью готовый к использованию.",
            "about.values.label": "Принципы",
            "about.values.title": "Несколько вещей, в которые <span>мы верим.</span>",
            "about.value1": "Простота",
            "about.value2": "Ясность",
            "about.value3": "Креативность",
            "about.value4": "Внимание к деталям",

            // Pagina Servicii & Prețuri
            "services.page.label": "Наши услуги",
            "services.page.title": "Дизайн для <span>идей, которые стоит увидеть.</span>",
            "services.page.intro": "Мы предлагаем услуги веб- и графического дизайна для бизнеса и брендов.",
            "services.web.label": "Веб-дизайн",
            "services.web.title": "Современные сайты <span>и адаптивные.</span>",
            "services.web.description": "Мы создаем сайты, адаптированные под любые устройства.",
            "price.landing.title": "Лендинг пейдж",
            "price.landing.description": "Современная страница для презентации бизнеса или продукта.",
            "price.presentation.title": "Сайт-визитка",
            "price.presentation.description": "Многостраничный сайт для полной презентации бизнеса.",
            "price.from": "от",
            "services.graphic.label": "Графический дизайн",
            "services.graphic.title": "Визуалы, которые <span>говорят.</span>",
            "services.graphic.description": "Материалы для продвижения бизнеса и общения с аудиторией.",
            "price.logo.title": "Логотип",
            "price.logo.description": "Простой и запоминающийся логотип.",
            "price.identity.title": "Визуальная идентичность",
            "price.identity.description": "Элементы для единого имиджа бренда.",
            "price.banner.title": "Баннер",
            "price.banner.description": "Баннер для сайта или рекламы.",
            "services.social.label": "Дизайн соцсетей",
            "services.social.title": "Визуальный контент для <span>социальных сетей.</span>",
            "services.social.description": "Дизайн для постов, историй и других материалов.",
            "price.post.title": "Статичный пост",
            "price.post.description": "Дизайн для поста в соцсетях.",
            "price.carousel.small.title": "Карусель 3–5 слайдов",
            "price.carousel.small.description": "Карусель для Instagram, Facebook или LinkedIn.",
            "price.carousel.large.title": "Карусель 6–10 слайдов",
            "price.carousel.large.description": "Сложная карусель для промо-контента.",
            "price.story.title": "Сторис",
            "price.story.description": "Дизайн для Instagram или Facebook Story.",
            "price.cover.title": "Обложка Facebook / LinkedIn",
            "price.cover.description": "Изображение обложки для страницы.",
            "price.youtube.title": "Превью YouTube",
            "price.youtube.description": "Превью для привлечения внимания к видео.",
            "price.reel.title": "Обложка Reels",
            "price.reel.description": "Обложка для Instagram Reels.",
            "services.packages.label": "Пакеты",
            "services.packages.title": "Больше материалов, <span>один пакет.</span>",
            "price.posts5.title": "Сет из 5 постов",
            "price.posts5.description": "Пять дизайнов для соцсетей.",
            "price.posts10.title": "Сет из 10 постов",
            "price.posts10.description": "Десять дизайнов для постоянной коммуникации.",
            "price.stories10.title": "Сет из 10 Сторис",
            "price.stories10.description": "Десять дизайнов для историй.",
            "price.template.title": "Шаблон",
            "price.template.description": "Кастомный шаблон для повторного использования.",

            // Pagina Contact & Formular
            "contact.label": "Контакты",
            "contact.title": "Есть идея? <br> Давайте превратим ее <span>во что-то реальное.</span>",
            "contact.intro": "Расскажите нам о своем проекте, и мы вернемся с ответом.",
            "contact.form.label": "Отправить заявку",
            "contact.form.name": "Имя",
            "contact.form.email": "Email",
            "contact.form.phone": "Телефон",
            "contact.form.service": "Желаемая услуга",
            "contact.form.budget": "Примерный бюджет",
            "contact.form.message": "Сообщение",
            "contact.form.submit": "Отправить заявку",
            "contact.info.emailLabel": "Email",
            "contact.info.socialLabel": "Социальные сети",
            "contact.info.locationLabel": "Локация",
            "contact.info.location": "Кишинев, Молдова",
            "contact.info.responseLabel": "Ответ",
            "contact.info.response": "Мы ответим как можно скорее.",
            "contact.statement.label": "DeyokStudio",
            "contact.statement.title": "Давайте сделаем <span>что-то другое.</span>",

            // Placeholders & Form Options
            "contact.form.namePlaceholder": "Ваше имя",
            "contact.form.emailPlaceholder": "адрес@email.com",
            "contact.form.phonePlaceholder": "+373 ...",
            "contact.form.servicePlaceholder": "Выберите услугу",
            "contact.form.serviceWeb": "Веб-дизайн",
            "contact.form.serviceGraphic": "Графический дизайн",
            "contact.form.serviceSocial": "Дизайн соцсетей",
            "contact.form.serviceBranding": "Брендинг",
            "contact.form.serviceOther": "Другое",
            "contact.form.budgetPlaceholder": "Выберите бюджет",
            "contact.form.budget1": "Менее 100€",
            "contact.form.budget2": "100–300€",
            "contact.form.budget3": "300–500€",
            "contact.form.budget4": "Более 500€",
            "contact.form.budget5": "Еще не уверен",
            "contact.form.messagePlaceholder": "Расскажите подробности о проекте...",

            // Footer
            "footer.description": "Цифровой дизайн. Веб-сайты. Визуальная идентичность.",
            "footer.copyright": "© 2026 DeyokStudio. Все права защищены.",
            "footer.location": "Кишинев / Молдова"
        },
        en: {
            // Navigatie & Global
            "nav.home": "Home",
            "nav.about": "About",
            "nav.services": "Services",
            "nav.contact": "Contact",
            
            // Pagina Principală (Index)
            "hero.label": "Creative Studio / Moldova",
            "hero.title": "Design that transforms <span>ideas</span> into digital experiences.",
            "hero.description": "We create websites, visual identities, and digital materials that help brands look professional and stand out.",
            "hero.button": "Start a project",
            "hero.services": "Discover services",
            "hero.visual": "DESIGN",
            
            "marquee.web": "WEB DESIGN",
            "marquee.graphic": "GRAPHIC DESIGN",
            "marquee.branding": "BRANDING",
            "marquee.social": "SOCIAL MEDIA",
            
            "services.label": "Services",
            "services.title": "What we can create <span>together.</span>",
            "service.web.title": "Web Design",
            "service.web.description": "Modern, responsive, and custom websites.",
            "service.graphic.title": "Graphic Design",
            "service.graphic.description": "Visual materials for brand promotion.",
            "service.social.title": "Social Media Design",
            "service.social.description": "Posts, carousels, stories, banners, and templates.",
            "service.branding.title": "Branding",
            "service.branding.description": "Visual elements that build a cohesive identity.",
            "services.more": "View all services",
            
            "statement.small": "DeyokStudio",
            "statement.title": "We don't just do design. <br> We build <span>digital presences.</span>",
            
            "cta.label": "Have a project in mind?",
            "cta.title": "Let's build <span>something that lasts.</span>",
            "cta.button": "Write to us",
            
            // Pagina Despre
            "about.label": "About DeyokStudio",
            "about.title": "Simple design. <br> Clear ideas. <br> <span>Real results.</span>",
            "about.intro": "DeyokStudio is a creative studio focused on web design, graphic design, and visual identity.",
            "about.story.label": "Who we are",
            "about.story.title": "We build the digital image of businesses.",
            "about.story.text1": "We believe that good design must be more than beautiful. It must convey the right message.",
            "about.story.text2": "From a simple website to social media materials, each project is built according to client goals.",
            "about.story.text3": "avamoattention to detail and keep the process simple and transparent.",
            "about.approach.label": "Our approach",
            "about.approach.title": "Simple. <span>Clear.</span> Efficient.",
            "about.approach.step1.title": "We understand",
            "about.approach.step1.text": "We start by understanding the idea, goals, and project needs.",
            "about.approach.step2.title": "We create",
            "about.approach.step2.text": "We transform ideas into modern and functional designs.",
            "about.approach.step3.title": "We adjust",
            "about.approach.step3.text": "We analyze results and make necessary changes.",
            "about.approach.step4.title": "We deliver",
            "about.approach.step4.text": "We hand over the final project ready for use.",
            "about.values.label": "Principles",
            "about.values.title": "A few things we <span>believe in.</span>",
            "about.value1": "Simplicity",
            "about.value2": "Clarity",
            "about.value3": "Creativity",
            "about.value4": "Attention to detail",

            // Pagina Servicii & Prețuri
            "services.page.label": "Our services",
            "services.page.title": "Design for <span>ideas worth seeing.</span>",
            "services.page.intro": "We offer web and graphic design services for businesses and brands.",
            "services.web.label": "Web Design",
            "services.web.title": "Modern websites <span>and responsive.</span>",
            "services.web.description": "We create websites adapted for all devices.",
            "price.landing.title": "Landing Page",
            "price.landing.description": "A modern page to present a business or product.",
            "price.presentation.title": "Presentation website",
            "price.presentation.description": "Multi-page website for complete business presentation.",
            "price.from": "from",
            "services.graphic.label": "Graphic Design",
            "services.graphic.title": "Visuals that <span>communicate.</span>",
            "services.graphic.description": "Graphic materials created for business promotion.",
            "price.logo.title": "Logo",
            "price.logo.description": "A simple and memorable logo.",
            "price.identity.title": "Visual Identity",
            "price.identity.description": "Visual elements for a cohesive brand image.",
            "price.banner.title": "Banner",
            "price.banner.description": "Banner for website or advertising.",
            "services.social.label": "Social Media Design",
            "services.social.title": "Visual content for <span>social media.</span>",
            "services.social.description": "Designs for posts, stories, and other materials.",
            "price.post.title": "Static post",
            "price.post.description": "Design for a social media post.",
            "price.carousel.small.title": "Carousel 3–5 slides",
            "price.carousel.small.description": "Carousel for Instagram, Facebook, or LinkedIn.",
            "price.carousel.large.title": "Carousel 6–10 slides",
            "price.carousel.large.description": "Complex carousel for promo content.",
            "price.story.title": "Story",
            "price.story.description": "Design for Instagram or Facebook Story.",
            "price.cover.title": "Facebook / LinkedIn Cover",
            "price.cover.description": "Cover image for social page.",
            "price.youtube.title": "YouTube Thumbnail",
            "price.youtube.description": "Thumbnail to attract attention to the video.",
            "price.reel.title": "Reel Cover",
            "price.reel.description": "Cover for Instagram Reels.",
            "services.packages.label": "Packages",
            "services.packages.title": "More materials, <span>a single package.</span>",
            "price.posts5.title": "Set of 5 posts",
            "price.posts5.description": "Five designs for social media.",
            "price.posts10.title": "Set of 10 posts",
            "price.posts10.description": "Ten designs for consistent communication.",
            "price.stories10.title": "Set of 10 Stories",
            "price.stories10.description": "Ten designs for Stories.",
            "price.template.title": "Template",
            "price.template.description": "Custom template for reuse.",

            // Pagina Contact & Formular
            "contact.label": "Contact",
            "contact.title": "Got an idea? <br> Let's turn it <span>into something real.</span>",
            "contact.intro": "Tell us about your project and we'll get back to you.",
            "contact.form.label": "Send a request",
            "contact.form.name": "Name",
            "contact.form.email": "Email",
            "contact.form.phone": "Phone",
            "contact.form.service": "Desired service",
            "contact.form.budget": "Estimated budget",
            "contact.form.message": "Message",
            "contact.form.submit": "Send request",
            "contact.info.emailLabel": "Email",
            "contact.info.socialLabel": "Social Media",
            "contact.info.locationLabel": "Location",
            "contact.info.location": "Chisinau, Moldova",
            "contact.info.responseLabel": "Response",
            "contact.info.response": "We will reply as soon as possible.",
            "contact.statement.label": "DeyokStudio",
            "contact.statement.title": "Let's do <span>something different.</span>",

            // Placeholders & Form Options
            "contact.form.namePlaceholder": "Your name",
            "contact.form.emailPlaceholder": "address@email.com",
            "contact.form.phonePlaceholder": "+373 ...",
            "contact.form.servicePlaceholder": "Select a service",
            "contact.form.serviceWeb": "Web Design",
            "contact.form.serviceGraphic": "Graphic Design",
            "contact.form.serviceSocial": "Social Media Design",
            "contact.form.serviceBranding": "Branding",
            "contact.form.serviceOther": "Other",
            "contact.form.budgetPlaceholder": "Select budget",
            "contact.form.budget1": "Under 100€",
            "contact.form.budget2": "100–300€",
            "contact.form.budget3": "300–500€",
            "contact.form.budget4": "Over 500€",
            "contact.form.budget5": "Not sure yet",
            "contact.form.messagePlaceholder": "Tell us some details about the project...",

            // Footer
            "footer.description": "Digital design. Websites. Visual identity.",
            "footer.copyright": "© 2026 DeyokStudio. All rights reserved.",
            "footer.location": "Chisinau / Moldova"
        }
    };

    /* ==================== 2. SCHIMBARE LIMBĂ (L10N) ==================== */
    const langButtons = document.querySelectorAll('.language-button');

    function setLanguage(lang) {
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Traducere text obișnuit (data-i18n)
        const elementsToTranslate = document.querySelectorAll('[data-i18n]');
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Traducere placeholders (data-i18n-placeholder)
        const placeholdersToTranslate = document.querySelectorAll('[data-i18n-placeholder]');
        placeholdersToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        localStorage.setItem('deyok_lang', lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('deyok_lang') || 'ro';
    setLanguage(savedLang);

    /* ==================== 3. HEADER SCROLL EFFECT ==================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.padding = '0.25rem 0';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.85)';
            header.style.padding = '0';
        }
    });

    /* ==================== 4. MENIU MOBIL ==================== */
    const menuButton = document.querySelector('.menu-button');
    const navigation = document.querySelector('.navigation');
    const languageSwitcher = document.querySelector('.language-switcher');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('mobile-open');
            if (languageSwitcher) {
                languageSwitcher.classList.toggle('mobile-open');
            }
            menuButton.classList.toggle('active');
        });
    }


    

});


