export type Link = {
  name: string;
  url: string;
};

export type SentanceWithLinks = (string | Link)[];

export type ProjectImage = {
  url: string;
  description: string;
  width: number;
  height: number;
};

export type FeatureProjectView = {
  title: string;
  description: string;
  tags: string[]; // May the tags to colors on the frontend - tags will need to be sanitized to be a specific tag.
  links: SentanceWithLinks[];
  thumbnail_image: ProjectImage;
  additional_images: ProjectImage[];
};

export type ProjectListView = {
  featured_projects: FeatureProjectView[];
  more_projects: {
    section: string;
    links: SentanceWithLinks[];
  }[];
};
