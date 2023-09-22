import type { Metadata } from "next";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "About Page",
  description: "Pages about the website",
  appLinks: {
    web: { url: "/favicon.ico", should_fallback: true },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>About Nabar</nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
