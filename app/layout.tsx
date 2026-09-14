import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    default: "Tradent",
    template: "%s | Tradent",
  },
  description:
    "Tradent unterstützt bei der Analyse von Trades, Wahrscheinlichkeiten und Marktsignalen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="de">
        <body>
          <div className="site-shell">
            <header className="site-header">
              <a href="/" className="brand">
                Tradent
              </a>
            </header>

            <main className="site-main">
              {children}
            </main>

            <footer className="site-footer">
              <nav
                className="footer-nav"
                aria-label="Rechtliche Informationen"
              >
                <a href="/privacy">
                  Datenschutzerklärung
                </a>

                <a href="/terms">
                  Nutzungsbedingungen
                </a>

                <a href="/imprint">
                  Impressum
                </a>

                <a href="/pricing">
                  Tarife
                </a>

                <a href="/delete-account">
                  Account löschen
                </a>
              </nav>

              <p className="footer-copy">
                © {new Date().getFullYear()} Tradent
              </p>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
