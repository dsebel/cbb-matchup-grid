import React, { Component } from 'react';
import Papa from 'papaparse';
import { Divider, Grid, Header, Message } from 'semantic-ui-react';

import SeedInput from './SeedInput';
import MatchupGrid from './MatchupGrid';
import FilterInput from './FilterInput';
import MatchupList from './MatchupList';

import './App.css';
import gameCSV from '../data/Big_Dance_CSV.csv';
import teamCSV from '../data/KP.csv';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // All games, grouped by sorted seed matchups.
      games: [],

      // Filtered games, all games currently selected.
      filteredGames: [],

      // Potential games, used for just the seeds (not matchups).
      potentialMatchups: [],

      // Team lookup - can lookup by team name - year keys.
      teams: {},

      // The current season based on tourney year (e.g. 2019-2020 season is
      // 2020).
      currentYear: 2019, // pretend that 2019 is the current year

      // Selected seeds.
      leftSeed: 1,
      rightSeed: 1,

      // Chart filter options.
      startingYear: 2010,
      endingYear: 2019,
      showPotentialMatchups: false,

      // Data status variables. Used to indicate if data is ready or not.
      dataReady: false,
    };

    this.handleLeftSeedUpdate = this.handleLeftSeedUpdate.bind(this);
    this.handleRightSeedUpdate = this.handleRightSeedUpdate.bind(this);
    this.handlePotentialMatchupsUpdate = this.handlePotentialMatchupsUpdate.bind(
      this
    );
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    Papa.parse(teamCSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: teamData => {
        // Get the team data.
        let teams = {};
        teamData.data.forEach(teamRow => {
          const key = `${teamRow['Team']}-${teamRow['Year']}`;
          teams[key] = {
            year: teamRow['Year'],
            seed: teamRow['Seed'],
            name: teamRow['Team'],
            adjO: teamRow['AdjO'],
            adjD: teamRow['AdjD'],
          };
        });

        // Now load matches and embed team data into matches.
        Papa.parse(gameCSV, {
          download: true,
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: gameData => {
            let games = [];
            gameData.data.forEach(gameRow => {
              // Filter out years we don't support.
              if (gameRow['Year'] < 2010) {
                return;
              }

              // Only extract the data we plan on using.
              games.push({
                key: `${gameRow['Year']}-${gameRow['Team A']}-${gameRow['Team B']}`,
                year: gameRow['Year'],
                seedMatchup: [gameRow['Seed A'], gameRow['Seed B']].sort(),
                teamA: {
                  data: teams[`${gameRow['Team A']}-${gameRow['Year']}`],
                  won: gameRow['Score A'] > gameRow['Score B'],
                  key: `${gameRow['Year']}-${gameRow['Team A']}-${gameRow['Team B']}`,
                },
                teamB: {
                  data: teams[`${gameRow['Team B']}-${gameRow['Year']}`],
                  won: gameRow['Score B'] > gameRow['Score A'],
                  key: `${gameRow['Year']}-${gameRow['Team B']}-${gameRow['Team A']}`,
                },
              });
            });
            this.setState({ teams, games, dataReady: true }, this.filterGames);
          },
        });
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

  handlePotentialMatchupsUpdate(event, data) {
    event.preventDefault();
    this.setState(
      { showPotentialMatchups: data.checked },
      this.filterPotentialGames
    );
  }

  filterGames() {
    const stateSeeds = [this.state.leftSeed, this.state.rightSeed].sort();
    const filteredGames = this.state.games.filter(game => {
      return (
        game.seedMatchup[0] === stateSeeds[0] &&
        game.seedMatchup[1] === stateSeeds[1]
      );
    });
    this.setState({ filteredGames });
  }

  filterPotentialGames() {
    let potentialMatchups = [];
    if (this.state.showPotentialMatchups) {
      const stateSeeds = [this.state.leftSeed, this.state.rightSeed].sort();
      this.state.games.forEach(game => {
        if (game.year === this.state.currentYear) {
          if (stateSeeds.includes(game.teamA.data.seed)) {
            potentialMatchups.push(game.teamA);
          }
          if (stateSeeds.includes(game.teamB.data.seed)) {
            potentialMatchups.push(game.teamB);
          }
        }
      });
    }
    this.setState({ potentialMatchups });
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
              <b>Note:</b> Currently only includes data from 2010-2019.
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

        <Divider />

        <FilterInput
          startingYear={this.state.startingYear}
          endingYear={this.state.endingYear}
          showPotentialMatchups={this.state.showPotentialMatchups}
          onPotentialMatchupsCheckboxChange={this.handlePotentialMatchupsUpdate}
        ></FilterInput>

        <Grid.Row>
          <Grid.Column>
            {this.state.dataReady && (
              <MatchupGrid
                teams={this.state.teams}
                filteredGames={this.state.filteredGames}
                currentYear={this.state.currentYear}
                showPotentialMatchups={this.state.showPotentialMatchups}
                potentialMatchups={this.state.potentialMatchups}
              ></MatchupGrid>
            )}
          </Grid.Column>
        </Grid.Row>

        <Divider />

        <MatchupList filteredGames={this.state.filteredGames}></MatchupList>

        <Divider />
      </Grid>
    );
  }
}

export default App;
