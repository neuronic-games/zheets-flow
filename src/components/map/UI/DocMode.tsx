import {BMProps} from '@components/utils'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect/* , useRef, useState */} from 'react'
import {/* Observer,  */useObserver} from 'mobx-react-lite'
import { isSmartphone } from '@models/utils'
import { /* getAllMessageData,  */getAllSheetData } from '@components/App'
import { getAllUserData } from '@components/error/TheEntrance'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import DoneIcon from '@material-ui/icons/Done';
/* import { isCanvasMoved } from '../Base' */
import { getItemSelected } from './ViewMode'
/* import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxIcon from '@material-ui/icons/Done';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'; */
import viewDocIcon from '@images/flow_sym_view_doc.png'
import addNoteIcon from '@images/flow_sym_add.png'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
/* import { Input, MenuItem } from '@material-ui/core'
import { TextareaAutosize } from '@material-ui/core/' */
import btnGo from '@images/flow_sym_go.png'

/* import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput'; */

/* import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText' */
import { isCanvasMoved } from '../Base'
import { updateSheetDetails } from '@models/api/GoogleSheet'

/* import ArrowExpandMore from '@material-ui/icons/ExpandMore'; */

import moment from "moment";

import btnAddComment from '@images/flow_sym_add_big.png'
import btnCancelComment from '@images/flow_sym_cancel.png'



/* import Calendar from "react-calendar";
import Edit from '@material-ui/icons/Edit'
import DatePicker from "react-datepicker"; */

import Calendar from "react-calendar";
/* import Dropdown from 'react-dropdown'; */
import Select from 'react-select'


/* const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}; */


interface StyleProps{
  props: BMProps,
}

const buttonStyle = {
  '&': {
    margin: '5px',
    borderRadius: '50%',
    width: '250px',
    height: '243px',
    textAlign: 'center',
    overflow: 'hidden',
    top: '1px',
    PointerEvent: 'none',
  },
}


const customStyles = {
  control: (base:any, state:any) => ({
    ...base,
   /*  background: "#808080",
 */
   background: "#808080",
   /* color: "#000000", */
    /* borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    borderColor: state.isFocused ? "#FFFFFF" : "#FFFFFF", */
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      /* borderColor: state.isFocused ? "lightorange" : "orange" */
    }
  }),
  dropdownIndicator: (base:any) => ({
    ...base,
    color: "#FFFFFF" // Custom colour
  }),
  menu: (base:any) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base:any) => ({
    ...base,
    padding: 0
  }),
  option: (provided:any, state:any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#F7931E' : 'inherit',
    '&:hover': { backgroundColor: state.isSelected ? '#F7931E' : 'rgb(249, 217, 181)' }
  }),
};
//rgb(222, 235, 255)

const useStyles = makeStyles({

  root: {
    padding: 2,
  },

  rootList: {
    padding: 2,
    position:'relative',
    height: isSmartphone() ? 'auto' : 'auto',
    fontSize:isSmartphone() ? '2.2em' : '1.5em',
    fontFamily: 'DINCondensed-Bold',
    overflow: 'auto',
  },

  formControlLabel: {
    fontSize: isSmartphone() ? '2.5em' : "1em"
  },

  tapBroadcast: {
    display: 'block',
    width:'265px',
    position:'relative',
    left:'-10px',
    textAlign:'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '20px',
    textShadow: '1px 1px #000, -1px 1px #cdcdcd, -1px -1px #cdcdcd, 1px -1px #cdcdcd' // '1px 2px 2px #000000' //
  },
  tapBroadcastText: {
    display: 'block',
    width:'265px',
    position:'relative',
    top: '-20px',
    left:'-10px',
    textAlign:'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '20px',
    textShadow: '1px 1px #000, -1px 1px #cdcdcd, -1px -1px #cdcdcd, 1px -1px #cdcdcd' // '1px 2px 2px #000000' //
  },
  hidetapBroadcast:{
    display: 'none',
  },
  fab:{
    display:'none',
    opacity: 0,
    transition: 'opacity 0.3s ease-out',
  },
  fabActive: {
    display:'block',
    opacity: 1,
    transition: 'opacity 0.3s ease-out'
  },
  vidicon:{
    display: 'none',
    height: 50,
    position:'relative',
    backgroundColor: 'black',
    transform: 'rotateY(180deg)',
    right: 0,
    ...buttonStyle,
  },
  vidiconActive:{
    display: 'block',
    height: 50,
    position:'relative',
    alignItems:'center',
    backgroundColor: 'black',
    transform: 'rotateY(180deg)',
    right: 0,
    ...buttonStyle,
  },
  container: (props: StyleProps) =>({
    position: 'relative',
    width: props.props.stores.map.screenSize[0] + 'px',
    height: (props.props.stores.map.screenSize[1] - 200) + 'px',
    top: (-props.props.stores.map.screenSize[1]/2) + 'px',
    left:(-props.props.stores.map.screenSize[0]/2) + 'px',
    padding: 0,
    outline: 'none',
    /* pointerEvents: 'none', */
    textAlign:'left',
    cursor: 'pointer'
  }),


  listSection: {
    backgroundColor: '#FFFFFF',
  },
  ul: {
    backgroundColor: '#FFFFFF',
    padding: 0,
  },

  ddRoot: {
    position: 'relative',
    width: '100%',
    left: '0.3em',
    top:'0.1em',
  },

  ddPlaceHolder: {
    position: 'relative',
    top:'0.1em',
  },

  ddArrows: {
    position: 'relative',
    width: '10px',
    height: '10px',
    backgroundColor: '#FFFFFF',
  },




  /* wrapper:{width:'100%'},
  wrapperInner:{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-end'}, */



})

let dispUserName = ""
let assignedTaksUser = ""
let assignedUserIndex = -1

let assignedUserName = ''
let prevSelectedUserIndex = -1
let prevSelectedDueDate = ""


let cont_WH:any = []
export function getContDim() {
  return cont_WH;
}


let taskCount:number = 0
export function getTotalTaskCount() {
  return taskCount
}

let isAddNoteDialogActive:boolean = false
export function getAddNoteDialogStatus() {
  return isAddNoteDialogActive
}



////////////////////////////////////////////////////
let AllSelectedMessages:any = []
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
let dateSelected:boolean = false
////////////////////////////////////////////////////



