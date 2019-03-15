import React from 'react';
import axios from 'axios';
import Success from '../components/successMsg';
import Failure from '../components/failMsg';
import Page from '../layouts/main';
import { SERVER } from '../utils/index';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      setups: 0,
      result: null,
      loading: false,
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get('slug') || '';
    const setups = parseFloat(searchParams.get('setups')) || 0;
    this.setState(
      {
        slug,
        setups,
      },
      () => {
        this.checkFriendlies();
      }
    );
  }

  checkFriendlies = async () => {
    const { slug, setups, loading } = this.state;
    if (loading === false) {
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
          this.setState({
            result,
            loading: false,
          });
        }
      );
    }
  };

  isSetupsAvailable = result => {
    const { setups } = this.state;
    return setups - result.open > 0;
  };

  render() {
    const { setups, result } = this.state;
    let notif = null;

    if (result) {
      notif = this.isSetupsAvailable(result) ? (
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
}
