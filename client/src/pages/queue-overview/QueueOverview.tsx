import './QueueOverview.css'
import QueueList from './QueueList/QueueList'
import ActionListAdder from './ActionListAdder/ActionListAdder'
import { useEffect, useState } from 'react';
import QueueAction from '../../types/queue-action';
import { getRequest, postRequest } from '../../services/request';

function QueueOverview(): JSX.Element {

  const [queueActions, setQueueActions] = useState<QueueAction[]>([]);
  const [creditByAction, setCreditByAction] = useState<{ [key: string]: number; }>({});

  //Trigger once
  useEffect( () => {  
    getRequest('/queue-actions')
      .then( (res) => {
        const queueActions: QueueAction[] = res.data;
        setQueueActions(queueActions);
      })

    getRequest('/credits')
      .then((res)=>{
        const creditsByAction: { [key: string]: number; } = res.data;
        setCreditByAction(creditsByAction);
      })
      
  }, []);

  const addActionToQueue = (actionId: string)=>{
    postRequest('/queue-actions', {actionId: actionId})
      .then((res)=> {
        const queueActions: QueueAction[] = res.data;
        setQueueActions(queueActions);
      })
  }

  useEffect( ()=>{
    let timeOutToDeleteQueueAction :NodeJS.Timeout |null= null;

    for (let index = 0; index < queueActions.length; index++) {
      if(queueActions[index].expirationDateTime !== null){
        const expirationDateTime = new Date(queueActions[index].expirationDateTime!);
        const now = new Date();
        const delayInSeconds = (expirationDateTime.getTime() - now.getTime()) / 1000;
        
        timeOutToDeleteQueueAction = setTimeout(() => {
          setQueueActions(prevQueueActions => prevQueueActions.filter( (queueAction, i) => i !== index));
          setCreditByAction(queueActions[index].creditByActionAfterExpiration);
        }, delayInSeconds  * 1000);
        break;
      }
    }

    return ()=> {
      if(timeOutToDeleteQueueAction !== null){
        clearTimeout(timeOutToDeleteQueueAction);
      }
    }
  }, [queueActions]);


  return (
    <>
      <div className='row'>
        <h1 className='title'>Queue Overview</h1>
      </div>
      <div className='row layout-queue-vue'>
        <div>
          <ActionListAdder onAddActionToQueue={addActionToQueue} creditByAction={creditByAction}/>
        </div>
        <div>
          <QueueList queueActions={queueActions} />
        </div>
      </div>
    </>
  );
}

export default QueueOverview;