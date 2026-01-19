import Link, { LinkProps } from "next/link";

export type PortfolioLinkProps = LinkProps & {
  children: React.ReactNode;
};

export default function PortfolioLink(props: PortfolioLinkProps) {
  return (
    <Link className="text-lime-800 underline" {...props}>
      {props.children}
    </Link>
  );
}
