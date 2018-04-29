import { fromJS } from 'immutable';

const initialState = fromJS({
    searchTerm: '',
    searchResultsLoading: false,
    searchResultsError: '',
    searchItems: [],
    searchLinks: [],
    noResultsFound: false,
    isImagesChecked: false,
    isVideosChecked: false,
    isAudioChecked: false,
    assetLoading: false,
    getAssetError: '',
    selectedAsset: null,
    resultsFor: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_RESULTS_LOADING': {
            return state
                .set('searchResultsLoading', true)
                .set('searchResultsError', initialState.get('searchResultsError'))
                .set('noResultsFound', initialState.get('noResultsFound'));
        }
        case 'FETCH_SEARCH_RESULTS_SUCCESS': {
            if (action.response && action.response.collection) {
                if (action.response.collection.items) {
                    state = state.set('searchItems', fromJS(action.response.collection.items));
                    if (action.response.collection.items.length === 0) {
                        state = state.set('noResultsFound', true);
                    } else {
                        state = state.set('noResultsFound', initialState.get('noResultsFound'));
                    }
                }

                action.response.collection.links && (state = state.set('searchLinks', fromJS(action.response.collection.links)));
            }

            return state
                .set('searchResultsLoading', initialState.get('searchResultsLoading'))
                .set('searchResultsError', initialState.get('searchResultsError'));
        }
        case 'FETCH_SEARCH_RESULTS_ERROR': {
            return state
                .set('searchResultsLoading', initialState.get('searchResultsLoading'))
                .set('noResultsFound', initialState.get('noResultsFound'))
                .set('searchResultsError', 'Error loading results!');
        }
        case 'ASSET_LOADING': {
            return state
                .set('assetLoading', true)
                .set('getAssetError', initialState.get('getAssetError'));
        }
        case 'GET_ASSET_SUCCESS': {
            if (action.response && action.response.collection && action.response.collection.items) {
                let selectedAsset = null;
                if (action.mediaType === 'image') {
                    selectedAsset =
                        action.response.collection.items.find(rec => rec.href.endsWith('~medium.jpg')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~large.jpg')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~small.jpg')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~thumb.jpg')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~orig.jpg'));
                } else if (action.mediaType === 'video') {
                    selectedAsset =
                        action.response.collection.items.find(rec => rec.href.endsWith('~medium.mp4')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~large.mp4')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~small.mp4')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~mobile.mp4')) ||
                        action.response.collection.items.find(rec => rec.href.endsWith('~orig.mp4'));
                } else if (action.mediaType === 'audio') {
                    selectedAsset =
                        action.response.collection.items.find(rec => rec.href.endsWith('~orig.mp3'));
                }

                selectedAsset && selectedAsset.href && (state = state.set('selectedAsset', selectedAsset.href));
            }

            return state
                .set('assetLoading', initialState.get('assetLoading'))
                .set('getAssetError', initialState.get('getAssetError'));
        }
        case 'GET_ASSET_ERROR': {
            return state
                .set('assetLoading', initialState.get('assetLoading'))
                .set('getAssetError', 'Error loading asset!');
        }
        case 'SET_SEARCH_TERM': {
            return state.set('searchTerm', action.value);
        }
        case 'SET_IS_CHECKED': {
            let isCheckedField = '';
            if (action.data.value === 'Images') {
                isCheckedField = 'isImagesChecked';
            } else if (action.data.value === 'Videos') {
                isCheckedField = 'isVideosChecked';
            } else if (action.data.value === 'Audio') {
                isCheckedField = 'isAudioChecked';
            }

            if (isCheckedField) {
                return state.set(isCheckedField, action.data.checked);
            }

            return state;
        }
        case 'REMOVE_SELECTED_ASSET':
            return state.set('selectedAsset', initialState.get('selectedAsset'));
        case 'SET_RESULTS_FOR':
            return state.set('resultsFor', action.value);
        default:
            return state;
    }
}
