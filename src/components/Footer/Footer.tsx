
import {  Group, Image } from "@mantine/core";
import Logo from "../../assets/FlixExplorerLogo.png"
import { Link } from "react-router";
import {links} from "../../utilities/links";

import classes from "./Footer.module.css";

export default function Footer() {
  const items = links.map((link) => (
   <Link key={link.link} to={link.link} className={classes.link}>
        {link.label}
      </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Image   alt="Flix Explorer logo"  p={0} w={{ base: 100, sm:150,  }} src={Logo}/>
        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap"></Group>
      </div>
    </div>
  );
}
