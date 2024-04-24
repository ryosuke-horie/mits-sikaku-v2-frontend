import styles from "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";

export const metadata = {
  title: "資格取得応援サイト",
  description: "資格応援サイトです。",
};

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="ja" className="font-serif">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={styles.root}>
        <Header />
        <main className="flex-grow lg:mx-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
