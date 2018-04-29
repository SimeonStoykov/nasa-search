import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        let { match, getAsset, location } = this.props;
        let assetId = match && match.params && match.params.id;
        let mediaType = location.state && location.state.assetData && location.state.assetData.media_type;

        assetId && getAsset(`${config.host}asset/${assetId}`, mediaType);
    }

    componentWillUnmount() {
        this.props.removeSelectedAsset();
    }

    render() {
        let { selectedAsset, location, assetLoading, getAssetError } = this.props;
        let data = (location.state && location.state.assetData) || {};
        let displayedAsset = null;

        if (data.media_type === 'image') {
            displayedAsset = <img src={selectedAsset} alt='Asset' className='img-fluid' />;
        } else if (data.media_type === 'video') {
            displayedAsset =
                <video className='embed-responsive embed-responsive-16by9' src={selectedAsset} controls>
                    Your browser does not support the video tag.
                </video>;
        } else if (data.media_type === 'audio') {
            displayedAsset =
                <audio src={selectedAsset} controls className='audio'>
                    Your browser does not support the audio tag.
                </audio>;
        }

        return (
            <div className='asset-details-wrapper row'>
                <div className='col-md-6'>
                    {assetLoading && <Loading />}
                    {getAssetError && <Error errorText={getAssetError} />}
                    {!assetLoading && !getAssetError && selectedAsset && displayedAsset}
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
        getAsset: (url, mediaType) => dispatch(getAsset(url, mediaType)),
        removeSelectedAsset: () => dispatch(removeSelectedAsset())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssetDetails);