class Chat {

  public sendGuess(guess:string, whoSentGuess:string) {
    if(!guess) return;
    this.createClientGuessIntoHisChat(guess, whoSentGuess);
  }

  private createClientGuessIntoHisChat(guess:string, whoSentGuess:string) {
    const chat = document.getElementById('chat')!;
    const guessMessage = this.guessMessage(whoSentGuess, guess);

    chat.append(guessMessage);
    chat.scrollTop = chat.scrollHeight;
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

  private setMessageBackground(message:HTMLDivElement) {
    const quantityOfMessages = document.querySelectorAll('#chat > .message').length;
    const numberOfMessagesIsEven = quantityOfMessages % 2 === 0;
    if(numberOfMessagesIsEven) message.style.background = '#f3f3f3'; 
  }

  public sendGameMessage(message:string, color='black') {
    const chat = document.getElementById('chat')!;
    const messageDiv = document.createElement('div');

    messageDiv.textContent = message;
    messageDiv.className = 'message';
    messageDiv.style.color = color;
    
    this.setMessageBackground(messageDiv);
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
  }
}

export default Chat;