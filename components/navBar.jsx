import {navBar as styles} from '../utils/styles';
export default (props) => {
	
	return (
		<div className={styles.nav}>
			<div className={styles.inputGroup} id="slugTutorial">
				<label className={styles.inputLabel} htmlFor="slug">
					Slug
				</label>
				<input 
				  className={styles.input}
				  id="slug"
				  type="text"
				  placeholder="slug"
				  value={props.slug}
				  onChange={e => props.updateState({ slug: e.target.value,result:null })}
				/>
			</div>
			
			<div className={styles.inputGroup} id="setupTutorial">
				<label className={styles.inputLabel} htmlFor="setups">
					Setups
				</label>
				<input 
				  className={styles.input}
				  id="setups"
				  type="text"
				  placeholder="setups"
				  value={props.setups}
              	  onChange={e => props.updateState({ setups: e.target.value,result:null })}
				/>
			</div>

			<div className={styles.checkboxGroup} id="loopTutorial">
				<label className={styles.checkboxLabel}>
					<input
					 	className={styles.checkbox}
						type="checkbox"
						value={props.loop}
						onChange={e => props.updateState({ loop: e.target.value,result:null })}
					/>
					<span className={styles.checkboxText}>
					Loop
					</span>
				</label>
			</div>

			<i id="shareTutorial" className={styles.shareTutorial} onClick={props.shareLink}></i>
			<i className={styles.tour} onClick={props.doTour}></i>
			
			<button 
			  className={styles.button}
			  type="button"
			  id="checkTutorial"
			  disabled={!props.slug || !props.setups || props.loading}
              onClick={props.checkFriendlies}>
				Check
			</button>
		</div>
	);
}