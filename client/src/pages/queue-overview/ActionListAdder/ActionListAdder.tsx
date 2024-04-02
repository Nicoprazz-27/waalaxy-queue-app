import Action from "../../../types/action";
import Button from '../../../components/Button/Button';
import './ActionListAdder.css';


function ActionListAdder( {onAddActionToQueue, actions, creditByAction}: {onAddActionToQueue: CallableFunction, actions: Action[], creditByAction: Map<string, number>}): JSX.Element {

  return (
    <div className="container">
      <h2 className="container-title">Add action to the queue</h2>
        {actions.map((action: Action)=>{
          return (
            <div key={action.id} className="row-button-actions">
              <Button 
                text={action.title} 
                colorStyles={action.personnalizedStyles}
                onClick={()=>onAddActionToQueue(action)}
              /> 
              <div className="credit-printer" style={{borderColor: action.personnalizedStyles.color}}>
                {creditByAction.get(action.id)} c
              </div>
            </div>
          )
        })}
    </div>
  );
}

export default ActionListAdder;