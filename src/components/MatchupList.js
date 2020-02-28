import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function MatchupList(props) {
  return (
    <Grid.Row style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      <Grid.Column>
        <ul style={{ margin: '0' }}>
          {props.filteredGames.length > 0 &&
            props.filteredGames.map(fg => (
              <li key={fg.key}>
                {fg.year}: {fg.teamA.data.seed} {fg.teamA.data.name} vs{' '}
                {fg.teamB.data.seed} {fg.teamB.data.name}
              </li>
            ))}
          {props.filteredGames.length === 0 && (
            <li>No matchups with given seeds found.</li>
          )}
        </ul>
      </Grid.Column>
    </Grid.Row>
  );
}

MatchupList.propTypes = {
  filteredGames: PropTypes.array,
};

export default MatchupList;
