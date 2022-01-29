export default function exception(message:string, status=400) {
  return { message:message, status:status }
}

export function verifyIfIsAnInternalException(err:any) {
  if(!err.status)  {
    console.log(err)
    return exception('Houve um erro interno...', 500); 
  }
  return err;
}