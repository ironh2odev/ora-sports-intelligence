"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/sessions/new", label: "New Session" },
  { href: "/trends", label: "Trends" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-aura-bg text-slate-100">
      {/* Top bar */}
      <header className="border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl aura-gradient" />
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-400">
                ORA
              </p>
              <p className="text-sm font-semibold text-slate-100">
                Sports Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">Demo club: Aura Academy</span>
            <div className="h-8 w-8 rounded-full bg-slate-800" />
          </div>
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <nav className="hidden w-52 flex-col gap-1 text-sm sm:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2 transition
                  ${
                    active
                      ? "bg-slate-800 text-slate-50"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                  }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Main content */}
        <main className="flex-1 pb-10">{children}</main>
      </div>
    </div>
  );
}