import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

type Book = {
  title: string
  imageUrl: string
  buyLink: string
  description?: string
}

type PropType = {
  books: Book[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = ({ books, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {books.map((book, index) => (
            <div className="embla__slide" key={index}>
              <div className="book-card">
                <div className="book-image-container" style={{backgroundImage: `url(${book.imageUrl})`}}>
                </div>
                <div className="book-content">
                  <h2 className="book-title">{book.title}</h2>
                  {book.description && (
                    <p className="book-description">{book.description}</p>
                  )}
                  <a
                    href={book.buyLink}
                    className="book-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BUY NOW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}


export default EmblaCarousel
