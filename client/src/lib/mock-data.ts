export type Category =
  | "laptop"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "headphones"
  | "chair"
  | "desk"
  | "console"
  | "camera"
  | "lens"
  | "tripod"
  | "backpack"
  | "notebook"
  | "webcam";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  image: string;
  description: string;
  specs: string[];
}

export const products: Product[] = [
  // Laptops
  { id: "lap-1", name: "MacBook Air M3", brand: "Apple", category: "laptop", price: 114900, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", description: "Fanless powerhouse for coding, writing and creative work.", specs: ["M3 chip", "16GB RAM", "512GB SSD", "13.6\" Retina"] },
  { id: "lap-2", name: "ThinkPad X1 Carbon", brand: "Lenovo", category: "laptop", price: 149000, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80", description: "Business-class ultrabook loved by developers.", specs: ["Intel Ultra 7", "16GB RAM", "1TB SSD", "14\" 2.8K OLED"] },
  { id: "lap-3", name: "ROG Zephyrus G14", brand: "ASUS", category: "laptop", price: 164990, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80", description: "Compact gaming laptop with serious GPU power.", specs: ["Ryzen 9", "RTX 4070", "32GB RAM", "14\" 165Hz"] },

  // Monitors
  { id: "mon-1", name: "UltraFine 4K", brand: "LG", category: "monitor", price: 42999, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", description: "Colour-accurate 27-inch 4K panel.", specs: ["27\" IPS", "3840×2160", "USB-C 90W", "sRGB 99%"] },
  { id: "mon-2", name: "Odyssey G7", brand: "Samsung", category: "monitor", price: 54999, image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&q=80", description: "Curved 240Hz gaming display.", specs: ["32\" QLED", "1440p", "240Hz", "1ms"] },
  { id: "mon-3", name: "Studio Display", brand: "Dell", category: "monitor", price: 34500, image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80", description: "Reliable 27\" QHD monitor for daily work.", specs: ["27\" IPS", "2560×1440", "HDMI + DP", "Height adjust"] },

  // Keyboards
  { id: "kb-1", name: "MX Keys S", brand: "Logitech", category: "keyboard", price: 12495, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80", description: "Low-profile wireless keyboard.", specs: ["Wireless", "Backlit", "Multi-device"] },
  { id: "kb-2", name: "Keychron K2", brand: "Keychron", category: "keyboard", price: 9990, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80", description: "75% mechanical, hot-swappable.", specs: ["Mechanical", "RGB", "USB-C"] },
  { id: "kb-3", name: "Huntsman Mini", brand: "Razer", category: "keyboard", price: 11499, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", description: "60% optical gaming keyboard.", specs: ["Optical switches", "60%", "PBT keycaps"] },

  // Mice
  { id: "ms-1", name: "MX Master 3S", brand: "Logitech", category: "mouse", price: 9995, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80", description: "Precise, silent, ergonomic.", specs: ["8K DPI", "Bluetooth", "70-day battery"] },
  { id: "ms-2", name: "G Pro X Superlight", brand: "Logitech", category: "mouse", price: 12995, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80", description: "Featherlight esports mouse.", specs: ["63g", "25K DPI", "Wireless"] },

  // Headphones
  { id: "hp-1", name: "WH-1000XM5", brand: "Sony", category: "headphones", price: 29990, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", description: "Industry-leading ANC over-ears.", specs: ["ANC", "30h battery", "LDAC"] },
  { id: "hp-2", name: "HyperX Cloud III", brand: "HyperX", category: "headphones", price: 8990, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80", description: "Comfortable gaming headset.", specs: ["53mm drivers", "USB + 3.5mm", "Detachable mic"] },

  // Chairs
  { id: "ch-1", name: "Ergo Task Chair", brand: "Herman Miller", category: "chair", price: 89000, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80", description: "Long-session ergonomic chair.", specs: ["Adjustable lumbar", "Mesh back", "12yr warranty"] },
  { id: "ch-2", name: "Secretlab Titan", brand: "Secretlab", category: "chair", price: 44999, image: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&q=80", description: "Premium gaming chair.", specs: ["4D armrests", "Cold-cure foam", "Recline 165°"] },

  // Desks
  { id: "dk-1", name: "Standing Desk Pro", brand: "Flexispot", category: "desk", price: 32999, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80", description: "Electric sit-stand desk.", specs: ["Dual motor", "120×60cm", "Memory presets"] },

  // Console
  { id: "cs-1", name: "PlayStation 5", brand: "Sony", category: "console", price: 54990, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80", description: "Next-gen console with SSD storage.", specs: ["4K 120Hz", "825GB SSD", "DualSense"] },

  // Camera
  { id: "cam-1", name: "Alpha A7 IV", brand: "Sony", category: "camera", price: 219990, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", description: "Full-frame hybrid camera.", specs: ["33MP", "4K 60p", "IBIS"] },
  { id: "cam-2", name: "EOS R6 Mark II", brand: "Canon", category: "camera", price: 234990, image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80", description: "Fast, low-light champion.", specs: ["24MP", "40fps burst", "6K RAW"] },

  // Lens
  { id: "ln-1", name: "24-70mm f/2.8", brand: "Sony", category: "lens", price: 179000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", description: "Workhorse zoom lens.", specs: ["Full frame", "f/2.8", "Weather sealed"] },

  // Tripod
  { id: "tp-1", name: "Travel Tripod", brand: "Peak Design", category: "tripod", price: 44990, image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&q=80", description: "Compact carbon tripod.", specs: ["Carbon", "1.29kg", "Ball head"] },

  // Backpack
  { id: "bp-1", name: "Everyday Backpack 20L", brand: "Peak Design", category: "backpack", price: 22990, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", description: "Modular everyday carry.", specs: ["Weatherproof", "Laptop sleeve", "Recycled shell"] },
  { id: "bp-2", name: "Slim Laptop Backpack", brand: "Bellroy", category: "backpack", price: 12990, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80", description: "Minimalist commuter bag.", specs: ["16\" laptop", "Water resistant", "Recycled fabric"] },

  // Notebook
  { id: "nb-1", name: "Dotted Notebook A5", brand: "Leuchtturm1917", category: "notebook", price: 1990, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80", description: "Dotted hardcover notebook.", specs: ["A5", "251 pages", "80gsm"] },

  // Webcam
  { id: "wc-1", name: "Brio 4K", brand: "Logitech", category: "webcam", price: 15995, image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80", description: "Sharp 4K webcam for calls & streams.", specs: ["4K UHD", "HDR", "Auto-framing"] },
];

export const productsById = Object.fromEntries(products.map((p) => [p.id, p]));
export const productsByCategory = (c: Category) => products.filter((p) => p.category === c);

// -------- Journeys --------

export type JourneyId = "coding" | "gaming" | "home-office" | "photography" | "student";

export interface JourneyQuestion {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface Journey {
  id: JourneyId;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  gradient: string;
  questions: JourneyQuestion[];
  /** Build a kit (list of category picks) from answers. */
  buildKit: (answers: Record<string, string>) => Category[];
}

const budgetQ: JourneyQuestion = {
  id: "budget",
  label: "What's your budget?",
  options: [
    { value: "low", label: "Under ₹50,000" },
    { value: "mid", label: "₹50,000 – ₹1,50,000" },
    { value: "high", label: "₹1,50,000 – ₹3,00,000" },
    { value: "pro", label: "₹3,00,000+" },
  ],
};

export const journeys: Journey[] = [
  {
    id: "coding",
    title: "Coding Workspace",
    emoji: "💻",
    tagline: "For developers who ship.",
    description: "A focused setup for writing code, running builds, and long deep-work sessions.",
    gradient: "from-indigo-500 to-blue-500",
    questions: [
      budgetQ,
      {
        id: "purpose",
        label: "What will you mostly build?",
        options: [
          { value: "web", label: "Web & mobile apps" },
          { value: "data", label: "Data & ML workloads" },
          { value: "games", label: "Games & 3D" },
        ],
      },
      {
        id: "level",
        label: "Your experience level?",
        options: [
          { value: "beginner", label: "Just getting started" },
          { value: "intermediate", label: "A few years in" },
          { value: "pro", label: "Senior / lead" },
        ],
      },
      {
        id: "brand",
        label: "Any brand preference?",
        options: [
          { value: "apple", label: "Apple ecosystem" },
          { value: "windows", label: "Windows / Linux" },
          { value: "nopref", label: "No preference" },
        ],
      },
    ],
    buildKit: () => ["laptop", "monitor", "keyboard", "mouse", "headphones", "chair"],
  },
  {
    id: "gaming",
    title: "Gaming Setup",
    emoji: "🎮",
    tagline: "Frames, feel, immersion.",
    description: "High refresh rate, low latency and a chair you can actually sit in for hours.",
    gradient: "from-fuchsia-500 to-indigo-500",
    questions: [
      budgetQ,
      {
        id: "platform",
        label: "PC or Console?",
        options: [
          { value: "pc", label: "PC gaming" },
          { value: "console", label: "Console" },
          { value: "both", label: "Both" },
        ],
      },
      {
        id: "genre",
        label: "Favourite genre?",
        options: [
          { value: "fps", label: "Competitive FPS" },
          { value: "rpg", label: "Story / RPG" },
          { value: "sim", label: "Sim / Racing" },
        ],
      },
    ],
    buildKit: (a) =>
      a.platform === "console"
        ? ["console", "monitor", "headphones", "chair"]
        : ["laptop", "monitor", "keyboard", "mouse", "headphones", "chair"],
  },
  {
    id: "home-office",
    title: "Home Office",
    emoji: "🏠",
    tagline: "Work from anywhere, well.",
    description: "Comfort-first essentials for calls, focus time and long remote days.",
    gradient: "from-emerald-500 to-teal-500",
    questions: [
      budgetQ,
      {
        id: "role",
        label: "What's your role?",
        options: [
          { value: "manager", label: "Manager / ops" },
          { value: "creative", label: "Creative" },
          { value: "engineer", label: "Engineer" },
        ],
      },
      {
        id: "calls",
        label: "How call-heavy is your day?",
        options: [
          { value: "light", label: "A few a week" },
          { value: "medium", label: "Daily" },
          { value: "heavy", label: "Back-to-back" },
        ],
      },
    ],
    buildKit: () => ["laptop", "monitor", "webcam", "headphones", "chair", "desk"],
  },
  {
    id: "photography",
    title: "Photography Kit",
    emoji: "📸",
    tagline: "Shoot more, carry less.",
    description: "A body, a versatile lens, and the support gear to keep you shooting all day.",
    gradient: "from-amber-500 to-rose-500",
    questions: [
      budgetQ,
      {
        id: "style",
        label: "What do you shoot most?",
        options: [
          { value: "portrait", label: "Portraits" },
          { value: "travel", label: "Travel & landscape" },
          { value: "event", label: "Events & weddings" },
        ],
      },
      {
        id: "level",
        label: "Experience level?",
        options: [
          { value: "hobby", label: "Hobbyist" },
          { value: "semi", label: "Semi-pro" },
          { value: "pro", label: "Professional" },
        ],
      },
    ],
    buildKit: () => ["camera", "lens", "tripod", "backpack"],
  },
  {
    id: "student",
    title: "Student Starter Kit",
    emoji: "🎒",
    tagline: "Everything you need on day one.",
    description: "A dependable laptop, quiet headphones and the small stuff that keeps you organized.",
    gradient: "from-blue-500 to-cyan-500",
    questions: [
      budgetQ,
      {
        id: "field",
        label: "Field of study?",
        options: [
          { value: "cs", label: "Computer science" },
          { value: "design", label: "Design / arts" },
          { value: "business", label: "Business / other" },
        ],
      },
      {
        id: "carry",
        label: "How much do you carry daily?",
        options: [
          { value: "light", label: "Laptop only" },
          { value: "medium", label: "Laptop + books" },
          { value: "heavy", label: "Full kit" },
        ],
      },
    ],
    buildKit: () => ["laptop", "headphones", "backpack", "notebook"],
  },
];

export const journeysById = Object.fromEntries(journeys.map((j) => [j.id, j])) as Record<JourneyId, Journey>;

/** Pick a product for a category based on budget bucket. */
export function pickProduct(category: Category, budget: string): Product | undefined {
  const list = productsByCategory(category);
  if (list.length === 0) return undefined;
  const sorted = [...list].sort((a, b) => a.price - b.price);
  const idx =
    budget === "low" ? 0 : budget === "mid" ? Math.floor(sorted.length / 3) : budget === "high" ? Math.floor((sorted.length * 2) / 3) : sorted.length - 1;
  return sorted[Math.min(idx, sorted.length - 1)];
}

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
