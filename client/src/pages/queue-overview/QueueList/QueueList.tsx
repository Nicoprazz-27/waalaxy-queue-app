import { useEffect, useState } from "react";
import Action from "../../../types/action"
import ActionCard from "../../../components/ActionCard/ActionCard"
import './QueueList.css'


function QueueList({actions, activeActionId}: {actions: Action[], activeActionId: string|null}): JSX.Element {

  const [activeActionIndex, setActiveActionIndex] = useState<number>(-1);

  useEffect(() => {   
    const activeActionIndexFunctionScope: number = actions.findIndex((action) => action.id === activeActionId);
    setActiveActionIndex(activeActionIndexFunctionScope);
  }, [actions, activeActionId]);


  const subtitle = (): JSX.Element => {
    return (
      <p>
        {actions.length === 0 ? 'Waiting for actions' : ''}
      </p>
    );
  }

  return (
    <div className="container">
      <h2 className="container-title">Queue</h2>
      <div className="queue-actions-container">
        <h3 className="queue-container-subtitle">First In</h3>
        {subtitle()}
        <div>
          {actions.map((action: Action, index: number) => ( 
            <ActionCard 
              key={index} 
              action={action} 
              isActive={index === activeActionIndex}
            />
          ))}
        </div>
        <h3 className="queue-container-subtitle">Last Out</h3>
      </div>
    </div>
  );
}
  
export default QueueList;