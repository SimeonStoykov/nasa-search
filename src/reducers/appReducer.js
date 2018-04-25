import { fromJS } from 'immutable';

const initialState = fromJS({
    searchTerm: '',
    searchResultsLoading: false,
    searchResultsError: '',
    searchItems: [],
    searchLinks: []
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_RESULTS_LOADING': {
            return state
                .set('searchResultsLoading', true)
                .set('searchResultsError', initialState.get('searchResultsError'));
        }
        case 'FETCH_SEARCH_RESULTS_SUCCESS': {
            console.log(action.response);
            if (action.response && action.response.collection) {
                action.response.collection.items && (state = state.set('searchItems', fromJS(action.response.collection.items)));
                action.response.collection.links && (state = state.set('searchLinks', fromJS(action.response.collection.links)));
            }

            return state
                .set('searchResultsLoading', initialState.get('searchResultsLoading'))
                .set('searchResultsError', initialState.get('searchResultsError'));
        }
        case 'FETCH_SEARCH_RESULTS_ERROR': {
            return state
                .set('searchResultsLoading', initialState.get('searchResultsLoading'))
                .set('searchResultsError', 'Error loading results!');
        }
        case 'SET_SEARCH_TERM': {
            return state.set('searchTerm', action.value);
        }
        default:
            return state;
    }
}
