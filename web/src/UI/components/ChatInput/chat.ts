class Chat {

  public send(guess:string) {
    if(!guess) return;
    this.createClientGuessIntoHisChat(guess);
  }

  private createClientGuessIntoHisChat(guess:string) {
    const chat = document.getElementById('chat')!;
    const guessContainer = document.createElement('div');
    const guessMessage = document.createElement('span');
    const clientName = document.createElement('b');

    clientName.textContent = "Você: ";
    guessMessage.textContent = guess;
    guessContainer.className = 'message';

    guessContainer.appendChild(clientName);
    guessContainer.appendChild(guessMessage);
    chat.append(guessContainer);
  }
}

export default Chat;