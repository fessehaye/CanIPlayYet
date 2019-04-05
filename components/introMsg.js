import React, { useRef } from "react";
import { useMsgAnimations } from "../utils/hooks";
import { introMsg as styles } from "../utils/styles";

export default function introMsg() {
  const myRef = useRef();

  useMsgAnimations(myRef);

  return (
    <article ref={myRef} className={styles.dialog}>
      <img className={styles.bg} src="/static/intro.svg" alt="controller" />
      <div className={styles.overlay}>
        <p className={styles.text}>
          Welcome to Can I Play Yet, a display tool for Challonge Single Stage
          Tournaments to represent what stations are avaialble for free play!
          This tool can be used by Tournament Organizers and Participants for
          local and monthly events. All you need is a count of your setups and a
          url to your Challonge bracket.
        </p>
      </div>
    </article>
  );
}
