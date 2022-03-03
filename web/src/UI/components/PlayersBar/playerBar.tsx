import { renderToStaticMarkup } from "react-dom/server"
import { FaPencilAlt } from "react-icons/fa";
import Dom from "../../util/dom";

class PlayerBar {

  private readonly dom = new Dom();

  public create(player:string, playerScore=0, id?:string) {
    const container = document.getElementById('players-bar-wrapper')!;
    const div = this.dom.createElements('div', 4);
    const classes = ['player-bar', 'player-data', 'player', 'score'];
    const playerBar=div[0], playerData=div[1], playerName=div[2], score=div[3];
    id = id || `player-is-${player}`;

    playerBar.id = id;
    playerName.textContent = player;
    score.textContent = `${playerScore} Pontos`;

    this.dom.addClassToElements(div, classes); 
    this.dom.appendElementsToOther(playerData, [playerName, score]);
    playerBar.appendChild(playerData);
    container.appendChild(playerBar);
  }

  public addPencilInWhoIsDrawing(whoIsDrawing:string) {
    this.removePencilOfPlayers();
    const whoIsDrawingId = `player-is-${whoIsDrawing}`;
    const whoIsDrawingContainer = document.getElementById(whoIsDrawingId);
    const pencil = this.pencilIcone();

    if(!whoIsDrawingContainer) return;
    whoIsDrawingContainer.appendChild(pencil!);
  }

  private removePencilOfPlayers() {
    const pencil = document.querySelector('.player-bar > .icone');
    if(!pencil) return;
    pencil.remove();
  }

  private pencilIcone() {
    const pencilStr = renderToStaticMarkup(<FaPencilAlt className='icone'/>);
    const pencilIcone = new DOMParser().parseFromString(pencilStr, "text/html");
    return pencilIcone.querySelector('svg');
  }

  public remove(player:string) {
    const id = `player-is-${player}`;
    const playerWhoLeftContainer = document.getElementById(id);
    if(!playerWhoLeftContainer) return;
    playerWhoLeftContainer.remove();
  }

  public updateScore(player:string, score:number) {
    const query = `#player-is-${player} > .player-data > .score`;
    const scoreContainer = document.querySelector(query);
    if(!scoreContainer) return;
    scoreContainer.textContent = `${score} Pontos`;
  }
}

export default PlayerBar;