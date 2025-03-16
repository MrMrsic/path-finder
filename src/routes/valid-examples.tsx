import validMockData from "../__mock-data__/valid-examples";
import PathFinder from "../components/path-finder";
import styles from "../AppStyles.module.css";

export const ValidExamples = () => {
  return (
    <>
      <h1 className={styles.mainTitle}>Sauna Code Challenge</h1>
      <h2>Valid Examples</h2>
      <div>
        {validMockData && Object.keys(validMockData).length > 0 ? (
          <>
            {/* <PathFinder key={`path-finder-${1}`} data={validMockData['example_5']} /> */}
            {Object.keys(validMockData).map((id: string, ind: number) => (
              <PathFinder key={`path-finder-${ind}`} data={validMockData[id]} />
            ))}
          </>
        ) : (
          <div>No Data!</div>
        )}
      </div>
    </>
  );
};
