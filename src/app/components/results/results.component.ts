import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  circuit: string;
  raceName: string;
  date: string;
  drivers: any[];
  time: string;
  round: number;
  season: number;
  races: any[];

  constructor(
    private resultsService: ResultsService
  ) {
    this.circuit = "";
    this.raceName = "";
    this.date = "";
    this.drivers = [];
    this.time = "";
    this.round = 0;
    this.season = 0;
    this.races = [];
  }

  async ngOnInit() {
    const result = await this.resultsService.getCurrent();
    this.mapData(result)
    const older = await this.resultsService.getOlder(this.season);
    this.mapDataOlder(older, result);
    console.log(this.races);
  }

  mapData(result: any): void {
    this.circuit = result.MRData.RaceTable.Races[0].Circuit.circuitName;
    this.raceName = result.MRData.RaceTable.Races[0].raceName;
    this.date = result.MRData.RaceTable.Races[0].date;
    this.drivers = result.MRData.RaceTable.Races[0].Results;
    this.round = result.MRData.RaceTable.round;
    this.season = result.MRData.RaceTable.season;
    console.log(result.MRData.RaceTable.round);
  }

  mapDataOlder(older: any, result: any) {
    this.races = older.MRData.RaceTable.Races.reverse();
    this.races = this.races.filter(value => value.date <= result.MRData.RaceTable.Races[0].date)
  }

}
