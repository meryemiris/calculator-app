import { FaCog } from "react-icons/fa";
import styles from "./Settings.module.css";
// import { useState } from "react";

function Settings() {
  // const [isHistory, setIsHistory] = useState(false);

  // function toggleHistory() {
  //   setIsHistory(!isHistory);
  // }

  function SettingsMenu() {
    return (
      <div className={styles.dropdownContent}>
        <ul>
          <li>
            <p>Show History</p>
            <label className={styles.switch}>
              <input name="toggleHistory" type="checkbox" />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.settings}>
      <div className={styles.dropdown}>
        <button className={styles.settingsButton}>
          <FaCog />
        </button>
        <SettingsMenu />
      </div>
    </div>
  );
}

export default Settings;
