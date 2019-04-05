import React, { useState, useEffect } from "react";
import axios from "axios";
import Success from "../components/successMsg";
import Failure from "../components/failMsg";
import Page from "../layouts/main";
import { SERVER } from "../utils/index";

export default function View() {
  const [slug, setSlug] = useState("");
  const [setups, setSetups] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSlug(searchParams.get("slug") || "");
    setSetups(parseFloat(searchParams.get("setups")) || 0);
    checkFriendlies();
  }, []);

  const checkFriendlies = async () => {
    if (loading === false) {
      setLoading(true);
      if (!slug || !setups) {
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
