import React from 'react';
import { Checkbox, Grid, Header, Icon, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function FilterInput(props) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Header as="h3">Filters</Header>
        <Grid columns={3}>
          <Grid.Column>
            <Checkbox
              label="Show Potential Matchups"
              defaultChecked={props.showPotentialMatchups}
              onChange={props.onPotentialMatchupsCheckboxChange}
            />{' '}
            <Popup
              trigger={<Icon name="info circle" color="blue" />}
              content="Show teams with the selected seeds for the current year."
              style={{ left: '-12px' }}
            />
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

FilterInput.propTypes = {
  startingYear: PropTypes.number,
  endingYear: PropTypes.number,
  showPotentialMatchups: PropTypes.bool,
  onPotentialMatchupsCheckboxChange: PropTypes.func,
};

export default FilterInput;
