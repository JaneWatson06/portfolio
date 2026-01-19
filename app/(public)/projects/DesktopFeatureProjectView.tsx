"use client";
import { useCallback, useLayoutEffect, useState } from "react";
import DesktopImageCarousel from "./DesktopImageCarousel";
import LinkList from "./LinkList";
import TechTag from "./TechTag";
import { FeatureProjectView } from "./types";

type DesktopFeatureProjectViewProps = {
  desktop_lg_width_rem: number;
  desktop_xl_width_rem: number;
  project_info: FeatureProjectView;
};
export default function DesktopFeatureProjectView({
  desktop_lg_width_rem,
  desktop_xl_width_rem,
  project_info,
}: DesktopFeatureProjectViewProps) {
  const calcCarouselWidth = useCallback(() => {
    return window.innerWidth > 1280
      ? desktop_xl_width_rem
      : desktop_lg_width_rem;
  }, [desktop_lg_width_rem, desktop_xl_width_rem]);
  const [current_width_rem, setCurrentWidthRem] = useState(calcCarouselWidth());
  const gap_in_rem = 2.5; // gap-5 is 1.25 rem with our spacing context.

  useLayoutEffect(() => {
    function updateCarouselWidth() {
      setCurrentWidthRem(calcCarouselWidth());
    }

    window.addEventListener("resize", updateCarouselWidth);

    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, [calcCarouselWidth]);

  return (
    <article className="hidden gap-10 lg:flex">
      <div className="flex flex-1 flex-col gap-3.5">
        <header className="flex justify-between">
          <h2 className="text-4xl text-lime-900">{project_info.title}</h2>
          <section className="flex max-w-58 flex-wrap justify-end gap-x-3.5 gap-y-1">
            <h3 className="sr-only">Tech Tags</h3>
            {project_info.tags.map((tag) => {
              return <TechTag key={"Mobile" + tag} name={tag} />;
            })}
          </section>
        </header>
        <p>{project_info.description}</p>
        <div>
          <LinkList sentance_with_links={project_info.links} />
        </div>
      </div>
      <DesktopImageCarousel
        width_in_rem={current_width_rem * 0.6 - gap_in_rem / 2}
        carousel_accessibility_name={`Images of ${project_info.title} project`}
        thumbnail_image={project_info.thumbnail_image}
        additional_images={project_info.additional_images}
      />
    </article>
  );
}
