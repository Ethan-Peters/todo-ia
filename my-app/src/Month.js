import Day from './Day.js';

export default class Month{
    newMonth(monthIn){
        this.month = monthIn;
        this.days = [];
    }
    addDay(dayIn){
        this.days.push(dayIn);
    }
    getMonth(){
        return this.month;
    }
    getDays(){
        return this.days;
    }
    getTotalPrio(){
        let prio = 0;
        this.days.forEach(day =>{
            day.getTasks().forEach(task=>{
                prio+=parseInt(task.getPrio());
            });
        });
        return prio;
    }
}