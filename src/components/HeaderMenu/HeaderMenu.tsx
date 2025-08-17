import { IconChevronDown } from "@tabler/icons-react";
import {
  Burger,
  Center,
  Container,
  Group,
  Menu,
  Drawer,
  Accordion,
  Image,
  UnstyledButton
} from "@mantine/core";
import { Link } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";
import Logo from "../../assets/FlixExplorerLogo.png";
import { links } from "../../utilities/links";

export default function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  // DESKTOP items (hover menus)
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={Link} to={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label} 
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
             <UnstyledButton className={classes.link}>
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size={14} stroke={1.5} />
                </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.link} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  {
    /*Might remove this later, only needed if I end up with nested menus. Accordion pattern looked better on mobile */
  }
  const mobileItems = (
    <Accordion chevronPosition="right" variant="separated">
      {links.map((link) => {
        if (link.links?.length) {
          return (
            <Accordion.Item key={link.link} value={link.label}>
              <Accordion.Control className={classes.mobileControl}>
                {link.label}
              </Accordion.Control>
              <Accordion.Panel>
                <div className={classes.mobilePanel}>
                  {link.links.map((item) => (
                    <Link
                      key={item.link}
                      to={link.link}
                      className={classes.link}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          );
        }

        return (
          <Link key={link.link} to={link.link} className={classes.link}>
            {link.label}
          </Link>
        );
      })}
    </Accordion>
  );

  return (
    <header className={classes.header}>
      <Container w={"80%"}>
        <div className={classes.inner}>
          <Image
            p={0}
            w={{ base: 100, sm: 150 }}
            src={Logo}
            alt="Flix Explorer logo"
          />
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        position="top"
        hiddenFrom="sm"
        title={
          <Image
            w={{ base: 100, sm: 150, md: 300 }}
            src={Logo}
            alt="FlixExplorer Logo"
          />
        }
        overlayProps={{ backgroundOpacity: 0, blur: 2 }}
      >
        {mobileItems}
      </Drawer>
    </header>
  );
}
