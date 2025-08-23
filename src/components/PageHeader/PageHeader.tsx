import classes from "./PageHeader.module.css";
import { BASE_URL } from "../../utilities/baseURL";
import fallbackBG from "../../assets/fallbackBG.png";
import { Container, Flex } from "@mantine/core";

function PageHeader({ bgPath, children }) {
  const bgURL = bgPath ? BASE_URL + bgPath : fallbackBG;

  return (
    <header
      className={classes.mainHeader}
      style={{
        backgroundImage: ` linear-gradient(
        to right,
        rgba(39, 55, 69, 0.4) 0%,
        rgba(39, 55, 69, 0.65) 40%,
        rgba(39, 55, 69, 0.5) 70%,
        rgba(39, 55, 69, 0.4) 100%
      ),url(${bgURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Container py="5%">{children}</Container>
    </header>
  );
}

export default PageHeader;
