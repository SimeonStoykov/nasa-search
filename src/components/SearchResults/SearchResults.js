import React from 'react';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import videoThumbnail from '../../images/video-thumbnail.jpg';
import audioThumbnail from '../../images/audio.png';
import './SearchResults.css';

function viewAsset(history, assetData) {
    assetData.nasa_id && history.push({
        pathname: `/asset/${assetData.nasa_id}`,
        state: { assetData }
    });
}

const SearchResults = ({ resultsFor, searchResultsLoading, searchResultsError, searchItems, noResultsFound, history }) => {
    let searchResults = null;

    searchResultsLoading && (searchResults = <Loading />);
    searchResultsError && (searchResults = <Error errorText={searchResultsError} />);

    !searchResultsLoading && !searchResultsError && searchItems.length > 0 &&
        (
            searchResults =
            <div className='search-results-wrapper'>
                <div className='results-for'>Results for "{resultsFor}"</div>
                <div className='assets'>
                    {
                        searchItems.map((rec, i) => {
                            let thumbImgSrc = '';
                            let mediaType;
                            if (rec.data && rec.data[0]) {
                                mediaType = rec.data[0].media_type;

                                if (mediaType === 'image' && rec.links && rec.links[0] &&
                                    rec.links[0].rel === 'preview' &&
                                    rec.links[0].render === 'image' &&
                                    rec.links[0].href && rec.data[0].nasa_id) {
                                    thumbImgSrc = rec.links[0].href;
                                } else if (mediaType === 'video') {
                                    thumbImgSrc = videoThumbnail;
                                } else if (mediaType === 'audio') {
                                    thumbImgSrc = audioThumbnail;
                                }

                                return <img key={i} src={thumbImgSrc} alt='thumb' title={rec.data[0].title} onClick={viewAsset.bind(this, history, rec.data[0])} />
                            }

                            return null;
                        })
                    }
                </div>
            </div>
        );

    noResultsFound && (searchResults = <div className='no-results'>No results found for "{resultsFor}"</div>);

    return searchResults;
}

export default SearchResults;
