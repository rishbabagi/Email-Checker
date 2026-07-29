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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-mist-dim transition-colors hover:text-mist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
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
        className={`card absolute right-0 mt-2 w-48 origin-top-right overflow-hidden py-1.5 transition-[opacity,transform] duration-200 ease-out ${
          menuOpen
            ? "opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-sm text-mist-dim transition-colors hover:bg-bg-base hover:text-mist"
          >
            {link.label}
          </Link>
        ))}
        {isAuthed && (
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-mist-dim transition-colors hover:bg-bg-base hover:text-mist"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
