import React, { useState, useEffect } from "react";
import axios from "axios";
import Tour from "reactour";
import NavBar from "../components/navBar";

import Success from "../components/successMsg";
import Failure from "../components/failMsg";
import Intro from "../components/introMsg";
import { Steps, SERVER } from "../utils/index";
import Page from "../layouts/main";

export default function Index() {
  const [slug, setSlug] = useState("");
  const [setups, setSetups] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loop, setLoop] = useState(false);
  const [isTourOpen, setisTourOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSlug(searchParams.get("slug") || "");
    setSetups(parseFloat(searchParams.get("setups")) || 0);
  }, []);

  const doTour = () => {
    setSlug("caniplayexample");
    setSetups(6);
    setisTourOpen(true);
  };

  const checkFriendlies = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("slug", slug);
    searchParams.set("setups", setups);

    history.pushState(null, null, `?${searchParams.toString()}`);

    if (loading === false) {
      setLoading(true);
      if (!slug || !setups) {
        return;
      }
      const response = await axios.get(`${SERVER}/index?slug=${slug}`);
      setResult(response.data);
      setLoading(false);

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
        onRequestClose={() => setisTourOpen(false)}
      />
      <NavBar
        setups={setups}
        slug={slug}
        loop={loop}
        loading={loading}
        shareLink={shareLink}
        doTour={doTour}
        checkFriendlies={checkFriendlies}
      />
      <div className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
        {notif}
      </div>
    </Page>
  );
}
