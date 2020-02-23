import React from 'react';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import './SeedInput.css';

function SeedInput(props) {
  return (
    <Container>
      <h2>Seed Selection</h2>
      <Paper>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <FormControl>
              <InputLabel id="seed-1-label">Seed</InputLabel>
              <Select
                labelId="seed-1"
                className="seed-dropdown"
                value={props.leftSeed}
                onChange={props.onLeftSeedDropdownChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>vs.</Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="seed-2-label">Seed</InputLabel>
              <Select
                labelId="seed-2"
                className="seed-dropdown"
                value={props.rightSeed}
                onChange={props.onRightSeedDropdownChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

SeedInput.propTypes = {
  leftSeed: PropTypes.number,
  onLeftSeedDropdownChange: PropTypes.func,
  rightSeed: PropTypes.number,
  onRightSeedDropdownChange: PropTypes.func,
};

export default SeedInput;
