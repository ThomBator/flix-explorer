
import {  Anchor, Group, Image } from "@mantine/core";

import classes from "./Footer.module.css";

const links = [
  { link: "#", label: "Home" },
  { link: "#", label: "Popular" },
  { link: "#", label: "Trending" },
  { link: "#", label: "Watchlist" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="#FFF"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image   alt="Flix Explorer logo"  p={0} w={{ base: 100, sm:150,  }} src="src/assets/FlixExplorerLogo.png"/>
        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap"></Group>
      </div>
    </div>
  );
}
