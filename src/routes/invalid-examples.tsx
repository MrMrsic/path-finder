import invalidMockData from "../__mock-data__/invalid-examples";
import PathFinder from "../components/path-finder";
import styles from "../styles/app-styles.module.css";

export const InvalidExamples = () => {
  return (
    <div className={styles.example_view}>
      <h1 className={styles.main_title}>Sauna Code Challenge</h1>
      <h2>Invalid Examples</h2>
      <div>
        {invalidMockData && Object.keys(invalidMockData).length > 0 ? (
          <>
            {/* <PathFinder key={`path-finder-${1}`} data={invalidMockData["invalid_example_6"]} /> */}
            {Object.keys(invalidMockData).map((id: string, ind: number) => (
              <PathFinder key={`path-finder-${ind}`} data={invalidMockData[id]} />
            ))}
          </>
        ) : (
          <div>No Data!</div>
        )}
      </div>
    </div>
  );
};
