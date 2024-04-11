import { useEffect, useState } from "react";
import ActionCard from "../../../components/ActionCard/ActionCard";
import QueueAction from "../../../types/queue-action";


function QueueList({queueActions}: {queueActions: QueueAction[]}): JSX.Element {

  const [activeActionIndex, setActiveActionIndex] = useState<number>(-1);

  useEffect(() => {   
    const activeActionIndexFunctionScope: number = queueActions.findIndex((queueAction) => queueAction.expirationDateTime !== null);
    setActiveActionIndex(activeActionIndexFunctionScope);
  }, [queueActions]);


  const subtitle = (): JSX.Element => {
    return (
      <p>
        {queueActions.length === 0 ? 'Waiting for actions' : ''}
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
          {queueActions.map((queueAction, index) => ( 
            <ActionCard 
              key={queueAction.id} 
              action={queueAction.action} 
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