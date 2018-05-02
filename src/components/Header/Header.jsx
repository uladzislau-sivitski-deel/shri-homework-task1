import React from 'react';

export default function Header(props) {
	return (
		<header className='header'>
			<form className='header__form' action="" onSubmit={e => props.onSubmit(e)}>
				<input onChange={props.onChange} className='header__input' type="text" value={props.value}/>
			</form>
		</header>
	);
}
