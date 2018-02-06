import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql  } from 'react-apollo';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
    fabAdd: {
        position: 'fixed',
        bottom: '32px',
        right: '32px'
    }
};

class SongList extends Component {
    renderSongs() {
        const { data: { songs } } = this.props;

        if (!songs.length) {
            return <div>No songs added</div>
        }

        return songs.map(song => (
            <li key={song.id}>
                {song.title}
            </li>
        ));
    }

    render() { 
        const { data } = this.props;

        if (data.loading) {
            return <div>Loading ...</div>
        }

        return (
            <div>
                {this.renderSongs()}

                <FloatingActionButton mini style={styles.fabAdd}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

const query = gql`
    {
        songs {
            title
        }
    }
`;
 
export default graphql(query)(SongList);