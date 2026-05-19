export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usageCount: number;
  active: boolean;
  description: string;
}

export const coupons: Coupon[] = [
  {
    id: "1",
    code: "BEMVINDO10",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 50,
    maxDiscount: 50,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    usageLimit: 1000,
    usageCount: 234,
    active: true,
    description: "10% de desconto para novos clientes (compras acima de €50)",
  },
  {
    id: "2",
    code: "LOOP20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 200,
    maxDiscount: 100,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    usageLimit: 500,
    usageCount: 89,
    active: true,
    description: "20% de desconto em compras acima de €200",
  },
  {
    id: "3",
    code: "PROMO15",
    discountType: "fixed",
    discountValue: 15,
    minPurchase: 100,
    validFrom: "2024-01-01",
    validUntil: "2026-06-30",
    usageLimit: 300,
    usageCount: 145,
    active: true,
    description: "€15 de desconto em compras acima de €100",
  },
  {
    id: "4",
    code: "SUSTENTAVEL25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 300,
    maxDiscount: 150,
    validFrom: "2024-03-01",
    validUntil: "2026-12-31",
    usageLimit: 200,
    usageCount: 56,
    active: true,
    description: "25% de desconto para compras sustentáveis acima de €300",
  },
  {
    id: "5",
    code: "NATAL2024",
    discountType: "percentage",
    discountValue: 30,
    minPurchase: 150,
    maxDiscount: 100,
    validFrom: "2024-12-01",
    validUntil: "2024-12-31",
    usageLimit: 1000,
    usageCount: 478,
    active: false,
    description: "Promoção de Natal - 30% de desconto (expirado)",
  },
];

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; error?: string; coupon?: Coupon } {
  const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

  if (!coupon) {
    return { valid: false, error: "Cupão inválido" };
  }

  if (!coupon.active) {
    return { valid: false, error: "Este cupão já não está ativo" };
  }

  const now = new Date();
  const validFrom = new Date(coupon.validFrom);
  const validUntil = new Date(coupon.validUntil);

  if (now < validFrom) {
    return { valid: false, error: "Este cupão ainda não está válido" };
  }

  if (now > validUntil) {
    return { valid: false, error: "Este cupão expirou" };
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, error: "Este cupão atingiu o limite de utilizações" };
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      valid: false,
      error: `Valor mínimo de compra: €${coupon.minPurchase}`,
    };
  }

  return { valid: true, coupon };
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.discountType === "percentage") {
    const discount = (subtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      return coupon.maxDiscount;
    }
    return discount;
  } else {
    return coupon.discountValue;
  }
}
