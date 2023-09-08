import {BMProps} from '@components/utils'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect/* , useRef, useState */} from 'react'
import {/* Observer,  */useObserver} from 'mobx-react-lite'
import { isSmartphone } from '@models/utils'
/* import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; */
// Flow Images
/* import contactIcon from '@images/flow_sym_alert.png'
import profileIcon from '@images/flow_sym_view_profile.png'
import viewIcon from '@images/flow_sym_view_doc_copy.png' */
/* import { useGesture } from 'react-use-gesture' */
/* import { getAllSheetData } from '@components/App' */
import { getAllUserData } from '@components/error/TheEntrance'
/* import { MouseOrTouch } from '../Share/RndContent'
import { color } from 'html2canvas/dist/types/css/types/color' */
/* import { cyan } from '@material-ui/core/colors'
import Draggable from 'react-draggable' */

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { isCanvasMoved } from '../Base'
import { DocMode } from './DocMode'


let itemSelected:any
export function getItemSelected() {
  return itemSelected
}




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

const useStyles = makeStyles({
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
    cursor: 'pointer',

  }),
  /* wrapper:{width:'100%'},
  wrapperInner:{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-end'}, */



})

let dispUserName = ""


let cont_WH:any = []
export function getContDim() {
  return cont_WH;
}


let taskCount:number = 0
export function getTotalTaskCount() {
  return taskCount
}

/* let screenName:string = "ViewMode"
export function getScreenNameMode() {
  return screenName;
}
 */


