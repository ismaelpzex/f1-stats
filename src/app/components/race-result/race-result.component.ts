import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {

  season: number;
  round: number;
  circuit: string;
  raceName: string;
  date: string;
  drivers: any[];
  time: string;
  races: any[];
  q1Drivers: any[]
  q2Drivers: any[]
  q3Drivers: any[];
  qDrivers: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private resultService: ResultsService,
  ) {
    this.season = 0;
    this.round = 0;
    this.circuit = "";
    this.raceName = "";
    this.date = "";
    this.drivers = [];
    this.time = "";
    this.round = 0;
    this.season = 0;
    this.races = [];
    this.q1Drivers = [];
    this.q2Drivers = [];
    this.q3Drivers = [];
    this.qDrivers = [];
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.round = parseInt(params.year);
      this.season = parseInt(params.season);
      console.log(this.round, this.season);
    })
    const responseRace = await this.resultService.getResultBySeasonAndRound(this.round, this.season);
    this.mapData(responseRace)
    const responseQualy = await this.resultService.getQualyBySeasonAndRound(this.round, this.season);

    this.qDrivers = responseQualy.MRData.RaceTable.Races[0].QualifyingResults;
    this.q3Drivers = this.qDrivers.filter(value => value.Q3);
    this.q2Drivers = this.qDrivers.filter(value => value.Q2);
    this.q1Drivers = this.qDrivers.filter(value => value.Q1);
    console.log(this.q1Drivers);



    console.log(responseQualy.MRData.RaceTable.Races[0].QualifyingResults[0]);

  }

  mapData(result: any): void {
    this.circuit = result.MRData.RaceTable.Races[0].Circuit.circuitName;
    this.raceName = result.MRData.RaceTable.Races[0].raceName;
    this.date = result.MRData.RaceTable.Races[0].date;
    this.drivers = result.MRData.RaceTable.Races[0].Results;
    this.round = result.MRData.RaceTable.round;
    this.season = result.MRData.RaceTable.season;
  }

}
