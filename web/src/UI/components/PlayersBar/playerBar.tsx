import { renderToStaticMarkup } from "react-dom/server"
import { FaPencilAlt } from "react-icons/fa";
import Dom from "../../util/dom";

class PlayerBar {

  private readonly dom = new Dom();

  public create(player:string, id?:string) {
    const container = document.getElementById('players-bar-wrapper')!;
    const div = this.dom.createElements('div', 4);
    const classes = ['player-bar', 'player-data', 'player', 'score'];
    const playerBar=div[0], playerData=div[1], playerName=div[2], score=div[3];
    id = id || `player-is-${player}`;

    playerBar.id = id;
    playerName.textContent = player;
    score.textContent = '0 Pontos';

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
}

export default PlayerBar;