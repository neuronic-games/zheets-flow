import {action, observable} from 'mobx'
import { LocalParticipant } from './participants/LocalParticipant'
import { RemoteParticipant } from './participants/RemoteParticipant'

export type ChatMessageType = 'text' | 'log' | 'called' | 'callTo' | 'private'
export interface ChatMessageToSend{
  msg:string, //  message
  ts:number,  //  timestamp
  to:string   //  send to
}
export class ChatMessage {
  type:ChatMessageType = 'text'
}

export class Chat {
  @observable messages:ChatMessage[] = []
  @observable sendTo = ''

  @action limitMessages(){

  }
  @action addMessage(msg:ChatMessage){

  }
  participantNameChanged(pid:string, oldName: string){

  }
  participantJoined(pid: string){

  }
  participantLeft(pid: string){

  }
  calledBy(from: RemoteParticipant|LocalParticipant){

  }
  callTo(to: RemoteParticipant|LocalParticipant){

  }
}

const chat = new Chat()
export default chat
