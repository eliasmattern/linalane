import styles from "./page.module.css";
import Header from "../components/header/header";
import Books from "../components/books/books";

export default function Home() {
  return (
    <div>
      <Header/>
      <Books/>
    </div>
  );
}
