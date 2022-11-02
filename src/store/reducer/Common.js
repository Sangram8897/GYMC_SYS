const initialState = {
    loading: false,
    members_list: [],
};
const MembersListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MEMBERS_LIST_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'MEMBERS_LIST_SUCCESS':
            return {
                ...state,
                members_list: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
export default MembersListReducer;