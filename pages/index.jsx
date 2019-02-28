import React from 'react';
import Head from 'next/head';
import '../index.scss';
import axios from 'axios';
import NavBar from '../components/navBar';
import Success from '../components/successMsg';
import Failure from '../components/failMsg';
import Intro from '../components/introMsg';

const SERVER = process.env.NODE_ENV === 'production'
    ? '/.netlify/functions/index'
    : 'http://localhost:9000'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slug: 'test_subject567',
            setups: 0,
            loop: false,
            result: null,
            loading: false
        };
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const slug = searchParams.get("slug") || "";
        const setups = parseFloat(searchParams.get("setups")) || 0;
        this.setState({slug, setups});
    }

    checkFriendlies = async() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("slug", this.state.slug);
        searchParams.set("setups", this.state.setups);

        history.pushState(null, null, '?' + searchParams.toString());
        if (!this.state.loading) {
            this.setState({
                loading: true
            }, async() => {
                const {slug, setups, loop} = this.state;
                if (!slug || !setups) {
                    return
                }
                const response = await axios.get(`${SERVER}/index?slug=${slug}`);
                const result = response.data;
                this.setState({
                    result: result,
                    loading: false
                }, () => {
                    if (loop) {
                        setTimeout(this.checkFriendlies(), 6000);
                    }
                })
            })
        }
    }

    isSetupsAvailable = result => {
        return this.state.setups - result.open > 0;
    }

    shareLink = () => {
        window.open("/view" + window.location.search);
    }

    doTour = () => {
        alert("coming soon");
    }

    render() {
        const {slug, setups, loop, result, loading} = this.state;
        let notif = <Intro/>;

        if (result) {
            notif = this.isSetupsAvailable(result)
                ? <Success result={result} setups={setups}/>
                : <Failure result={result}/>;
        }

        return (
            <div className="flex flex-col w-full h-screen bg-indigo-lightest">
                <Head>
                    <title>Can I Play Yet...</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                        crossorigin="anonymous"/>
                </Head>

                <NavBar
                    setups={setups}
                    slug={slug}
                    loop={loop}
                    loading={loading}
                    shareLink={this.shareLink}
                    doTour={this.doTour}
                    updateState={state => this.setState(state)}
                    checkFriendlies={this.checkFriendlies}/>
                <div
                    className="container mx-auto flex justify-center items-center flex-1 flex-col">
                    {notif}
                </div>
            </div>
        )
    }
}
