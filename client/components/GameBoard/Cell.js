import React from 'react';
import styled from 'styled-components';
import {
    RED_PLAYER_CODE,
    BLACK_PLAYER_CODE,
    EMPTY_CODE
} from '../../config';

class Cell extends React.Component {
    render() {
        var styles = {
            cell: {
                height: '100px',
                width: '100px',
                margin: '10px',
                borderRadius: '100px'
            }
        }

        switch (this.props.value) {
            case 0:
                styles.cell.backgroundColor = '#cecece';
                break;
            case RED_PLAYER_CODE:
                styles.cell.backgroundColor = '#e22b2b';
                break;
            case BLACK_PLAYER_CODE:
                styles.cell.backgroundColor = '#1a1c1a';
                break;
            default:
                styles.cell.backgroundColor = '#cecece';
        }

        return (
            <div style={styles.cell}>

            </div>
        )
    }
}

export default Cell;
