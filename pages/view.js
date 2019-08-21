import React, { useState, useEffect } from "react";
import axios from "axios";
import Success from "../components/successMsg";
import Failure from "../components/failMsg";
import Page from "../layouts/main";
import { SERVER } from "../utils/index";

export default function View() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  let slug = "";
  let setups = 0;

  if (process.browser) {
    const searchParams = new URLSearchParams(window.location.search);
    slug = searchParams.get("slug");
    setups = searchParams.get("setups");
  }
  useEffect(() => {
    checkFriendlies();
  }, []);

  const checkFriendlies = async () => {
    if (loading === false) {
      setLoading(true);
      if (!slug || !setups) {
        setLoading(false);
        return;
      }
      const response = await axios.get(`${SERVER}/index?slug=${slug}`);
      setResult(response.data);
      setLoading(false);
    }
  };

  const isSetupsAvailable = result => {
    return setups - result.open > 0;
  };

  let notif = null;

  if (result) {
    notif = isSetupsAvailable(result) ? (
      <Success result={result} setups={setups} />
    ) : (
      <Failure result={result} />
    );
  }

  return (
    <Page>
      <div className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
        {notif}
      </div>
    </Page>
  );
}
