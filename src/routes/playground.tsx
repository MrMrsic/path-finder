import { useEffect, useState } from "react";
import Topbar from "../components/playground/topbar";
import PathFinder from "../components/path-finder";
import { MockData } from "../types/mock-data";
import useExamplesData from "../hooks/useExamplesData";
import createEmpty2dArray from "../utils/create-empty-2d-array";
import { CaretRightFilled } from "@ant-design/icons";
import { Button, Spin, notification } from "antd";
import classNames from "classnames/bind";
import styles from "../components/playground/playground.module.css";
import InfoPanel from "../components/playground/info-panel";
import ResolvedCoordinates from "../types/resolved-coordinates";
import Coordinate from "../types/coordinate";
import isUppercaseLetter from "../utils/is-uppercase-letter";

const cx = classNames.bind(styles);
const DEFAULT_ARRAY_NAME = "Custom array";

export type SimulationProgress = {
  order: number;
  previous_coord: Coordinate;
  current_coord: Coordinate;
  previous_char: string;
  current_char: string;
  percentage: number;
  letters: string;
  path: string;
};

export const Playground = () => {
  const [api, contextHolder] = notification.useNotification();

  const [activeArray, setActiveArray] = useState<MockData>({
    title: "",
    description: "",
    characters: [],
    expected_result: {
      letters: "",
      path: "",
    },
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<SimulationProgress | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const { validMockData, invalidMockData, validOptions, invalidOptions } = useExamplesData();

  useEffect(() => {
    if (!activeArray.title) {
      const emptyActiveArray: MockData = {
        title: DEFAULT_ARRAY_NAME,
        description: "",
        characters: createEmpty2dArray(),
        expected_result: {
          letters: "",
          path: "",
        },
      };
      setActiveArray(emptyActiveArray);
    }
  }, [activeArray]);

  const selectTemplate = (arrayId: string) => {
    if (arrayId) {
      setShowInfo(false);
      const exampleType: string = arrayId.split("_")[0];
      if (exampleType === "valid" && validMockData[arrayId]) {
        setActiveArray(validMockData[arrayId]);
        setIsEditing(false);
      } else if (exampleType === "invalid" && invalidMockData[arrayId]) {
        setActiveArray(invalidMockData[arrayId]);
        setIsEditing(false);
      }
    }
  };

  const resetActiveArray = () => {
    setIsEditing(true);
    setTimeout(() => {
      setActiveArray({
        title: "",
        description: "",
        characters: [],
        expected_result: {
          letters: "",
          path: "",
        },
      });
      setShowInfo(true);
    }, 1000);
  };

  const editCoordinate = (rowIndex: number, colIndex: number, value: string) => {
    const tempActiveArray: MockData = JSON.parse(JSON.stringify(activeArray));
    value = value.replace(/\s+/g, ""); // remove white space from string
    const tempVal: string = value.charAt(value.length - 1);
    tempActiveArray.characters[rowIndex][colIndex] = tempVal;
    tempActiveArray.title = DEFAULT_ARRAY_NAME;
    tempActiveArray.description = "";
    setShowInfo(false);
    setActiveArray(tempActiveArray);
    setIsEditing(true);
  };

  const runSimulation = () => {
    setSimulationProgress(null);
    setIsSimulating(true);
  };

  const stopSimulation = () => {
    setSimulationProgress(null);
    setIsSimulating(false);
  };

  const processSimulation = (resolvedCoordinates: ResolvedCoordinates, errors: string[]) => {
    console.log("processSimulation", resolvedCoordinates, errors);
    if (errors && errors.length > 0) {
      api.error({
        message: "Error",
        description: "Fix errors first. Then try to run simulation again",
        placement: "bottom",
      });
      stopSimulation();
    } else {
      const keyArr: string[] = Object.keys(resolvedCoordinates);
      const valueArr: string[] = Object.values(resolvedCoordinates);
      let lastKeyArr: string[] = [];
      let lastValueArr: string[] = [];
      let newIndex: number = 0;
      if (simulationProgress && keyArr && valueArr) {
        newIndex = simulationProgress.order;
      }
      let newPercentage: number = 0;
      if (keyArr.length - 1 === newIndex) {
        newPercentage = 100;
      } else if (newIndex > 0 && newIndex < keyArr.length) {
        newPercentage = Math.round((newIndex / keyArr.length) * 100);
      }
      let letters: string = simulationProgress?.letters ? simulationProgress?.letters : "";
      let path: string = simulationProgress?.path ? simulationProgress?.path : "";
      if (newIndex < keyArr.length && newIndex < valueArr.length) {
        lastKeyArr = keyArr[newIndex].split(":");
        lastValueArr = valueArr[newIndex].split(":");
        if (lastValueArr[1]) {
          if (isUppercaseLetter(lastValueArr[1])) {
            letters += lastValueArr[1];
          }
          if (newIndex === 0) {
            path += lastValueArr[0];
          }
          path += lastValueArr[1];
        }
        if (lastKeyArr && lastValueArr) {
          const order = parseInt(lastKeyArr[0]);
          const sourceX = parseInt(lastKeyArr[1].split("-")[0]);
          const sourceY = parseInt(lastKeyArr[1].split("-")[1]);
          const targetX = parseInt(lastKeyArr[2].split("-")[0]);
          const targetY = parseInt(lastKeyArr[2].split("-")[1]);
          const simProgress: SimulationProgress = {
            order: order,
            previous_coord: {
              x: sourceX,
              y: sourceY,
            },
            current_coord: {
              x: targetX,
              y: targetY,
            },
            previous_char: lastValueArr[0],
            current_char: lastValueArr[1],
            percentage: newPercentage,
            letters: letters,
            path: path,
          };
          setSimulationProgress(simProgress);
        }
      } else if (simulationProgress?.percentage === 100) {
        setTimeout(() => {
          stopSimulation();
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.playground_page}>
      {contextHolder}
      <div className={styles.layout}>
        <Topbar
          validOptions={validOptions}
          invalidOptions={invalidOptions}
          selectedTemplate={activeArray.title === DEFAULT_ARRAY_NAME ? "" : activeArray.title}
          selectTemplate={(arrayId: string) => selectTemplate(arrayId)}
          selectDisabled={isSimulating}
        />
        <div
          className={cx(styles.path_finder_holder, styles.path_finder__fade_in, {
            fade_out: isEditing,
            fade_in: activeArray.title === DEFAULT_ARRAY_NAME,
          })}
        >
          <div className={styles.path_finder__flex}>
            <PathFinder
              data={activeArray}
              isInteractive
              isBeingEdited={isEditing}
              editCoordinate={(rowIndex: number, colIndex: number, value: string) =>
                editCoordinate(rowIndex, colIndex, value)
              }
              isSimulating={isSimulating}
              processSimulation={(coordinates: ResolvedCoordinates, errors: string[]) =>
                processSimulation(coordinates, errors)
              }
              simulationProgress={simulationProgress}
            />
            {showInfo && <InfoPanel />}
          </div>
          <div className={styles.buttons_holder}>
            <Button
              size="large"
              onClick={() => resetActiveArray()}
              type="default"
              variant="outlined"
              disabled={isSimulating}
            >
              Clear/Reset
            </Button>
            {isSimulating ? (
              <div className={styles.sim_spiner_holder}>
                <Spin
                  className={styles.sim_spiner}
                  size="large"
                  percent={simulationProgress?.percentage ? simulationProgress?.percentage : 0}
                >
                  {`${simulationProgress?.percentage ? simulationProgress?.percentage : 0}%`}
                </Spin>
                {simulationProgress && simulationProgress?.percentage < 100 && (
                  <Button
                    className={styles.stop_btn}
                    size="large"
                    // icon={<XFilled />}
                    type="primary"
                    onClick={() => stopSimulation()}
                  >
                    Stop
                  </Button>
                )}
              </div>
            ) : (
              <Button
                data-testid="run-simulation"
                size="large"
                onClick={() => runSimulation()}
                icon={<CaretRightFilled />}
                type="primary"
                loading={isSimulating}
              >
                Run simulation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
