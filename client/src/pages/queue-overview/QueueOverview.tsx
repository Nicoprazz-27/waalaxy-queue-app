import './QueueOverview.css'
import QueueList from './QueueList/QueueList'
import ActionListAdder from './ActionListAdder/ActionListAdder'
import Action from '../../types/action';
import { useEffect, useRef, useState } from 'react';
import { getRequest } from '../../services/request';
import { EXECUTION_TIME_DELAY } from '../../utils/constants';

function QueueOverview(): JSX.Element {

  const [queueActions, setQueueActions] = useState<Action[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [creditByAction, setCreditByAction] = useState<Map<string, number>>(new Map());
  const isTimeOutActive = useRef<boolean>(false);
  const [activeActionId, setActiveActionId] = useState<string|null>(null);
  
  const addActionToQueue = (action: Action) : void => {  
    setQueueActions( (prevQueueActions: Action[]) => [...prevQueueActions, action]);
  }

  //Trigger once
  useEffect( () => {  
    getRequest('/actions')
      .then( (res) => {
        const actions: Action[] = res.data;

        setActions(actions);

        const creditByAction: Map<string, number> = new Map();

        for (let index = 0; index < actions.length; index++) {
          creditByAction.set(actions[index].id, actions[index].creditCost);
        }

        setCreditByAction(creditByAction);
      })   
  }, []);

  //Trigger when queueActions is edited
  useEffect(()=>{
    
    //Case : We don't need to to start a timeout when a timeout is already active
    if(isTimeOutActive.current){
      return;
    }

    //Check if an action could be executed
    let indexFirstAvailableAction: number = -1;
    for (let index = 0; index < queueActions.length; index++) {
      if(creditByAction!.get(queueActions[index].id)! > 0 ){
        setActiveActionId(queueActions[index].id);
        if(indexFirstAvailableAction !== index){
          indexFirstAvailableAction = index;
        }
        break;
      }
    }

    //If no queueActions have credits or queueactions empty. 
    if(indexFirstAvailableAction === -1){
      setActiveActionId(null);
      return;
    }
    
    isTimeOutActive.current = true;

    setTimeout( () => {

      //Remove one credit to the action selected
      setCreditByAction( (prevCreditByAction: Map<string,number>) => {
        const newCreditByAction: Map<string,number> = new Map(prevCreditByAction);
        newCreditByAction.set(queueActions[indexFirstAvailableAction].id, prevCreditByAction!.get(queueActions[indexFirstAvailableAction].id)! -1);
        return newCreditByAction;
      });

      //Remove the action from the queueactions
      setQueueActions( (prevQueueActions: Action[]) => {
        const newQueueActions: Action[] = [...prevQueueActions]; 
        newQueueActions.splice(indexFirstAvailableAction, 1);
        return newQueueActions;
      }); 

      //Timeout is no longer active
      isTimeOutActive.current = false;
      
    }, EXECUTION_TIME_DELAY * 1000);

  }, [queueActions]);

  return (
    <>
      <div className='row'>
        <h1 className='title'>Queue Overview</h1>
      </div>
      <div className='row layout-queue-vue'>
        <div>
          <ActionListAdder onAddActionToQueue={addActionToQueue} actions={actions} creditByAction={creditByAction}/>
        </div>
        <div>
          <QueueList actions={queueActions} activeActionId={activeActionId} />
        </div>
      </div>
    </>
  );
}

export default QueueOverview;