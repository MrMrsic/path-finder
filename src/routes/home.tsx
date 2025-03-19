import { Link } from "react-router";
import styles from "../styles/app-styles.module.css";

export const Home = () => {
  return (
    <div className={styles.home_view}>
      <h1 className={styles.main_title}>Sauna Code Challenge</h1>
      <div>Follow a path of characters & collect letters: </div>
      <section>
        <ul>
          <li>Start at the character @</li>
          <li>Follow the path</li>
          <li>Collect letters</li>
          <li>Stop when you reach the character x</li>
        </ul>
        <div>
          <a href="https://github.com/softwaresauna/code-challenge" target="_blank">
            More details link
          </a>
        </div>
      </section>
      <section>
        <h2>Assignment</h2>
        <div>
          <div>
            Write a piece of code that takes a map of characters as an input and outputs the collected letters and the
            list of characters of the travelled path.
          </div>

          <div>
            Input:
            <ul>
              <li>
                a map (2-dimensional array) of characters in a data format of your choice (can even be hard-coded as a
                global constant)
              </li>
            </ul>
          </div>
          <div>
            Output:
            <ul>
              <li>Collected letters</li>
              <li>Path as characters</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h2>Implementation</h2>
        <div>On following two pages, you can find implementation of valid and invalid examples</div>
        <ul>
          <li>
            <Link to="/valid-examples">Valid Examples</Link>
          </li>
          <li>
            <Link to="/invalid-examples">Invalid Examples</Link>
          </li>
        </ul>
      </section>
      <section>
        <h2>Frontend Extension</h2>
        <div>
          In addition to requested functionality, you can find implementation of "Path Finder" playground on following
          link
        </div>
        <div style={{ marginTop: "16px" }}>
          <Link to="/playground">Playground</Link>
        </div>
      </section>
    </div>
  );
};
