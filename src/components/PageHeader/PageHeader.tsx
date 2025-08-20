import classes from "./PageHeader.module.css";
import { BASE_URL } from "../../utilities/baseURL";
import fallbackBG from "../../assets/fallbackBG.png";

function PageHeader({ bgPath, children }) {
  const bgURL = bgPath ? BASE_URL + bgPath : fallbackBG;

  return <header
        className={classes.mainHeader}
        style={{
          backgroundImage: ` linear-gradient(
        to top,
        rgba(39, 55, 69, 0.85) 0%,
        rgba(39, 55, 69, 0.6) 40%,
        rgba(39, 55, 69, 0.3) 70%,
        rgba(39, 55, 69, 0.2) 100%
      ),url(${bgURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 35%",
        }}
      >
        {children}
      </header>
}

export default PageHeader;
