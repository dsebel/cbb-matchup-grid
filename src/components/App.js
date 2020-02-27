import React, { Component } from 'react';
import Papa from 'papaparse';
import { Divider, Grid, Header, Message } from 'semantic-ui-react';

import SeedInput from './SeedInput';
import MatchupGrid from './MatchupGrid';

import './App.css';
import gameData from '../data/Big_Dance_CSV.csv';
import teamData from '../data/KP.csv';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // All games, grouped by sorted seed matchups.
      games: {},

      // Filtered games, all games currently selected.
      filteredGames: [],

      // Team lookup - can lookup by team name - year keys.
      teams: {},

      // Selected seeds.
      leftSeed: 1,
      rightSeed: 1,

      // Data status variables. Used to indicate if data is ready or not.
      dataReady: false,
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
        this.setState({ games }, this.loadTeams);
      },
    });
  }

  loadTeams() {
    Papa.parse(teamData, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: results => {
        let teams = {};
        results.data.forEach(row => {
          const key = `${row['Team']}-${row['Year']}`;
          teams[key] = row;
        });
        this.setState({ teams, dataReady: true }, this.filterGames);
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
      <Grid container style={{ marginTop: '20px' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" dividing>
              CBB Matchup Grid
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Message warning>
              <b>Note:</b> Currently only includes data from 2017-2019.
            </Message>
          </Grid.Column>
        </Grid.Row>

        <SeedInput
          leftSeed={this.state.leftSeed}
          onLeftSeedDropdownChange={this.handleLeftSeedUpdate}
          rightSeed={this.state.rightSeed}
          onRightSeedDropdownChange={this.handleRightSeedUpdate}
        ></SeedInput>

        <Divider />

        <Grid.Row style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <Grid.Column>
            <ul style={{ margin: '0' }}>
              {this.state.filteredGames.length > 0 &&
                this.state.filteredGames.map(fg => (
                  <li key={`${fg['Year']}-${fg['Team A']}-${fg['Team B']}`}>
                    {fg['Year']}: {fg['Seed A']} {fg['Team A']} vs{' '}
                    {fg['Seed B']} {fg['Team B']}
                  </li>
                ))}
              {this.state.filteredGames.length === 0 && (
                <li>No matchups with given seeds found.</li>
              )}
            </ul>
          </Grid.Column>
        </Grid.Row>

        <Divider />

        <Grid.Row>
          <Grid.Column>
            {this.state.dataReady && (
              <MatchupGrid
                filteredGames={this.state.filteredGames}
                teams={this.state.teams}
              ></MatchupGrid>
            )}
          </Grid.Column>
        </Grid.Row>

        <Divider />
      </Grid>
    );
  }
}

export default App;
