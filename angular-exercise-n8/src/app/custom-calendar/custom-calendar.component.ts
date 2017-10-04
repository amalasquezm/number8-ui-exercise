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
        let newDate = new Date();
        newDate.setDate(date.getDate() - date.getDay());
        return newDate;
    }

    getPosteriorSaturday(date: Date): Date {
        let newDate = new Date();
        newDate.setDate(date.getDate() + 6 - date.getDay());
        return newDate;
    }

    completeInvalidDays(start: Date, end: Date, week: Week): Week {
      console.log("completeInvalidDays");
      console.log("start:" + start);
        console.log("end:" + end);
      for (var d = start; d < end; d.setDate(d.getDate() + 1)) {
          week.days.push(this.getInvalidDay(new Date(d)));
      }
      console.log("weekk");
      console.log(week);
      return week;
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

    addDay(date: Date, days: number) {
        let newDate = new Date();
        newDate.setDate(date.getDate() + days);
        return newDate;
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
        week = this.completeInvalidDays(this.getPreviousSunday(start), this.addDay(start, 0), week);

        for (let d = start; d < end; d.setDate(d.getDate() + 1)) {
            console.log("day:" + d);
            //check if last day of month
            if(this.isLastDayOfMonth(d)) {
                console.log("Last day:" + d);
                
                //Add last valid day to the week
                week.days.push(this.getValidDay(d));
                //Completes invalid of the week
                week = this.completeInvalidDays(this.addDay(d, 1), this.getPosteriorSaturday(d), week);
                month.weeks.push(week);
                this.months.push(month);

                //Create new month                
                month = new Month();
                let nextDay = this.addDay(d, 1);
                month.name = this.monthNames[nextDay.getMonth()];
                month.year = nextDay.getFullYear();  
                month.weeks = [];

                //Create new week
                week = new Week();
                week.days = [];
                week = this.completeInvalidDays(this.getPreviousSunday(nextDay), this.addDay(nextDay, 1), week);
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

        week = this.completeInvalidDays(this.addDay(lastDay, 1), this.getPosteriorSaturday(lastDay), week);
        month.weeks.push(week);
        this.months.push(month);

        console.log(this.months)
    }

}
