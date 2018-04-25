export const setSearchTerm = value => ({
    type: 'SET_SEARCH_TERM',
    value
});

export const searchResultsLoading = () => ({
    type: 'SEARCH_RESULTS_LOADING'
});

export const fetchSearchResultsSuccess = response => ({
    type: 'FETCH_SEARCH_RESULTS_SUCCESS',
    response
});

export const fetchSearchResultsError = () => ({
    type: 'FETCH_SEARCH_RESULTS_ERROR'
});

export const fetchSearchResults = url => {
    return dispatch => {
        dispatch(searchResultsLoading());

        fetch(url)
            .then(response => response.json())
            .then(jsonResponse => dispatch(fetchSearchResultsSuccess(jsonResponse)))
            .catch(error => dispatch(fetchSearchResultsError()));
    };
}