export const ViewMode: React.FC<BMProps> = (props) => {

  /* setTimeout(function() {
    console.log(props.stores.map.screenSize, " in VM")
  }, 1500) */


  const screenRes = useObserver(() => props.stores.map.screenSize[0])
  //console.log(screenRes, "AAA")
  const menuName = useObserver(() => props.stores.roomInfo.activeMenuType)
  const activeUserId  = useObserver(() => props.stores.roomInfo.activeLoggedInUserId)

  //console.log(getAllSheetData(), " In VM---")
  //////////////////////////////////////////////////////////////////////////////////////
  // toggle view mode
  //const [docView, setDocView] = React.useState(false)
  //////////////////////////////////////////////////////////////////////////////////////

  let AllFlowItemsDetails:any = []


  //const sheetFlowData = getAllSheetData()

  const sheetFlowData =  useObserver(() => props.stores.roomInfo.activeFlowData)

  //Object(sheetFlowData.data)
  /* for (let i=0; i<Object(sheetFlowData.data).length; i++) {
    if(Object(sheetFlowData.data[i])['Doc'] !== "" && Object(sheetFlowData.data[i])['Include'] === "TRUE") {
      //console.log((Object(sheetFlowData.data[i])['HSS Dwg #']), " aaaa")
      AllFlowItemsDetails.push(Object(sheetFlowData.data[i]))
    }
  } */

  for (let i=0; i<Object(sheetFlowData).length; i++) {
    if(Object(sheetFlowData[i])['Doc'] !== "" && Object(sheetFlowData[i])['Include'] === "TRUE") {
      //console.log((Object(sheetFlowData.data[i])['HSS Dwg #']), " aaaa")
      AllFlowItemsDetails.push(Object(sheetFlowData[i]))
    }
  }


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
  for (let key in docList[0]) {
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

    const activeUserName = useObserver(() => props.stores.roomInfo.activeLoggedInUser)

    if(activeUserName !== "") {
      dispUserName = activeUserName.split(" ")[0].charAt(0).toUpperCase() + "" + activeUserName.split(" ")[1].charAt(0).toUpperCase()
    } else {
      dispUserName = ""
    }

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
      for (let key in docList[index]) {
          if(key.indexOf('TASK - ') === 0) {
            let toShow = docList[index][key].split(':')[0]
            if(toShow === "C") {
              totalCompleted++
            }
          }
        }
        return totalCompleted
    }
    ///////////////////////////////////////////////////////////////////////////////////

    // Days Remaining
    /* function getDaysRemaining(endDate:string) {
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
    } */
    ///////////////////////////////////////////////////////////////////////////////////
    const sheetUserData = getAllUserData()
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

    function getTaskUserInitials(taskInfo:string) {
      let userInitials = ""
      //console.log(taskInfo, " fetcong initi")
      let userIdFromTaskInfo = taskInfo.split(':')[1]
      //console.log(userIdFromTaskInfo, " userId")
      for (let i=0; i<Object(sheetUserData.data).length; i++) {
        if(String(Object(sheetUserData.data[i])['ID']) === userIdFromTaskInfo) {
          userInitials = Object(sheetUserData.data[i])['Initials']
        }
      }
      return userInitials
    }

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

    function getUserTotalTasks() {
      let userTasks = 0
      AllFlowItemsDetails.map((lisitem:any, i:number)=>
        taskList.map((item:any, index:number)=>
        (lisitem[item].split(':')[0] !== 'C' && lisitem[item].split(':')[1] === activeUserId) ?
        userTasks++ : 0
      ))
      return userTasks
    }

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
  const classes = useStyles({props})
  //  keyboard shortcut
  useEffect(() => {
    /* return () => {

    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* dispUserName = "AL" */
  /* function createFlowList() {
    console.log(menuName, "In List creation")

  } */

  // getTaskUserInitials(String(item[lisitem]))


  /* let itemSelect:any */
  function onFlowUserClick(item:any) {
    if(isCanvasMoved()) {return}
    //console.log(item, " === ", dispUserName, "On user click - ", isCanvasMoved())
    itemSelected = item
    //setDocView(true)
    props.stores.roomInfo.activeMenuType = "docview"
  }

  /* function getSelectedItem() {
    return itemSelect
  } */


  function onTaskListClick(id:string, list:any) {
    if(isCanvasMoved()) {return}
    //console.log("TASK LIST CLICK - ", id, " --- ", list)
    itemSelected = list
    //setDocView(true)
    props.stores.roomInfo.activeMenuType = "docview"
  }

  //console.log(docList, " RELOAD -- ")

  //////////////////////////////////////////////////////////////////
  // Reset the div matrix
  setTimeout(function() {
    const changeMatrix = (new DOMMatrix()).rotateSelf(0, 0, 0)
    props.stores.map.setMatrix(changeMatrix)
    props.stores.map.setCommittedMatrix(changeMatrix)
  }, 100)
  //////////////////////////////////////////////////////////////////
  setTimeout(function() {
    let cW = document.getElementById('containerHolder')?.scrollWidth
    let cH = document.getElementById('containerHolder')?.scrollHeight
    //console.log(cW, "---",cH, "----", props.stores.map.screenSize)
    cont_WH = [cW, cH]

    // setting system props
    props.stores.roomInfo.activeScreenResolution = [cont_WH[0], cont_WH[1]]
  }, 200)
  //////////////////////////////////////////////////////////////////

  return (menuName === 'flow' || menuName === 'list') ?
        screenRes !== 0 ? <div className={classes.container}>
        {/* <div>
        <img style={{position:'relative', width:isSmartphone() ? '3em' : '3.5em', userSelect:'none', left:'1em'}} draggable={false} src={contactIcon}
        alt="" />
        <p style={{position:'relative', marginTop:'-2em', marginLeft:'3.5em', fontSize:isSmartphone() ? '1.2em' : "1.4em"}}>Contact {dispUserName} For Parts</p>
        </div> */}
        {/* <div style={{position:'relative', width:'100%', height:'2.5em', backgroundColor:'#000000'}}>
          <img style={{position:'absolute', width:'3em', userSelect:'none', left:'0.5em', top:'-0.19em', opacity:'0.7'}} draggable={false} src={profileIcon} alt="" />
          <p style={{position:'absolute', color:'#FFFFFF', left:'4em', top:'-0.3em', fontWeight:'100'}}>{activeUserName.toUpperCase()}</p>
          <img style={{position:'absolute', width:'2.5em', userSelect:'none', right:'0.5em', top:'0em', opacity:'0.7'}} draggable={false} src={viewIcon} alt="" />
        </div> */}
        <div id='containerHolder' style={{position:'relative', /* width:'100%', height:'100%', */ /* backgroundColor:'cyan', */ top:isSmartphone() ? menuName === 'flow' ? '21em' : '12em'/* '14.4em' */ :  menuName === 'flow' ? '10em'/* '11em' */ : '6em'/* '7.4em' */, display:'flex', left:'0', width:'100%', height:'auto', minWidth:'100%', maxHeight:'auto'/* , overflow:'auto' */}}  /* {...bind()} */>
          {/* <div style={{border: "2px solid red", padding: "1rem", width: "98%"}}>
            <div>Drag from here</div>
            <div>This readme is really dragging on...</div>
          </div> */}
        <>
        {
        activeUserName !== '' ?
        (menuName === 'flow' ?
        docList.map((item:any, i:number)=>
          <div style={{position:'relative', width:isSmartphone() ? '11em/* 14em */' : '5.5em/* 7em */', height:'auto', backgroundColor:'white', border:'0px solid black', /* left:'1em',  */top:'1em', marginRight:'0em', textAlign:'center', left:'1em', fontWeight:'100', fontFamily:'DINCondensed-Bold', userSelect:'none'}}>
            <div style={{fontSize:isSmartphone() ? '5em' : '2.2em', color:'orange', fontWeight:'100', position:'relative', left:'0.3em', fontFamily:'DINCondensed-Bold'}}>{/*  {getDaysRemaining(item['Due Date'])} */}</div>
            <div style={{fontSize:isSmartphone() ? '2em' : '1em', color:'grey', /* fontWeight:'700', */ width:isSmartphone() ? '7em' : '7em'}}> {/* {item['Doc Ref']} */}</div>
            <div style={{position:'relative', width:isSmartphone() ? '7em' : '3em', height:isSmartphone() ? '7em' : '3em', left:isSmartphone() ? '3.6em' : '1.9em', borderRadius:'50%', backgroundColor:'#4A936E', textAlign:'center', top:'0.2em'}}></div>
            <div style={{position:'relative', width:isSmartphone() ? '7em' : '3em', height:isSmartphone() ? '7em' : '3em', left:isSmartphone() ? '3.6em' : '1.9em', borderRadius:'50%', backgroundColor:'#208251', textAlign:'center', top:isSmartphone() ? '-5.5em' : '-2.3em'}}></div>

            <div style={{position:'relative', width:isSmartphone() ? '7em' : '3em', height:isSmartphone() ? '7em' : '3em', left:isSmartphone() ? '3.6em' : '1.9em', borderRadius:'50%', backgroundColor:'#006837', textAlign:'center', top:isSmartphone() ? '-11.5em' : '-4.9em'}}>
              <div style={{fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '4em' : '1.8em', position:'relative', top:'0.3em', color:'#FFFFFF'}}>{getCompletedTaskCount(i)}</div>
            </div>
            {
              taskList.map((lisitem:any, index:number)=>
              //console.log(taskList.length, " --- ", index)

              (item[lisitem].split(':')[0] !== 'C') ?
              <div style={{position:'relative', top:isSmartphone() ? '-12em' : '-5.1em', height:isSmartphone() ? '14em' : '6.2em'}}>
                <div style={{position:'relative', width:isSmartphone() ? '1.4em' : '0.6em', height:isSmartphone() ? ((taskList.length - 1) === index) ? '12em' : '16em' : ((taskList.length - 1) === index) ? '5em' : '7em', backgroundColor:'black', marginLeft:isSmartphone() ? '6.55em' : '3.15em', borderRadius:'2px/* 12px */'}}></div>
                <div onClick={()=>onFlowUserClick(item/* getTaskUserInitials(String(item[lisitem])) */)} style={{position:'relative', width:isSmartphone() ? '6em' : '3em', height:isSmartphone() ? '6em' : '3em', left:isSmartphone() ? '3.6em' : '1.6em', borderRadius:'50%', backgroundColor:(getTaskUserInitials(String(item[lisitem])) === dispUserName) ? '#F7931E' : 'lightgrey', textAlign:'center', top:isSmartphone() ? ((taskList.length - 1) === index) ? '-6.5em' :  '-10.5em' : ((taskList.length - 1) === index) ? '-2.3em' : '-4.3em', border:isSmartphone() ? (getTaskUserInitials(String(item[lisitem])) === dispUserName) ? '10px solid #F7931E' : '10px solid black' : (getTaskUserInitials(String(item[lisitem])) === dispUserName) ? '5px solid #F7931E' : '5px solid black'}}>
                  <div style={{fontSize:isSmartphone() ? '3.5em' : '1.8em', color:(getTaskUserInitials(String(item[lisitem])) === dispUserName) ? '#FFFFFF' : 'black', fontFamily:'DINCondensed-Bold', fontWeight:'100', position:'relative', top:'0.3em'}}>{getTaskUserInitials(String(item[lisitem]))}
                  </div>
                </div>
              </div> : ''
              )
            }
            {/* {
            AllFlowItemsDetails.map((lisitem:any, i:number)=>
              (lisitem.Doc === item.Doc) ?
              <div style={{position:'relative', top:isSmartphone() ? '-12em' : '-5.1em', height:isSmartphone() ? '14em' : '6.2em'}}>
                <div style={{position:'relative', width:isSmartphone() ? '1em' : '0.3em', height:isSmartphone() ? '16em' : '7em', backgroundColor:'black', marginLeft:isSmartphone() ? '6.8em' : '3.3em', borderRadius:'12px'}}></div>
                <div onClick={()=>onFlowUserClick(getUserInitials(String(lisitem.ID)))} style={{position:'relative', width:isSmartphone() ? '6em' : '3em', height:isSmartphone() ? '6em' : '3em', left:isSmartphone() ? '3.6em' : '1.6em', borderRadius:'50%', backgroundColor:(getUserInitials(String(lisitem.ID)) === dispUserName) ? '#F7931E' : 'lightgrey', textAlign:'center', top:isSmartphone() ? '-10.5em' : '-4.3em', border:isSmartphone() ? (getUserInitials(String(lisitem.ID)) === dispUserName) ? '10px solid #F7931E' : '10px solid black' : (getUserInitials(String(lisitem.ID)) === dispUserName) ? '5px solid #F7931E' : '5px solid black'}}>
                  <div style={{fontSize:isSmartphone() ? '3.5em' : '1.8em', color:(getUserInitials(String(lisitem.ID)) === dispUserName) ? '#FFFFFF' : 'black', fontWeight:'700', position:'relative', top:'0.3em'}}>{getUserInitials(String(lisitem.ID))}
                  </div>
                </div>
              </div>
                : ''
              )
            } */}
          </div>
         ) :


         <div style={{position:'relative', width:'100%', height:'auto', color:'red', textAlign:'center', top:isSmartphone() ? '2em':'0.6em', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '3em' : '1.5em', userSelect:'none'}}>
            <div style={{position:'relative', display:'flex'}}>
              <div style={{fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '2.5em' : '2em', position:'relative', top:isSmartphone() ? '-0.5em' : '0.5em', color:'#F15A24', textAlign:'left', paddingLeft:isSmartphone() ? '0.9em' : '1.8em'}}>{getUserTotalTasks()}</div>
              <div style={{fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '1.2em' : '1em', position:'relative', top:isSmartphone() ? '-0.2em' : '1.8em', color:'black', textAlign:'left', paddingLeft:isSmartphone() ? '2.8em' : '4.3em'}}>{getUserTotalTasks() <= 1 ? 'TASK' : 'TASKS'}</div>
            </div>
            {
            AllFlowItemsDetails.map((lisitem:any, i:number)=>
            /* docList.map((item:any, i:number)=> */
            taskList.map((item:any, index:number)=>
           /*  ((String(lisitem.ID) === String(activeUserId).split('P')[1])) ? */
            (lisitem[item].split(':')[0] !== 'C' && lisitem[item].split(':')[1] === activeUserId) ?
            <div onClick={()=>onTaskListClick(String(lisitem.ID), lisitem)} style={{position:'relative', height:'4.5em', backgroundColor:'white', border:'0px solid #00000020', top:isSmartphone() ? '-1em' : '1.5em', textAlign:'left', paddingLeft:'10.5em'}}>
              <div style={{position:'relative', display:'flex', width:'100%', justifyContent:'space-between', right:'0', top:'0.1em'}}>
                <div style={{position:'relative', width:'0%'}}>
                  <div style={{position:'relative', width:isSmartphone() ? '3em' : '3em', height:isSmartphone() ? '3em' : '3em', left:isSmartphone() ? '-9.2em' : '-8em', borderRadius:'50%', backgroundColor:'#BEBEBE', textAlign:'left', top:isSmartphone() ? '0.6em' : '0.7em'}}>
                    <div style={{fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '1.8em' : '1.5em', color:'#020202', fontWeight:'100', position:'relative', top:isSmartphone() ? '0.3em' : '0.4em', textAlign:'center'}}>{dispUserName}</div>
                  </div>
                </div>
                <div style={{position:'absolute', left:isSmartphone() ? '-4em' : '-2em', top:isSmartphone() ? '-0.1em' : '-0.2em'}}>
                  <div style={{position:'relative', top:'0.6em', color:'black', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '1.2em' : '1.1em'}}>{lisitem.Component}</div>
                  <div style={{position:'relative', top:'0.8em', color:'#00000095', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '0.9em' : '0.8em',}}>{lisitem.Project}</div>
                  <div style={{position:'relative', top:'0.9em', color:'#00000095', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '0.9em' : '0.8em',}}>DUE: {lisitem[item].split(':')[2] !== 'undefined' ? lisitem[item].split(':')[2] : '' /* lisitem['Due Date'] */}</div>
                </div>
                <div style={{position:'relative', width:'10%', textAlign:'right', top:isSmartphone() ? '1.2em' : '1.1em', right:isSmartphone() ? '1.7em' : '1em'}}>
                  <div><ArrowForwardIcon style={{width:isSmartphone() ? '4em' : '2em', height:isSmartphone() ? '4em' : '2em', color:'black'}} /></div>
                </div>
              </div>
            </div> : '')
            /* ) */)}

          </div>)
           : ''

        }

         </>

          {/* <div style={{position:'relative', width:'6em', height:'auto', backgroundColor:'white', border:'0px solid black', left:'1em', top:'1em', textAlign:'center'}}>
            <div style={{fontSize:'2.2em', color:'orange', fontWeight:'700'}}> 12 </div>
            <div style={{fontSize:'1em', color:'grey', fontWeight:'700'}}> 5945-1.0.1 </div>
          </div> */}

          {/* <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div>
          <div style={{position:'relative', width:'8em', height:'100%', backgroundColor:'cyan', border:'1px solid black', left:'0em'}}></div> */}
          {/* <div>

          </div> */}
        </div>
    </div >: <div></div>

    : <DocMode {...props} />



  //},
    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  []
   // )
}
ViewMode.displayName = 'ViewMode'
