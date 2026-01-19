/**
 * TODO: How do I keep the scroll position if the user navigates off?
 */
import { ProjectListView, FeatureProjectView } from "./types";
import LinkList from "./LinkList";
import MobileImageCarousel from "./MobileImageCarousel";
import TechTag from "./TechTag";
import DesktopFeatureProjectView from "./DesktopFeatureProjectView";

type ProjectListProps = {
  desktop_width_and_margin: string;
  desktop_lg_width_rem: number;
  desktop_xl_width_rem: number;
  projects: ProjectListView;
};

export default function ProjectsList({
  desktop_width_and_margin,
  desktop_lg_width_rem,
  desktop_xl_width_rem,
  projects,
}: ProjectListProps) {
  return (
    <>
      <section
        className={
          "flex flex-col gap-28 pb-18 lg:gap-56 lg:pb-44 " +
          desktop_width_and_margin
        }
      >
        {projects.featured_projects.map((project_info) => {
          return (
            <ul key={project_info.title}>
              <li>
                <DesktopFeatureProjectView
                  desktop_lg_width_rem={desktop_lg_width_rem}
                  desktop_xl_width_rem={desktop_xl_width_rem}
                  project_info={project_info}
                />
                <MobileFeatureProjectView project_info={project_info} />
              </li>
            </ul>
          );
        })}
      </section>
    </>
  );
}

type MobileFeatureProjectViewProps = {
  project_info: FeatureProjectView;
};
function MobileFeatureProjectView({
  project_info,
}: MobileFeatureProjectViewProps) {
  return (
    <article className="lg:hidden">
      <header className="mx-7 mb-3.5">
        <h2 className="inline text-3xl text-black">{project_info.title}</h2>
        <p className="ml-2 inline text-base">
          - {" " + project_info.description}
        </p>
      </header>
      <div className="mx-7 mb-5 flex justify-between gap-1 text-base">
        <LinkList sentance_with_links={project_info.links} />
        <section className="text-base">
          <h3 className="sr-only">Tech Tags</h3>
          {project_info.tags.map((tag) => {
            return <TechTag key={"Mobile" + tag} name={tag} />;
          })}
        </section>
      </div>
      <MobileImageCarousel
        carousel_accessibility_name={`Images of ${project_info.title} project`}
        thumbnail_image={project_info.thumbnail_image}
        additional_images={project_info.additional_images}
      />
    </article>
  );
}
