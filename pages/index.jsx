import React from 'react';
import Head from 'next/head';
import "../index.scss";
import axios from 'axios';

const SERVER = process.env.NODE_ENV === 'production' ? "" : "http://localhost:9000"
export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            slug:"",
            setups:0,
            loop:false,
            result:{}
        }
    }

    checkFriendlies = async () => {
        const {slug,setups,loop} = this.state;
        if(!slug || !setups){ return }
        const response = await axios.get(`${SERVER}/index?slug=${slug}`);
        const result = response.data;
        this.setState({result:result} , () => {
            if(loop){
                setTimeout(this.checkFriendlies(), 6000);
            }
        });
    }

    isSetupsAvailable = (result) => {
        return this.state.setups - result.open > 0 ;
    }

    render() {
        const {slug,setups,loop,result} = this.state;
        let notif = null;
        
        if (result) {
            console.log(this.isSetupsAvailable(result))
        }

        return (
            <div className="container">
                <Head>
                    <title>Can I Play Yet...</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"/>
                </Head>

                <div className="nav">
                    <div className="nav__form">
                        <span className="nav__form-label">Tourney Slug</span>
                        <input type="text" value={this.state.slug} onChange={e => this.setState({slug:e.target.value})} className="nav__form-input"/>
                    </div>
                    <div className="nav__form">
                        <span className="nav__form-label">Setups</span>
                        <input type="text" value={this.state.setups} onChange={e => this.setState({setups:e.target.value})} className="nav__form-input"/>
                    </div>
    
                    <button className="nav__button" disabled={!slug || !setups} onClick={this.checkFriendlies}>Check</button>
                </div>

                <div className="result">
                    {JSON.stringify(result, null, 2)}
                </div>
            </div>
        )
    }
}
