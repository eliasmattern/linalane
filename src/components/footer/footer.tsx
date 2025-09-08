import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {

  return (
    <div className={styles.footer}>
      <p className={styles.footerItem}>© Lina Lane 2025</p>
      <Link className={styles.footerItem} href={`/contact`}>Contact</Link>
    </div>
  );
}
