export default (props) => {
	const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight border-indigo-light focus:outline-none focus:shadow-outline";
	const buttonClass = "ml-auto shadow bg-indigo hover:bg-indigo-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded";
	
	return (
		<div className="m-4 p-4 flex bg-white shadow-md rounded">
			<div className="flex mx-2 items-center">
				<label className="text-indigo-darker font-bold mr-2" htmlFor="slug">
					Slug
				</label>
				<input 
				  className={inputClass}
				  id="slug"
				  type="text"
				  placeholder="slug"
				  value={props.slug}
				  onChange={e => props.updateState({ slug: e.target.value })}
				/>
			</div>
			
			<div className="flex mx-2 items-center">
				<label className="text-indigo-darker font-bold mr-2" htmlFor="setups">
					Setups
				</label>
				<input 
				  className={inputClass}
				  id="setups"
				  type="text"
				  placeholder="setups"
				  value={props.setups}
              	  onChange={e => props.updateState({ setups: e.target.value })}
				/>
			</div>

			<div className="flex mx-4 items-center">
				<label className="block text-indigo-darker font-bold">
					<input
					 	className="mr-1 leading-tight"
						type="checkbox"
						value={props.loop}
						onChange={e => props.updateState({ loop: e.target.value })}
					/>
					<span className="text-indigo-darker font-bold">
					Loop
					</span>
				</label>
			</div>
			
			<button 
			  className={buttonClass}
			  type="button"
			  disabled={!props.slug || !props.setups || props.loading}
              onClick={props.checkFriendlies}>
				Submit
			</button>
		</div>
	);
}