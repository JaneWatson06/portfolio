import Link from "next/link";
import FooterNav from "./FooterNav";
import GitHubIcon from "./GitHubIcon";
import LinkedInIcon from "./LinkedInIcon";

export default function Footer() {
  return (
    <footer className="flex h-32 flex-row items-center justify-center gap-20 bg-lime-950 lg:h-44 lg:text-xl">
      <FooterNav />
      <div className="flex flex-col gap-1">
        <nav>
          <ul className="flex items-center justify-center gap-2">
            <li>
              <Link href="https://www.linkedin.com/in/jack-watson-46ab71196/">
                <p className="sr-only">LinkedIn Account Link</p>
                <LinkedInIcon className="grow-1 text-white" />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/jack-watson-46ab71196/">
                <p className="sr-only">GitHub Account Link</p>
                <GitHubIcon className="grow-1 text-white" />
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-white">Jane Watson</p>
      </div>
    </footer>
  );
}
