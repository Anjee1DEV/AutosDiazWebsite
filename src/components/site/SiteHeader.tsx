"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
  { href: "/nosotros", label: "Nosotros" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
          <Image
            src="/autosdiaz_black_red.svg"
            alt="AutosDiaz"
            width={150}
            height={30}
            priority
          />
        </Link>

        <nav className={clsx("nav-links", open && "open")}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(isActive(l.href) && "active")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
