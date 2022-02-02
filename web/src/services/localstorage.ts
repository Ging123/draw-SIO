class LocalStorage {

  public set(key:string, value:any) {
    const dataInString = JSON.stringify(value);
    localStorage.setItem(key, dataInString);
  }

  public get(key:string) {
    const dataInString = localStorage.getItem(key);
    let data:any;
    if(dataInString) data = JSON.parse(dataInString);
    return data;
  }
}

export default LocalStorage;