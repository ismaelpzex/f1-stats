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
  constructor(
    private resultsService: ResultsService
  ) {
    this.circuit = "";
    this.raceName = "";
    this.date = "";
    this.drivers = [];
    this.time = "";
  }

  async ngOnInit() {
    const result = await this.resultsService.getCurrent();
    this.circuit = result.MRData.RaceTable.Races[0].Circuit.circuitName;
    this.raceName = result.MRData.RaceTable.Races[0].raceName
    this.date = result.MRData.RaceTable.Races[0].date
    this.drivers = result.MRData.RaceTable.Races[0].Results

    console.log(result.MRData.RaceTable.Races[0].Results);
  }

}
