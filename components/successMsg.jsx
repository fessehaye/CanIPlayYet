import React from 'react';
import anime from 'animejs';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(){
      anime({
        targets: this.myRef.current,
        rotateY: [-60, 0], 
        opacity: [0,1],
        transformStyle: 'preserve-3d',
        duration: 500,
        easing: 'easeInOutQuad'
      });

      var tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750,
        delay:500
      });

      tl
      .add({
        targets: '.step-1',
        opacity:1,
      })
      .add({
        targets: '.step-2',
        opacity:1,
      })
      .add({
        targets: '.step-3',
        opacity:1,
      })
      .add({
        targets: '.step-4',
        opacity:1,
      });
    }

    componentWillUnmount(){
      anime({
        targets: this.myRef.current,
        rotateY: [0, -60], 
        opacity: [1,0],
        transformStyle: 'preserve-3d',
        duration: 500,
        easing: 'easeInOutQuad'
      });
    }

    render() {
      const {result,setups} = this.props;
      const complete = ((result.complete / result.total) * 100).toFixed(1);
      const stations = setups - result.open;

      return (
          <article ref={this.myRef} className="shadow-md min-w-full text-lg">
            <div className="bg-green-dark text-white font-bold px-4 py-4 rounded-t">
                <p>Yes! Have Fun!</p>
            </div>
            <div className="bg-green-lightest p-4 rounded-b leading-normal flex flex-wrap items-center">
                
                <div className="flex justify-center items-center mr-6 my-2 flex-grow">
                    <i className="fas fa-thumbs-up text-green mx-auto" style={{fontSize:"13vh"}}></i>
                </div>
                <div className="">
                    <p className="opacity-0 step-1 font-sans text-grey-darkest">You can go play on stations that DO NOT have matches playing.</p>
                    <p className="opacity-0 step-2 font-sans text-grey-darkest">There should be {stations} stations available for use.</p>
                    <p className="opacity-0 step-3 font-sans text-grey-darkest">We are {complete}% complete the bracket.</p>
                    <p className="opacity-0 step-4 font-sans text-grey-darkest">Enjoy the tourney!</p>
                </div>
                
            </div>
      </article>
      );
    }
}