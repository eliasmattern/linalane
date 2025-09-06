import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Get in Touch</h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h2>Email</h2>
          <p>
            <a href="mailto:hello@example.com" className={styles.link}>
              hello@example.com
            </a>
          </p>
        </div>

        <div className={styles.card}>
          <h2>Phone</h2>
          <p>
            <a href="tel:+1234567890" className={styles.link}>
              +1 234 567 890
            </a>
          </p>
        </div>

        <div className={styles.card}>
          <h2>Address</h2>
          <p>123 Modern St.<br />City, Country</p>
        </div>
      </div>
    </main>
  );
}
