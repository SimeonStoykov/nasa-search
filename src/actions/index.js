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

export const assetLoading = () => ({
    type: 'ASSET_LOADING'
});

export const getAssetSuccess = response => ({
    type: 'GET_ASSET_SUCCESS',
    response
});

export const getAssetError = () => ({
    type: 'GET_ASSET_ERROR'
});

export const getAsset = url => {
    return dispatch => {
        dispatch(assetLoading());

        fetch(url)
            .then(response => response.json())
            .then(jsonResponse => dispatch(getAssetSuccess(jsonResponse)))
            .catch(error => dispatch(getAssetError()));
    };
}

export const removeSelectedAsset = () => ({
    type: 'REMOVE_SELECTED_ASSET'
});

export const setIsChecked = data => ({
    type: 'SET_IS_CHECKED',
    data
});
