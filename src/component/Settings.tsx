import { FaCog } from "react-icons/fa";
import styles from "./Settings.module.css";
function Settings() {
  return (
    <div className={styles.settings}>
      <button className={styles.settingsIcon}>
        <FaCog />
      </button>
    </div>
  );
}

export default Settings;