export const DocMode: React.FC<BMProps> = (props) => {

  //console.log(props, " --- ", getItemSelected())




  /* setTimeout(function() {
    console.log(props.stores.map.screenSize, " in VM")
  }, 1500) */

  /* const screenRes = useObserver(() => props.stores.map.screenSize[0]) */
  //console.log(screenRes, "AAA")
  const menuName = useObserver(() => props.stores.roomInfo.activeMenuType)
  //const activeUserId  = useObserver(() => props.stores.roomInfo.activeLoggedInUserId)


  // To get selected Item
  let selectedItem = getItemSelected()

  // Find the Selected Item from the flow data

  /* props.stores.roomInfo.activeFlowData.map((Item:any, index:number)=>{
    //console.log(Object.assign({}, Item), " ---- ", selectedItem)
    Object.assign({}, Item) === selectedItem ? console.log(Object.assign({}, Item)) : ''
  }) */







  //console.log(allMessages.data, " MESSAGES")

  //console.log(selectedItem, " In VM---")

  let AllFlowItemsDetails:any = []
  let AllFlowMessages:any = []


  const sheetFlowData = getAllSheetData()
  //Object(sheetFlowData.data)
  for (let i=0; i<Object(sheetFlowData.data).length; i++) {
    if(Object(sheetFlowData.data[i])['Doc'] !== "" && Object(sheetFlowData.data[i])['Include'] === "TRUE") {
      //console.log((Object(sheetFlowData.data[i])['HSS Dwg #']), " aaaa")
      AllFlowItemsDetails.push(Object(sheetFlowData.data[i]))
    }
  }
///////////////////////////////////////////////////////////////////////////////////////
// Store state
const [docDone, setDocDone] = React.useState(false)
const [docSelected, setDocSelected] = React.useState("")
const [open, setOpen] = React.useState(false);
const [comment, setComment] = React.useState('');
const [openAssign, setOpenAssign] = React.useState(false);

const [selectedIndex, setSelectedIndex] = React.useState(-1);
/* const [selectedUser, setSelectedUser] = React.useState({value:'', label:''}); */
console.log(docSelected, '!==', getTaskDueDate())
//let sDate:string = '"'+getTaskDueDate()+'"'
const [value, onChange] = React.useState<Value>(new Date());
////////////////////////////////////////////////////////////////////////////////////
const sheetUserData = getAllUserData()
// To get all message data
const flowMessages = useObserver(() => props.stores.roomInfo.activeFlowMessages)


const activeUserName = useObserver(() => props.stores.roomInfo.activeLoggedInUser)
if(activeUserName !== "") {
  dispUserName = activeUserName.split(" ")[0].charAt(0).toUpperCase() + "" + activeUserName.split(" ")[1].charAt(0).toUpperCase()
} else {
  dispUserName = ""
}

//console.log(flowMessages, " ALL MESSAGES")

//console.log(assignedTaksUser, '!==' , prevSelectedUserIndex , '!==', assignedUserIndex)

/* const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
] */


if(props.stores.roomInfo.activeMenuType === 'docdetailview') {

  /////////////////////////////////////////////////////////////
  let allMessages = flowMessages
  //let AllSelectedMessages:any = []
  AllSelectedMessages = []
  AllFlowMessages = []
  //if(AllSelectedMessages.length === 0) {
    for (let i=0; i<Object(allMessages).length; i++) {
      //////////////////////////////////////////////////////////////////////////////////////////////////////
      // New Logic
      let allAssignItems = selectedItem[docSelected].split(":");
      //console.log(allAssignItems, " IIIII")
      for(let j=0; j<allAssignItems.length; j++) {
        if(allAssignItems[j].indexOf("M") !== -1) {
          //console.log(Object(allMessages.data[i])['ID'], " --MCHECK-- ", allAssignItems[j])
          if(Object(allMessages[i])['ID'] === allAssignItems[j]) {
            AllSelectedMessages.push(Object(allMessages[i]))
          }
        }
      }
      // Storeing values
      AllFlowMessages.push(Object(allMessages[i]))
      //console.log(AllFlowMessages, " FlowMessages")
    }
  //}

  //props.stores.roomInfo.activeFlowMessages = AllSelectedMessages
  //console.log(AllFlowMessages, " MESSAGES")
  //console.log(prevSelectedUserIndex, "!==", assignedUserIndex)

  //console.log("vvvvvvvvvvvvvvvvv------", assignedTaksUser, "---", moment(new Date(prevSelectedDueDate)).format("L"), " >>> ", moment(value?.toString()).format('L'))
  //console.log(assignedTaksUser, '!== "" ||', prevSelectedUserIndex, '!==', assignedUserIndex, '||', (moment(new Date(prevSelectedDueDate)).format("L"), '!==', moment(value?.toString()).format('L')))

  if(docDone && assignedUserIndex !== -1) {
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID":"M'+ (props.stores.roomInfo.activeFlowMessages.length+1) +'", "Station": "'+ getSelectedTaskTitle() +'", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "'+ getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId) +'", "Message": "Task marked completed."}')

    // string value to update the spreadsheet Message Tab
    let updateMessage:any = [dateString, ('M' + (props.stores.roomInfo.activeFlowMessages.length+1)), getSelectedTaskTitle(), props.stores.roomInfo.activeLoggedInUserId, getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId), 'Task marked completed.']


    AllSelectedMessages.splice(0,0,newItem)
    updateFlowData('Message_Done', AllSelectedMessages[0]['ID'], '', updateMessage, '')

    /* props.stores.roomInfo.activeFlowMessages = AllSelectedMessages
    updateFlowData('Message_Done', AllSelectedMessages[0]['ID'], '') */
    //console.log(AllSelectedMessages, " after change")
  } else if(open === false && comment !== '') {
    // Add new custom comment from user
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    //console.log(comment, " >>>new Item")

    let msgStr = '{"Timestamp": "'+ dateString +'", "ID": "M'+ (props.stores.roomInfo.activeFlowMessages.length+1) +'", "Station": "'+ getSelectedTaskTitle() +'", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "'+ getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId) +'", "Message": "' + comment +'"}'

    const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
    let actualMessage = msgStr.replace(regex, '').replace(/\n/g, ' ')
    let newItem:string = JSON.parse(actualMessage)

    // string value to update the spreadsheet Message Tab

    let updateMessage:any = [dateString, ('M' + (props.stores.roomInfo.activeFlowMessages.length+1)), getSelectedTaskTitle().replace(regex, '').replace(/\n/g, ' '), props.stores.roomInfo.activeLoggedInUserId, getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId), comment.replace(regex, '').replace(/\n/g, ' ')]

    AllSelectedMessages.splice(0,0,newItem)
    // Update that message to observable object
    AllFlowMessages.splice(0, 0, newItem)
    //console.log("total message ", AllFlowMessages)
    props.stores.roomInfo.activeFlowMessages = AllFlowMessages; //AllSelectedMessages
    updateFlowData('Message', AllSelectedMessages[0]['ID'], '', updateMessage, '')
    // Reset it again
    setComment('')
  } else if(openAssign === false && assignedTaksUser !== "" && prevSelectedUserIndex !== assignedUserIndex) {
 /*  } else if(openAssign === false && (assignedTaksUser !== "" || prevSelectedUserIndex !== assignedUserIndex || (moment(new Date(prevSelectedDueDate)).format("L") !== moment(value?.toString()).format('L')))) { */
 console.log("MSG ASSIGN UPDATED")
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID":"M'+ (props.stores.roomInfo.activeFlowMessages.length+1) +'", "Station": "'+ getSelectedTaskTitle() +'", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "'+ getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId) +'", "Message": "Task has reassigned to ' + assignedTaksUser +'"}')
    AllSelectedMessages.splice(0,0,newItem)

    // string value to update the spreadsheet Message Tab
    const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
    let updateMessage:any = [dateString, ('M' + (props.stores.roomInfo.activeFlowMessages.length+1)), getSelectedTaskTitle().replace(regex, '').replace(/\n/g, ' '), props.stores.roomInfo.activeLoggedInUserId, getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId), ('Task has reassigned to ' + assignedTaksUser).replace(regex, '').replace(/\n/g, ' ')]

    AllFlowMessages.splice(0, 0, newItem)
    props.stores.roomInfo.activeFlowMessages = AllFlowMessages; //AllSelectedMessages
    updateFlowData('Message_Assign', AllSelectedMessages[0]['ID'], assignedTaksUser, updateMessage, '')
    //console.log("USER UDATED")
    /////////////////////////////////////////////////
    prevSelectedUserIndex = assignedUserIndex
    assignedTaksUser = ''
    assignedUserIndex = -1
    /////////////////////////////////////////////////
  } else if(openAssign === false && dateSelected === true && (moment(new Date(prevSelectedDueDate)).format("L") !== moment(value?.toString()).format('L'))) {
    console.log("DUE DATE UPDATED")
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID":"M'+ (props.stores.roomInfo.activeFlowMessages.length+1) +'", "Station": "'+ getSelectedTaskTitle() +'", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "'+ getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId) +'", "Message": "Task due date changed to ' + (moment(value?.toString()).format("L")) +'"}')
    AllSelectedMessages.splice(0,0,newItem)

    // string value to update the spreadsheet Message Tab
    const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
    let updateMessage:any = [dateString, ('M' + (props.stores.roomInfo.activeFlowMessages.length+1)), getSelectedTaskTitle().replace(regex, '').replace(/\n/g, ' '), props.stores.roomInfo.activeLoggedInUserId, getMessageUserInitial(props.stores.roomInfo.activeLoggedInUserId), ('Task due date changed to ' + (moment(value?.toString()).format("L"))).replace(regex, '').replace(/\n/g, ' ')]

    AllFlowMessages.splice(0, 0, newItem)
    props.stores.roomInfo.activeFlowMessages = AllFlowMessages; //AllSelectedMessages
    updateFlowData('Message_DueDate', AllSelectedMessages[0]['ID'], assignedTaksUser, updateMessage, (moment(value?.toString()).format("L")))

    prevSelectedDueDate = moment(value?.toString()).format("L")
    dateSelected = false
  }





  /////////////////////////////////////////////////////////////
  //let allMessages = getAllMessageData()
 /*  let allMessages = getAllMessageData()
  //let AllSelectedMessages:any = []
  if(AllSelectedMessages.length === 0) {
    for (let i=0; i<Object(allMessages.data).length; i++) {
      //////////////////////////////////////////////////////////////////////////////////////////////////////
      // New Logic
      let allAssignItems = selectedItem[docSelected].split(":");
      //console.log(allAssignItems, " IIIII")
      for(let j=0; j<allAssignItems.length; j++) {
        if(allAssignItems[j].indexOf("M") !== -1) {
          //console.log(Object(allMessages.data[i])['ID'], " --MCHECK-- ", allAssignItems[j])
          if(Object(allMessages.data[i])['ID'] === allAssignItems[j]) {
            AllSelectedMessages.push(Object(allMessages.data[i]))
          }
        }
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      // Prev Logic
      //if(Object(allMessages.data[i])['ID'] === selectedItem[docSelected].split(":")[3]) {
        //AllSelectedMessages.push(Object(allMessages.data[i]))
      //}
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  }

  //props.stores.roomInfo.activeFlowMessages = AllSelectedMessages
  //console.log(prevSelectedUserIndex, "!==", assignedUserIndex)

  if(docDone && assignedUserIndex !== -1) {
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID": "", "Station": "", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "", "Message": "Task marked completed."}')
    AllSelectedMessages.splice(0,0,newItem)
    //console.log(AllSelectedMessages, " after change")
  } else if(open === false && comment !== '') {
    // Add new custom comment from user
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID": "", "Station": "", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "", "Message": "' + comment +'"}')
    AllSelectedMessages.splice(0,0,newItem)

    // Update that message to observable object
    props.stores.roomInfo.activeFlowMessages = AllSelectedMessages

    // Reset it again
    setComment('')
  } else if(openAssign === false && assignedTaksUser !== "" && prevSelectedUserIndex !== assignedUserIndex) {
    let doneDate = new Date()
    let year = doneDate.getFullYear();
    let month = String(doneDate.getMonth() + 1).padStart(2, '0');
    let day = String(doneDate.getDate()).padStart(2, '0');
    let hours = String(doneDate.getHours()).padStart(2, '0');
    let minutes = String(doneDate.getMinutes()).padStart(2, '0');
    let seconds = String(doneDate.getSeconds()).padStart(2, '0');
    let dateString = month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds

    let newItem:string = JSON.parse('{"Timestamp": "'+ dateString +'", "ID": "", "Station": "", "Sender ID": "'+ props.stores.roomInfo.activeLoggedInUserId +'", "Sender": "", "Message": "Task has reassigned to ' + assignedTaksUser +'"}')
    AllSelectedMessages.splice(0,0,newItem)

    /////////////////////////////////////////////////
    prevSelectedUserIndex = assignedUserIndex
    /////////////////////////////////////////////////
  } */
}
//console.log("RECORDED : ", AllSelectedMessages)


