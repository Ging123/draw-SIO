import './styles.scss';

interface props {
  margin?:string;
  maxLength?:number;
  onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?:string;
  type?:"email"|"password"|"text";
  value?:string;
}

const DefaultInput = (props:props) => {
  return (
    <div className="default-input-wrapper" style={{ margin:props.margin }}>
      <div>{ props.placeholder }</div>
      <input 
        className="default-input"
        maxLength={ props.maxLength }
        onChange={ props.onChange }
        type={ props.type } 
        value={ props.value }
      />
    </div>
  );
};

export default DefaultInput;