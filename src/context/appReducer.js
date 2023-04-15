const appReducer = (state, action) => {
	switch (action.type) {
		case "CreateBoard":
			return {
				boards: [...state.boards,action.data],
				columns: [...state.columns]
			}
		case "SetColumns":
			const boardId=action.data[0].boardId
			const prevColumns=state.columns.filter((i)=>i.boardId!==boardId)
				return {
					boards: [...state.boards],
					columns: [...prevColumns,...action.data],
				}
	    case 'removeBoard':
		   const newBoards=state.boards.filter((i)=>i.id!==action.id)
			return {
				boards: [...newBoards],
				columns: [...state.columns],
			}
		case 'updateBoard':
			let newObj = state.boards.filter(obj => obj.id === action.data.id)[0];
			newObj.name=action.data.data.name
			return {
				boards: [...state.boards],
				columns: [...state.columns],
			}
		default: return state;
	}
}

export default appReducer;