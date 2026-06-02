"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Car } from "@/data/inventory";
import { inventory } from "@/data/inventory";
import { CompareTray } from "./CompareTray";
import { CompareModal } from "./CompareModal";

interface CompareCtx {
  compareIds: string[];
  isComparing: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  compareCars: Car[];
  openModal: () => void;
}

const Ctx = createContext<CompareCtx | null>(null);

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = (id: string) =>
    setCompareIds((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= 3) return [...cur.slice(1), id];
      return [...cur, id];
    });

  const remove = (id: string) =>
    setCompareIds((cur) => cur.filter((x) => x !== id));

  const clear = () => setCompareIds([]);

  const compareCars = useMemo(
    () =>
      compareIds
        .map((id) => inventory.find((c) => c.id === id))
        .filter((c): c is Car => Boolean(c)),
    [compareIds],
  );

  const value: CompareCtx = {
    compareIds,
    isComparing: (id) => compareIds.includes(id),
    toggle,
    remove,
    clear,
    compareCars,
    openModal: () => setModalOpen(true),
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <CompareTray />
      {modalOpen && <CompareModal onClose={() => setModalOpen(false)} />}
    </Ctx.Provider>
  );
}
