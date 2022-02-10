class Chat {

  public send(guess:string) {
    if(!guess) return;
    this.createClientGuessIntoHisChat(guess);
  }

  private createClientGuessIntoHisChat(guess:string) {
    const chat = document.getElementById('chat')!;
    const guessMessage = this.guessMessage("Você: ", guess);
    chat.append(guessMessage);
  }

  private guessMessage(ownerOfTheMessage:string, guess:string) {
    const guessContainer = document.createElement('div');
    const guessMessage = document.createElement('span');
    const clientName = document.createElement('b');

    clientName.textContent = ownerOfTheMessage;
    guessMessage.textContent = guess;
    guessContainer.className = 'message';
  
    guessContainer.appendChild(clientName);
    guessContainer.appendChild(guessMessage);
    this.setMessageBackground(guessContainer);
    return guessContainer;
  }

  private setMessageBackground(guessMessage:HTMLDivElement) {
    const quantityOfMessages = document.querySelectorAll('#chat > .message').length;
    const numberOfMessagesIsEven = quantityOfMessages % 2 === 0;
    if(numberOfMessagesIsEven) guessMessage.style.background = '#f3f3f3'; 
  }
}

export default Chat;