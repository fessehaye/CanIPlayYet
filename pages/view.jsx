import React from 'react';
import axios from 'axios';
import Success from '../components/successMsg';
import Failure from '../components/failMsg';
import Intro from '../components/introMsg';
import Page from '../layouts/main';
import { SERVER } from '../utils/index';

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
            <Page>
                <div
                    className="mx-5 lg:mx-auto flex justify-center items-center flex-1 flex-col">
                    {notif}
                </div>
            </Page>
        )
    }
}
