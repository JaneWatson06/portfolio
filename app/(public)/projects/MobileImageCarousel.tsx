"use client";

import { useLayoutEffect, useRef, useState } from "react";

import Image from "next/image";
import CircleIcon from "./CircleIcon";
import { ProjectImage } from "./types";
import { useDrag } from "./hooks";

type MobileImageCarouselProps = {
  carousel_accessibility_name: string;
  thumbnail_image: ProjectImage;
  additional_images: ProjectImage[];
};

export default function MobileImageCarousel({
  carousel_accessibility_name,
  thumbnail_image,
  additional_images,
}: MobileImageCarouselProps) {
  const num_of_slides = 1 + additional_images.length;
  const [window_width, setWindowWidth] = useState(window.innerWidth);
  const carousel_ref = useRef<HTMLUListElement>(null);
  const slide = useDrag(carousel_ref, window_width, 500);

  const carousel_height = Math.floor(
    thumbnail_image.height * (window_width / thumbnail_image.width),
  );

  // Update the internal window width to resize the images upon a resize event.
  useLayoutEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  if (additional_images.length == 0) {
    return (
      <div
        className={`relative w-screen flex-none`}
        style={{
          height: `${carousel_height}px`,
        }}
      >
        <Image
          src={thumbnail_image.url}
          alt={thumbnail_image.description}
          fill
        />
      </div>
    );
  }

  return (
    // This div needs to be whatever the scaled size of the thumbnail image would be. So that
    // would be the width set to 100% with the height auto scaling.
    <section
      className={`relative w-full overflow-hidden`}
      style={{
        height: `${carousel_height}px`,
      }}
    >
      <h3 className="sr-only">{carousel_accessibility_name}</h3>
      {/* Visually hidden polite region to announce screen changes. */}
      <div aria-live="polite" aria-atomic={true} className="sr-only">
        Showing slide {slide + 1} of {num_of_slides}
      </div>

      <ul
        ref={carousel_ref}
        key={thumbnail_image.url}
        className="relative left-0 flex flex-row"
      >
        {[thumbnail_image, ...additional_images].map((image) => {
          return (
            <Slide
              key={image.url}
              src={image.url}
              alt={image.description}
              carousel_height={carousel_height}
            ></Slide>
          );
        })}
      </ul>
      <div
        className="absolute right-0 bottom-3 left-0 mx-auto flex w-fit gap-1.5"
        role="meter"
        aria-valuenow={slide + 1}
        aria-valuemin={slide + 1}
        aria-valuemax={num_of_slides}
      >
        {[thumbnail_image, ...additional_images].map(
          (additional_image, index) => {
            return (
              <CircleIcon
                key={additional_image.url}
                width={11}
                height={11}
                className={index == slide ? "text-lime-600" : "text-slate-100"}
              />
            );
          },
        )}
      </div>
    </section>
  );
}

type SlideProps = {
  src: string;
  alt: string;
  carousel_height: number;
};

function Slide({ src, alt, carousel_height }: SlideProps) {
  return (
    <li
      className={`relative w-screen flex-none`}
      style={{
        height: `${carousel_height}px`,
      }}
    >
      <Image src={src} alt={alt} fill />
    </li>
  );
}
