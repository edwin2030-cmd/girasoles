// ============================================================================
// CONFIGURACIÓN
// ============================================================================
// En esta sección puedes personalizar fácilmente todos los aspectos de la
// experiencia romántica: textos, colores, cantidad de flores, velocidades y música.

export interface RomanticAppConfig {
  recipientName: string;
  recipientAge: number;
  message: {
    badge: string;
    greeting: string;
    body: string;
    closing: string;
    sender: string;
  };
  colors: {
    backgroundStart: string;
    backgroundMid: string;
    backgroundEnd: string;
    soilColor: string;
    soilHighlight: string;
    sunflowerYellow: string;
    sunflowerAmber: string;
    sunflowerDarkCenter: string;
    glowAmbient: string;
    particleSparkle: string;
    particlePetal: string;
  };
  gardenFlowerCount: number;
  growthSpeed: number;
  particleSpeed: number;
  buttons: {
    restartText: string;
    musicPlayText: string;
    musicPauseText: string;
    customizeText: string;
  };
  music: {
    audioFilePath: string;
    trackTitle: string;
    defaultVolume: number;
    loop: boolean;
  };
  durations: {
    flowerFallDelay: number;
    flowerFallDuration: number;
    seedLandingGlow: number;
    rootGrowth: number;
    trunkGrowth: number;
    branchExpand: number;
    bloomDuration: number;
    messageDelay: number;
    typewriterSpeed: number;
  };
  wishes16: Array<{
    id: number;
    title: string;
    message: string;
    emoji: string;
  }>;
}

export const APP_CONFIG: RomanticAppConfig = {
  recipientName: "Génesis",
  recipientAge: 16,

  message: {
    badge: "🌻 DULCES 16 • GÉNESIS ✨",
    greeting: "¡Feliz Cumpleaños 16, Génesis! 🌻💛",
    body: "Dicen que los girasoles siempre buscan la luz del sol, pero amigas como tú son la luz que alegra los días de todos a su alrededor. ¡Felices 16 años! Que este nuevo año de vida esté lleno de risas cómplices, sueños gigantes cumplidos y recuerdos inolvidables. ¡Gracias por tu valiosa amistad, por tu energía tan bonita y por brillar siempre con tanta luz propia!",
    closing: "Con mucho cariño y admiración en tus 16 años.",
    sender: "Tu amigo/a que siempre te desea lo mejor 🌟",
  },

  colors: {
    backgroundStart: "#090503",  // Noche profunda en tonos ámbar y bronce
    backgroundMid: "#180c04",    // Resplandor cálido de atardecer dorado
    backgroundEnd: "#0d0602",    // Suelo oscuro y fértil
    soilColor: "#221105",        // Tierra enriquecida
    soilHighlight: "#452206",    // Relieve dorado de la tierra
    sunflowerYellow: "#fbbf24",  // Amarillo radiante de girasol
    sunflowerAmber: "#f59e0b",   // Ámbar profundo
    sunflowerDarkCenter: "#451a03", // Corazón de semillas de girasol
    glowAmbient: "rgba(251, 191, 36, 0.28)",
    particleSparkle: "#fef08a",  // Destellos dorados cálidos
    particlePetal: "#facc15",    // Pétalos de girasol flotantes
  },

  gardenFlowerCount: 16,
  growthSpeed: 1.0,
  particleSpeed: 1.0,

  buttons: {
    restartText: "Volver a ver",
    musicPlayText: "Starboy Beat",
    musicPauseText: "Silenciar",
    customizeText: "Dedicatoria",
  },

  music: {
    audioFilePath: "/music.mp3",
    trackTitle: "The Weeknd - Starboy (Instrumental Beat)",
    defaultVolume: 0.65,
    loop: true,
  },

  durations: {
    flowerFallDelay: 600,       // Pequeña pausa inicial
    flowerFallDuration: 4200,   // La flor amarilla desciende lentamente girando
    seedLandingGlow: 1000,      // Resplandor al tocar tierra
    rootGrowth: 1400,          // Raíces penetran la tierra
    trunkGrowth: 3200,         // El tronco del árbol crece hacia arriba
    branchExpand: 2800,        // Las ramas se abren y amplían a los lados
    bloomDuration: 3500,       // Florecen todos los girasoles del árbol
    messageDelay: 1000,        // Aparece la carta de cumpleaños
    typewriterSpeed: 32,
  },

  wishes16: [
    {
      id: 1,
      title: "Risas Interminables",
      message: "Que nunca falte una carcajada sincera que te reinicie el día y te llene de felicidad.",
      emoji: "😂",
    },
    {
      id: 2,
      title: "Luz Auténtica",
      message: "Que sigas iluminando cada lugar al que llegas con tu personalidad única y brillante.",
      emoji: "☀️",
    },
    {
      id: 3,
      title: "Aventuras Épicas",
      message: "Que tus 16 años estén repletos de viajes, anécdotas locas y momentos memorables.",
      emoji: "🚀",
    },
    {
      id: 4,
      title: "Amistad Incondicional",
      message: "Saber que siempre contarás con amigos verdaderos que te apoyen en las buenas y las malas.",
      emoji: "🤝",
    },
    {
      id: 5,
      title: "Sueños Gigantes",
      message: "Que cada proyecto, pasión y meta que te propongas este año empiece a hacerse realidad.",
      emoji: "🎯",
    },
    {
      id: 6,
      title: "Paz en el Corazón",
      message: "Días de tranquilidad absoluta, serenidad y balance para disfrutar cada segundo.",
      emoji: "🕊️",
    },
    {
      id: 7,
      title: "Música que Inspire",
      message: "Las mejores canciones acompañando cada paso de tu vida, creando tu soundtrack perfecto.",
      emoji: "🎧",
    },
    {
      id: 8,
      title: "Seguridad y Confianza",
      message: "Que jamás dudes de lo increíble, fuerte, talentosa e inteligente que eres.",
      emoji: "💪",
    },
    {
      id: 9,
      title: "Momentos Mágicos",
      message: "Atardeceres dorados, pláticas nocturnas y sorpresas que te alegren el alma.",
      emoji: "✨",
    },
    {
      id: 10,
      title: "Salud y Energía",
      message: "Fuerza y vitalidad desbordante para vivir al máximo cada una de tus pasiones.",
      emoji: "⚡",
    },
    {
      id: 11,
      title: "Abrazos Sinceros",
      message: "De esos abrazos cálidos que reconfortan el espíritu y te recuerdan lo querida que eres.",
      emoji: "🫂",
    },
    {
      id: 12,
      title: "Nuevas Pasiones",
      message: "Descubrir talentos ocultos, hobbies divertidos y caminos que te apasionen por completo.",
      emoji: "🎨",
    },
    {
      id: 13,
      title: "Días Soleados",
      message: "Que incluso cuando el cielo se nuble, tú lleves siempre un campo de girasoles por dentro.",
      emoji: "🌻",
    },
    {
      id: 14,
      title: "Gente que Sume",
      message: "Rodeada siempre de personas leales, cariñosas y llenas de buena vibra para tu vida.",
      emoji: "💛",
    },
    {
      id: 15,
      title: "Dulces 16 Dorados",
      message: "Celebrar estos dieciséis años con orgullo, libertad y la emoción de una nueva etapa.",
      emoji: "👑",
    },
    {
      id: 16,
      title: "¡El Mejor Año de tu Vida!",
      message: "Que esta vuelta al sol supere todas tus expectativas y sea inolvidable, Génesis.",
      emoji: "🎉",
    },
  ],
};

