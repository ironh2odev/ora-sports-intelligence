"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutShellProps {
  children: React.ReactNode;
  activeRoute?: string;
  activeNav?: string;
}

const NAV_ITEMS: { key: string; href: string; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", href: "/", label: "Dashboard", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { key: "new-session", href: "/new-session", label: "New Session", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { key: "trends", href: "/trends", label: "Trends", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 13l4-4 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { key: "reports", href: "/reports", label: "Reports", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M7 3h10v4H7zM5 7h14v14H5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { key: "settings", href: "/settings", label: "Settings", icon: (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.27 16.9l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.27 5.1A2 2 0 017.1 2.27l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001 1.51V6a2 2 0 014 0v.09c0 .58.39 1.08 1 1.51h.02c.64.43 1.46.33 1.82-.33l.06-.06A2 2 0 0119.73 7.1l-.06.06a1.65 1.65 0 00.33 1.82 1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09c-.6 0-1.1.39-1.51 1z" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
];

export default function LayoutShell({ children, activeRoute, activeNav }: LayoutShellProps) {
  const pathname = usePathname();
  // derive active key from props OR pathname (props override)
  const defaultActive = (() => {
    if (activeRoute) return activeRoute;
    if (activeNav) return activeNav;
    if (!pathname) return "dashboard";
    // match first nav item whose href is a prefix of the pathname
    const matched = NAV_ITEMS.find((it) => it.href !== "/" ? pathname.startsWith(it.href) : pathname === "/");
    return matched ? matched.key : "dashboard";
  })();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ora:sidebar-collapsed");
      if (saved !== null) setCollapsed(saved === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ora:sidebar-collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#050816] via-[#071028] to-black text-slate-100">
      {/* Desktop sidebar */}
      <aside
        aria-label="Main navigation"
        className={`hidden lg:flex flex-col transition-all duration-200 ease-in-out ${collapsed ? "w-20" : "w-64"} border-r border-slate-800/60 bg-gradient-to-b from-slate-950/80 to-slate-900/60 p-4`}
      >
        <div className="flex items-center gap-3 px-1">
          <div className={`relative h-10 w-10 rounded-md overflow-hidden ${collapsed ? "scale-90" : "scale-100"}`} aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-sky-400 blur-sm opacity-90" />
            <div className="absolute inset-0 rounded-md ring-1 ring-white/5" />
          </div>

          {!collapsed && (
            <div>
              <div className="font-semibold">ORA</div>
              <div className="text-xs text-slate-400">Sports Intelligence</div>
            </div>
          )}
        </div>

        <nav className="mt-6 flex-1 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = defaultActive === item.key;
            // keep link relative so absolute indicator positions work
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-md px-2 py-2 transition-colors ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900/40"} ${collapsed ? "justify-center" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex items-center justify-center text-sky-300">{item.icon}</span>
                {!collapsed && <span className="text-sm">{item.label}</span>}

                {/* green active indicator for expanded */}
                {!collapsed && isActive && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" aria-hidden />}

                {/* small indicator for collapsed */}
                {collapsed && isActive && <span className="absolute left-2 top-3 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-between gap-2 px-2">
          {!collapsed && <div className="text-xs text-slate-500">Demo club: Aura Academy</div>}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed((s) => !s)}
              aria-pressed={collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="rounded-full bg-slate-800/50 p-1 text-slate-300 hover:bg-slate-800/70"
              title={collapsed ? "Expand" : "Collapse"}
            >
              <svg className={`h-4 w-4 transform transition-transform ${collapsed ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden z-30 w-full border-b border-slate-800/60 bg-gradient-to-b from-slate-900/40 to-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="rounded-md bg-slate-800/40 p-2 text-slate-200 hover:bg-slate-800/60">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-500 to-sky-400" />
              <div className="text-sm font-semibold">ORA</div>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-300">
            <Link href="/" className="px-3 py-1 rounded-full bg-slate-800/30">Dashboard</Link>
            <Link href="/new-session" className="px-3 py-1 rounded-full bg-violet-600/60 text-white">New Session</Link>
            <Link href="/settings" className="px-3 py-1 rounded-full border border-slate-700 text-slate-300">Settings</Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/50" />
          <aside className="relative w-64 border-r border-slate-800/60 bg-slate-950/95 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-violet-500 to-sky-400" />
                <div>
                  <div className="font-semibold">ORA</div>
                  <div className="text-xs text-slate-400">Sports Intelligence</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="rounded-md p-1 text-slate-300 hover:bg-slate-800/40">✕</button>
            </div>

            <nav className="mt-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link key={item.key} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900/40">
                  <span className="text-sky-300">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 text-xs text-slate-500">Demo club: Aura Academy</div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        <div className="px-6 py-8">
          <div className="mx-auto max-w-6xl relative">
            <div className="pointer-events-none absolute -right-16 -top-10 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-violet-600/25 to-sky-400/10 blur-3xl opacity-60" />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}