import type { Locale } from '../lib/locale';

type ProfileCopy = {
  navigation: { work: string; about: string; contact: string };
  skipLink: string;
  footer: string;
  home: { eyebrow: string; title: string; description: string; primaryAction: string; selectedWork: string; capabilities: string; experience: string; contact: string };
  capabilities: { title: string; description: string }[];
  experience: { title: string; body: string };
  about: { title: string; description: string; body: string; imageAlt: string; downloadCv: string };
  contact: { title: string; description: string; schedule: string; email: string; linkedIn: string };
};

export const profile = {
  name: 'Andrés Israel Umaña Sedó',
  mark: 'Digital Work',
  email: 'andresisraelumanasedo@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/israel-umana-sedo/',
  schedulingUrl: 'https://calendly.com/agenda-soluciondigital/consulta-inicial-solucion-digital',
  locales: {
    es: {
      navigation: { work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
      skipLink: 'Saltar al contenido',
      footer: 'Diseño, desarrollo y operación de experiencias web.',
      home: {
        eyebrow: 'Andrés Israel Umaña Sedó — Digital Work',
        title: 'Trabajo digital con criterio, claridad y continuidad.',
        description: 'Diseño, desarrollo y operación de experiencias web que resuelven necesidades reales de negocio.',
        primaryAction: 'Explorar proyectos seleccionados', selectedWork: 'Trabajo seleccionado', capabilities: 'Cómo trabajo', experience: 'Experiencia', contact: 'Hablemos de tu próximo proyecto',
      },
      capabilities: [
        { title: 'Diseño y UX', description: 'Arquitectura de información, interfaces responsivas y claridad para cada siguiente paso.' },
        { title: 'Plataformas y comercio', description: 'WordPress, Shopify, contenidos, membresías y recorridos de compra.' },
        { title: 'Integración y operación', description: 'Componentes a medida, APIs, rendimiento, accesibilidad y soporte de producción.' },
      ],
      experience: { title: 'Más de diez años conectando diseño, desarrollo y continuidad técnica.', body: 'Formado en Diseño Publicitario, trabajo desde la estrategia y la interfaz hasta la implementación, publicación y mantenimiento de plataformas web.' },
      about: { title: 'Diseño con criterio. Desarrollo con responsabilidad.', description: 'Andrés Israel Umaña Sedó — Digital Work', body: 'Soy diseñador y desarrollador web con experiencia en plataformas institucionales, comercio electrónico, WordPress, front-end moderno e integraciones. Mi trabajo conecta la intención de negocio con una experiencia clara y una implementación que puede sostenerse en producción.', imageAlt: 'Retrato de Andrés Israel Umaña Sedó', downloadCv: 'Descargar CV' },
      contact: { title: 'Conversemos', description: 'Para una colaboración, oportunidad de equipo o nuevo proyecto, elige la forma que prefieras.', schedule: 'Agendar conversación', email: 'Email directo', linkedIn: 'LinkedIn' },
    },
    en: {
      navigation: { work: 'Work', about: 'About', contact: 'Contact' },
      skipLink: 'Skip to content',
      footer: 'Design, development, and operation of web experiences.',
      home: {
        eyebrow: 'Andrés Israel Umaña Sedó — Digital Work',
        title: 'Digital work built with clarity, judgment, and continuity.',
        description: 'Design, development, and operation of web experiences that solve real business needs.',
        primaryAction: 'Explore selected work', selectedWork: 'Selected work', capabilities: 'How I work', experience: 'Experience', contact: 'Let’s talk about your next project',
      },
      capabilities: [
        { title: 'Design and UX', description: 'Information architecture, responsive interfaces, and clarity around every next step.' },
        { title: 'Platforms and commerce', description: 'WordPress, Shopify, content, memberships, and purchase journeys.' },
        { title: 'Integration and operations', description: 'Custom components, APIs, performance, accessibility, and production support.' },
      ],
      experience: { title: 'More than ten years connecting design, development, and technical continuity.', body: 'With an Advertising Design background, I work from strategy and interface through implementation, release, and the ongoing care of web platforms.' },
      about: { title: 'Design with judgment. Development with responsibility.', description: 'Andrés Israel Umaña Sedó — Digital Work', body: 'I am a web designer and developer experienced in institutional platforms, e-commerce, WordPress, modern front ends, and integrations. My work connects business intent with a clear experience and an implementation that can be sustained in production.', imageAlt: 'Portrait of Andrés Israel Umaña Sedó', downloadCv: 'Download CV' },
      contact: { title: 'Let’s talk', description: 'For a collaboration, team opportunity, or a new project, choose the channel that works best for you.', schedule: 'Schedule a conversation', email: 'Email directly', linkedIn: 'LinkedIn' },
    },
  } satisfies Record<Locale, ProfileCopy>,
} as const;
