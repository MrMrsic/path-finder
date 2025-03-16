import { Link } from "react-router";
import styles from "../AppStyles.module.css";

export const Home = () => {
  return (
    <>
      <h1 className={styles.mainTitle}>Sauna Code Challenge</h1>
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
    </>
  );
};
