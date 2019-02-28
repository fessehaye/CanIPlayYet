export default (props) => {
    const { result,setups } = props;
    const complete = ((result.complete / result.total) * 100).toFixed(1);
    const stations = setups - result.open;

    return (
        <article className="shadow-md min-w-full text-lg">
            <div className="bg-green-dark text-white font-bold px-4 py-4 rounded-t">
                <p>Yes! Have Fun!</p>
            </div>
            <div className="bg-green-lightest p-4 rounded-b leading-normal flex flex-wrap items-center">
                
                    <div className="flex justify-center items-center mr-6 my-2 flex-grow">
                        <i className="fas fa-thumbs-up text-green mx-auto" style={{fontSize:"6em"}}></i>
                    </div>
                    <div className="">
                        <p>You can go play on stations that DO NOT have matches playing.</p>
                        <p>There should be {stations} stations available for use.</p>
                        <p>We are {complete}% complete the bracket.</p>
                        <p>Enjoy the tourney!</p>
                    </div>
                
            </div>
      </article>
    );
}