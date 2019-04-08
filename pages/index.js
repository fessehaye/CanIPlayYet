import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Tour from "reactour";
import NavBar from "../components/navBar";

import Success from "../components/successMsg";
import Failure from "../components/failMsg";
import Intro from "../components/introMsg";
import { Steps, SERVER } from "../utils/index";
import Page from "../layouts/main";
import {reducer,Actions} from "../utils/hooks";


export default function Index() {
  const initialState = {
    slug: "",
    setups: 0,
    result: null,
    loading:false,
    loop:false,
    isTourOpen: false
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { slug,setups,result,loading,loop,isTourOpen } = state;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    dispatch({type: Actions.UPDATE_SLUG, payload: searchParams.get("slug") || ""});
    dispatch({type: Actions.UPDATE_SETUP, payload: searchParams.get("setups") || 0});
  }, []);

  const checkFriendlies = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("slug", slug);
    searchParams.set("setups", setups);

    history.pushState(null, null, `?${searchParams.toString()}`);

    if (loading === false) {
      dispatch({type: Actions.TOGGLE_LOADING});
      if (!slug || !setups) {
        return;
      }
      const response = await axios.get(`${SERVER}/index?slug=${slug}`);
      dispatch({type: Actions.UPDATE_RESULT, payload: response.data});

      if (loop) {
        setTimeout(checkFriendlies(), 30000);
      }
    }
  };

  const isSetupsAvailable = result => {
    return setups - result.open > 0;
  };

  const shareLink = () => {
    if (result) {
      window.open(`/view${window.location.search}`);
    } else {
      alert("Need to click check button with setups and slug filled in!");
    }
  };

  let notif = <Intro />;

  if (result) {
    notif = isSetupsAvailable(result) ? (
      <Success result={result} setups={setups} />
    ) : (
      <Failure result={result} />
    );
  }
  
  return (
    <Page>
      <Tour
        steps={Steps}
        isOpen={isTourOpen}
        accentColor="#5661B3"
        onRequestClose={() => dispatch({type: Actions.STOP_TOUR})}
      />
      <NavBar
        state={state}
        dispatch={dispatch}
        shareLink={shareLink}
        checkFriendlies={checkFriendlies}
      />
      <div className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
        
        {notif}
      </div>
    </Page>
  );
}
