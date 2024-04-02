import Action from "../../types/action";
import './ActionCard.css';


function ActionCard({action, isActive}: {action: Action, isActive: boolean}): JSX.Element {

  const customStyle: React.CSSProperties = {
    borderColor: action.personnalizedStyles.color,
    animation: isActive ? 'blink 1s infinite' : 'none'
  };

  return(
    <div 
      className={`action-card-container`} 
      style={customStyle}
    >
      {action.title}
    </div>
  )
}

export default ActionCard;