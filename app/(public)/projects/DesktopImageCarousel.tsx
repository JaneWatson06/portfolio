"use client";

/**
 * TODO: How can we support an image gallory of different image dimensions?
 * TODO: Add testing for this file.
 */

import { useState } from "react";

import Image from "next/image";
import { ProjectImage } from "./types";

type ImageCarouselProps = {
  width_in_rem: number;
  carousel_accessibility_name: string;
  thumbnail_image: ProjectImage;
  additional_images: ProjectImage[];
};

export default function DesktopImageCarousel({
  width_in_rem,
  carousel_accessibility_name,
  thumbnail_image,
  additional_images,
}: ImageCarouselProps) {
  const num_of_images = 1 + additional_images.length;
  const [image_index, setImageIndex] = useState(0);

  // Get the size of one rem by flashing an invisible element.
  const measure_element = document.createElement("div");
  measure_element.style = "width: 1rem;";
  document.body.append(measure_element);
  const rem_in_pixels = measure_element.clientWidth;
  document.body.removeChild(measure_element);

  // Measure a few different widths to base our component sizes off of.
  const width_in_pixels = width_in_rem * rem_in_pixels;

  // Get the size of the actual image viewer. This assumes all images are the exact same pixel
  // dimensions. 17/20 Is the amount of size we want the image viewer to take up relative to the
  // image selector.
  const width_of_image_viewer = width_in_pixels;
  const height_of_image_viewer = Math.floor(
    thumbnail_image.height * (width_of_image_viewer / thumbnail_image.width),
  );

  // Get the width of the image selector.
  const width_of_image_selector = width_in_pixels * (3 / 20);
  const height_of_image_selector_images = Math.floor(
    thumbnail_image.height * (width_of_image_selector / thumbnail_image.width),
  );

  if (additional_images.length == 0) {
    return (
      <div className="flex-1">
        <Image
          src={thumbnail_image.url}
          alt={thumbnail_image.description}
          width={width_of_image_viewer}
          height={height_of_image_viewer}
        />
      </div>
    );
  }

  return (
    // This div needs to be whatever the scaled size of the thumbnail image would be. So that
    // would be the width set to 100% with the height auto scaling.
    <section
      className={`relative flex flex-1 gap-3`}
      style={{
        height: `${height_of_image_viewer}px`,
        width: `${width_of_image_viewer}px`,
      }}
    >
      <h3 className="sr-only">{carousel_accessibility_name}</h3>
      {/* Visually hidden polite region to announce screen changes. */}
      <div aria-live="polite" aria-atomic={true} className="sr-only">
        Showing slide {image_index + 1} of {num_of_images}
      </div>
      <ul>
        {[thumbnail_image, ...additional_images].map(
          (additional_image, index) => {
            return (
              <li
                key={additional_image.url}
                className={index != image_index ? "hidden" : ""}
              >
                <Image
                  src={additional_image.url}
                  alt={additional_image.description}
                  width={width_of_image_viewer}
                  height={height_of_image_viewer}
                />
              </li>
            );
          },
        )}
      </ul>
      <section
        className="absolute"
        style={{
          width: `${width_of_image_selector}px`,
          right: `${-0.75 * rem_in_pixels - width_of_image_selector}px`,
        }}
      >
        <h4 className="sr-only">More Images</h4>
        <ul className="flex flex-col gap-2">
          {[thumbnail_image, ...additional_images].map(
            (additional_image, index) => {
              return (
                <li
                  key={additional_image.url}
                  className={
                    "rounded-md border-2" +
                    (index != image_index
                      ? " text-slate-400"
                      : " border-lime-600")
                  }
                  onMouseEnter={() => setImageIndex(index)}
                >
                  <Image
                    src={additional_image.url}
                    alt={additional_image.description}
                    width={width_of_image_selector}
                    height={height_of_image_selector_images}
                  />
                </li>
              );
            },
          )}
        </ul>
      </section>
    </section>
  );
}
