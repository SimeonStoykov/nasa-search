import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
    render() {
        let { resultsFor, searchItems, searchResultsLoading, searchResultsError, noResultsFound, history } = this.props;

        return (
            <div className='app-wrapper'>
                <SearchBar />
                <SearchResults
                    resultsFor={resultsFor}
                    searchItems={searchItems}
                    searchResultsLoading={searchResultsLoading}
                    searchResultsError={searchResultsError}
                    noResultsFound={noResultsFound}
                    history={history}
                />
            </div>
        )
    }
}

App.propTypes = {
    searchItems: PropTypes.array,
    searchResultsLoading: PropTypes.bool,
    searchResultsError: PropTypes.string,
    resultsFor: PropTypes.string,
    noResultsFound: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        resultsFor: state.appData.get('resultsFor'),
        searchItems: state.appData.get('searchItems').toJS(),
        searchResultsLoading: state.appData.get('searchResultsLoading'),
        searchResultsError: state.appData.get('searchResultsError'),
        noResultsFound: state.appData.get('noResultsFound')
    };
}

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
