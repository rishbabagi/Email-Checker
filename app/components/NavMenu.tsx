"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/chatbot", label: "Check an email" },
  { href: "/about", label: "About" },
];

export default function NavMenu() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsAuthed(!!data.user);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthed(!!session);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/login");
    router.refresh();
  };

  const links = isAuthed
    ? baseLinks
    : [...baseLinks, { href: "/login", label: "Login" }];

  return (
    <div ref={menuRef} className="fixed right-6 top-6 z-50">
      <button
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center border border-circuit bg-bg-panel/70 text-mist-dim backdrop-blur-sm transition-colors hover:border-signal hover:text-signal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>

      <div
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`scan-panel absolute right-0 mt-2 w-44 origin-top overflow-hidden transition-[clip-path,opacity] duration-300 ease-out ${
          menuOpen
            ? "opacity-100 [clip-path:inset(0_0_0_0)]"
            : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="block border-t border-circuit px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-mist-dim transition-colors first:border-t-0 hover:bg-signal/5 hover:text-signal"
          >
            {link.label}
          </Link>
        ))}
        {isAuthed && (
          <button
            onClick={handleLogout}
            className="block w-full border-t border-circuit px-4 py-2.5 text-left font-mono text-xs uppercase tracking-wider text-mist-dim transition-colors hover:bg-signal/5 hover:text-signal"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
