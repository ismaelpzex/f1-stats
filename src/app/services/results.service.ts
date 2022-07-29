import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  url: string;
  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = 'http://ergast.com/api/f1/'
    this.url
  }

  getCurrent(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.url}current/last/results.json`));
  }

  getOlder(year: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.url}${year}.json`))
  }
}
