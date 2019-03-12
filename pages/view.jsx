import React from 'react';
import Head from 'next/head';
import '../index.scss';
import axios from 'axios';
import NavBar from '../components/navBar';
import Footer from '../components/footer';
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
            slug: '',
            setups: 0,
            result: null,
            loading: false
        };
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const slug = searchParams.get("slug") || "";
        const setups = parseFloat(searchParams.get("setups")) || 0;
        this.setState({
            slug,
            setups
        }, () => {
            this.checkFriendlies();
        });
    }

    checkFriendlies = async() => {

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
                })
            })
        }

    }

    isSetupsAvailable = result => {
        return this.state.setups - result.open > 0;
    }

    render() {
        const {slug, setups, loop, result, loading} = this.state;
        let notif = null;

        if (result) {
            notif = this.isSetupsAvailable(result)
                ? <Success result={result} setups={setups}/>
                : <Failure result={result}/>;
        }

        return (
            <main className="flex flex-col w-full min-h-screen bg-signal">
                <Head>
                    <title>Can I Play Yet...</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <meta charset="UTF-8"/>
                    <meta name="description" content="Bracket Display Tool" />
                    <meta name="keywords" content="Challonge,Friendlies,Setups,Tournaments" />
                    <meta name="author" content="Simon Fessehaye" />
                    <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                        integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                        crossorigin="anonymous"/>
                </Head>

                <div>
                    className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
                    {notif}
                </div>

                <Footer />
            </main>
        )
    }
}
