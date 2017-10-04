import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Holiday } from '../models/holiday.model';
import { HttpService } from './http.service'

@Injectable()
export class HolidayService {
    //https://holidayapi.com/v1/holidays?key=453af16d-f535-4588-85ce-4f8fd14a5574&country=US&year=2016&month=10
    private REQUEST_URL: string = "https://holidayapi.com/v1/holidays";
    private HOLIDAY_API_KEY = "453af16d-f535-4588-85ce-4f8fd14a5574";

    constructor(private httpService: HttpService) {
    }

    public getHolidays(country: string, year: string): Observable<Holiday> {
        let params = new URLSearchParams();
        params.set('key', this.HOLIDAY_API_KEY);
        params.set('country', country);
        params.set('year', year);

        return this.httpService.get<Holiday>(this.REQUEST_URL);
    }
}