export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: "Telemóvel" | "Computador" | "Tablet" | "Auscultadores" | "Colunas" | "Acessórios";
  brand: string;
  price: number;
  image: string;
  images?: string[]; // Multiple product images
  condition: "Como Novo" | "Excelente" | "Muito Bom";
  storage?: string;
  color?: string;
  description?: string;
  stock: number; // Available quantity
  timeline: {
    manufactured?: string;
    firstUse?: string;
    receivedForRefurbishment?: string;
    replacedParts: string[];
    qualityTested?: string;
  };
  specs?: string[];
  ecoImpact?: {
    co2Saved: number; // in kg
    waterSaved: number; // in liters
    energySaved: number; // in kWh
    wastePrevented: number; // in kg
  };
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: "Telemóvel" | "Computador" | "Tablet" | "Auscultadores" | "Colunas" | "Acessórios";
  brand: string;
  price: number;
  image: string;
  images?: string[]; // Multiple product images
  condition: "Como Novo" | "Excelente" | "Muito Bom";
  storage?: string;
  color?: string;
  description?: string;
  stock: number; // Available quantity
  timeline: {
    manufactured?: string;
    firstUse?: string;
    receivedForRefurbishment?: string;
    replacedParts: string[]; // Adicionado estrategicamente aqui para o histórico técnico
    qualityTested?: string;
  };
  specs?: string[];
  ecoImpact?: {
    co2Saved: number; // in kg
    waterSaved: number; // in liters
    energySaved: number; // in kWh
    wastePrevented: number; // in kg
  };
  reviews?: ProductReview[];
}

export const products: Product[] = [
  // TELEMÓVEIS
  {
    id: 1,
    name: "iPhone 13 Pro",
    category: "Telemóvel",
    brand: "Apple",
    price: 659,
    image: "https://images.unsplash.com/photo-1643858527913-16e06986db32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxMyUyMFBybyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzczMjU5MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    storage: "256GB",
    color: "Grafite",
    stock: 8,
    timeline: {
      manufactured: "2022-09-12",
      firstUse: "2022-10-01",
      receivedForRefurbishment: "2023-01-15",
      replacedParts: ["Bateria Nova Original OEM", "Ecrã Super Retina XDR"], // Peças para o cenário 1 do iPhone 13
      qualityTested: "2023-01-20",
    },
    specs: ["A15 Bionic chip", "12MP Ultra Wide camera", "12MP Wide camera", "12MP Telephoto camera"],
    ecoImpact: {
      co2Saved: 10,
      waterSaved: 50,
      energySaved: 2,
      wastePrevented: 0.5,
    },
  },
  {
    id: 2,
    name: "iPhone 12",
    category: "Telemóvel",
    brand: "Apple",
    price: 439,
    image: "https://images.unsplash.com/photo-1605637064671-c03a5fae76cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxMiUyMHNtYXJ0cGhvbmUlMjBibGFja3xlbnwxfHx8fDE3NzMyNTkxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "128GB",
    color: "Preto",
    stock: 15,
    timeline: {
      manufactured: "2020-10-23",
      firstUse: "2020-11-01",
      receivedForRefurbishment: "2023-02-10",
      replacedParts: ["Bateria de Alta Capacidade Certificada"],
      qualityTested: "2023-02-15",
    },
    specs: ["A14 Bionic chip", "12MP Ultra Wide camera", "12MP Wide camera"],
    ecoImpact: {
      co2Saved: 8,
      waterSaved: 40,
      energySaved: 1.5,
      wastePrevented: 0.4,
    },
  },
  {
    id: 3,
    name: "Samsung Galaxy S23",
    category: "Telemóvel",
    brand: "Samsung",
    price: 549,
    image: "https://images.unsplash.com/photo-1681651585822-b2edab241341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1zdW5nJTIwR2FsYXh5JTIwUzIzJTIwcGhvbmV8ZW58MXx8fHwxNzczMjU5MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "256GB",
    color: "Preto Fantasma",
    stock: 0,
    timeline: {
      manufactured: "2023-03-01",
      firstUse: "2023-03-15",
      receivedForRefurbishment: "2023-04-10",
      replacedParts: ["Módulo da Câmara Traseira (Foco Principal)"],
      qualityTested: "2023-04-15",
    },
    specs: ["Snapdragon 8 Gen 2", "50MP Wide camera", "12MP Ultra Wide camera", "10MP Telephoto camera"],
    ecoImpact: {
      co2Saved: 12,
      waterSaved: 60,
      energySaved: 3,
      wastePrevented: 0.6,
    },
  },
  {
    id: 4,
    name: "Google Pixel 7 Pro",
    category: "Telemóvel",
    brand: "Google",
    price: 499,
    image: "https://images.unsplash.com/photo-1636633484288-ba18d16271a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHb29nbGUlMjBQaXhlbCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzczMjQ0NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    storage: "128GB",
    color: "Obsidiana",
    stock: 5,
    timeline: {
      manufactured: "2022-10-06",
      firstUse: "2022-10-15",
      receivedForRefurbishment: "2023-05-05",
      replacedParts: [], // Nenhum componente substituído
      qualityTested: "2023-05-10",
    },
    specs: ["Tensor G2 chip", "50MP Wide camera", "12MP Ultra Wide camera", "10MP Telephoto camera"],
    ecoImpact: {
      co2Saved: 9,
      waterSaved: 55,
      energySaved: 2.5,
      wastePrevented: 0.5,
    },
  },

  // COMPUTADORES
  {
    id: 5,
    name: "MacBook Pro 14\"",
    category: "Computador",
    brand: "Apple",
    price: 1399,
    image: "https://images.unsplash.com/photo-1551533390-b80b6ffa7816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTIwUHJvJTIwbGFwdG9wfGVufDF8fHx8MTc3MzI1OTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "512GB",
    color: "Cinzento Sideral",
    stock: 3,
    timeline: {
      manufactured: "2023-01-10",
      firstUse: "2023-01-20",
      receivedForRefurbishment: "2023-06-05",
      replacedParts: ["Teclado Layout PT", "Pasta Térmica de Prata"],
      qualityTested: "2023-06-10",
    },
    specs: ["M2 Pro chip", "16GB RAM", "512GB "],
    ecoImpact: {
      co2Saved: 15,
      waterSaved: 75,
      energySaved: 4,
      wastePrevented: 0.7,
    },
  },
  {
    id: 6,
    name: "Dell XPS 15",
    category: "Computador",
    brand: "Dell",
    price: 1099,
    image: "https://images.unsplash.com/photo-1622286346003-c5c7e63b1088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEZWxsJTIwWFBTJTIwbGFwdG9wJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzczMjU5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    storage: "1TB ",
    color: "Platina",
    stock: 12,
    timeline: {
      manufactured: "2022-11-01",
      firstUse: "2022-11-15",
      receivedForRefurbishment: "2023-07-05",
      replacedParts: [],
      qualityTested: "2023-07-10",
    },
    specs: ["12th Gen Intel Core i7", "16GB RAM", "1TB "],
    ecoImpact: {
      co2Saved: 14,
      waterSaved: 70,
      energySaved: 3.5,
      wastePrevented: 0.6,
    },
  },
  {
    id: 7,
    name: "HP Pavilion 15",
    category: "Computador",
    brand: "HP",
    price: 599,
    image: "https://images.unsplash.com/photo-1743865320670-8f4722dd3542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUCUyMGxhcHRvcCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMyNTkxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "512GB ",
    color: "Prata Natural",
    stock: 7,
    timeline: {
      manufactured: "2022-12-01",
      firstUse: "2022-12-15",
      receivedForRefurbishment: "2023-08-05",
      replacedParts: ["Módulo Trackpad de Gestos"],
      qualityTested: "2023-08-10",
    },
    specs: ["12th Gen Intel Core i5", "8GB RAM", "512GB "],
    ecoImpact: {
      co2Saved: 10,
      waterSaved: 50,
      energySaved: 2,
      wastePrevented: 0.5,
    },
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1",
    category: "Computador",
    brand: "Lenovo",
    price: 849,
    image: "https://images.unsplash.com/photo-1763162410742-1d0097cea556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMZW5vdm8lMjBUaGlua1BhZCUyMGxhcHRvcHxlbnwxfHx8fDE3NzMyNTkxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "256GB ",
    color: "Preto",
    stock: 6,
    timeline: {
      manufactured: "2023-01-05",
      firstUse: "2023-01-15",
      receivedForRefurbishment: "2023-09-05",
      replacedParts: ["Bateria Primária de Polímeros de Lítio"],
      qualityTested: "2023-09-10",
    },
    specs: ["12th Gen Intel Core i7", "16GB RAM", "256GB "],
    ecoImpact: {
      co2Saved: 12,
      waterSaved: 60,
      energySaved: 3,
      wastePrevented: 0.6,
    },
  },

  // TABLETS
  {
    id: 9,
    name: "iPad Air 2022",
    category: "Tablet",
    brand: "Apple",
    price: 419,
    image: "https://images.unsplash.com/photo-1691580438206-08456840b6de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGFkJTIwQWlyJTIwdGFibGV0fGVufDF8fHx8MTc3MzI1OTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    storage: "64GB",
    color: "Azul",
    stock: 10,
    timeline: {
      manufactured: "2022-09-15",
      firstUse: "2022-09-25",
      receivedForRefurbishment: "2023-10-05",
      replacedParts: [],
      qualityTested: "2023-10-10",
    },
    specs: ["M1 chip", "12MP Ultra Wide camera", "12MP Wide camera"],
    ecoImpact: {
      co2Saved: 8,
      waterSaved: 40,
      energySaved: 1.5,
      wastePrevented: 0.4,
    },
  },
  {
    id: 10,
    name: "iPad Pro 11\"",
    category: "Tablet",
    brand: "Apple",
    price: 669,
    image: "https://images.unsplash.com/photo-1628866971124-5d506bf12915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGFkJTIwUHJvJTIwdGFibGV0fGVufDF8fHx8MTc3MzI1OTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "128GB",
    color: "Cinzento Sideral",
    stock: 4,
    timeline: {
      manufactured: "2022-10-01",
      firstUse: "2022-10-15",
      receivedForRefurbishment: "2023-11-05",
      replacedParts: ["Conector Dock USB-C de Carregamento"],
      qualityTested: "2023-11-10",
    },
    specs: ["M1 chip", "12MP Ultra Wide camera", "12MP Wide camera"],
    ecoImpact: {
      co2Saved: 10,
      waterSaved: 50,
      energySaved: 2,
      wastePrevented: 0.5,
    },
  },
  {
    id: 11,
    name: "Samsung Galaxy Tab S8",
    category: "Tablet",
    brand: "Samsung",
    price: 399,
    image: "https://images.unsplash.com/photo-1722150635400-781fa4b5f40e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1zdW5nJTIwR2FsYXh5JTIwVGFiJTIwdGFibGV0fGVufDF8fHx8MTc3MzI1OTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    storage: "128GB",
    color: "Grafite",
    stock: 0,
    timeline: {
      manufactured: "2023-01-01",
      firstUse: "2023-01-15",
      receivedForRefurbishment: "2023-12-05",
      replacedParts: [],
      qualityTested: "2023-12-10",
    },
    specs: ["Snapdragon 8 Gen 2", "50MP Wide camera", "12MP Ultra Wide camera", "10MP Telephoto camera"],
    ecoImpact: {
      co2Saved: 12,
      waterSaved: 60,
      energySaved: 3,
      wastePrevented: 0.6,
    },
  },
  {
    id: 12,
    name: "Microsoft Surface Pro 8",
    category: "Tablet",
    brand: "Microsoft",
    price: 799,
    image: "https://images.unsplash.com/photo-1595245150898-339b88a9d477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaWNyb3NvZnQlMjBTdXJmYWNlJTIwdGFibGV0fGVufDF8fHx8MTc3MzI1OTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    storage: "256GB",
    color: "Platina",
    stock: 9,
    timeline: {
      manufactured: "2022-11-01",
      firstUse: "2022-11-15",
      receivedForRefurbishment: "2024-01-05",
      replacedParts: ["Vidro do Ecrã Touch Digitizer"],
      qualityTested: "2024-01-10",
    },
    specs: ["12th Gen Intel Core i7", "16GB RAM", "256GB "],
    ecoImpact: {
      co2Saved: 14,
      waterSaved: 70,
      energySaved: 3.5,
      wastePrevented: 0.6,
    },
  },

  // AUSCULTADORES
  {
    id: 13,
    name: "Sony WH-1000XM5",
    category: "Auscultadores",
    brand: "Sony",
    price: 259,
    image: "https://images.unsplash.com/photo-1583305727488-61f82c7eae4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb255JTIwV0gxMDAwWE01JTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NzMyNTkxODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Preto",
    stock: 14,
    timeline: {
      manufactured: "2022-09-01",
      firstUse: "2022-09-15",
      receivedForRefurbishment: "2024-02-05",
      replacedParts: ["Almofadas de Isolamento Acústico"],
      qualityTested: "2024-02-10",
    },
    specs: ["Noise cancellation", "30 hours battery life"],
    ecoImpact: {
      co2Saved: 5,
      waterSaved: 25,
      energySaved: 1,
      wastePrevented: 0.3,
    },
  },
  {
    id: 14,
    name: "AirPods Pro 2",
    category: "Auscultadores",
    brand: "Apple",
    price: 179,
    image: "https://images.unsplash.com/photo-1639789974886-7873405240ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBaXJQb2RzJTIwUHJvJTIwZWFyYnVkc3xlbnwxfHx8fDE3NzMyMzMwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Branco",
    stock: 20,
    timeline: {
      manufactured: "2022-10-01",
      firstUse: "2022-10-15",
      receivedForRefurbishment: "2024-03-05",
      replacedParts: ["Ponteiras de Silicone Macias (S/M/L)"],
      qualityTested: "2024-03-10",
    },
    specs: ["Active noise cancellation", "24 hours battery life"],
    ecoImpact: {
      co2Saved: 4,
      waterSaved: 20,
      energySaved: 0.5,
      wastePrevented: 0.2,
    },
  },
  {
    id: 15,
    name: "Bose QuietComfort 45",
    category: "Auscultadores",
    brand: "Bose",
    price: 229,
    image: "https://images.unsplash.com/photo-1657223143975-d29d7959a70f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb3NlJTIwaGVhZHBob25lcyUyMHdpcmVsZXNzfGVufDF8fHx8MTc3MzI1OTE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    color: "Preto Triplo",
    stock: 8,
    timeline: {
      manufactured: "2023-01-01",
      firstUse: "2023-01-15",
      receivedForRefurbishment: "2024-04-05",
      replacedParts: [],
      qualityTested: "2024-04-10",
    },
    specs: ["Noise cancellation", "20 hours battery life"],
    ecoImpact: {
      co2Saved: 6,
      waterSaved: 30,
      energySaved: 1.5,
      wastePrevented: 0.4,
    },
  },
  {
    id: 16,
    name: "AirPods Max",
    category: "Auscultadores",
    brand: "Apple",
    price: 379,
    image: "https://images.unsplash.com/photo-1639789974886-7873405240ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhBaXJQb2RzJTIwUHJvJTIwZWFyYnVkc3xlbnwxfHx8fDE3NzMyMzMwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Cinzento Sideral",
    stock: 3,
    timeline: {
      manufactured: "2022-11-01",
      firstUse: "2022-11-15",
      receivedForRefurbishment: "2024-05-05",
      replacedParts: ["Banda de Tecido Superior do Arco"],
      qualityTested: "2024-05-10",
    },
    specs: ["Active noise cancellation", "20 hours battery life"],
    ecoImpact: {
      co2Saved: 7,
      waterSaved: 35,
      energySaved: 2,
      wastePrevented: 0.5,
    },
  },

  // COLUNAS
  {
    id: 17,
    name: "JBL Flip 6",
    category: "Colunas",
    brand: "JBL",
    price: 79,
    image: "https://images.unsplash.com/photo-1608488458196-61cd3a720de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKQkwlMjBzcGVha2VyJTIwYmx1ZXRvb3RofGVufDF8fHx8MTc3MzI1OTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    color: "Preto",
    stock: 25,
    timeline: {
      manufactured: "2022-09-01",
      firstUse: "2022-09-15",
      receivedForRefurbishment: "2024-06-05",
      replacedParts: [],
      qualityTested: "2024-06-10",
    },
    specs: ["Bluetooth 5.0", "12 hours battery life"],
    ecoImpact: {
      co2Saved: 3,
      waterSaved: 15,
      energySaved: 0.5,
      wastePrevented: 0.1,
    },
  },
  {
    id: 18,
    name: "Sonos One",
    category: "Colunas",
    brand: "Sonos",
    price: 149,
    image: "https://images.unsplash.com/photo-1646425040945-8db4a756dd95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb25vcyUyMHNwZWFrZXIlMjB3aXJlbGVzc3xlbnwxfHx8fDE3NzMyNTkxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Branco",
    stock: 5,
    timeline: {
      manufactured: "2022-10-01",
      firstUse: "2022-10-15",
      receivedForRefurbishment: "2024-07-05",
      replacedParts: ["Antena Recetora Wi-Fi Integrada"],
      qualityTested: "2024-07-10",
    },
    specs: ["Bluetooth 5.0", "16 hours battery life"],
    ecoImpact: {
      co2Saved: 4,
      waterSaved: 20,
      energySaved: 0.5,
      wastePrevented: 0.2,
    },
  },
  {
    id: 19,
    name: "JBL Charge 5",
    category: "Colunas",
    brand: "JBL",
    price: 119,
    image: "https://images.unsplash.com/photo-1608488458196-61cd3a720de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKQkwlMjBzcGVha2VyJTIwYmx1ZXRvb3RofGVufDF8fHx8MTc3MzI1OTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    color: "Azul",
    stock: 18,
    timeline: {
      manufactured: "2023-01-01",
      firstUse: "2023-01-15",
      receivedForRefurbishment: "2024-08-05",
      replacedParts: [],
      qualityTested: "2024-08-10",
    },
    specs: ["Bluetooth 5.0", "12 hours battery life"],
    ecoImpact: {
      co2Saved: 3,
      waterSaved: 15,
      energySaved: 0.5,
      wastePrevented: 0.1,
    },
  },
  {
    id: 20,
    name: "Bose SoundLink Revolve+",
    category: "Colunas",
    brand: "Bose",
    price: 179,
    image: "https://images.unsplash.com/photo-1608488458196-61cd3a720de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKQkwlMjBzcGVha2VyJTIwYmx1ZXRvb3RofGVufDF8fHx8MTc3MzI1OTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Preto Triplo",
    stock: 11,
    timeline: {
      manufactured: "2022-11-01",
      firstUse: "2022-11-15",
      receivedForRefurbishment: "2024-09-05",
      replacedParts: ["Porta de Alimentação Micro-USB"],
      qualityTested: "2024-09-10",
    },
    specs: ["Bluetooth 5.0", "16 hours battery life"],
    ecoImpact: {
      co2Saved: 4,
      waterSaved: 20,
      energySaved: 0.5,
      wastePrevented: 0.2,
    },
  },

  // ACESSÓRIOS
  {
    id: 21,
    name: "Cabo USB-C para Lightning",
    category: "Acessórios",
    brand: "Apple",
    price: 19,
    image: "https://images.unsplash.com/photo-1760708825913-65a50b3dc39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVU0ItQyUyMGNoYXJnaW5nJTIwY2FibGV8ZW58MXx8fHwxNzczMjU5MTIXfDA&ixlib=rb-4.1.0&q=80&w=1080",
    condition: "Como Novo",
    color: "Branco",
    stock: 30,
    timeline: {
      manufactured: "2022-09-01",
      firstUse: "2022-09-15",
      receivedForRefurbishment: "2024-10-05",
      replacedParts: [],
      qualityTested: "2024-10-10",
    },
    specs: ["USB-C to Lightning", "1 meter length"],
    ecoImpact: {
      co2Saved: 1,
      waterSaved: 5,
      energySaved: 0.1,
      wastePrevented: 0.05,
    },
  },
  {
    id: 22,
    name: "Carregador Sem Fios MagSafe",
    category: "Acessórios",
    brand: "Apple",
    price: 35,
    image: "https://images.unsplash.com/photo-1633381638729-27f730955c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGNoYXJnZXIlMjBwYWR8ZW58MXx8fHwxNzczMjU5MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Excelente",
    color: "Branco",
    stock: 15,
    timeline: {
      manufactured: "2023-01-01",
      firstUse: "2023-01-15",
      receivedForRefurbishment: "2024-12-05",
      replacedParts: ["Borda Magnética de Alinhamento"],
      qualityTested: "2024-12-10",
    },
    specs: ["MagSafe wireless charger", "15W power"],
    ecoImpact: {
      co2Saved: 2,
      waterSaved: 10,
      energySaved: 0.2,
      wastePrevented: 0.1,
    },
  },
  {
    id: 23,
    name: "Powerbank 20000mAh",
    category: "Acessórios",
    brand: "Anker",
    price: 29,
    image: "https://images.unsplash.com/photo-1633381638729-27f730955c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGNoYXJnZXIlMjBwYWR8ZW58MXx8fHwxNzczMjU5MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    condition: "Como Novo",
    color: "Preto",
    stock: 22,
    timeline: {
      manufactured: "2022-11-01",
      firstUse: "2022-11-15",
      receivedForRefurbishment: "2025-01-05",
      replacedParts: [],
      qualityTested: "2025-01-10",
    },
    specs: ["20000mAh battery", "USB-C charging"],
    ecoImpact: {
      co2Saved: 3,
      waterSaved: 15,
      energySaved: 0.5,
      wastePrevented: 0.1,
    },
  },
  {
    id: 24,
    name: "Samsung Galaxy A54",
    category: "Telemóvel",
    brand: "Samsung",
    price: 279,
    image: "https://images.unsplash.com/photo-1681651585822-b2edab241341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1zdW5nJTIwR2FsYXh5JTIwUzIzJTIwcGhvbmV8ZW58MXx8fHwxNzczMjU5MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    condition: "Muito Bom",
    storage: "128GB",
    color: "Preto",
    stock: 4,
    // US2 Cenário 2: timeline incompleto → histórico técnico indisponível (BR-02)
    timeline: {
      manufactured: "2023-03-01",
      firstUse: "2023-04-01",
      replacedParts: [],
      // receivedForRefurbishment e qualityTested em falta propositadamente
    },
    specs: ["Exynos 1380", "50MP Wide camera", "5000mAh battery"],
    ecoImpact: {
      co2Saved: 7,
      waterSaved: 35,
      energySaved: 1.5,
      wastePrevented: 0.3,
    },
  },
];