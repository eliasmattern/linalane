import styles from "./page.module.css";
import Header from "../components/header/header";
import Books from "../components/books/books";

interface FeaturedBook { name: string, imageUrl: string}

export default function Home() {
  const featuredBook: FeaturedBook = {
    name: "Something Knew",
    imageUrl: "/book-covers/SomethingKnew.png"
  }
  return (
    <div>
      <Header featuredBook={featuredBook}></Header>
      <Books/>
    </div>
  );
}
