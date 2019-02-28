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
      const {result} = this.props;
      const complete = ((result.complete / result.total) * 100).toFixed(1);

      return (
          <article ref={this.myRef} className="shadow-md min-w-full text-lg">
            <div className="bg-red-dark text-white font-bold px-4 py-4 rounded-t">
              <p>No! Do Not Play!</p>
            </div>

            <div className="bg-red-lightest p-4 rounded-b leading-normal flex flex-wrap items-center">
              
              <div className="flex justify-center items-center mr-6 my-2 flex-grow">
                  <i className="fas fa-exclamation-circle text-red mx-auto" style={{fontSize:"6em"}}></i>
              </div>

              <div className="">
                  <p>All setups are reserved for the event. If you see available setups, please inform a TO.</p>
                  <p>Please be patient as more setups will be available after the first few rounds.</p>
                  <p>We are {complete}% complete the bracket.</p>
                  <p>Enjoy the tourney!</p>
              </div>
            </div>
        </article>
      );
    }
}
