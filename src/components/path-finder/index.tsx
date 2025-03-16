import { MockData } from "../../types/mock-data";
import runPathFinder from "../../utils/run-path-finder";
import uniformizePath from "../../utils/uniformize-path";
import styles from "./PathFinder.module.css";

type PathFinderData = {
  data: MockData;
};

const PathFinder = (props: PathFinderData) => {
  const { data } = props;
  const maxColsLength: number = getMaxLengthOfColumns(data.characters);
  const pathFinderResults = runPathFinder(data.characters);
  const uniformizedPath = uniformizePath(pathFinderResults.coordinates);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.tableWrapper}>
        <div className={styles.table}>
          {data.characters.map((_row, rowIndex) => {
            return (
              <div key={`row-${rowIndex}`} className={styles.row}>
                {new Array(maxColsLength).fill("").map((col, colIndex) => (
                  <span key={`row-${rowIndex}-col-${colIndex}`} className={styles.column}>
                    {data.characters[rowIndex][colIndex]}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        {data.expected_result && (
          <div className={styles.tableInfo}>
            <div className={styles.tableInfoRow}>
              <div>Expected Results </div>
              <ul>
                <li>Letters: {data.expected_result.letters}</li>
                <li>Path: {data.expected_result.path}</li>
              </ul>
            </div>
            <div className={styles.tableInfoRow}>
              <div>Actual Results </div>
              <ul>
                <li>Letters: {uniformizedPath?.letters}</li>
                <li>Path: {uniformizedPath?.path}</li>
              </ul>
            </div>
          </div>
        )}
        {pathFinderResults.errors && pathFinderResults.errors.length > 0 && (
          <div className={styles.tableInfo}>
            <div>Errors: </div>
            <ul>
              {pathFinderResults.errors.map((err: string) => (
                <li key={`error-${data.title}-${err}`}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

function getMaxLengthOfColumns(nestedArray: string[][]): number {
  return Math.max(...nestedArray.map((row) => row.length));
}

export default PathFinder;
