import { MockData } from "../../types/mock-data";
import runPathFinder from "../../utils/run-path-finder";
import uniformizePath from "../../utils/uniformize-path";
import classNames from "classnames/bind";
import styles from "./path-finder.module.css";
import { useEffect, useState } from "react";
import ResolvedCoordinates from "../../types/resolved-coordinates";
import { SimulationProgress } from "../../routes/playground";
import { validateInput } from "../../utils/validate-input";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

type PathFinderData = {
  data: MockData;
  isInteractive?: boolean;
  isBeingEdited?: boolean;
  isSimulating?: boolean;
  simulationProgress?: SimulationProgress | null;
  editCoordinate?: (x: number, y: number, value: string) => void;
  processSimulation?: (coordinates: ResolvedCoordinates, errors: string[]) => void;
};

const PathFinder = (props: PathFinderData) => {
  const { data, isInteractive, isBeingEdited, isSimulating, simulationProgress, editCoordinate, processSimulation } =
    props;
  const [showTooltip, setShowTooltip] = useState("");
  const maxColsLength: number = getMaxLengthOfColumns(data.characters);
  const pathFinderResults = runPathFinder(data.characters);
  const uniformizedPath = uniformizePath(pathFinderResults.coordinates);
  let letters: string = "";
  let path: string = "";

  useEffect(() => {
    if (isSimulating && processSimulation) {
      setTimeout(() => {
        processSimulation(pathFinderResults.coordinates, pathFinderResults.errors);
      }, 500);
    }
  }, [isSimulating, processSimulation, pathFinderResults.coordinates, pathFinderResults.errors]);

  if (isSimulating && simulationProgress) {
    letters = simulationProgress?.letters;
    path = simulationProgress?.path;
  } else {
    letters = uniformizedPath?.letters;
    path = uniformizedPath?.path;
  }

  return (
    <div
      className={cx(styles.path_finder, {
        is_interactive: isInteractive,
      })}
    >
      <div className={styles.title}>{isBeingEdited ? "Custom array" : data.title}</div>
      <div className={styles.table_wrapper}>
        <div
          className={cx(styles.table, {
            with_simulation_mask: isSimulating,
          })}
        >
          {data.characters.map((_row, rowIndex) => {
            return (
              <div key={`row-${rowIndex}`} className={styles.row}>
                {new Array(maxColsLength).fill("").map((col, colIndex) => (
                  <span key={`row-${rowIndex}-col-${colIndex}`} className={styles.column}>
                    {isInteractive ? (
                      <Tooltip title="Invalid character" open={showTooltip === `${rowIndex}${colIndex}`}>
                        <input
                          id={`row-${rowIndex}-col-${colIndex}-input`}
                          className={cx(styles.coordinate_input, {
                            is_previous_coord:
                              isSimulating &&
                              simulationProgress &&
                              simulationProgress.previous_coord.x === rowIndex &&
                              simulationProgress.previous_coord.y === colIndex,
                            is_current_coord:
                              isSimulating &&
                              simulationProgress &&
                              simulationProgress.current_coord.x === rowIndex &&
                              simulationProgress.current_coord.y === colIndex,
                          })}
                          key={`row-${rowIndex}-col-${colIndex}-input`}
                          type="text"
                          name={`row-${rowIndex}-col-${colIndex}-input`}
                          disabled={isSimulating}
                          autoComplete={"off"}
                          //maxLength={1}
                          value={data.characters[rowIndex][colIndex] ? data.characters[rowIndex][colIndex] : ""}
                          onChange={(e) => {
                            const val = e?.target?.value.replace(/\s+/g, ""); // remove white space from string
                            if (val && validateInput(val) && editCoordinate) {
                              editCoordinate(rowIndex, colIndex, val);
                              setShowTooltip("");
                            } else {
                              if (val === "" && editCoordinate) {
                                editCoordinate(rowIndex, colIndex, val);
                              } else {
                                setShowTooltip(`${rowIndex}${colIndex}`);
                              }
                            }
                          }}
                          onBlur={() => setShowTooltip("")}
                        />
                      </Tooltip>
                    ) : (
                      <>{data.characters[rowIndex][colIndex]}</>
                    )}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        {isInteractive && data.title === "Custom array" ? (
          <div className={styles.table_info}>
            <div className={styles.table_info__row}>
              <div className={styles.table_info__label}>Results </div>
              <ul>
                <li>Letters: {letters}</li>
                <li>Path: {path}</li>
              </ul>
            </div>
            <div
              className={cx(styles.table_info__row, styles.error_holder, {
                // show_error: isSimulating,
              })}
            >
              <div className={styles.table_info__label}>Errors </div>
              <ul>
                {pathFinderResults.errors.map((err: string) => (
                  <li key={`error-${data.title}-${err}`}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            {data.expected_result && (
              <div className={styles.table_info}>
                <div className={styles.table_info__row}>
                  <div className={styles.table_info__label}>Expected Results </div>
                  <ul>
                    <li>Letters: {data.expected_result.letters}</li>
                    <li>Path: {data.expected_result.path}</li>
                  </ul>
                </div>
                <div className={styles.table_info__row}>
                  <div className={styles.table_info__label}>Actual Results </div>
                  <ul>
                    <li>Letters: {letters}</li>
                    <li>Path: {path}</li>
                  </ul>
                </div>
              </div>
            )}
            {pathFinderResults.errors && pathFinderResults.errors.length > 0 && (
              <div className={styles.table_info}>
                <div
                  className={cx(styles.table_info__row, styles.error_holder, {
                    // show_error: isSimulating,
                  })}
                >
                  <div className={styles.table_info__label}>Errors </div>
                  <ul>
                    {pathFinderResults.errors.map((err: string) => (
                      <li key={`error-${data.title}-${err}`}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function getMaxLengthOfColumns(nestedArray: string[][]): number {
  return Math.max(...nestedArray.map((row) => row.length));
}

export default PathFinder;
