import { Select } from "antd";
import { SelectOption } from "../../types/select-options";
import styles from "./playground.module.css";

type TopbarProps = {
  validOptions: SelectOption[];
  invalidOptions: SelectOption[];
  selectedTemplate: string;
  selectDisabled: boolean;
  selectTemplate: (arrayId: string) => void;
};

const Topbar = (props: TopbarProps) => {
  const { validOptions, invalidOptions, selectedTemplate, selectDisabled, selectTemplate } = props;
  return (
    <section className={styles.topbar}>
      <h1 className={styles.sauna_main_title}>
        <span>Sauna</span>
        <span>Code</span>
        <span>Challenge</span>
      </h1>
      <div className={styles.select_holder}>
        <div className={styles.select_label}>Select predefined array of characters or create your own from scratch</div>
        <Select
          className={styles.select}
          value={selectedTemplate}
          onSelect={(value: string) => selectTemplate(value)}
          options={[
            {
              label: "Valid examples",
              title: "valid",
              options: validOptions,
            },
            {
              label: "Invalid examples",
              title: "imvalid",
              options: invalidOptions,
            },
          ]}
          size="large"
          disabled={selectDisabled}
          showSearch
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
        />
      </div>
    </section>
  );
};

export default Topbar;
