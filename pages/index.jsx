import React from 'react';
import axios from 'axios';
import NavBar from '../components/navBar';
import Tour from 'reactour';
import Success from '../components/successMsg';
import Failure from '../components/failMsg';
import Intro from '../components/introMsg';
import { Steps } from '../utils/steps';
import Page from '../layouts/main';

const SERVER = process.env.NODE_ENV === 'production'
    ? '/.netlify/functions/index'
    : 'http://localhost:9000';


export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slug: '',
            setups: 0,
            loop: false,
            result: null,
            loading: false,
            isTourOpen:false
        };
    }

    doTour = () => {
        this.setState({isTourOpen: true,slug: "caniplayexample",setups: 6});
    }

    closeTour = () => {
        this.setState({isTourOpen: false});
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
                        setTimeout(this.checkFriendlies(), 30000);
                    }
                })
            })
        }
    }

    isSetupsAvailable = result => {
        return this.state.setups - result.open > 0;
    }

    shareLink = () => {
        if(this.state.result){
            window.open("/view" + window.location.search)
        }
        else {
            alert("Need to click check button with setups and slug filled in!");
        }
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
            <Page>
                <Tour
                steps={Steps}
                isOpen={this.state.isTourOpen}
                accentColor={'#5661B3'}
                onRequestClose={this.closeTour}/>
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
                    className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
                    {notif}
                </div>
            </Page>
        )
    }
}
