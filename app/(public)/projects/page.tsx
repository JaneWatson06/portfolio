import ProjectList from "./ProjectsList";
import projects from "./projects.json";
import PortfolioLink from "@/components/PortfolioLink";
import Footer from "../Footer";
import LinkList from "./LinkList";

/**
 * TODO: Center the project text and the image then make the image viewer absolute off to the side.
 */

export default function Projects() {
  const desktop_width_and_margin = "lg:mx-auto lg:w-6xl xl:w-7xl";
  return (
    <>
      <header
        className={
          "mt-6 mb-28 ml-6 flex flex-col gap-3.5 text-sm text-lime-900 lg:mt-16 lg:gap-8 lg:text-xl " +
          desktop_width_and_margin
        }
      >
        <h1 className="text-3xl lg:text-6xl">Featured Projects</h1>
        <p>
          Jump to: <PortfolioLink href="/projects/all">All</PortfolioLink>,{" "}
          <PortfolioLink href="/projects/all?category=websites">
            Websites
          </PortfolioLink>
          ,{" "}
          <PortfolioLink href="/projects/all?category=games">
            Games
          </PortfolioLink>
          , or{" "}
          <PortfolioLink href="/projects/all?category=apps">Apps</PortfolioLink>
        </p>
      </header>

      <main className="lg:text-xl">
        <ProjectList
          desktop_width_and_margin={desktop_width_and_margin}
          desktop_lg_width_rem={72} // lg:w-5xl
          desktop_xl_width_rem={80} // lg:w-7xl
          projects={projects}
        />
        <section className="bg-slate-50 px-6 pt-18 pb-18">
          <div
            className={
              "flex flex-col gap-10 lg:flex lg:flex-row lg:gap-10 " +
              desktop_width_and_margin
            }
          >
            <header className={"flex flex-col gap-3.5 lg:w-full"}>
              <h2 className="text-3xl lg:text-4xl"> More Projects...</h2>
              <p>
                Random assortmant of projects I've worked on throughout the
                years.
              </p>
            </header>

            <div className="flex flex-col gap-10 lg:flex lg:w-full lg:flex-col lg:gap-12">
              {projects.more_projects.map((section) => {
                return (
                  <section key={section.section}>
                    <h3 className="mb-5 text-3xl lg:text-4xl">
                      {section.section}
                    </h3>
                    <LinkList sentance_with_links={section.links} />
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
