const projects = [
  {
    id: 1,
    title: "Casa Rodriguez",
    category: "Residencial",
    area: "180 m²",
    year: "2024",
    description: "Vivienda unifamiliar que integra espacios interiores con un jardín central, optimizando la ventilación cruzada y la luz natural en todas las estancias.",
    featured: true,
    images: {
      plan: "/proyectos/casa-rodriguez/planta.jpg",
      thumbnail: "/proyectos/casa-rodriguez/thumb.jpg"
    },
    tags: ["Planta", "Corte", "Fachada"]
  },
  {
    id: 2,
    title: "Edificio Torres",
    category: "Comercial",
    area: "1200 m²",
    year: "2024",
    description: "Complejo de oficinas con fachada ventilada y distribución flexible. Diseñado para maximizar la eficiencia energética y el confort interior.",
    featured: true,
    images: {
      plan: "/proyectos/edificio-torres/planta.jpg",
      thumbnail: "/proyectos/edificio-torres/thumb.jpg"
    },
    tags: ["Planta", "Elevación", "Cortes"]
  },
  {
    id: 3,
    title: "Café Cultural",
    category: "Interiorismo",
    area: "85 m²",
    year: "2023",
    description: "Espacio comercial con atmósfera cálida y materiales reciclados. El mobiliario se diseñó a medida para optimizar cada centímetro.",
    featured: false,
    images: {
      plan: "/proyectos/cafe-cultural/planta.jpg",
      thumbnail: "/proyectos/cafe-cultural/thumb.jpg"
    },
    tags: ["Planta", "Renders", "Detalles"]
  },
  {
    id: 4,
    title: "Residencia Lagos",
    category: "Residencial",
    area: "250 m²",
    year: "2023",
    description: "Vivienda vacacional con grandes ventanales y terrazas que borran el límite entre interior y paisaje. Dos niveles conectados por un vacío central.",
    featured: true,
    images: {
      plan: "/proyectos/residencia-lagos/planta.jpg",
      thumbnail: "/proyectos/residencia-lagos/thumb.jpg"
    },
    tags: ["Plantas", "Cortes", "Fachadas"]
  },
  {
    id: 5,
    title: "Local Comercial Centro",
    category: "Comercial",
    area: "60 m²",
    year: "2023",
    description: "Remodelación de un local comercial en el centro histórico. Se respetó la fachada original mientras se modernizaba la distribución interior.",
    featured: false,
    images: {
      plan: "/proyectos/local-comercial/planta.jpg",
      thumbnail: "/proyectos/local-comercial/thumb.jpg"
    },
    tags: ["Planta", "Elevación"]
  },
  {
    id: 6,
    title: "Casa Mediterránea",
    category: "Residencial",
    area: "200 m²",
    year: "2022",
    description: "Vivienda con patio interior y azotea habitable. Los materiales locales y la orientación estratégica reducen el consumo energético.",
    featured: false,
    images: {
      plan: "/proyectos/mediterranea/planta.jpg",
      thumbnail: "/proyectos/mediterranea/thumb.jpg"
    },
    tags: ["Plantas", "Cortes", "Detalles constructivos"]
  },
  {
    id: 7,
    title: "Consultorio Médico",
    category: "Comercial",
    area: "45 m²",
    year: "2022",
    description: "Distribución eficiente para consultas médicas con sala de espera, consultorio y área de esterilización. Accesibilidad universal garantizada.",
    featured: false,
    images: {
      plan: "/proyectos/consultorio/planta.jpg",
      thumbnail: "/proyectos/consultorio/thumb.jpg"
    },
    tags: ["Planta", "Detalles"]
  },
  {
    id: 8,
    title: "Conjunto Residencial",
    category: "Residencial",
    area: "3000 m²",
    year: "2021",
    description: "Conjunto de 12 viviendas unifilares con áreas verdes comunes. Cada unidad cuenta con jardín privado y estacionamiento.",
    featured: true,
    images: {
      plan: "/proyectos/conjunto-residencial/planta.jpg",
      thumbnail: "/proyectos/conjunto-residencial/thumb.jpg"
    },
    tags: ["Planta urbanística", "Elevaciones", "Detalles"]
  },
  {
    id: 9,
    title: "Restaurante Terraza",
    category: "Interiorismo",
    area: "120 m²",
    year: "2021",
    description: "Restaurante con cocina abierta y terraza panorámica. La distribución separa flujos de servicio y comensales para una operación eficiente.",
    featured: false,
    images: {
      plan: "/proyectos/restaurante/planta.jpg",
      thumbnail: "/proyectos/restaurante/thumb.jpg"
    },
    tags: ["Planta", "Cortes", "Detalles"]
  },
  {
    id: 10,
    title: "Casa Taller",
    category: "Residencial",
    area: "150 m²",
    year: "2020",
    description: "Vivienda que integra un taller de arte con espacios habitables. El doble altura del taller permite la creación de obras de gran formato.",
    featured: false,
    images: {
      plan: "/proyectos/casa-taller/planta.jpg",
      thumbnail: "/proyectos/casa-taller/thumb.jpg"
    },
    tags: ["Plantas", "Cortes", "Fachadas"]
  }
];

export const featuredProjects = projects.filter(p => p.featured);
export default projects;
