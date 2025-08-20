import { Group, Image } from "@mantine/core";
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
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image
          alt="Flix Explorer logo"
          p={0}
          w={{ base: 100, sm: 150 }}
          src={computedColorScheme === "light" ? LogoLight : LogoDark}
        />
        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap"></Group>
      </div>
    </div>
  );
}
