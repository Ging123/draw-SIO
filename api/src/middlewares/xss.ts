import xss from 'xss';

export function xssBody(req:any, res:any, next:() => void) {
  req.body = sanitazeData(req.body);
  next();
}

export function xssParams(req:any, res:any, next:() => void) {
  req.params = sanitazeData(req.params);
  next();
}

function sanitazeData(data:any):object {
  for(const key in data) {
    const sanitazedHtml = xss(data[key]);
    data[key] = sanitazedHtml;
  }
  return data;
}