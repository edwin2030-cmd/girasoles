// ============================================================================
// CONFIGURACIÓN DE LA EXPERIENCIA ROMÁNTICA Y CARTAS DE CUMPLEAÑOS
// ============================================================================

export interface FriendLetterItem {
  id: string;
  name: string;
  photoUrl: string;
  message: string;
  prevButtonText: string;
  nextButtonText: string;
  showOnlyImage?: boolean;
}

export interface FriendMessagesConfig {
  sectionTitle: string;
  sectionBadge: string;
  promptDelayMs: number;
  promptButtonText: string;
  letters: FriendLetterItem[];
  finalScreen: {
    title: string;
    message: string;
    restartButtonText: string;
  };
}

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
  friendMessages: FriendMessagesConfig;
}

export const APP_CONFIG: RomanticAppConfig = {
  recipientName: "Génesis",
  recipientAge: 16,

  message: {
    badge: "DULCES 16 • GÉNESIS",
    greeting: "¡Feliz cumpleaños, Génesis!",
    body: "Espero que tengas un día muy bonito y lleno de momentos especiales. Eres una persona muy bonita, con una energía increíble, y mereces que te pasen cosas muy buenas.\n\nDisfruta mucho tus 16 y que este nuevo año venga lleno de sonrisas, sueños cumplidos y muchas cosas lindas.\n\n¡Feliz cumpleaños!",
    closing: "Con mucho cariño, te deseo lo mejor siempre...desbloqueame .",
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

  // ========================================
  // CONFIGURACIÓN DE LAS CARTAS
  // ========================================
  friendMessages: {
    sectionTitle: "Unos mensajes para ti",
    sectionBadge: "DULCES 16 • MENSAJES ESPECIALES",
    promptDelayMs: 5000,
    promptButtonText: "Ver más mensajes",
    letters: [
      // 1. FOTO DE TODAS (En grande, sin texto ni título para destacar la foto grupal)
      {
        id: "todas",
        name: "",
        photoUrl: "/images/todas.jpg",
        prevButtonText: "← Regresar",
        nextButtonText: "Pasar a la siguiente →",
        message: "",
        showOnlyImage: true,
      },
      // 2. CARTA 1 — ALICIA
      {
        id: "alicia",
        name: "Alicia",
        photoUrl: "/images/alicia.jpg",
        prevButtonText: "← Regresar",
        nextButtonText: "Pasar a la siguiente →",
        message: `Feliz cumpleaños a una de mis amistades más importantes.

Gracias por ser parte de tantos momentos bonitos, por acompañarme en cada locura y por ser ese “sí a todo” que siempre necesitaba JAJAJA.

Me llevo nuestras risas, y todos esos momentos que solo nosotras entendíamos.

Te quiero muchísimo y siempre voy a tener un pedacito de esta etapa guardado contigo.

Espero que logres todo lo que deseas y que este nuevo año sea de cosas prósperas a tu vida.

Loviu bb.`,
        showOnlyImage: false,
      },
      // 3. CARTA 2 — ELIANIS
      {
        id: "elianis",
        name: "Elianis",
        photoUrl: "/images/elianis.jpg",
        prevButtonText: "← Regresar",
        nextButtonText: "Pasar a la siguiente →",
        message: `Feliz cumpleaños a una de las personas que jamás pensé que iba a terminar siendo tan importante para mí, porque al principio me caías MAL.

Quién diría que después de eso íbamos a terminar siendo mejores amigas y viviendo tantas cosas juntas.

Gracias por estar, por escucharme, por aguantar mis locuras y por hacer que hasta los días más normales sean más divertidos.

Espero que hoy la pases increíble rodeada de todas las personas que te aman y que este nuevo año te traiga muchísimas cosas buenas.

Te quiero muchísimo mi xixi.`,
        showOnlyImage: false,
      },
      // 4. CARTA 3 — JOICE
      {
        id: "joice",
        name: "Joice",
        photoUrl: "/images/joice.jpg",
        prevButtonText: "← Regresar",
        nextButtonText: "Finalizar",
        message: `Feliz cumpleaños, mi Gene.

Hoy quiero desearle un feliz cumpleaños a una de las personas que forman parte de mi vida. Más que una amiga, eres una hermana más.

Gracias por todos los momentos, por las risas y hasta por las peleas.

Aunque antes no nos entendíamos muy bien, lograste convertirte en una persona muy especial en cada etapa de mi vida.

Quiero que Dios te regale un maravilloso cumpleaños y que te permita seguir compartiendo muchos años junto a todas las personas que te amamos, te queremos y estamos agradecidos de que estés en nuestras vidas.

Te quiero muchísimo, Génesis.`,
        showOnlyImage: false,
      },
    ],
    finalScreen: {
      title: "Con mucho amor",
      message: "Espero que hayas disfrutado este pequeño detalle.",
      restartButtonText: "Volver a ver",
    },
  },
};
