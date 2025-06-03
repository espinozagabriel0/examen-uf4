"use client";
import Link from "next/link";

export default function Header() {

  return (
    <header className="flex h-16 w-full items-center justify-between bg-background">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-medium">Movie Explorer</span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">
        <Link
          href="/"
          className={
            "text-sm font-medium transition-colors hover:text-primary text-slate-800"
          }
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            "text-sm font-medium transition-colors hover:text-primary text-slate-800"
          }
          prefetch={false}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
