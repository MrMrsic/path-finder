import invalidMockData from "../__mock-data__/invalid-examples";
import PathFinder from "../components/path-finder";
import styles from "../AppStyles.module.css";

export const InvalidExamples = () => {
  return (
    <>
      <h1 className={styles.mainTitle}>Sauna Code Challenge</h1>
      <h2>Invalid Examples</h2>
      <div>
        {invalidMockData && Object.keys(invalidMockData).length > 0 ? (
          <>
            {/* <PathFinder key={`path-finder-${1}`} data={invalidMockData["example_6"]} /> */}
            {Object.keys(invalidMockData).map((id: string, ind: number) => (
              <PathFinder key={`path-finder-${ind}`} data={invalidMockData[id]} />
            ))}
          </>
        ) : (
          <div>No Data!</div>
        )}
      </div>
    </>
  );
};
