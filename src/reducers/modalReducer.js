import { ModalActions } from '../constants';

export function modalReducer(state, action) {
	if (!state) {
		return {
			current: null,
			next: null,
			prev: null
		};
	}

	switch (action.type) {
	case ModalActions.SET_MODAL:
		return {
			...state,
			current: action.current,
			next: action.next,
			prev: action.prev,
		};
	default:
		return state;
	}
}
