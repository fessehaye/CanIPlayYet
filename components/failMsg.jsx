export default (props) => {
    const {result} = props;
    const complete = ((result.complete / result.total) * 100).toFixed(1);

    return (
        <article className="shadow-md min-w-full text-lg">
          <div className="bg-red-dark text-white font-bold px-4 py-4 rounded-t-sm">
            <p>No! Do Not Play!</p>
          </div>

          <div className="bg-red-lightest p-4 rounded-b-sm leading-normal flex">
            
            <div className="w-1/5 flex justify-center items-center mr-6">
                <i className="fas fa-exclamation-circle text-red" style={{fontSize:"6em"}}></i>
            </div>

            <div className="w-4/5">
                <p>All setups are reserved for the event. If you see available setups, please inform a TO.</p>
                <p>Please be patient as more setups will be available after the first few rounds.</p>
                <p>We are {complete}% complete the bracket.</p>
                <p>Enjoy the tourney!</p>
            </div>
          </div>
      </article>
    );
}