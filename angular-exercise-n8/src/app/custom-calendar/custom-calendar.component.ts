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
    monthsInvolved: number;
    startDateModel: any;
    months: Month[] = [];
    
    constructor() { }

    ngOnInit() {
    }

    getMonthsInvolved(): number
    {
        let lastDayOfSeledtedMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);
        let lastDaySelected = new Date();
        lastDaySelected.setDate(this.startDate.getDate() + parseInt(this.days));

        return lastDaySelected.getMonth() - this.startDate.getMonth() + 1;
    }

    isHoliday(date: Date): boolean {
        return false;
    }

    isWeekend(date: Date): boolean {
        return false; 
    }

    isLastDayOfMonth(date: Date): boolean {
        return false;
    }

    onGenerateCalendarClick() {
        this.startDate = new Date(this.startDateString);
        console.log(this.startDateString);
        console.log(this.startDate);
    }

    generateCalendar(start: Date, end: Date) {
        console.log("start:" + start);
        console.log("end:" + end);

        this.monthsInvolved = this.getMonthsInvolved();
        let lastDay = new Date();

        //month
        let month = new Month();
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
                month.weeks.push(week);
                this.months.push(month);

                //Create new month                
                month = new Month();
                month.year = d.getFullYear();  
                month.weeks = [];
            }

            //check if last day of week
            

            else {
                console.log("Valid day:" + d);
                
            }
            //console.log(this.months)
        }

        
        month.weeks.push(week);
        this.months.push(month);

        console.log(this.months)
    }

}