///////////////////////////////////////////////////////////////////////////////////////
//console.log(Object(props.stores.roomInfo.activeFlowMessages), " values")
///////////////////////////////////////////////////////////////////////////////////////
 // Declare a new array
  let docList:any = [];
  // Declare an empty object
  let unique_Doc:any = {};
  // Loop for the array elements
  for (let i in AllFlowItemsDetails) {
      // Extract the title
      let doc_Title = AllFlowItemsDetails[i]['Doc Ref'];
      // Use the title as the index
      unique_Doc[doc_Title] = AllFlowItemsDetails[i];
  }
  // Loop to push unique object into array
  for (let i in unique_Doc) {
    docList.push(unique_Doc[i]);
  }
  // Display the unique objects
  //console.log(docList, " new Array");
///////////////////////////////////////////////////////////////////////////////////////

//console.log(docList, " docList")

/* docList.map((docitem:any, i:number)=> {
  AllFlowItemsDetails.map((item:any, i:number)=> {
    //if(item.Doc === docitem.Doc) {
      //console.log(docitem.Doc, " ---- ", item.ID)
        console.log(AllFlowItemsDetails[i].find("TASK - "))
    //}
  })
}) */


let taskList:any = []

//docList.map((docitem:any, i:number)=> {
  //if(key.indexOf('ITEM - ') > -1){ // or ==0 if "starts with"
    //console.log('I have datasource - ', docList[key]);
  //}
  for (let key in selectedItem) {
    //if(key.indexOf('ITEM - ') != -1){
      //console.log(key.indexOf('TASK - '), " >>key")
      if(key.indexOf('TASK - ') === 0) {
        //console.log("Found ----", docList[i][key].split(':')[0])
        //let toShow = docList[0][key].split(':')[0]
        //if(toShow !== "C") {
          //console.log("Found ----", docList[i][key].split(':')[1])
          //taskList.push(docList[0])
          taskList.push(key)
        //}
      }
    //}
  }
//})

taskCount = taskList.length;


//console.log(docList, " >>>>>")



  /* AllFlowItemsDetails.find((item: any) => {
    console.log(item['HSS Dwg #'])
  }); */

  //console.log((AllFlowItemsDetails)[0]['HSS Dwg #'], " aaaa")

  //console.log(String(Object(props).data), " >>>>> VM")
