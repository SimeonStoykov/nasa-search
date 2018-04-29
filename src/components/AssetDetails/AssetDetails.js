import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './AssetDetails.css';

import { config } from '../../config';

import {
    getAsset,
    removeSelectedAsset
} from '../../actions';

class AssetDetails extends Component {
    componentDidMount() {
        let { match, getAsset } = this.props;
        let assetId = match && match.params && match.params.id;

        assetId && getAsset(`${config.host}asset/${assetId}`);
    }

    componentWillUnmount() {
        this.props.removeSelectedAsset();
    }

    render() {
        let { selectedAsset, location, assetLoading, getAssetError } = this.props;
        let data = location.state.assetData;

        return (
            <div className='asset-details-wrapper row'>
                <div className='col-md-6'>
                    {assetLoading && <Loading />}
                    {getAssetError && <Error errorText={getAssetError} />}
                    {selectedAsset && <img src={selectedAsset} alt='Asset' className='img-fluid' />}
                </div>
                <div className='col-md-6'>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
            </div>
        );
    }
}

AssetDetails.propTypes = {
    getAsset: PropTypes.func,
    selectedAsset: PropTypes.string,
    assetLoading: PropTypes.bool,
    getAssetError: PropTypes.string
};

const mapStateToProps = state => {
    return {
        selectedAsset: state.appData.get('selectedAsset'),
        assetLoading: state.appData.get('assetLoading'),
        getAssetError: state.appData.get('getAssetError')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAsset: url => dispatch(getAsset(url)),
        removeSelectedAsset: () => dispatch(removeSelectedAsset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetDetails);