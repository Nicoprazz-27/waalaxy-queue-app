import Action from "../../../types/action";
import Button from '../../../components/Button/Button';
import './ActionListAdder.css';
import useAxios from "../../../hooks/useAxios";


function ActionListAdder( { onAddActionToQueue, creditByAction} : {onAddActionToQueue: CallableFunction, creditByAction: {[key: string]: number;}} ): JSX.Element {

  const { data, isLoading, error} = useAxios<Action>('/actions');

  const renderListActions = () : JSX.Element =>{
    if(isLoading){
      return (<p>Waiting for response...</p>);
    }

    if(data === null){
      return (<p>No action found</p>);
    }

    if(error !== null){
      return (<p>An error occured.</p>)
    }

    return (
      <>
        {data.map((action: Action)=>{
          return (
            <div key={action.id} className="row-button-actions">
              <Button 
                text={action.title} 
                colorStyles={action.personnalizedStyles}
                onClick={()=>onAddActionToQueue(action.id)}
              /> 
              <div className="credit-printer" style={{borderColor: action.personnalizedStyles.color}}>
                {creditByAction[action.id]} c
              </div>
            </div>
          )
        })}
      </>
    );
  }

  return (
    <div className="container">
      <h2 className="container-title">Add action to the queue</h2>
      {renderListActions()}
    </div>
  );
}

export default ActionListAdder;