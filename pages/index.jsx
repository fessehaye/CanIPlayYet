import React from 'react';
import Head from 'next/head';
import "../index.scss";

export default class extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            slug:"",
            setups:0,
            loop:false,
            result:null
        }
    }

    checkFriendlies = () => {
        console.table(this.state);
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <title>Can I Play Yet...</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
    
                    <button className="nav__button" onClick={this.checkFriendlies}>Check</button>
                </div>
                <div className="result">{this.state.result}</div>
            </div>
        )
    }
}
