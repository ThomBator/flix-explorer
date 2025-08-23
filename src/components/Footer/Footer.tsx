import { Group, Image, Container } from "@mantine/core";
import LogoLight from "../../assets/FlixExplorerLogo.png";
import LogoDark from "../../assets/FlixExplorerLogo_inverted_keepRed.png";
import { Link } from "react-router";
import { links } from "../../utilities/links";
import { useComputedColorScheme } from "@mantine/core";

import classes from "./Footer.module.css";

export default function Footer() {
  const computedColorScheme = useComputedColorScheme();

  const items = links.map((link) => (
    <Link key={link.link} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.inner}>
          <Image
            alt="Flix Explorer logo"
            p={0}
            w={{ base: 100, sm: 150 }}
            src={computedColorScheme === "light" ? LogoLight : LogoDark}
            fit="contain"
          />
          <Group className={classes.links}>{items}</Group>
        </div>
      </Container>
    </footer>
  );
}
