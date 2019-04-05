import React, { useRef } from "react";
import anime from "animejs";
import { useMsgAnimations } from "../utils/hooks";
import { successMsg as styles } from "../utils/styles";

export default function successMsg(props) {
  const myRef = useRef();
  useMsgAnimations(myRef, true);

  const { result, setups } = props;
  const complete = ((result.complete / result.total) * 100).toFixed(1);
  const stations = setups - result.open;

  return (
    <article ref={myRef} className={styles.dialog}>
      <div className={styles.header}>
        <p>Yes! Have Fun!</p>
      </div>
      <div className={styles.body}>
        <div className={styles.iconContainer}>
          <i className={styles.icon} style={{ fontSize: "13vh" }} />
        </div>
        <div>
          <p className={`${styles.bullets} step-1`}>
            You can go play on stations that DO NOT have matches playing.
          </p>
          <p className={`${styles.bullets} step-2`}>
            There should be {stations} stations available for use.
          </p>
          <p className={`${styles.bullets} step-3`}>
            We are {complete}% complete the bracket.
          </p>
          <p className={`${styles.bullets} step-4`}>Enjoy the tourney!</p>
        </div>
      </div>
    </article>
  );
}
