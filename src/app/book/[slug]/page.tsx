import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const runtime = "nodejs";
export const dynamic = "force-static";

interface BookDetails {
  longDescription: string;
  buyLink?: string;
}

interface Book {
  title: string;
  imageUrl: string;
  description: string;
  details: BookDetails;
}

interface Params {
  params: {
    slug: string;
  };
}


const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

function loadBooks(): Book[] {
  const filePath = path.join(process.cwd(), "public", "books/books.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : [data];
}

export async function generateStaticParams() {
  const books = loadBooks();
  return books.map((b) => ({ slug: slugify(b.title) }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params; 
  const books = loadBooks();
  const book = books.find((b) => slugify(b.title) === slug);

  if (!book) return { title: "Book not found" };

  return {
    title: `${book.title} | Lina Lane`,
    description: book.description ?? "Book details",
    openGraph: {
      title: book.title,
      description: book.description ?? "",
      images: book.imageUrl ? [{ url: book.imageUrl }] : [],
    },
    alternates: { canonical: `/book/${slug}` },
  };
}

export default async function BookPage({ params }: Params) {
  const { slug } = await params; 
  const books = loadBooks();
  const book = books.find((b) => slugify(b.title) === slug);

  if (!book) notFound();

  const buyLink =
    book.details?.buyLink && String(book.details.buyLink).trim().length > 0
      ? book.details.buyLink
      : null;

  return (
    <main className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.media}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={styles.image}
            loading="eager"
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{book.title}</h1>
          {book.description && <p className={styles.short}>{book.description}</p>}

          {book.details?.longDescription && (
            <div className={styles.long}>{book.details.longDescription}</div>
          )}

          <div className={styles.actions}>
            {buyLink ? (
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.primary}`}
              >
                Buy Now
              </a>
            ) : (
              <a href="/contact" className={`${styles.btn} ${styles.secondary}`}>
                Contact Me
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
