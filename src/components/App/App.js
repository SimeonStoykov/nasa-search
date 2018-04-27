import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';

import videoThumbnail from '../../images/video-thumbnail.jpg';
import loading from '../../images/loading.svg';
import error from '../../images/error.svg';

import { config } from '../../config';

import {
    setSearchTerm,
    fetchSearchResults
} from '../../actions';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        this.props.searchTerm && this.props.fetchSearchResults(`${config.host}search?q=${this.props.searchTerm}`);
    }

    handleChange(e) {
        this.props.setSearchTerm(e.target.value);
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            this.search();
        }
    }

    render() {
        let { searchTerm, searchResultsLoading, searchResultsError, searchItems } = this.props;

        return (
            <div className='app-wrapper'>
                <h1>Nasa Search</h1>
                <input type='text' onChange={this.handleChange} value={searchTerm} onKeyPress={this.handleKeyPress} />
                <button disabled={!searchTerm} onClick={this.search}>Search</button>
                {
                    searchResultsLoading &&
                    <div className='loading'>
                        <img src={loading} alt='Loading...' className='loading-img' />
                        <div>Loading...</div>
                    </div>
                }
                {
                    searchResultsError &&
                    <div className='loading-error-wrapper'>
                        <img src={error} alt='Error' className='error-img' />
                        <div className='loading-error-text'>{searchResultsError}</div>
                    </div>
                }
                {
                    !searchResultsLoading && !searchResultsError && searchItems.length > 0 &&
                    <div className='photos'>
                        {
                            searchItems.map((rec, i) => {
                                let thumbImgSrc = '';
                                let mediaType;
                                if (rec.data && rec.data[0]) {
                                    mediaType = rec.data[0].media_type;

                                    if (mediaType === 'image' && rec.links && rec.links[0] &&
                                        rec.links[0].rel === 'preview' &&
                                        rec.links[0].render === 'image' &&
                                        rec.links[0].href) {
                                        thumbImgSrc = rec.links[0].href;
                                    } else if (mediaType === 'video') {
                                        thumbImgSrc = videoThumbnail;
                                    }

                                    return <img key={i} src={thumbImgSrc} alt='thumb' title={rec.data[0].title} />
                                }

                                return null;
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

App.propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    fetchSearchResults: PropTypes.func
};

const mapStateToProps = state => {
    return {
        searchTerm: state.appData.get('searchTerm'),
        searchResultsLoading: state.appData.get('searchResultsLoading'),
        searchResultsError: state.appData.get('searchResultsError'),
        searchItems: state.appData.get('searchItems').toJS()
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchTerm: value => dispatch(setSearchTerm(value)),
        fetchSearchResults: url => dispatch(fetchSearchResults(url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
