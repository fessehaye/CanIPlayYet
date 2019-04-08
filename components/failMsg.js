import { useStepAnimations } from "../utils/hooks";
import { failMsg as styles } from "../utils/styles";

export default function failMsg(props) {
  const { result } = props;
  const complete = ((result.complete / result.total) * 100).toFixed(1);

  useStepAnimations();

  return (
    <article className={styles.dialog}>
      <div className={styles.header}>
        <p>No! Do Not Play!</p>
      </div>

      <div className={styles.body}>
        <div className={styles.iconContainer}>
          <i className={styles.icon} style={{ fontSize: "13vh" }} />
        </div>

        <div className="">
          <p className={`${styles.bullets} step-1`}>
            All setups are reserved for the event. If you see available setups,
            please inform a TO.
          </p>
          <p className={`${styles.bullets} step-1`}>
            Please be patient as more setups will be available after the first
            few rounds.
          </p>
          <p className={`${styles.bullets} step-2`}>
            We are {complete}% complete the bracket.
          </p>
          <p className={`${styles.bullets} step-3`}>Enjoy the tourney!</p>
        </div>
      </div>
    </article>
  );
}
