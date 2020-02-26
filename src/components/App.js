import React, { Component } from 'react';
import Papa from 'papaparse';
import { Grid, Header } from 'semantic-ui-react';

import SeedInput from './SeedInput';
import './App.css';
import gameData from '../data/Big_Dance_CSV.csv';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // All games, grouped by sorted seed matchups.
      games: {},

      // Filtered games, all games currently selected.
      filteredGames: [],

      // Selected seeds.
      leftSeed: 1,
      rightSeed: 1,
    };

    this.handleLeftSeedUpdate = this.handleLeftSeedUpdate.bind(this);
    this.handleRightSeedUpdate = this.handleRightSeedUpdate.bind(this);
  }

  componentDidMount() {
    this.loadGames();
  }

  loadGames() {
    Papa.parse(gameData, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: result => {
        // Load games into a JS object, using the sorted seed values as keys
        // for easier lookup.
        let games = {};
        result.data.forEach(row => {
          const seedKey =
            row['Seed A'] <= row['Seed B']
              ? `${row['Seed A']}-${row['Seed B']}`
              : `${row['Seed B']}-${row['Seed A']}`;
          games[seedKey] ? games[seedKey].push(row) : (games[seedKey] = [row]);
        });
        this.setState({ games }, this.filterGames);
      },
    });
  }

  handleLeftSeedUpdate(event, data) {
    event.preventDefault();
    this.setState({ leftSeed: data.value }, this.filterGames);
  }

  handleRightSeedUpdate(event, data) {
    event.preventDefault();
    this.setState({ rightSeed: data.value }, this.filterGames);
  }

  filterGames() {
    const seedKey =
      this.state.leftSeed <= this.state.rightSeed
        ? `${this.state.leftSeed}-${this.state.rightSeed}`
        : `${this.state.rightSeed}-${this.state.leftSeed}`;
    let filteredGames = [];
    if (this.state.games[seedKey]) {
      filteredGames = this.state.games[seedKey];
    }
    this.setState({ filteredGames });
  }

  render() {
    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1">CBB Matchup Grid</Header>
          </Grid.Column>
        </Grid.Row>

        <SeedInput
          leftSeed={this.state.leftSeed}
          onLeftSeedDropdownChange={this.handleLeftSeedUpdate}
          rightSeed={this.state.rightSeed}
          onRightSeedDropdownChange={this.handleRightSeedUpdate}
        ></SeedInput>

        {this.state.filteredGames.map(fg => (
          <div key={`${fg['Year']}-${fg['Team A']}-${fg['Team B']}`}>
            {fg['Year']}: {fg['Seed A']} {fg['Team A']} vs {fg['Seed B']}{' '}
            {fg['Team B']}
          </div>
        ))}
      </Grid>
    );
  }
}

export default App;
