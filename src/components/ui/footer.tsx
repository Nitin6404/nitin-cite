import { socials } from "../../data";

function Footer() {
  return (
    <footer className="mt-10 p-3 pt-4 transition-colors duration-200">
      <div className="flex justify-center gap-8">
        {socials?.map((x) => (
          <a
            className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
            href={x?.link}
            key={x.title}
            rel="noopener noreferrer"
            target="_blank"
          >
            {x.title}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
