import { navBar as styles } from '../utils/styles';
import {Actions} from "../utils/hooks";


const navBar = props => (
  <div className={styles.nav}>
    <div className={styles.inputGroup} id="slugTutorial">
      <label className={styles.inputLabel} htmlFor="slug">
        Slug
      </label>
      <input
        className={styles.input}
        id="slug"
        type="text"
        placeholder="slug"
        value={props.state.slug}
        onChange={e =>
          props.dispatch({type:Actions.UPDATE_SLUG,payload:e.target.value})
        }
      />
    </div>

    <div className={styles.inputGroup} id="setupTutorial">
      <label className={styles.inputLabel} htmlFor="setups">
        Setups
      </label>
      <input
        className={styles.input}
        id="setups"
        type="text"
        placeholder="setups"
        value={props.state.setups}
        onChange={e =>
          props.dispatch({type:Actions.UPDATE_SETUP,payload:e.target.value})
        }
      />
    </div>

    <div className={styles.checkboxGroup} id="loopTutorial">
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          value={props.state.loop}
          onChange={e =>
            props.dispatch({type:Actions.UPDATE_LOOP})
          }
        />
        <span className={styles.checkboxText}>Loop</span>
      </label>
    </div>

    <i
      id="shareTutorial"
      className={styles.shareTutorial}
      onClick={props.shareLink}
    />
    <i className={styles.tour} onClick={() => props.dispatch({type: Actions.START_TOUR})} />

    <button
      className={styles.button}
      type="button"
      id="checkTutorial"
      disabled={props.state.slug === "" || props.state.setups === 0 || props.state.loading}
      onClick={props.checkFriendlies}
    >
      Check
    </button>
  </div>
);

export default navBar;
