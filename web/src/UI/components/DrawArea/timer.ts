import LocalStorage from "../../../services/localstorage";

class Timer {

  private readonly localstorage = new LocalStorage();


  public startCountRoundTime(timeThatRoundStart:number) {
    this.deleteOldInterval();
    if(!timeThatRoundStart) return;
    const timeThatPass = this.getHowMuchTimeHasPassUntilNow(timeThatRoundStart);
    const oneMinute = 59;
    const time = oneMinute - timeThatPass;
    this.putTimeInThePage(time);
  }


  private deleteOldInterval() {
    const intervalId = this.localstorage.get("timer-interval");
    if(!intervalId) return;
    clearInterval(intervalId);
  }


  private getHowMuchTimeHasPassUntilNow(time:number) {
    const currentTime = new Date();
    let timeDifference = currentTime.getTime() - time;
    timeDifference /= 1000;
    const secondsPass = Math.round(timeDifference);
    return secondsPass;
  }


  private putTimeInThePage(time:number) {
    const timer = document.getElementsByClassName('timer')[0];
    if(!timer) return;

    const interval = setInterval(() => {
      timer.textContent = `${time}`;
      time -= 1;

      if(time < 0) clearInterval(interval);
    }, 1000);

    this.saveInterval(interval);
  }


  private saveInterval(interval:NodeJS.Timer) {
    this.localstorage.set("timer-interval", interval);
  }
}

export default Timer;