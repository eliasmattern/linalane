"use client"
import styles from "./books.module.css";
import useEmblaCarousel from 'embla-carousel-react'
import EmblaCarousel from '../carousel/EmblaCarousel'
import '../emblaCss/embla.css'

export default function Books() {
  const [emblaRef] = useEmblaCarousel()
  const OPTIONS = { slidesToScroll: 'auto', loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const books = [
    {
      title: 'When the Loop Breaks',
      imageUrl: '/books/whentheloopbreaks.png',
      buyLink: 'https://example.com/book1',
      description: '“The truth is — everything is just story.”'
    },
    {
      title: 'Something Knew',
      imageUrl: '/books/SomethingKnew.png',
      buyLink: 'https://example.com/book2',
      description: 'The System is Glitching'
    }
  ]
  return (
    <div className={styles.books}>
      <div className={styles.title} id="books">
          <h1 className={styles.titleText}><strong>BOOKS</strong></h1>
      </div>
      <EmblaCarousel className={styles.carousel} slides={SLIDES} books={books} options={OPTIONS} />
    </div>
  );
}