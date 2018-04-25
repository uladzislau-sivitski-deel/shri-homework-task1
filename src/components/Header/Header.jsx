import React from 'react';

export default function Header(props) {
	return (
		<header className='header'>
			<form className='header__form' action="" onSubmit={e => props.onSubmit(e)}>
				<input className='header__input' type="text"/>
			</form>
		</header>
	);
}
