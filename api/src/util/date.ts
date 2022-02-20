class DateUtil {

  private readonly date = new Date;

  public getCurrentTime() {
    return this.date.toLocaleTimeString();
  }

  public aMinuteHasPassed(timeToVerify:string) {
    const oneMinuteInSeconds = 60;
    const currentTime = this.getCurrentTime();
    timeToVerify = this.addSeconds(timeToVerify, oneMinuteInSeconds);
    return currentTime > timeToVerify;
  }

  private addSeconds(time:string, secondsToAdd:number) {
    time = time.split(" ")[0];

    const timeData = time.split(':');
    const newTimeData = { second:0, minute:0, hour:0 }
    const second = parseInt(timeData[2]);
    const secondsPlus = second + secondsToAdd;

    if(secondsPlus > 60) this.addAMinute(newTimeData, secondsPlus);
    else newTimeData.second = secondsPlus;

    if(newTimeData.minute > 60) this.addAHour(newTimeData);
    if(newTimeData.hour > 24) newTimeData.hour = 0;

    return `${newTimeData.hour}:${newTimeData.minute}:${newTimeData.second}`;
  }

  private addAMinute(time:any, secondPlus:number) {
    time.second = secondPlus - 60;
    time.minute += 1;
  }

  private addAHour(time:any) {
    time.minute = 0;
    time.hour += 1;
  }
}

export default DateUtil;