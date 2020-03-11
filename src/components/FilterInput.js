import React from 'react';
import {
  Accordion,
  Checkbox,
  Form,
  Grid,
  Icon,
  Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function FilterInput(props) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Accordion
          as={Form.Field}
          panels={[
            {
              key: 'potential',
              title: 'Filters',
              content: {
                content: (
                  <Grid columns={2}>
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
                    <Grid.Column as={Form}>
                      <Form.Input
                        label={`Starting Year: ${props.startingYear}`}
                        min={2010}
                        max={2020}
                        name="starting-year"
                        onChange={props.onStartingYearChange}
                        step={1}
                        type="range"
                        value={props.startingYear}
                      ></Form.Input>
                    </Grid.Column>
                  </Grid>
                ),
              },
            },
          ]}
        ></Accordion>
      </Grid.Column>
    </Grid.Row>
  );
}

FilterInput.propTypes = {
  startingYear: PropTypes.number,
  endingYear: PropTypes.number,
  showPotentialMatchups: PropTypes.bool,
  onPotentialMatchupsCheckboxChange: PropTypes.func,
  onStartingYearChange: PropTypes.func,
};

export default FilterInput;
