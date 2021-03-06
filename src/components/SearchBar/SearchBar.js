import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SearchBar.css';
import Checkbox from '../Checkbox/Checkbox';

import { config } from '../../config';

import {
    setSearchTerm,
    fetchSearchResults,
    setIsChecked,
    setResultsFor
} from '../../actions';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.search = this.search.bind(this);
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    search() {
        let { searchTerm, fetchSearchResults, isImagesChecked, isVideosChecked, isAudioChecked, setResultsFor } = this.props;
        if (searchTerm) {
            let searchUrl = `${config.host}search?q=${searchTerm}`;
            if (isImagesChecked || isVideosChecked || isAudioChecked) {
                let mediaTypes = [];
                isImagesChecked && mediaTypes.push('image');
                isVideosChecked && mediaTypes.push('video');
                isAudioChecked && mediaTypes.push('audio');
                searchUrl += '&media_type=' + mediaTypes.join(',');
            }

            setResultsFor(searchTerm);
            fetchSearchResults(searchUrl);
        }
    }

    handleChange(e) {
        this.props.setSearchTerm(e.target.value);
    }

    handleKeyPress(target) {
        target.charCode === 13 && this.search();
    }

    toggleCheckboxChange({ target }) {
        this.props.setIsChecked({ value: target.value, checked: target.checked });
    }

    render() {
        let { searchTerm, isImagesChecked, isVideosChecked, isAudioChecked } = this.props;

        return (
            <div className='search-bar-wrapper'>
                <h1>Nasa Search</h1>
                <div className='input-wrapper'>
                    <input type='text' onChange={this.handleChange} value={searchTerm} onKeyPress={this.handleKeyPress} placeholder='Search for...' />
                    <button disabled={!searchTerm} onClick={this.search}>Search</button>
                </div>
                <div className='search-bar-checkboxes'>
                    <Checkbox label='Images' isChecked={isImagesChecked} toggleCheckboxChange={this.toggleCheckboxChange} />
                    <Checkbox label='Videos' isChecked={isVideosChecked} toggleCheckboxChange={this.toggleCheckboxChange} />
                    <Checkbox label='Audio' isChecked={isAudioChecked} toggleCheckboxChange={this.toggleCheckboxChange} />
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    fetchSearchResults: PropTypes.func,
    isImagesChecked: PropTypes.bool,
    isVideosChecked: PropTypes.bool,
    isAudioChecked: PropTypes.bool,
    setIsChecked: PropTypes.func,
    setResultsFor: PropTypes.func
};

const mapStateToProps = state => {
    return {
        searchTerm: state.appData.get('searchTerm'),
        isImagesChecked: state.appData.get('isImagesChecked'),
        isVideosChecked: state.appData.get('isVideosChecked'),
        isAudioChecked: state.appData.get('isAudioChecked')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchTerm: value => dispatch(setSearchTerm(value)),
        fetchSearchResults: url => dispatch(fetchSearchResults(url)),
        setIsChecked: data => dispatch(setIsChecked(data)),
        setResultsFor: data => dispatch(setResultsFor(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
