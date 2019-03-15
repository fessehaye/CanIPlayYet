import React from 'react';
import axios from 'axios';
import Tour from 'reactour';
import NavBar from '../components/navBar';

import Success from '../components/successMsg';
import Failure from '../components/failMsg';
import Intro from '../components/introMsg';
import { Steps, SERVER } from '../utils/index';
import Page from '../layouts/main';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      setups: 0,
      loop: false,
      result: null,
      loading: false,
      isTourOpen: false,
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get('slug') || '';
    const setups = parseFloat(searchParams.get('setups')) || 0;
    this.setState({ slug, setups });
  }

  doTour = () => {
    this.setState({ isTourOpen: true, slug: 'caniplayexample', setups: 6 });
  };

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  checkFriendlies = async () => {
    const { slug, setups, loading, loop } = this.state;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('slug', slug);
    searchParams.set('setups', setups);

    history.pushState(null, null, `?${searchParams.toString()}`);

    if (!loading) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          if (!slug || !setups) {
            return;
          }
          const response = await axios.get(`${SERVER}/index?slug=${slug}`);
          const result = response.data;
          this.setState(
            {
              result,
              loading: false,
            },
            () => {
              if (loop) {
                setTimeout(this.checkFriendlies(), 30000);
              }
            }
          );
        }
      );
    }
  };

  isSetupsAvailable = result => {
    const { setups } = this.state;
    return setups - result.open > 0;
  };

  shareLink = () => {
    const { result } = this.state;
    if (result) {
      window.open(`/view${window.location.search}`);
    } else {
      alert('Need to click check button with setups and slug filled in!');
    }
  };

  render() {
    const { slug, setups, loop, result, loading, isTourOpen } = this.state;
    let notif = <Intro />;

    if (result) {
      notif = this.isSetupsAvailable(result) ? (
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
          onRequestClose={this.closeTour}
        />
        <NavBar
          setups={setups}
          slug={slug}
          loop={loop}
          loading={loading}
          shareLink={this.shareLink}
          doTour={this.doTour}
          updateState={state => this.setState(state)}
          checkFriendlies={this.checkFriendlies}
        />
        <div className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
          {notif}
        </div>
      </Page>
    );
  }
}
