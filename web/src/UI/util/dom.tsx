class Dom  {

  public createElements(tag:string, quantity:number) {
    const elements = new Array(quantity);
    for(let i = 0; i < quantity; i++) {
      elements[i] = document.createElement(tag);
    }
    return elements;
  }

  public addClassToElements(elements:HTMLElement[], classes:string[]) {
    if(elements.length !== classes.length) return;
    for(let i = 0; i < classes.length; i++) {
      elements[i].className = classes[i];
    }
  }

  public appendElementsToOther(father:HTMLElement, children:HTMLElement[]) {
    for(const child of children) {
      father.appendChild(child);
    }
  }
}

export default Dom;