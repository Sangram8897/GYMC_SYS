const initialState = {
    loading: false,
    member_filter_tab_data:[
        { id: 1, name: 'All', count: null, selected: true, reddot: false },
        { id: 2, name: 'active', count: null, selected: false, reddot: false },
        { id: 3, name: 'Dates overs', count: null, selected: false, reddot: false },
        { id: 4, name: 'In active', count: null, selected: false, reddot: false }
      ]
};
const MembersFilter = (state = initialState, action) => {
    switch (action.type) {
        case 'MEMBERS_LIST_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'MEMBERS_FILTER_UPDATE':
            return {
                ...state,
                member_filter_tab_data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
export default MembersFilter;