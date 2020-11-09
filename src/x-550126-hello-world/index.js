import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-button';



const view = (state, {updateState}) => {

	const {current_clock} = state;
	const {greetings_string} = state;
	
	function clock() {

		let month = new Array("January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December");
		
		let d = new Date();

		let month_num	= d.getMonth()
		let day			= d.getDate();
		let hours 		= d.getHours();
		let minutes 	= d.getMinutes();
		let seconds 	= d.getSeconds();
		
		if (day <= 9)		day 	= "0" + day;
		if (hours <= 9)		hours 	= "0" + hours;
		if (minutes <= 9)	minutes = "0" + minutes;
		if (seconds <= 9)	seconds = "0" + seconds;
		
		let date_time =  day + " " + month[month_num] + " " + d.getFullYear() +
		" " + hours + ":" + minutes + ":" + seconds;

		updateState({current_clock : date_time});
	}
	setInterval(clock, 1000);

	function timeout() {
		updateState({greetings_string : "Hello"});
	}
	
	
	return (
		<div>
			
			
			<section>
			<div align="center">{current_clock}</div>
			<div align="center">
			<now-button label={greetings_string} variant="primary" size="md" iconName="" icon="" configAria={{}} tooltipContent=""
			on-click={
				() =>
				{
					let d	  = new Date();
					let hours = d.getHours();
					
					let new_label = "Greetings";

						 if ((hours >= 22) || (hours <= 4 )) new_label = "Good night";
					else if ((hours >= 5 ) && (hours <= 11)) new_label = "Good morning";
					else if ((hours >= 12) && (hours <= 17)) new_label = "Good afternoon";
					else if ((hours >= 18) && (hours <= 21)) new_label = "Good evening";

					updateState({greetings_string : new_label});

					setTimeout(timeout, 1777);
				}
			}>
			</now-button>
			</div>
			</section>
		
		
		</div>
	);
};



createCustomElement('x-550126-hello-world', {
	initialState: {
		greetings_string: "Hello",
		current_clock: "Current time"
	},
	renderer: {type: snabbdom},
	view,
	styles
});
