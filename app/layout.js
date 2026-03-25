import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://uusc-club.example"),
  title: {
    default: "UUSC | Ultimate United Sports Club",
    template: "%s | UUSC",
  },
  description:
    "Official landing page for Ultimate United Sports Club (UUSC): badminton coaching, weekly schedules, tournaments, membership plans, and club updates.",
  keywords: [
    "UUSC",
    "sports club",
    "badminton club",
    "badminton coaching",
    "weekly schedule",
    "tournament results",
    "membership packages",
  ],
  openGraph: {
    title: "UUSC | Ultimate United Sports Club",
    description:
      "Train, compete, and grow with UUSC through coaching, tournaments, and community programs.",
    url: "/",
    siteName: "UUSC",
    type: "website",
    images: [
      {
        url: "/assets/badminton-scene-1.svg",
        width: 1200,
        height: 630,
        alt: "UUSC badminton action banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UUSC | Ultimate United Sports Club",
    description:
      "Badminton coaching, tournaments, weekly schedule, and membership at UUSC.",
    images: ["/assets/badminton-scene-1.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-dark text-brand-light antialiased">
        {children}
      </body>
    </html>
  );
}
