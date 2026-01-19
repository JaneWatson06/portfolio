// All the project components can be on the server. Is the featured a seperate page? Yes it can be
// nested underneath the projects so we can do direct links.
import { render, screen } from "@testing-library/react";

import ProjectList from "@/app/(public)/projects/ProjectsList";
import { ProjectListView } from "@/app/(public)/projects/types";

import "html-validate/jest";
import "@testing-library/jest-dom";

const test_project_list_data: ProjectListView = {
  featured_projects: [
    {
      title: "Testing Project One",
      description: "Project that we are using for testing the list page.",
      tags: ["Next.JS", "TypeScript"],
      links: [
        [
          "Click ",
          { name: "here", url: "https://testing.com" },
          " to see the project!",
        ],
        [
          "See the source code on ",
          { name: "GitHub", url: "https://github.com" },
        ],
      ],
      thumbnail_image: {
        url: "/assets/image.png",
        description: "Image of the project.",
        width: 100,
        height: 100,
      },
      additional_images: [
        {
          url: "/assets/image_one.png",
          description: "Second image of the first project.",
          width: 100,
          height: 100,
        },
        {
          url: "/assets/image_two.png",
          description: "Third image of the first project.",
          width: 100,
          height: 100,
        },
      ],
    },
    {
      title: "Testing Project Two",
      description: "Second project for testing the list page.",
      tags: ["Java", "C++"],
      links: [
        [
          "Download the project ",
          { name: "here!", url: "https://download.com" },
        ],
      ],
      thumbnail_image: {
        url: "/assets/image_project_two.png",
        description: "Image of the second project.",
        width: 100,
        height: 100,
      },
      additional_images: [],
    },
  ],
  more_projects: [
    {
      section: "Website",
      links: [
        [
          "Automated tea brewing machine: ",
          { name: "Click here", url: "https://tea.com" },
        ],
        ["Calculated for  ", { name: "science!", url: "https://science.com" }],
      ],
    },
    {
      section: "Games",
      links: [
        [
          "Shooting aliens and mining ores. ",
          { name: "Play here!", url: "https://alien_and_ore.com" },
        ],
        [
          "Where are all of the mushrooms... ",
          { name: "play it here", url: "https://mushrooms.com" },
          " or you are a square.",
        ],
      ],
    },
  ],
};

test("projects list renders featured project title", () => {
  render(<ProjectList projects={test_project_list_data} />);

  expect(
    screen.getByRole("heading", {
      name: test_project_list_data.featured_projects[1].title,
      level: 2,
    }),
  ).toBeInTheDocument();
});

test("projects list renders description", () => {
  render(<ProjectList projects={test_project_list_data} />);

  expect(
    screen.getByText(/Project that we are using for testing/i),
  ).toBeInTheDocument();
});

test("projects list renders the language tags", () => {
  render(<ProjectList projects={test_project_list_data} />);

  expect(
    screen.getByText(test_project_list_data.featured_projects[1].tags[0]),
  ).toBeInTheDocument();
});

test("projects list renders links", () => {
  render(<ProjectList projects={test_project_list_data} />);

  expect(
    screen.getByRole("link", {
      name: /GitHub/i,
    }),
  ).toBeInTheDocument();
});

test("projects list renders link parts", () => {
  render(<ProjectList projects={test_project_list_data} />);

  const list_element = screen.getByText(/to see the project!/i);
  expect(list_element.parentElement?.textContent).toEqual(
    "Click here to see the project!",
  );
});

test("projects list page renders more projects links", () => {
  render(<ProjectList projects={test_project_list_data} />);

  expect(
    screen.getByRole("heading", {
      name: test_project_list_data.more_projects[0].section,
      level: 3,
    }),
  ).toBeInTheDocument();
});

test("projects list page renders more projects link parts", () => {
  render(<ProjectList projects={test_project_list_data} />);

  const list_element = screen.getByText(/Shooting aliens and mining ores\./i);
  expect(list_element.parentElement?.textContent).toEqual(
    "Shooting aliens and mining ores. Play here!",
  );
});
