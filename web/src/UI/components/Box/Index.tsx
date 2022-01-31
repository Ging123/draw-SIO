import './styles.scss';

interface props {
  children?:React.ReactNode;
}

const Box = (props:props) => {
  return (
    <div className='box'>
      { props.children }
    </div>
  );
};

export default Box;