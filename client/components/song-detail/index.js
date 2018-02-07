import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../../queries/fetchSong';

import LyricCreate from './lyric-create';
import LyricList from './lyric-list';

import './style.css';

class SongDetail extends Component {
    renderNav() {
        return (
            <div className="song-detail-container__navigator">
                <Link to="/songs">Songs' list</Link>
                <Link to="/songs/new">Create song</Link>
            </div>
        );
    }

    render() {
        const { song } = this.props.data;

        if(!song) {
            return (
                <div className="song-detail-container">
                    {this.renderNav()}
                    <div className="song-detail-container__nodata">Song unknown</div>
                </div>
            );
        }
        
        return (
            <div className="song-detail-container">
                {this.renderNav()}

                <div className="song-detail-container__info">
                    <div className="song-detail-container__info-title">
                        <h3>{song.title}</h3>
                    </div>

                    <div className="song-detail-container__info-list">
                        <LyricList lyrics={song.lyrics} />
                    </div>

                    <div className="song-detail-container__info-form">
                        <LyricCreate songId={this.props.params.id} />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default graphql(
    fetchSong,
    {
        options: props => ({ variables: { id: props.params.id } })
    }
)(SongDetail);