import { Link } from "react-router";
import styles from "./playground.module.css";

const InfoPanel = () => {
  return (
    <div className={styles.info_panel} aria-label="help-information">
      <div className={styles.info_panel__title}>Info</div>
      <div className={styles.info_panel__rules}>
        <ul>
          <li>
            the only valid characters are all uppercase letters (A-Z) and other characters appearing in the example maps
            (@, -, |, +, x); anything else found will result in an error
          </li>
          <li>starting point is @</li>
          <li>end point is x</li>
          <li>turns can be letters or +</li>
        </ul>
      </div>
      <div className={styles.info_panel__links}>
        <a href="https://github.com/softwaresauna/code-challenge" target="_blank">
          More info
        </a>
        <span> | </span>
        <Link to="/">Examples</Link>
      </div>
    </div>
  );
};

export default InfoPanel;
