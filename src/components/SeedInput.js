import React from 'react';
import { Divider, Dropdown, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './SeedInput.css';

const dropdownOptions = [
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' },
  { value: 5, text: '5' },
  { value: 6, text: '6' },
  { value: 7, text: '7' },
  { value: 8, text: '8' },
  { value: 9, text: '9' },
  { value: 10, text: '10' },
  { value: 11, text: '11' },
  { value: 12, text: '12' },
  { value: 13, text: '13' },
  { value: 14, text: '14' },
  { value: 15, text: '15' },
  { value: 16, text: '16' },
];

function SeedInput(props) {
  return (
    // <Grid>
    <Grid.Row>
      <Grid.Column>
        <Header as="h3">Seed Select</Header>
        <Divider />
        <Grid columns={3}>
          <Grid.Column width={7}>
            <Dropdown
              selection
              fluid
              options={dropdownOptions}
              defaultValue={props.leftSeed}
              className="seed-dropdown"
              onChange={props.onLeftSeedDropdownChange}
            ></Dropdown>
          </Grid.Column>
          <Grid.Column width={2} className="vs-text">
            vs.
          </Grid.Column>
          <Grid.Column width={7}>
            <Dropdown
              selection
              fluid
              options={dropdownOptions}
              defaultValue={props.rightSeed}
              className="seed-dropdown"
              onChange={props.onRightSeedDropdownChange}
            ></Dropdown>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

SeedInput.propTypes = {
  leftSeed: PropTypes.number,
  onLeftSeedDropdownChange: PropTypes.func,
  rightSeed: PropTypes.number,
  onRightSeedDropdownChange: PropTypes.func,
};

export default SeedInput;
