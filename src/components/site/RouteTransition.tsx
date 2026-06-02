"use client";

import { usePathname } from "next/navigation";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="route-transition">
      {children}
    </main>
  );
}