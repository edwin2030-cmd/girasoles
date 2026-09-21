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
  durations: {
    flowerFallDuration: number;
    seedLandingGlow: number;
    rootGrowth: number;
    trunkGrowth: number;
    branchExpand: number;
    bloomDuration: number;
    messageDelay: number;
    typewriterSpeed: number;
  };
}

export const APP_CONFIG: RomanticAppConfig = {
  recipientName: "Génesis",
  recipientAge: 16,

  message: {
    badge: "DULCES 16 • GÉNESIS",
    greeting: "¡Feliz cumpleaños, Génesis!",
    body: "Espero que tengas un día muy bonito y lleno de momentos especiales. Eres una persona muy bonita, con una energía increíble, y mereces que te pasen cosas muy buenas.\n\nDisfruta mucho tus 16 y que este nuevo año venga lleno de sonrisas, sueños cumplidos y muchas cosas lindas.\n\n¡Feliz cumpleaños!",
    closing: "Con mucho cariño, te deseo lo mejor siempre.",
    sender: "",
  },

  colors: {
    backgroundStart: "#fbf8f3",  // Crema marfil cálido y elegante
    backgroundMid: "#f5eee4",    // Beige suave y luminoso
    backgroundEnd: "#e8ded0",    // Arena beige cálida
    soilColor: "#63432d",        // Tierra fértil en tono café cálido
    soilHighlight: "#885f42",    // Relieve suave de la tierra
    sunflowerYellow: "#fbbf24",  // Amarillo radiante de girasol
    sunflowerAmber: "#f59e0b",   // Ámbar dorado
    sunflowerDarkCenter: "#451a03", // Corazón de semillas de girasol
    glowAmbient: "rgba(245, 158, 11, 0.15)",
    particleSparkle: "#f59e0b",  // Destellos dorados cálidos
    particlePetal: "#eab308",    // Pétalos dorados flotantes
  },

  gardenFlowerCount: 16,
  growthSpeed: 1.0,
  particleSpeed: 1.0,

  durations: {
    flowerFallDuration: 1900,   // Descenso fluido y elegante de la flor
    seedLandingGlow: 500,       // Resplandor dorado de impacto en tierra
    rootGrowth: 750,            // Raíces brotan en la tierra
    trunkGrowth: 1500,          // Tronco crece con fluidez
    branchExpand: 1500,         // Ramas se expanden en forma de corazón
    bloomDuration: 1600,        // Florecen los pequeños girasoles
    messageDelay: 450,          // Aparición de la carta
    typewriterSpeed: 16,        // Efecto máquina de escribir fluido
  },
};


