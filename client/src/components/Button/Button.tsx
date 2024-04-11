import ColorStyles from "../../types/color-styles";
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  button: (colorStyles: ColorStyles) =>({
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    minWidth: '200px',
    minHeight: '40px',
    transition: 'background-color 0.3s',
    backgroundColor: colorStyles.color || '',
    '&:hover': {
      backgroundColor: colorStyles.hoverColor || '',
    },
    '&:active': {
      backgroundColor: colorStyles.onClickColor || '',
    },
  }),
});

function Button({text, onClick, colorStyles = {color: '', hoverColor: '', onClickColor: ''}}: {text: string, onClick: CallableFunction, colorStyles?: ColorStyles}): JSX.Element{

  const classes = useStyles( colorStyles );

  return (
    <button 
      className={classes.button}
      onClick={ ()=>onClick()}
    >
      {text}
    </button>
  );
}

export default Button;