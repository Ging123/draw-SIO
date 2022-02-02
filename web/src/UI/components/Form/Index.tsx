import { FormEvent } from "react";
import Text from "../Text/Index";

interface props {
  children?:React.ReactNode;
  error?:string;
  onSubmit?:(e:FormEvent) => void;
}

const Form = (props:props) => {
  return (
    <form onSubmit={ props.onSubmit } style={{ width:'100%' }}>
      { props.children }
      { props.error && 
      <Text  
        color="red" 
        content={ props.error } 
        margin="10px 0px 5px 0px"
        textAlign="center"
      />}
    </form>
  );
};

export default Form;