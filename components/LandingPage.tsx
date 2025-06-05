import Link from "next/link";
import { Logo } from "../icons/Logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-light/10 text-blue text-18 px-6">
      <header className="flex items-center gap-3 mb-10">
        <Logo className="size-16" />{" "}
        <h1 className="text-3xl font-bold">UMI Familienplaner</h1>
      </header>

      <section className="text-center max-w-xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Organisiere deine Familie einfach & effizient
        </h2>
        <p className="text-gray-300">
          Mit UMI bringst du Ordnung in den Alltag deiner Familie – gemeinsame
          Termine, Aufgaben & Erinnerungen auf einen Blick. Sicher, intuitiv und
          für jedes Familienmitglied.
        </p>
      </section>

      <section className="flex flex-col sm:flex-row gap-6">
        <Link href={"/start"}>
          <button className="bg-[#2F56FF] hover:bg-[#1d3adf] text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
            Anmelden
          </button>
        </Link>
        <Link href={"/start?animation=register"}>
          <button className="border border-blue-light hover:border-[#2F56FF] hover:text-[#2F56FF] px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
            Registrieren
          </button>
        </Link>
      </section>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} UMI – Dein Familienplaner
      </footer>
    </div>
  );
}
