"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";
import { useEffect } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButtons";

type MediaItem = {
  type: "image" | "video";
  src: string;
};
const slides: MediaItem[] = [
  { type: "video", src: "/videos/pullUps.mp4" },
  { type: "video", src: "/videos/pullUps.mp4" },
];

export default function AboutMeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // 3 seconds per slide
      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__img">
                <video src={item.src} autoPlay muted loop playsInline />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
