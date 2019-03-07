import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(){
      this.myRef.current.animate(
        [
          { transform: 'rotateY(-60deg)', opacity: '0',transformStyle: 'preserve-3d' },
          { transform: 'rotateY(0deg)', opacity: '1',transformStyle: 'preserve-3d' }
        ], {duration: 500, easing: 'ease-in-out', fill: 'forwards'}
      );
    }

    componentWillUnmount(){
      this.myRef.current.animate(
        [
          { transform: 'rotateY(0deg)', opacity: '1',transformStyle: 'preserve-3d' },
          { transform: 'rotateY(-60deg)', opacity: '0',transformStyle: 'preserve-3d' }
          
        ], {duration: 500, easing: 'ease-in-out', fill: 'forwards'}
      );
    }

    render() {

      return (
          <article ref={this.myRef} className="shadow-md min-w-full text-lg rounded-lg border-white border-4 relative introMsg">
            <img className="w-full h-full rounded-lg object-cover hidden sm:block" src={'/static/intro.svg'}/>
            <div className="w-full bg-opacity-indigo sm:absolute pin-b text-center flex align-center justify-center">
              <p className="flex items-center justify-center p-6 text-white font-bold text-center align-middle">
                Welcome to Can I Play Yet, a display tool for Challonge Single Stage Tournaments to represent what stations are avaialble for free play!
                This tool can be used by Tournament Organizers and Participants for local and monthly events. All you need is a count of your setups and a url to your Challonge bracket.
              </p>
            </div>
          </article>
      );
    }
}