/*
  const {map, roomInfo} = props.stores
  const activeUserName = useObserver(() => roomInfo.activeLoggedInUser)


  ///////////////////////////////////////////////////////////////////
  const flowData = ((Object(props).data))
  // Format to correct data
  console.log(activeUserName, " -IN VIEW MODE-- ", flowData[0])
  ///////////////////////////////////////////////////////////////////
  // Selected Menu Name
  const menuName = useObserver(() => props.stores.roomInfo.activeMenuType)
  console.log(menuName, " Selected Menu")

  if(activeUserName != "") {
    dispUserName = activeUserName.split(" ")[0].charAt(0).toUpperCase() + "" + activeUserName.split(" ")[1].charAt(0).toUpperCase()
  } else {
    dispUserName = ""
  }
 */
  //console.log(activeUserName, " active Login user name")
  /////////////////////////////////////////////////////////////////

  /* const bind = useGesture(
    {
      onDragStart: ({buttons, xy, event}) => {
        event?.preventDefault();
        document.body.focus()
        console.log("Dragging")
      },
      onDrag: ({down, delta, xy, buttons, event}) => {
        event?.preventDefault()

      },
      onDragEnd: ({event, xy}) => {
        event?.preventDefault()
      },
      onMove: ({event, xy}) => {
        event?.preventDefault()
        console.log("Moving")
      },
    }),
    {
      eventOptions:{passive:false}, //  This prevents default zoom by browser when pinch.
    }, */






    /* const activeUserName = useObserver(() => props.stores.roomInfo.activeLoggedInUser)

    if(activeUserName !== "") {
      dispUserName = activeUserName.split(" ")[0].charAt(0).toUpperCase() + "" + activeUserName.split(" ")[1].charAt(0).toUpperCase()
    } else {
      dispUserName = ""
    } */





    //////////////////////////////////////////////////////////////////////////////////
    // Get all users
    let userData = getAllUserData()
    //console.log(userData, " userData")

    ///////////////////////////////////////////////////////////////////////////////////
    // For day differece
    /* var date1 = new Date("06/30/2023");
    var date2 = new Date("07/30/2023");
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days, " Difference_In_Days") */


    ///////////////////////////////////////////////////////////////////////////////////
    // Get Total completed
    function getCompletedTaskCount(index:number) {
      let totalCompleted = 0
      /* for (let key in docList[index]) { */
      //console.log(Object(selectedItem)[index], " --- ", Object(selectedItem))
      for (let key in Object(selectedItem)) {
        //console.log(key, ' key ')
          if(key.indexOf('TASK - ') === 0) {
            let toShow = Object(selectedItem)[key].split(':')[0]
            if(toShow === "C") {
              totalCompleted++
            }
          }
        }
        return totalCompleted
    }
    ///////////////////////////////////////////////////////////////////////////////////

    // Days Remaining
    function getDaysRemaining(endDate:string) {
      //console.log(endDate, " enddate")
      let dDate = new Date()
      let day = dDate.getDate();
      let month = dDate.getMonth();
      let year = dDate.getFullYear();
      // current date in format
      let cDateFormat =  month + "/" + day + "/" + year;
      var date1 = new Date(cDateFormat);
      var date2 = new Date(endDate);
      var Difference_In_Time = date2.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      return Difference_In_Days
    }
    ///////////////////////////////////////////////////////////////////////////////////
    /* const sheetUserData = getAllUserData() */
    // Find usernname based on id
    /* function getUserInitials(id:string) {
      let userInitials = ""
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']).split("P")[1] === id) {
          userInitials = Object(sheetUserData.data[i])['Initials']
        }
      }
      return userInitials
    } */

    function getTaskUserId(user_name:string) {
      let userId = ""
      //console.log(user_name, " user_name")
      let userNameFromMessageInfo = user_name.toLowerCase()
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        //console.log(String(Object(sheetUserData.data[i])['Full Name']).toLowerCase() , "===", userNameFromMessageInfo)
        if(String(Object(sheetUserData.data[i])['Full Name']).toLowerCase() === userNameFromMessageInfo) {
          userId = Object(sheetUserData.data[i])['ID']
        }
      }
      return userId
    }

    function getTaskUserInitials(taskInfo:string) {
      let userInitials = ""
      //console.log(taskInfo, " fetching init")
      let userIdFromTaskInfo = taskInfo.split(':')[1]
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromTaskInfo) {
          userInitials = Object(sheetUserData.data[i])['Initials']
        }
      }
      return userInitials
    }


    function getUserName(taskInfo:string) {
      let userName = "Not Assigned"
      //console.log(taskInfo, " fetching init")
      let userIdFromTaskInfo = taskInfo.split(':')[1]
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromTaskInfo) {
          userName = Object(sheetUserData.data[i])['Full Name']
        }
      }
      return userName.toUpperCase()
    }

    function getUserNameNormal(taskInfo:string) {
      let userName = ""
      //console.log(taskInfo, " fetching init")
      let userIdFromTaskInfo = taskInfo.split(':')[1]
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromTaskInfo) {
          userName = Object(sheetUserData.data[i])['Full Name']
        }
      }
      return userName;
    }

    function getMessageUserName(userId:string) {
      let userName = ""
      //console.log(taskInfo, " fetching init")
      let userIdFromMessageInfo = userId
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromMessageInfo) {
          userName = Object(sheetUserData.data[i])['Full Name']
        }
      }
      return userName.toUpperCase()
    }


    //////////////////////////////////////////////////////////////////////////////////
    function getMessageUserInitial(userId:string) {
      let userInitial = ""
      //console.log(taskInfo, " fetching init")
      let userIdFromMessageInfo = userId
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromMessageInfo) {
          userInitial = Object(sheetUserData.data[i])['Initials']
        }
      }
      return userInitial.toUpperCase()
    }

    //////////////////////////////////////////////////////////////////////////////////

    /* function getUserTotalTasks() {
      let userTasks = 0
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        //console.log(String(Object(sheetUserData.data[i])['ID']).split("P")[1] , ' === ', String(activeUserId).split('P')[1])
        if(String(Object(sheetUserData.data[i])['ID']).split("P")[1] === String(activeUserId).split('P')[1]) {
          userTasks++
        }
      }
      //console.log(userTasks, " >>>")
      return userTasks
    } */
    /* function getUserTotalTasks11() {
      let userTasks = 0
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        console.log(taskList, " tList")
        for (let j=0; i<taskList.length; j++) {
          if(Object(sheetUserData.data[i])[taskList].split(':')[1] === activeUserId) {
          //if(String(Object(sheetUserData.data[i])['ID']).split("P")[1] === String(activeUserId).split('P')[1]) {
            userTasks++
          }
        }
      }
      //console.log(userTasks, " >>>")
      return userTasks
    } */

    /* function getUserTotalTasks() {
      let userTasks = 0
      AllFlowItemsDetails.map((lisitem:any, i:number)=>
        taskList.map((item:any, index:number)=>
        (lisitem[item].split(':')[0] !== 'C' && lisitem[item].split(':')[1] === activeUserId) ?
        userTasks++ : 0
      ))
      return userTasks
    } */

    ///////////////////////////////////////////////////////////////////////////////////////
    /* let user_Task = ""
    AllFlowItemsDetails.map((lisitem:any, i:number)=>
      taskList.map((item:any, index:number)=>
      (lisitem[item].split(':')[0] !== 'C' && lisitem[item].split(':')[1] === activeUserId) ?
      console.log(lisitem[item], " --- ", item, " ==== ", index)  : ""
    )) */

    ///////////////////////////////////////////////////////////////////////////////////////


    //console.log(getUserTotalTasks(), " total user task")

    ///////////////////////////////////////////////////////////////////////////////////

    /* const bind = useGesture(
      {
        onDragStart: ({buttons, xy, event}) => {
          //event?.preventDefault()
          document.body.focus()
          console.log("START DRAG")
        },
        onDrag: ({down, delta, xy, buttons, event}) => {
        },
        onDragEnd: ({event, xy}) => {
        },
        onPinch: ({da: [d, a], origin, event, memo}) => {
        },
        onTouchStart:(ev) => {
        },
        onTouchEnd:(e) => {
        },
      },
      {
        eventOptions:{passive:false}, //  This prevents default zoom by browser when pinch.
      },
    ) */
  //////////////////////////////////////////////////////////////////
  //console.log(menuName, " menuName")
  if(menuName === 'docview' || menuName === 'listview') {
    AllSelectedMessages.splice(0)
    AllSelectedMessages = []
    assignedUserIndex = -1
    assignedTaksUser = ''
    prevSelectedUserIndex = -1
    prevSelectedDueDate = ''
    dateSelected = false
    if(docDone) {
      setDocDone(false)
    }
    if(openAssign) {
      setOpenAssign(false)
    }
  } else if(menuName === 'docdetailview') {
    //assignedUserIndex = getTaskUserIndex()
    /* if(getTaskDueDate() === 'undefined') {
      onChange(getTaskDueDate())
    } */

  }
  //////////////////////////////////////////////////////////////////
  function updateGoogleSheet(sheet_Id:string, sheet_Name:string, matchDocIndex:string, matchColName:string, newColValue:string, updateType:string, msgInfo:any) {
    //console.log(sheetId, " --- ", sheetName)
    updateSheetDetails(sheet_Id, sheet_Name, matchDocIndex, matchColName, newColValue, updateType, msgInfo).then((data) => {
      console.log(data, " >>from flow API")
    })
  }
  //////////////////////////////////////////////////////////////////
  function updateFlowData(_type:string, _val:string, assignUser:string, msgInfo:any, dueDate:string) {
    //console.log(_type, " item _type")
    let sendForSheetUpdate:boolean = false
    for (let i=0; i<Object(props.stores.roomInfo.activeFlowData).length; i++) {
      if(Object.assign({}, props.stores.roomInfo.activeFlowData[i])[docSelected] === selectedItem[docSelected]) {
        console.log("CALLED ----- ", (Object.assign({}, props.stores.roomInfo.activeFlowData[i])[docSelected]), " === ", selectedItem[docSelected])
        //console.log(Object.assign({}, props.stores.roomInfo.activeFlowData[i])[docSelected], " === ", selectedItem[docSelected])
        let ItemInfo = String(Object.assign({}, props.stores.roomInfo.activeFlowData[i])[docSelected]).split(':')
        if(_type === "Message") {
          let tempInfo = ''
          for(let j=3; j<ItemInfo.length; j++) {
            tempInfo += ":" + ItemInfo[j]
          }
          let updateInfoWithNewMessage = (ItemInfo[0] + ":" + ItemInfo[1] + ":" + ItemInfo[2] + ":") +  _val + tempInfo
          Object(props.stores.roomInfo.activeFlowData[i])[docSelected] = updateInfoWithNewMessage
          /////////////////////////////////////////////////////////////////////////////
          // Send this value to api to update googlesheet
          //console.log("DOC SELECTED --- ", selectedItem['ID'], docSelected)
          /////////////////////////////////////////////////////////////////////////////
          if(sendForSheetUpdate === false) {
            sendForSheetUpdate = true
            // Calling to update Master table
            updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Master", selectedItem['ID'], docSelected, updateInfoWithNewMessage, 'masterUpdate', '')
            /////////////////////////////////////////////////////////////////////////////
            setTimeout(function() {
              updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Messages", '', '', '', 'messageUpdate', msgInfo)
            }, 500)
            /////////////////////////////////////////////////////////////////////////////
          }
          //return

        } else if(_type === "Message_Assign") {
          let userId = getTaskUserId(assignUser)
          let tempInfo = ''
          for(let j=3; j<ItemInfo.length; j++) {
            tempInfo += ":" + ItemInfo[j]
          }
          let updateInfoWithNewMessage = ("A:" + userId + ":" + ItemInfo[2] + ":") +  _val + tempInfo
          Object(props.stores.roomInfo.activeFlowData[i])[docSelected] = updateInfoWithNewMessage
          console.log('ASSIGN - ', Object(props.stores.roomInfo.activeFlowData[i])[docSelected])

          /////////////////////////////////////////////////////////////////////////////
          // Send this value to api to update googlesheet
          //console.log("DOC SELECTED --- ", selectedItem['ID'], docSelected)
          if(sendForSheetUpdate === false) {
            sendForSheetUpdate = true
          // Calling
          updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Master", selectedItem['ID'], docSelected, updateInfoWithNewMessage, 'masterUpdate', '')
          /////////////////////////////////////////////////////////////////////////////
          setTimeout(function() {
            updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Messages", '', '', '', 'messageUpdate', msgInfo)
          }, 500)
        }
          /////////////////////////////////////////////////////////////////////////////
          //return

        } else if(_type === "Message_DueDate") {
          //let userId = getTaskUserId(assignUser)
          let tempInfo = ''
          for(let j=3; j<ItemInfo.length; j++) {
            tempInfo += ":" + ItemInfo[j]
          }
          let updateInfoWithNewMessage = (ItemInfo[0] + ":" + ItemInfo[1] + ":" + dueDate + ":") +  _val + tempInfo
          Object(props.stores.roomInfo.activeFlowData[i])[docSelected] = updateInfoWithNewMessage
          //console.log('ASSIGN Due Date - ', Object(props.stores.roomInfo.activeFlowData[i])[docSelected])
          //console.log(" update message - ", updateInfoWithNewMessage)

          /////////////////////////////////////////////////////////////////////////////
          // Send this value to api to update googlesheet
          //console.log("DOC SELECTED --- ", selectedItem['ID'], docSelected)
          if(sendForSheetUpdate === false) {
            sendForSheetUpdate = true
          // Calling
          updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Master", selectedItem['ID'], docSelected, updateInfoWithNewMessage, 'masterUpdate', '')
          /////////////////////////////////////////////////////////////////////////////
          setTimeout(function() {
            updateGoogleSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Messages", '', '', '', 'messageUpdate', msgInfo)
          }, 500)
        }
          /////////////////////////////////////////////////////////////////////////////
          //return

        } else if(_type === "Message_Done") {
          let tempInfo = ''
          for(let j=3; j<ItemInfo.length; j++) {
            tempInfo += ":" + ItemInfo[j]
          }
          let updateInfoWithNewMessage = ("C:" + ItemInfo[1] + ":" + ItemInfo[2] + ":") +  _val + tempInfo
          Object(props.stores.roomInfo.activeFlowData[i])[docSelected] = updateInfoWithNewMessage
          //console.log('ASSIGN - ', Object(props.stores.roomInfo.activeFlowData[i])[docSelected])
          //return
        }

      }
    }
  }
  //////////////////////////////////////////////////////////////////
  const classes = useStyles({props})
  // keyboard shortcut
  useEffect(() => {
    if(assignedUserIndex === -1) {
      assignedUserIndex = getTaskUserIndex()
      //console.log('in effect - ', assignedUserIndex)
      prevSelectedDueDate = getTaskDueDate()
      onChange(getTaskDueDate())
    } else if(menuName === 'docview') {
      /* AllSelectedMessages.splice(0)
      AllSelectedMessages = []
      assignedUserIndex = -1
      assignedTaksUser = ''
      setDocDone(false)
      setDocSelected('') */
    }
    /* return () => {

    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[docDone, docSelected])

  /* dispUserName = "AL" */
  /* function createFlowList() {
    console.log(menuName, "In List creation")
  } */
  // getTaskUserInitials(String(item[lisitem]))
  //console.log(docList, " RELOAD -- ")

  //////////////////////////////////////////////////////////////////
  // Reset the div matrix
  const changeMatrix = (new DOMMatrix()).rotateSelf(0, 0, 0)
  props.stores.map.setMatrix(changeMatrix)
  //////////////////////////////////////////////////////////////////
  setTimeout(function() {
    let cW = document.getElementById('containerHolder')?.scrollWidth
    let cH = document.getElementById('containerHolder')?.scrollHeight
    cont_WH = [cW, cH]

    // setting system props
    props.stores.roomInfo.activeScreenResolution = [cont_WH[0], cont_WH[1]]

  }, 200)
  //////////////////////////////////////////////////////////////////

  function onClickItem(item:string) {
    //setDocDetailedView(true)
    if(isCanvasMoved()) {return}

    //console.log(selectedItem, " --- ", item)
    props.stores.roomInfo.activeMenuType = "docdetailview"
    setDocSelected(item)
  }

  function getSelectedTaskTitle() {
    return docSelected.split("TASK - ")[1]
  }
  function getTaskDueDate() {
    return selectedItem[docSelected].split(':')[2] !== 'undefined' ? selectedItem[docSelected].split(':')[2] : ''
  }


  //console.log(selectedItem[docSelected].split(":")[1], 'USER ID')
  function getTaskUserIndex() {
    let userIndex = -1
    let taskUserId = selectedItem[docSelected].split(":")[1]
    for (let i=0; i<Object(userData.data).length; i++) {
      //console.log("--- ", String(Object(userData.data[i])['ID']) , " === ", taskUserId)
      if(String(Object(userData.data[i])['ID']) === taskUserId) {
        userIndex = i
      }
    }
    return userIndex
  }

  //console.log(docSelected, " seceted doc details")
  //////////////////////////////////////////////////////////////////
  /* setTimeout(function() {
    let cW = document.getElementById('containerHolder')?.scrollWidth
    let cH = document.getElementById('containerHolder')?.scrollHeight
    //console.log(cW, "---",cH, "----", props.stores.map.screenSize)
    cont_WH = [cW, cH]
  }, 200) */
  //////////////////////////////////////////////////////////////////
  function onDocCompletedClick() {
    //console.log("On Done Click")
    // Doc completed status add the node to make it enabled
    setDocDone(true)
  }
  //////////////////////////////////////////////////////////////////
  function onAddNoteClick() {
    isAddNoteDialogActive = true
    if(docDone) {return}
    //console.log("ADD ANOTHER NOTE HERE")
    setOpen(true)
  }
  //////////////////////////////////////////////////////////////////
  function handleClose(){
    isAddNoteDialogActive = false
    setOpen(false);
  };

  function onChangeAssignClick() {
    isAddNoteDialogActive = true
    if(docDone) {return}
    setSelectedIndex(assignedUserIndex)
    setOpenAssign(true)
  }
  function handleCloseAssign(){
    isAddNoteDialogActive = false
    //assignedUserIndex = -1
    setOpenAssign(false);
  };
  //////////////////////////////////////////////////////////////////
  function addCustomComment() {
    //console.log(comment, " --- ")
    // Close the dialog
    handleClose()
  }

  function changeAssignedUser() {
    assignedTaksUser = assignedUserName
    assignedUserName = ''
    handleCloseAssign()
  }
  //////////////////////////////////////////////////////////////////
  //console.log(getTaskUserIndex(), " getIndex")
  //let userIndex = getTaskUserIndex()
  /* const [personName, setPersonName] = React.useState(''); */
 /*  const [selectedIndex, setSelectedIndex] = React.useState(-1); */



  /* function handleListItemClick(index:number) {
    //assignedTaksUser = Object(userData).data[index]['Full Name'].toUpperCase()
    assignedUserName = Object(userData).data[index]['Full Name'].toUpperCase()
    // Send message to the list for this task modification
    assignedUserIndex = index
    setSelectedIndex(index);
  }; */

  const options:any = []
  Object(userData).data.map((item:any, index:number)=>
    options[index] = {value: item['Full Name'], label:item['Full Name']}
  )

  /* function handleChange(){
    setPersonName('ABC')
  }; */
  /* const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]; */

  function selectUserOption(_value:any) {
    for (let i:number=0; i<options.length; i++) {
      //console.log(options[i].value, '===', _value)
      if(options[i] === _value) {
        assignedUserName = options[i]['value'].toUpperCase()
        // Send message to the list for this task modification
        assignedUserIndex = i
        setSelectedIndex(i)
        //console.log(i, " iii")
      }
    }
  }

  let mtop = isSmartphone() ? '15em' : '8em'
  let tWidth = isSmartphone() ? '100%' : '78%'
  let iWidth = isSmartphone() ? '50%' : '40%'
  let fSize = isSmartphone() ? '3.4em' : '1.5em'
  let cHeight = isSmartphone() ? '1.4em' : '1.5em'
  let cLeft = isSmartphone() ? '14%' : '20%'
  let ctop = isSmartphone() ? '-3em' : '-1.5em'

  /* const handleChange = (selectedOption:any) => {
    console.log('handleChange', selectedOption);
  }; */


  function getDueDate(e:any) {
    //console.log(e, " due date")
    dateSelected = true
    onChange(e)
  }

  //console.log(getUserNameNormal(String(selectedItem[docSelected])).length, "-----")
  //console.log(moment(value?.toString()).format('MM/DD/YYYY'), " VALUE----")
  //console.log(value, " VALUEEEE")
  //////////////////////////////////////////////////////////////////
  return <div className={classes.container}>
    { openAssign ?
    <div style={{position:'relative', width:'90%', top:mtop, display:'flex', alignItems:'center', flexDirection:'column', left:'5%'}}>
    <div className={classes.rootList}>
      <Calendar onChange={e => getDueDate(e)/* onChange */} value={moment(value?.toString()).format('L')} />
    </div>
  <div style={{position:'relative', width:'700px', maxWidth:tWidth, display:'flex'}}>
    <div style={{position:'relative', width:iWidth, textAlign:'center', fontFamily:'DINCondensed-Bold', fontSize:fSize, top:'-0.2em', color:'#808080'}} >
      <p>CHANGE OWNER</p>
    </div>
    <div style={{position:'relative', width:iWidth, /* left:'50%', */ height:cHeight/* '1.5em' */, top:'0.5em', fontFamily:'DINCondensed-Bold', fontSize:fSize, backgroundColor:'#808080', left:cLeft/* '20%' */}}>
    <Select menuPlacement='top' maxMenuHeight={200} styles={customStyles} options={options}
        value={options[selectedIndex]}
        defaultValue={getUserNameNormal(String(selectedItem[docSelected])).length !== 0 ? {value: getUserNameNormal(String(selectedItem[docSelected])), label:getUserNameNormal(String(selectedItem[docSelected]))} : {value: "Select an option", label:"Select an option"}}
        placeholder = {getUserNameNormal(String(selectedItem[docSelected])).length !== 0 ? getUserNameNormal(String(selectedItem[docSelected])) : "Select User"}
        onChange={(e) => selectUserOption(e)}
        theme={theme => ({
          ...theme,
          colors: {
              ...theme.colors,
              neutral50: '#00000090',  // Placeholder color
          },
      })}
        />
        {/* <div style={{position:'relative', width:'100%'}}>
          <div style={{position:'relative', top:'0.2em', left:'0.5em', color:'#00000080'}}>John Doe</div>
          <ArrowExpandMore style={{position:'relative', right:0}} />
        </div> */}
    </div>
  </div>
    <div style={{position:'relative', width:'700px' ,maxWidth:tWidth/* '78%' */, display:'flex', top:ctop/* '-1.5em' */}}>
      <div style={{position:'relative', width:iWidth/* '40%' */, textAlign:'center', fontFamily:'DINCondensed-Bold', fontSize:fSize/* '1.5em' */, top:'-0.2em', color:'#808080'}} >
        <p>CHANGE DUE DATE</p>
      </div>
      <div style={{position:'relative', width:iWidth/* '40%' */, height:cHeight/* '1.5em' */, top:'0.5em', fontFamily:'DINCondensed-Bold', fontSize:fSize/* '1.5em' */, backgroundColor:'#808080', left:cLeft/* '20%' */}}>
        <div style={{position:'relative', top:'0.2em', left:'0.5em', color:'#00000080'}}>{value !== undefined ? moment(value?.toString()).format('L') : ''}</div>
      </div>
    </div>
    <div style={{position:'relative', width:isSmartphone() ? '100%' : '80%', textAlign:'center', top:isSmartphone() ? '1em' : '1em'}}>
      <div style={{position:'relative', width:'100%', height:'1px', backgroundColor:'#00000080'}}></div>
      <img onClick={() => setOpenAssign(false)} style={{width:isSmartphone() ? '9em' : '4em', userSelect:'none', position:'relative', top:isSmartphone() ? '-5.6em' : '-3.1em', left:isSmartphone() ? '-13em' : '-11em'}} src={btnCancelComment} draggable={false} alt="" />
      <img onClick={() => changeAssignedUser()} style={{width:isSmartphone() ? '10em' : '5em', userSelect:'none', position:'relative', top:isSmartphone() ? '-5.2em' : '-2.6em', left:isSmartphone() ? '-4em' : '-2em'}} src={btnAddComment} draggable={false} alt="" />
    </div>
    </div>
     :
      <div id='containerHolder' style={{position:'relative', top:isSmartphone() ? '14.4em' : '7.4em', display:'flex', left:'0'}} >
        <div style={{position:'relative', width:isSmartphone() ? '100%' : '100%', height:'auto', backgroundColor:'white', border:'0px solid black',top:'1em', marginRight:'0em', textAlign:'center', left:'2.5em', fontFamily:'DINCondensed-Bold', userSelect:'none'}}>

        <div style={{position:'relative', display:'flex'}}>
          <div style={{fontSize:isSmartphone() ? '8em' : '3.5em', color:'#F15A24', fontWeight:'700', position:'relative', left:isSmartphone() ? '0.65em' : '0.6em', top:isSmartphone() ? '-0.1em' : '-0.1em', width:isSmartphone() ? '120px' : '77px'}}> {getDaysRemaining(Object(selectedItem)['Due Date'])}</div>
          <div style={{fontSize:isSmartphone() ? '5em' : '2.5em', color:'#F15A24', fontWeight:'700', position:'relative', left:isSmartphone() ? '2em' : '2.3em', top:isSmartphone() ? '-0.2em' : '-0.3em'}}>
            <p style={{position:'relative', textAlign:'left', fontSize:'0.5em', color:'#00000090'}}>DUE</p>
            <p style={{position:'relative', textAlign:'left', fontSize:'0.5em', color:'#00000090', top:'-1em'}}> {Object(selectedItem)['Due Date'] !== 'undefined' ? Object(selectedItem)['Due Date'] : ''}</p>
          </div>
        </div>
          {
            /* docDetailedView === false ? */
            menuName !== 'docdetailview' ?
            <>
          <div style={{position:'relative', width:isSmartphone() ? '10em' : '4em', height:isSmartphone() ? '10em' : '4em', left:isSmartphone() ? '3.3em' : '2.5em', borderRadius:'50%', backgroundColor:'#4A936E', textAlign:'center', top:isSmartphone() ? '-5em' : '-3em'}}></div>
          <div style={{position:'relative', width:isSmartphone() ? '10em' : '4em', height:isSmartphone() ? '10em' : '4em', left:isSmartphone() ? '3.3em' : '2.5em', borderRadius:'50%', backgroundColor:'#208251', textAlign:'center', top:isSmartphone() ? '-13.5em' : '-6em'}}></div>

          <div style={{position:'relative', width:isSmartphone() ? '10em' : '4em', height:isSmartphone() ? '10em' : '4em', left:isSmartphone() ? '3.3em' : '2.5em', borderRadius:'50%', backgroundColor:'#006837', textAlign:'center', top:isSmartphone() ? '-21.5em' : '-9em'}}>

          <div style={{fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '5em' : '2em', position:'relative', top:'0.45em', color:'#FFFFFF'}}>{getCompletedTaskCount(0)}</div>
          </div>

        {/* Loop here */}
       {
        taskList.map((item:any, index:number)=>
        (selectedItem[item].split(':')[0] !== 'C') ?
        <div onClick={() => {onClickItem(item)/* console.log("clicked - ", item) */}} style={{position:'relative', display:'flex', width:'100%'}}>
          <div style={{position:'relative', top:isSmartphone() ? '-22em' : '-9.1em', height:isSmartphone() ? '14em' : '6.2em', left:'1em'}}>
            <div style={{position:'relative', width:isSmartphone() ? '2em' : '0.6em', height:isSmartphone() ? ((taskList.length - 1) === index) ? '14em' : '21em' : ((taskList.length - 1) === index) ? '5em' : '8em', backgroundColor:'black', marginLeft:isSmartphone() ? '6.3em' : '3.3em', borderRadius:'2px/* 12px */'}}></div>
            <div style={{position:'relative', width:isSmartphone() ? '9em' : '4em', height:isSmartphone() ? '9em' : '4em', left:isSmartphone() ? '2.1em' : '1.3em', borderRadius:'50%', backgroundColor:(getTaskUserInitials(String(selectedItem[item])) === dispUserName) ? '#F7931E' : 'lightgrey', textAlign:'center', top:isSmartphone() ? ((taskList.length - 1) === index) ? '-9.5em' : '-16.5em' : ((taskList.length - 1) === index) ? '-3.3em' : '-6.3em', border:isSmartphone() ? (getTaskUserInitials(String(selectedItem[item])) === dispUserName) ? '10px solid #F7931E' : '10px solid black' : (getTaskUserInitials(String(selectedItem[item])) === dispUserName) ? '5px solid #F7931E' : '5px solid black'}}>
              <div style={{fontSize:isSmartphone() ? '5em' : '2.2em', color:(getTaskUserInitials(String(selectedItem[item])) === dispUserName) ? '#FFFFFF' : 'black', fontWeight:'700', position:'relative', top:'0.3em'}}>{getTaskUserInitials(String(selectedItem[item]))}
              </div>
            </div>
          </div>
          <div style={{position:'relative', width:'100%', top:(getTaskUserInitials(String(selectedItem[item])) === dispUserName) ? isSmartphone() ? '-5em' : '-4.3em' : isSmartphone() ? '-4.7em' : '-4.1em', left:isSmartphone() ? '2em' : '3em', fontSize:isSmartphone() ? '4em' : '2em', height:'3.8em'}}>
          <p style={{position:'relative', textAlign:'left'}}>{(item.split('TASK - ')[1])}</p>
          {
          (getTaskUserInitials(String(selectedItem[item])) === dispUserName) ?
          <p style={{position:'relative', fontSize:isSmartphone() ? '0.6em' : '0.5em', textAlign:'left', top:isSmartphone() ? '-1.7em' : '-2em'}}>DUE: {selectedItem[item].split(':')[2] !== 'undefined' ? selectedItem[item].split(':')[2] : ''}</p> : '' }

          </div>
          <div style={{position:'relative', width:'10%', textAlign:'right', top:isSmartphone() ? '-15.5em' : '-6.7em', right:isSmartphone() ? '5em' : '4em'}}>
            <div><ArrowForwardIcon style={{width:isSmartphone() ? '4em' : '2em', height:isSmartphone() ? '4em' : '2em', color:'black'}} /></div>
          </div>
        </div> : ''
        )}
        </>
        :
        <>
          <div style={{position:'relative', width:'100%', display:'flex'}}>
            <div style={{position:'relative', width:isSmartphone() ? '9em' : '4em', height:isSmartphone() ? '9em' : '4em', left:isSmartphone() ? '4em' : '2.5em', borderRadius:'50%', backgroundColor:(getTaskUserInitials(String(selectedItem[docSelected])) === dispUserName) ? '#F7931E' : 'lightgrey', textAlign:'center', top:isSmartphone() ? '-5em' : '-2.5em', border:isSmartphone() ? (getTaskUserInitials(String(selectedItem[docSelected])) === dispUserName) ? '10px solid #F7931E' : '10px solid black' : (getTaskUserInitials(String(selectedItem[docSelected])) === dispUserName) ? '5px solid #F7931E' : '5px solid black'}}>
              <div style={{fontSize:isSmartphone() ? '5.5em' : '2.5em', color:(getTaskUserInitials(String(selectedItem[docSelected])) === dispUserName) ? '#FFFFFF' : 'black', fontWeight:'700', position:'relative', top:'0.2em'}}>{getTaskUserInitials(String(selectedItem[docSelected]))}</div>
              </div>
              <div style={{position:'relative', width:'50%', fontSize:isSmartphone() ? '4em' : '2.3em', top:isSmartphone() ? '-1.9em' : '-2em', left:isSmartphone() ? '1.8em' : '2.55em'}}>
              <p style={{position:'relative', textAlign:'left'}}>{getSelectedTaskTitle()}</p>
              <p style={{position:'relative', textAlign:'left', fontSize: isSmartphone() ? '0.7em' : '0.6em', top:isSmartphone() ? '-1.5em' : '-1.9em', left:'0.1em'}}>DUE : {getTaskDueDate()}</p>
              {/* <Edit style={{position:'relative', top:'-4em', left:'0em', textAlign:'left', width:'100%', height:'1.3em'}} /> */}
              </div>

              <div style={{position:'absolute', /* width:'10%',  */textAlign:'right', top:isSmartphone() ? '-2.5em' : '-2.2em', right:isSmartphone() ? '10%' : '8%'}}>
                <div style={{position:'relative'/* , right: 0 */}}>
                  <div onClick={()=> onDocCompletedClick()} style={{position:'relative', width:isSmartphone() ? '6em' : '3em', height:isSmartphone() ? '6em' : '3em', border:'1px solid black'}}>
                  <div>
                    {
                      docDone ?
                    <DoneIcon style={{width:isSmartphone() ? '4em' : '2em', height:isSmartphone() ? '4em' : '2em', color:'black'}} />
                    : ''
                    }
                    </div>
                  </div>
                </div>
              </div>

              {/* <div style={{position:'relative', width:'50%', fontSize:'4em', top:'-1.9em', left:'1.8em'}}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon/>}
                checkedIcon={<CheckBoxIcon style={{fontSize:isSmartphone() ? '2em' : '1em'}} htmlColor="black" />}
                checked={false} name="done"
                 />
                </div> */}
            </div>
          <div style={{position:'relative', width:isSmartphone() ? '92%' : '94%', left:'0%', height:'2px', backgroundColor:'#000000', top:isSmartphone() ? '-10em' : '-7em'}}></div>
          <div>
            <p style={{position:'relative', fontSize:isSmartphone() ? '2.8em' : '1.4em', color:'#00000070', top:isSmartphone() ? '-3.5em' : '-5.2em', left:isSmartphone() ? '6.2em' : '7.6em', textAlign:'left'}}>ASSIGNED TO</p>
            <p style={{position:'relative', fontSize:isSmartphone() ? '3.8em' : '2em', color:'#000000', top:isSmartphone() ? '-3.8em' : '-4.9em', left:isSmartphone() ? '4.6em' : '5.25em', textAlign:'left'}}>{assignedTaksUser !== '' ? assignedTaksUser : getUserName(String(selectedItem[docSelected]))}</p>

            {/* loop to show doc task list */}
            <div style={{position:'relative', display:'flex'}}>
              <div style={{position:'relative', top:isSmartphone() ? '-17.6em' : '-13em', left:isSmartphone() ? '27em' : '-1.8em'}}>
              <img style={{position:'relative', width:isSmartphone() ? '6em' : '3em', userSelect:'none', left:isSmartphone() ? '-11em' : '11.8em', top:isSmartphone() ? '1em' : '2em'}} draggable={false} src={viewDocIcon}
                alt="" />
              </div>
              <div style={{position:'relative', width:'50%', top:isSmartphone() ? '-4em' : '-5.3em', left:isSmartphone() ? '4.2em' : '5.2em', fontSize:isSmartphone() ? '4em' : '2em', textAlign:'left'}}>{selectedItem['Doc Ref']}</div>
            </div>

            <div style={{position:'relative', width:isSmartphone() ? '95%' : '100%', textAlign:'right', top:isSmartphone() ? '-29.8em' : '-17.2em', right:isSmartphone() ? '4%' : '8%'}}>
              <div><ArrowForwardIcon onClick={() =>onChangeAssignClick()}  style={{width:isSmartphone() ? '4em' : '2em', height:isSmartphone() ? '4em' : '2em', color:'black', opacity:docDone ? 0 : 1}} /></div>
            </div>

            <div style={{position:'relative', width:isSmartphone() ? '92%' : '94%', left:'0%', height:'2px', backgroundColor:'#000000', top:isSmartphone() ? '-18em' : '-13em'}}></div>
            <div style={{position:'relative', width:'90%', left:'0%', height:'2px', top:isSmartphone() ? '-18.3em' : '-11em', textAlign:'center'}}>
              <img onClick={()=>onAddNoteClick()} style={{position:'relative', width:isSmartphone() ? '11em' : '6em', height:isSmartphone() ? '11em' : '6em', top:isSmartphone() ? '-5.5em' : '-5.1em', opacity:docDone ? 0 : 1}} src={addNoteIcon} alt='' />
            </div>

          </div>

          <div style={{position:'relative', top:isSmartphone() ? '-5.5em' : '-8.5em', left:'0em', textAlign:'left', fontSize:isSmartphone() ? '3em' : '1.5em'}}>
            {AllSelectedMessages.map((Item:any, index:number)=>
              <div style={{position:'relative', top:(index*-2+'em')}}>
              <p style={{position:'relative', fontSize:'1em', left:'1em', color:'#00000070', top:'0.2em', width:'90%'}}>{getMessageUserName(Item['Sender ID'])} {Item['Timestamp']}</p>
              <p style={{position:'relative', fontSize:'1.2em', left:'0.8em', color:'#000000', top:'-1em', width:'90%'}}>{Item['Message']}</p>
              <div style={{position:'relative', width:isSmartphone() ? '92%' : '94%', left:'0%', height:'2px', backgroundColor:'#000000', top:isSmartphone() ? '-1.8em' : '-1.5em'}}></div>
              </div>
            )}

          </div>

         </>
        }
      </div>
    </div> }

    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}
      PaperProps={{
        style: {
          transform: isSmartphone() ? 'scale(1.5)' : 'scale(1)',
        },
    }}
    >
      <DialogTitle disableTypography={true} style={{fontSize: isSmartphone() ? '2.5em' : '1.5em', fontWeight:700, textAlign:'center'}}>ADD NOTES</DialogTitle>
        <DialogContent style={{border:'0px solid black', position:'relative', height:isSmartphone() ? '19em' : '13em'}}>
          {/* <TextareaAutosize minRows={3} placeholder='your comments here...' style={{position:'relative', width:'100%', height:'6em', border:'1px solid #00000070', fontFamily:'DINRegular', fontSize:'2em'}}  /> */}
          <textarea placeholder='your comments here...' style={{position:'relative', width:'100%', /* height:'6em',  */border:'1px solid #00000070', fontFamily:'DINRegular', fontSize:isSmartphone() ? '2em' : '1.2em'}}
            value={comment}
            onChange={event =>(setComment(event.target.value))}
            rows={5}
            cols={5}
          />
          <div style={{position:'relative', width:isSmartphone() ? '100%' : '100%', textAlign:'right', top:isSmartphone() ? '0.5em' : '0.5em'}}>
            {/* <button style={{position:'relative', transform:isSmartphone() ? 'scale(1.5)' : 'scale(1.2)'}}>ADD</button> */}
            <img onClick={() => addCustomComment()} style={{width:isSmartphone() ? '5.5em' : '4em', userSelect:'none'}} src={btnGo} draggable={false} alt="" />
          </div>
        </DialogContent>
    </Dialog>

    {/* */}
    <Dialog open={false/* openAssign */} onClose={handleCloseAssign} maxWidth="sm" fullWidth={true}
      PaperProps={{
        style: {
          transform: isSmartphone() ? 'scale(1.5)' : 'scale(1)',
        },
    }}
    >
    {/* <DialogTitle disableTypography={true} style={{fontSize: isSmartphone() ? '2.5em' : '1.5em', fontWeight:700, textAlign:'center'}}>ASSIGN TO</DialogTitle> */}
        <DialogContent style={{border:'0px solid black', position:'relative', height:isSmartphone() ? '20em' : '34em'}}>
        <div className={classes.rootList}>
          <Calendar />
         {/*  <List component="nav">
            {
            Object(userData).data.map((item:any, index:number)=>
              <ListItem button
                  selected={selectedIndex === index}
                  style={{backgroundColor : (selectedIndex === index) ? '#F7931E40' : '#FFFFFF', border:'1px solid #00000070', marginBottom:'0.2em' }}
                  onClick={(event) => handleListItemClick(index)}
                >
              <ListItemText disableTypography={true} primary={item['Full Name'].toUpperCase()} />
              </ListItem>
            )}
          </List> */}
        </div>
       {/*  <div>
          <p style={{fontSize: isSmartphone() ? '2.5em' : '1.5em', fontWeight:700, textAlign:'center'}}>ASSIGN DUE DATE</p>
          <Calendar />
        </div> */}
        <div style={{position:'relative', width:'100%', display:'flex'}}>
          <div style={{position:'relative', width:'50%', textAlign:'center', fontFamily:'DINCondensed-Bold', fontSize:'1.5em', top:'-0.2em', color:'#808080'}} >
            <p>CHANGE OWNER</p>
          </div>
          <div style={{position:'relative', width:'50%', /* left:'50%', */ height:'1.5em', top:'0.5em', fontFamily:'DINCondensed-Bold', fontSize:'1.5em', backgroundColor:'#808080'}}>
          {/* <Dropdown className={classes.ddRoot}  placeholderClassName={classes.ddPlaceHolder} arrowClassName={classes.ddArrows} options={options}  value={options[0]} placeholder="Select an option"
          arrowClosed={<span className={classes.ddArrows} />}
          /> */}
          {/* <Select menuPlacement='top'  styles={customStyles} options={options}
              placeholder="Select an option"
              theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    neutral50: '#00000090',  // Placeholder color
                },
            })}
              /> */}
          </div>
        </div>
          <div style={{position:'relative', width:'100%', display:'flex'}}>
            <div style={{position:'relative', width:'50%', textAlign:'center', fontFamily:'DINCondensed-Bold', fontSize:'1.5em', top:'-0.2em', color:'#808080'}} >
              <p>CHANGE DUE DATE</p>
            </div>
            <div style={{position:'relative', width:'50%', /* left:'50%', */ height:'1.5em', top:'0.5em', fontFamily:'DINCondensed-Bold', fontSize:'1.5em', backgroundColor:'#808080'}}>
              <div>10/12/2023</div>
            </div>
          </div>
          <div style={{position:'relative', width:isSmartphone() ? '100%' : '100%', textAlign:'right', top:isSmartphone() ? '0.5em' : '0.5em'}}>
            <img onClick={() => changeAssignedUser()} style={{width:isSmartphone() ? '5.5em' : '4em', userSelect:'none'}} src={btnGo} draggable={false} alt="" />
          </div>
        </DialogContent>
    </Dialog>

  </div>

  //},
    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  []
   // )
}
DocMode.displayName = 'DocMode'
