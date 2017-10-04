import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../models/day.model';
import { Week } from '../models/week.model';
import { Month } from '../models/month.model';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {
    @Input() days: string;
    @Input() startDateString: string;

    startDate: Date;
    holidays: any;
    startDateModel: any;
    months: Month[] = [];
    monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
    
    constructor() { }

    ngOnInit() {
    }

    getLastSelectedDate(): Date {
        let lastDaySelected: Date = new Date();
        lastDaySelected.setDate(this.startDate.getDate() + parseInt(this.days));
        return lastDaySelected;        
    }

    getHolidays() {

    }

    isHoliday(date: Date): boolean {
        return false;
    }

    isWeekend(date: Date): boolean {
        return date.getDay() == 0 || date.getDay() == 6; 
    }

    isLastDayOfMonth(date: Date): boolean {
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDay.getDate() == date.getDate();
    }

    isLastDayOfWeek(date: Date): boolean {
        return date.getDay() == 6;
    }

    getPreviousSunday(date: Date): Date {
        date.setDate(date.getDate() - date.getDay());
        return date;
    }

    getPosteriorSaturday(date: Date): Date {
        date.setDate(date.getDate() + 6 - date.getDay());
        return date;
    }

    completeInvalidDays(start: Date, end: Date, week: Week) {
      for (var d = start; d < end; d.setDate(d.getDate() + 1)) {
          week.days.push(this.getInvalidDay(new Date(d)));
      }
    }

    getInvalidDay(date: Date) : Day {
        return { isDisabled: true, dayNumber: date.getDate(), isWeekend: false, isHoliday: false };
    }

    getValidDay(date: Date) : Day {
        return { isDisabled: false, dayNumber: date.getDate(), isWeekend: this.isWeekend(date), isHoliday: this.isHoliday(date) };

    }

    onGenerateCalendarClick() {
        this.startDate = new Date(this.startDateString);
        this.generateCalendar(this.startDate, this.getLastSelectedDate());
    }

    generateCalendar(start: Date, end: Date) {
        console.log("start:" + start);
        console.log("end:" + end);

        let lastDay = new Date();

        //month
        let month = new Month();
        month.name = this.monthNames[start.getMonth()];
        month.year = start.getFullYear();
        month.weeks = []; 

        //week 
        let week = new Week();
        week.days = [];

        for (let d = start; d < end; d.setDate(d.getDate() + 1)) {
            console.log("day:" + d);
            //check if last day of month
            if(this.isLastDayOfMonth(d)) {
                console.log("Last day:" + d);
                //TODO add to week
                week.days.push(this.getValidDay(d));
                this.completeInvalidDays(d, this.getPosteriorSaturday(d), week);
                month.weeks.push(week);
                this.months.push(month);

                //Create new month                
                month = new Month();
                month.name = this.monthNames[d.getMonth()];
                month.year = d.getFullYear();  
                month.weeks = [];
            }

            //check if last day of week
            else if(this.isLastDayOfWeek(d)) {
                //TODO add to week
                week.days.push(this.getValidDay(d));
                month.weeks.push(week);
                week = new Week();
                week.days = [];
            }

            else {
                console.log("Valid day:" + d);
                week.days.push(this.getValidDay(d));
            }

            lastDay = d;
        }

        this.completeInvalidDays(lastDay, this.getPosteriorSaturday(lastDay), week);
        month.weeks.push(week);
        this.months.push(month);

        console.log(this.months)
    }

}
