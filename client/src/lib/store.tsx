import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { productsById, type Product } from "./mock-data";

interface CartItem {
  productId: string;
  qty: number;
}

interface KitState {
  journeyId: string | null;
  budgetLabel: string | null;
  answers: Record<string, string>;
  productIds: string[];
}

interface StoreContextValue {
  cart: CartItem[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  kit: KitState;
  setKit: (k: KitState) => void;
  replaceInKit: (oldId: string, newId: string) => void;
  removeFromKit: (id: string) => void;
  addKitToCart: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);
const LS_KEY = "buildwise-store-v1";

function readLS(): { cart: CartItem[]; kit: KitState } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const emptyKit: KitState = { journeyId: null, budgetLabel: null, answers: {}, productIds: [] };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [kit, setKitState] = useState<KitState>(emptyKit);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const s = readLS();
    if (s) {
      setCart(s.cart ?? []);
      setKitState(s.kit ?? emptyKit);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(LS_KEY, JSON.stringify({ cart, kit }));
  }, [cart, kit, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === id);
      if (existing) return prev.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { productId: id, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => prev.map((c) => (c.productId === id ? { ...c, qty: Math.max(1, qty) } : c)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const setKit = useCallback((k: KitState) => setKitState(k), []);
  const replaceInKit = useCallback((oldId: string, newId: string) => {
    setKitState((k) => ({ ...k, productIds: k.productIds.map((id) => (id === oldId ? newId : id)) }));
  }, []);
  const removeFromKit = useCallback((id: string) => {
    setKitState((k) => ({ ...k, productIds: k.productIds.filter((p) => p !== id) }));
  }, []);

  const addKitToCart = useCallback(() => {
    setCart((prev) => {
      const map = new Map(prev.map((c) => [c.productId, c.qty]));
      for (const id of kit.productIds) map.set(id, (map.get(id) ?? 0) + 1);
      return Array.from(map, ([productId, qty]) => ({ productId, qty }));
    });
  }, [kit.productIds]);

  const { cartCount, cartTotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const c of cart) {
      const p: Product | undefined = productsById[c.productId];
      if (!p) continue;
      count += c.qty;
      total += p.price * c.qty;
    }
    return { cartCount: count, cartTotal: total };
  }, [cart]);

  const value: StoreContextValue = {
    cart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    cartCount,
    cartTotal,
    kit,
    setKit,
    replaceInKit,
    removeFromKit,
    addKitToCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
