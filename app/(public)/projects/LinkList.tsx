import PortfolioLink from "@/components/PortfolioLink";
import { Link, SentanceWithLinks } from "./types";

type LinkListProp = {
  sentance_with_links: SentanceWithLinks[];
};

function isLink(link: string | Link): link is Link {
  return (link as Link).name !== undefined && (link as Link).url !== undefined;
}

export default function LinkList({ sentance_with_links }: LinkListProp) {
  return (
    <ul className="list-inside list-disc">
      {sentance_with_links.map((link, i) => {
        const link_name = (current_value: string | Link) =>
          isLink(current_value) ? current_value.name : current_value;
        const text_name = link.reduce<string>((accumulator, link_part) => {
          return accumulator + link_name(link_part);
        }, "");
        return (
          <li key={text_name} className="mt-2">
            {link.map((link_part) => {
              if (isLink(link_part)) {
                return (
                  <PortfolioLink href={link_part.url} key={link_part.url}>
                    {link_part.name}
                  </PortfolioLink>
                );
              }

              return <span key={link_part}>{link_part}</span>;
            })}
          </li>
        );
      })}
    </ul>
  );
}
