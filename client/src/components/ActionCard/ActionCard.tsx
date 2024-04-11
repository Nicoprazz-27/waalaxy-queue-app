import { createUseStyles } from "react-jss";
import Action from "../../types/action";
import ColorStyles from "../../types/color-styles";


const useStyles = createUseStyles({
  actionCardContainer: (props: {colorStyles: ColorStyles; isActive: boolean;})=>({
    minWidth: '200px',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    border: '3px solid',
    borderRadius: '8px',
    borderColor: props.colorStyles.color || '',
    padding: '10px',
    margin: '10px 2px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    transition: 'opacity 1s ease',
    '&:hover': {
      cursor: 'pointer',
    },
    animationName: props.isActive ? '$blink' : 'none',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  }),
  '@keyframes blink': {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 0.7 },
    '100%': { opacity: 0.8 },
  }
});

function ActionCard({action, isActive}: {action: Action, isActive: boolean}): JSX.Element {
  
  const classes = useStyles({ colorStyles: action.personnalizedStyles, isActive });

  return(
    <div 
      className={classes.actionCardContainer} 
    >
      {action.title}
    </div>
  )
}

export default ActionCard;