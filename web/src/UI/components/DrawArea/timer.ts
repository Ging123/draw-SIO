class Timer {

  public startCountRoundTime(timeThatRoundStart:number) {
    if(!timeThatRoundStart) return;
    const timeThatPass = this.getHowMuchTimeHasPassUntilNow(timeThatRoundStart);
    const oneMinute = 60;
    const time = oneMinute - timeThatPass;
    this.putTimeInThePage(time);
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
  }
}

export default Timer;