import validMockData from "../__mock-data__/valid-examples";
import PathFinder from "../components/path-finder";
import styles from "../styles/app-styles.module.css";

export const ValidExamples = () => {
  return (
    <div className={styles.example_view}>
      <h1 className={styles.main_title}>Sauna Code Challenge</h1>
      <h2>Valid Examples</h2>
      <div>
        {validMockData && Object.keys(validMockData).length > 0 ? (
          <>
            {/* <PathFinder key={`path-finder-${1}`} data={validMockData['valid_example_5']} /> */}
            {Object.keys(validMockData).map((id: string, ind: number) => (
              <PathFinder key={`path-finder-${ind}`} data={validMockData[id]} />
            ))}
          </>
        ) : (
          <div>No Data!</div>
        )}
      </div>
    </div>
  );
};
