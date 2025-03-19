import { Route, Routes } from "react-router";
import styles from "./styles/app-styles.module.css";
import { ValidExamples } from "./routes/valid-examples";
import { InvalidExamples } from "./routes/invalid-examples";
import { Home } from "./routes/home";
import { Playground } from "./routes/playground";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/valid-examples" element={<ValidExamples />} />
        <Route path="/invalid-examples" element={<InvalidExamples />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
