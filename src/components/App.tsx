/* import {urlParameters} from '@models/url' */
import {isPortrait, isSmartphone} from '@models/utils'
import chatStore from '@stores/Chat'
/* import errorInfo from '@stores/ErrorInfo' */
import mapStore from '@stores/Map'
import participantsStore from '@stores/participants/Participants'
import roomInfo from '@stores/RoomInfo'
import sharedContentsStore from '@stores/sharedContents/SharedContents'
import {Observer, useObserver} from 'mobx-react-lite'
import React, {Fragment, useRef, /* useState,  */useEffect} from 'react'
import SplitPane from 'react-split-pane'
import { getAllUserData,/* , getLoginClick, getUserType */} from './error/TheEntrance'
import {Footer, getActiveMenu} from './footer/Footer'
/* import {LeftBar} from './leftBar/LeftBar'
import {MainScreen} from './map/MainScreen' */
import {Map} from './map/map'
import {Stores} from './utils'
import {styleCommon} from './utils/styles'
/* import logo_es from '@images/logo.png' */
//import { getLoginClick, getUserType} from './error/TheEntrance' // getRoomName

/* import tabCollapseChat from '@images/earshot_icon_tab.png'
import tabCollapseContent from '@images/earshot_icon_tab_content.png'
import tabChatActive from '@images/earshot_icon_btn-chat.png'
import tabContentActive from '@images/earshot_icon_btn-note.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CloseTabIcon from '@material-ui/icons/HighlightOff' */
/* import html2canvas from 'html2canvas' */
/* import { Dialog, DialogContent} from '@material-ui/core' */
/* import Draggable from 'react-draggable' */
/* import { Emoticons } from './footer/Emoticons'
import { ZoneAvatar } from './footer/ZoneAvatar' */

// Loggedin user
import contactIcon from '@images/flow_sym_alert.png'
import profileIcon from '@images/flow_sym_view_profile.png'
import viewIcon from '@images/flow_sym_view_doc_copy.png'

import viewDocIcon from '@images/flow_sym_view_doc.png'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';

import { getSheetData} from '@models/api/GoogleSheet'
import { getItemSelected } from './map/UI/ViewMode'
import { urlParameters } from '@models/url'

// Common app icon
/* import appIcon from '@images/earshot_icon_globe.png'; */


let _able:Boolean = false
export function getAbleStatus():Boolean {
  return _able
}

let _menuType:string = ''
export function getSelectedMenuType() :string {
  return _menuType
}

let _menuPos:number = -2
export function getSelectedMenuPos() : number {
  return _menuPos;
}

//let selectedImage:string = ''
/* let selectedGroup = ''
let selectedSkin = ''
let selectedHairColor = ''
let selectedHair = ''
let selectedHairBack = ''
let selectedOutfits = ''
let selectedSpecs = '' */


/* let defaultActive:boolean = false


let onDragging:boolean = false */

//let clickType:string = ''
interface Item {
  //Doc_Ref: string;
  ID: string;
  Component: string;
}

const allData = {
  data: ""
}

const allMessageData = {
  data: ''
}

export function getAllSheetData() {
  return allData;
}

export function getAllMessageData() {
  return allMessageData;
}

let flowCount = 0
export function getFlowCount() {
  return flowCount
}

let msgCount = 0
export function getMesageCount() {
  return msgCount
}

let dispUserName = ""

export const App: React.FC<{}> = () => {
  const [flowData,setFlowData] = React.useState<Array<Item>>([]);
  const [messageData, setMessageData] = React.useState<Array<Item>>([]);

  const classes = styleCommon()
  const DEBUG_VIDEO = false //  To see all local and remote tracks or not.
  const stores:Stores = {
    map: mapStore,
    participants: participantsStore,
    contents: sharedContentsStore,
    chat: chatStore,
    roomInfo: roomInfo,
  }
  const refDiv = useRef<HTMLDivElement>(null)
  //const [able, setAble] = useState<Boolean>(false)
  let able = true
  /* const [showIntro, setShowIntro] = useState<Boolean>(true) */
  //const [menuType, setMenuType] = useState('')
  /* let menuType = "" */
  /* const [activeOutfit, setActiveOutfit] = useState(-1)
  const [activeSpecs, setActiveSpecs] = useState(-1)
  const [activeSkin, setActiveSkin] = useState(-1)
  const [activeHair, setActiveHair] = useState(-1)
  const [activeGroup, setActiveGroup] = useState(-1)
  const [activeFrontHair, setActiveFrontHair] = useState(-1)
  const [activeBackHair, setActiveBackHair] = useState(-1) */
  // help ui
  /* const [showHelp, setShowHelp] = useState(false) */

  // for tab
  /* const [position, setPosition] = useState({ x: 0, y: 0 }) */
  /* const [positionMedia, setPositionMedia] = useState({ x: 0, y: 0 }) */

  /* const [activeTabIndex, setActiveTabIndex] = useState(-1) */

  /* const [anim, setAnim] = useState(false) */


  // For Saving data
  /* const refAvatar = useRef<HTMLDivElement>(null) */

  // For supporting Apps

  /*  const refEntity_0 = useRef<Draggable>(null)
  const refEntity_1 = useRef<Draggable>(null)
  const refEntity_2 = useRef<Draggable>(null)
  const refEntity_3 = useRef<Draggable>(null)
  const refEntity_4 = useRef<Draggable>(null)
  const refEntity_5 = useRef<Draggable>(null)
  const refEntity_6 = useRef<Draggable>(null) */


  /* const refEntity_7 = useRef<Draggable>(null)
  const refEntity_8 = useRef<Draggable>(null) */

  // For Media Stream
  /* const refEntity_9 = useRef<Draggable>(null)


  const zoneMediaURL = useObserver(() => stores.participants.local.zone?.mediaURL)
  const inZone = useObserver(() => stores.participants.local.zone?.zone)

  const videoParent = window.location.host.split("https://www.")[0] */


  //////////////////////////////////////////////////////////////////////
  const activeUserName = useObserver(() => stores.roomInfo.activeLoggedInUser)
  const activeUserId = useObserver(() => stores.roomInfo.activeLoggedInUserId)
  ///////////////////////////////////////////////////////////////////
  // Selected Menu Name
  const menuName = useObserver(() => stores.roomInfo.activeMenuType)

  ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////


  // To get selected Item
  let selectedItem = getItemSelected()

  //console.log(menuName, " Selected Menu")

  // Check the loaded info
  const userData = getAllUserData()
  //console.log("userData - ", userData)
  // To find the user Initial to display
  for (let i=0; i<Object(userData.data).length; i++) {
    //console.log()
    if(Object(userData.data[i])['ID'] === activeUserId ) {
      dispUserName = String(Object(userData.data[i])['Initials'])
    }
  }
  if(activeUserName === "") {
    dispUserName = ""
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /* if(activeUserName != "") {
    dispUserName = activeUserName.split(" ")[0].charAt(0).toUpperCase() + "" + activeUserName.split(" ")[1].charAt(0).toUpperCase()
  } else {
    dispUserName = ""
  } */
  ///////////////////////////////////////////////////////////////////////////////////////////////////////


  const sheetId = useObserver(() => stores.roomInfo.activeSheetId)
  //console.log(sheetId, " sheetIdsheetId")

  //////////////////////////////////////////////////////////////////////

  //let animCount = 0
  /* if(zoneMediaURL === undefined) {
    //animCount = 0
    if(defaultActive === true){
      defaultActive = false
      setMenuType('chat')
    }
  } else {
    if(zoneMediaURL !== undefined && inZone === 'close') {
      defaultActive = true
      if(menuType === '') {
        _menuPos = -2
        setMenuType('twitch')
      }
      const _timer = setTimeout(() => {
        clearTimeout(_timer)
        if(anim === false) {
          setAnim(true)
          //animCount++
        } else {
          setAnim(false)
        }
      }, 500)
    } else {
      setAnim(false)
    }
  } */


  // to display image and desc
  /* let activeBgColor:string = "" */
 /*  let roomImgPath:string = ""
  let roomImgDesc:string = "" */
  /* let activeBgColor:string = ""
  let AllMenusTypes:any = []

  //let lastTabIndex = 0
  let tabsDisabled:any = []

  const cContent = useObserver(() => stores.contents.all)



  // Setting default Menu Type
  cContent.filter(item => item.shareType === "appimg").map((content, index) => (
    index === 0 && menuType === '' ? setMenuType(content.type) : ''
  ))
  // For Apps section [Room based loading directly from JSON file]
  cContent.filter(item => item.shareType === "appimg").map((content, index) => (
    menuType === content.type ? activeBgColor = content.baseColor : ''
  ))
  cContent.filter(item => item.shareType === "appimg").map((content, index) => (
    AllMenusTypes.push(content.type)
  ))
  // Find last Index
  if(AllMenusTypes.length === 0) {
    tabsDisabled.splice(0)
    if(Object(refEntity_0.current?.state).x === 0) {
      tabsDisabled.push('chat')
    }
    if(Object(refEntity_1.current?.state).x === 0) {
      tabsDisabled.push('content')
    }
  } else {
  } */

// Checking for tabs in normal states
/* function getNormalTabs() {
  let _index = 0
  if(AllMenusTypes.length === 0) {
    if(Object(refEntity_0.current?.state).x === 0) {
      _index++
    }
    if(Object(refEntity_1.current?.state).x === 0) {
      _index++
    }
  } else {
    //_index = (AllMenusTypes.length + 2)
    if(AllMenusTypes.length === 1) {
      if(Object(refEntity_0.current?.state).x === 0) {
        _index++
      }
      if(Object(refEntity_1.current?.state).x === 0) {
        _index++
      }
      if(Object(refEntity_2.current?.state).x === 0) {
        _index++
      }
    } else if(AllMenusTypes.length === 2) {
      if(Object(refEntity_0.current?.state).x === 0) {
        _index++
      }
      if(Object(refEntity_1.current?.state).x === 0) {
        _index++
      }
      if(Object(refEntity_2.current?.state).x === 0) {
        _index++
      }
      if(Object(refEntity_3.current?.state).x === 0) {
        _index++
      }
    }
  }
  return _index
} */


/* let mediaIndex = getNormalTabs() //.length
let mediaItemIndex = AllMenusTypes.length === 0 ? 2 : ((AllMenusTypes.length + 2))
  let press = false
  const loginStatus = useObserver(() => stores.participants.localId)
  const _roomName = sessionStorage.getItem("room") //getRoomName()
  const enterUserType = useObserver(() => getUserType())
  //console.log(loginStatus, " --------- !!!! -------- ", enterUserType)
  _able = able
  _menuType = menuType

  let tabBGTopBGWeb:number = 0 //100 //98 //98
  let tabBGTopBGMob:number = 0 //242 //238

   ////////////////////////////////////////////////////////////
   const [data,setData] = useState('');
   const [uiData, setUIData] = useState('')
   const getData=()=>{
     fetch('folderlist.php?folder=avatar_tool.png')
       .then((response) => response.text())
       .then((response) => setData(response));
   }

   const getUIData=()=>{
     fetch('folderlist.php?folder=ui/help.png')
       .then((response) => response.text())
       .then((response) => setUIData(response));
   }
   let sliderData: Array<string> = []
   let sliderDots: Array<string> = []
   if(uiData !== '') {
     sliderData = uiData.split(',')
     sliderDots = uiData.split(',')
     sliderDots.pop()
   } */


   function loadFlowDetailsFromSheet(sheet_Id:string, sheet_Name:string) {
    //console.log(sheetId, " --- ", sheetName)
    getSheetData(sheet_Id, sheet_Name).then((data) => {
      //console.log(data, " from flow API ", data.length)
      if(data.length > 0) {
        if(flowData.length === 0) {
          /*
          let data = "[{'Include': '', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 123, 'Start Date': '3/1/2023', 'Due Date': '10/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Wheel house', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.1', 'DD Ref': 'p10', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A:P124:10/2/2023', 'TASK - Outsourced': 'A:P123:12/2/2023:v22:M1:N23:M125:M123:M124', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'C:P124:12/2/2023:#131', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 124, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Roof', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.5', 'DD Ref': 'p11', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 125, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Roof accessories x4', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.6', 'DD Ref': 'p12', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': 'N', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': 'N', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 126, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Monitor mounts x7', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.2', 'DD Ref': 'p13', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A:P123:10/2/2023', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': 'N', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': 'N', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 127, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Monitor x7', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.3', 'DD Ref': 'p14', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': 'N', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 128, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Media player x1', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.4', 'DD Ref': 'p15', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': 'A:P124:10/28/2023', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': 'N', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 129, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Back cabinet x3', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.7', 'DD Ref': 'p16', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 130, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Back counter top', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.8', 'DD Ref': 'p17', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 131, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Front cabinet x3', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.9', 'DD Ref': 'p18', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 132, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Front counter top x3', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.10', 'DD Ref': 'p19', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': 'N', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 133, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Captain controls ', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.11', 'DD Ref': 'p20', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': 'N', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 134, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Large bumpers x2', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.12', 'DD Ref': 'p21', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 135, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Medium bumpers x2', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.13', 'DD Ref': 'p22', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 136, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Small bumpers x3', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.14', 'DD Ref': 'p23', 'TASKS START': '', 'TASK - Assigned Drafter': 'A:P123:10/22/2023', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 137, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Rope Cleats x2', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.15', 'DD Ref': 'p24', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 138, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '201 Little Joe & Barge Basics', 'Component': 'Tie off pylon  x2', 'Doc': '5945-2.1.0', 'Doc Ref': '5945-2.1.16', 'DD Ref': 'p25', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'C', 'TASK - CNC Programming': 'A', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': 'N', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': '', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 142, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '202 Tanker', 'Component': 'Wall Cutouts', 'Doc': '5945-2.2.0', 'Doc Ref': '5945-2.2.1', 'DD Ref': 'p26', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'R', 'TASK - All Materials Here': 'N', 'TASK - CNC Programming': 'N', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': 'N', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': 'N', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': 'N', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 143, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '202 Tanker', 'Component': 'Interactive', 'Doc': '5945-2.2.0', 'Doc Ref': '5945-2.2.2', 'DD Ref': 'p27', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'R', 'TASK - All Materials Here': 'N', 'TASK - CNC Programming': 'N', 'TASK - Outsourced': '', 'TASK - CNC': 'N', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': 'N', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'TRUE', 'ID': 144, 'Start Date': '3/1/2023', 'Due Date': '8/15/2023', 'Client': 'CMH', 'Project': '202 Tanker', 'Component': 'Tires', 'Doc': '5945-2.2.0', 'Doc Ref': '5945-2.2.3', 'DD Ref': 'p28', 'TASKS START': '', 'TASK - Assigned Drafter': 'C:P124', 'TASK - DWG Status': 'C', '': '', 'TASK - Date Submitted for Review': 'C', 'TASK - Date Red Lines Received': 'C', 'TASK - Date Resubmitted for Review': 'C', 'TASK - Date Drawing Released to Shop': 'C', 'TASK - Approved': 'C', 'TASK - Materials Requested': 'C', 'TASK - All Materials Here': 'A', 'TASK - CNC Programming': 'N', 'TASK - Outsourced': 'N', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': 'N', 'TASK - Palleted': 'N', 'TASK - Shipped': 'N', 'TASK - Item installed': 'N', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}, {'Include': 'FALSE', 'ID': '', 'Start Date': '', 'Due Date': '', 'Client': '', 'Project': '', 'Component': '', 'Doc': '', 'Doc Ref': '', 'DD Ref': '', 'TASKS START': '', 'TASK - Assigned Drafter': '', 'TASK - DWG Status': '', '': '', 'TASK - Date Submitted for Review': '', 'TASK - Date Red Lines Received': '', 'TASK - Date Resubmitted for Review': '', 'TASK - Date Drawing Released to Shop': '', 'TASK - Approved': '', 'TASK - Materials Requested': '', 'TASK - All Materials Here': '', 'TASK - CNC Programming': '', 'TASK - Outsourced': '', 'TASK - CNC': '', 'TASK - Wood Shop': '', 'TASK - Metal Shop': '', 'TASK - Graphic P-Lam': '', 'TASK - Powder Coat': '', 'TASK - Paint shop': '', 'TASK - Electronics': '', 'TASK - Graphics': '', 'TASK - Final Assembly': '', 'TASK - Palleted': '', 'TASK - Shipped': '', 'TASK - Item installed': '', 'TASK - On Site Paint': '', 'TASK - On Site Electronics': '', 'TASKS END': '', 'Notes': ''}]"
          */

          //let flowData = data
          var mResponseSC = data.replace(/�/g, "")
          var mResponseDQ = mResponseSC.replace(/"/g, "dqo")
          var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo")
          var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',")
          const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
          let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "');
          let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'");
          let flowInfo = JSON.parse(replaceResponse)
          setFlowData(flowInfo)
          allData.data = flowInfo
          /////////////////////////////////////////////////////////////////
          // Store message data to local store
          stores.roomInfo.activeFlowData = flowInfo
          //////////////////////////////////////////////////////////////////
          flowCount = allData.data.length

          //console.log(flowInfo, " > in App")
        }
      }
    })
  }


  function loadFlowMessagesFromSheet(sheet_Id:string, sheet_Name:string) {
    //console.log(sheetId, " --- ", sheetName)
    getSheetData(sheet_Id, sheet_Name).then((data) => {
      //console.log(data, " from flow API ", data.length)
      if(data.length > 0) {
        if(messageData.length === 0) {
         /*
          let data = "[{'Timestamp': '3/18/2023 12:37:00', 'ID': 'M123', 'Station': 'Wood Shop', 'Sender ID': 'P123', 'Sender': 'JD', 'Message': 'We need this ASAP'},{'Timestamp': '3/18/2023 12:37:00', 'ID': 'M124', 'Station': 'Wood Shop', 'Sender ID': 'P123', 'Sender': 'JD', 'Message': 'We need this ASAP1'},{'Timestamp': '3/18/2023 12:37:00', 'ID': 'M1', 'Station': 'Wood Shop', 'Sender ID': 'P123', 'Sender': 'JD', 'Message': 'We need this ASAP2'},{'Timestamp': '3/18/2023 12:37:00', 'ID': 'M125', 'Station': 'Wood Shop', 'Sender ID': 'P123', 'Sender': 'JD', 'Message': 'We need this ASAP3'}]"
         // */

          //let flowData = data
          var mResponseSC = data.replace(/�/g, "")
          var mResponseDQ = mResponseSC.replace(/"/g, "dqo")
          var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo")
          var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',")
          const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
          let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "');
          let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'");
          let msgInfo = JSON.parse(replaceResponse)
          setMessageData(msgInfo)
          allMessageData.data = msgInfo
          /////////////////////////////////////////////////////////////////
          // Store message data to local store
          stores.roomInfo.activeFlowMessages = msgInfo
          //////////////////////////////////////////////////////////////////
          // Total message count
          msgCount = allMessageData.data.length
          //console.log(flowInfo, " > in App")
          //////////////////////////////////////////////////////////////////
        }
      }
    })
  }

   useEffect(() => {
    //console.log(urlParameters.id?.toString(), " url app")
    if(flowData.length === 0) {
      //if(urlParameters.id === "") {
        //console.log("CALLED DATA")
        //loadFlowDetailsFromSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Master")
      //} else {
        //loadFlowDetailsFromSheet(String(urlParameters.id?.toString()), "Master")
      //}
      //if(urlParameters.id?.toString() !== undefined) {


      if(urlParameters.id?.toString() !== undefined) {
        loadFlowDetailsFromSheet(String(urlParameters.id?.toString()), "Master")
      } else if(sheetId !== "") {
        loadFlowDetailsFromSheet(sheetId, "Master")
      }
    }

    if(messageData.length === 0) {
      //if(urlParameters.id === "") {
        //console.log("CALLED DATA")
        //loadFlowMessagesFromSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "Messages")
      //} else {
        //loadFlowDetailsFromSheet(String(urlParameters.id?.toString()), "Master")
      //}


      if(urlParameters.id?.toString() !== undefined) {
        loadFlowMessagesFromSheet(String(urlParameters.id?.toString()), "Messages")
      } else if(sheetId !== "") {
        loadFlowDetailsFromSheet(sheetId, "Messages")
      }
    }

     /* getData()
     getUIData() */
    /*  if(getLoginClick() || loginStatus) { */
       /* if(enterUserType === "N" && activeSkin === -1 && (stores.participants.local.information.randomAvatar === undefined || stores.participants.local.information.randomAvatar.length === 0)) {
         onGenerateRandomAvatar()
         const genImage = setTimeout(() => {
           clearTimeout(genImage)
           onGenImageForNewUser()
         }, 50)
       } */
       /* const introTimer = setTimeout(() => {
         clearTimeout(introTimer)
         setShowIntro(false)

         if(getUserType() === "N" && activeSkin === -1) {
           setShowHelp(true)
         }
       }, 5000) */
     /* } */
   })

   /* const [currentSlide, setCurrentSlide] = useState(0)
   const slidesLength = sliderData.length-1 */

   /* if(!Array.isArray(sliderData) || sliderData.length <= 0) {
     return null
   } */

   /* function onGenImageForNewUser() {
     if (refAvatar.current === null) {
       return
     }

     html2canvas(refAvatar.current, { allowTaint: true }).then(function(canvas:any) {
       var formData = new FormData();
       formData.append('imgData', canvas.toDataURL());
       fetch('saveAvatarImage.php',
         {
           method: 'POST',
           body: formData
         }
       )
         .then((response) => response.text())
         .then((response) => updateUserAvatar(response));
       ////////////////////////////////////////////////////
     })
     .catch((err) => {
       console.log(err)
     })
   } */


   /* function updateUserAvatar(_path:string) {
     stores.participants.local.information.avatarSrc = _path

     // Storing values to localstorage
     stores.participants.local.information.randomAvatar = [selectedSkin, selectedHairColor, selectedGroup, selectedHair, selectedOutfits, selectedSpecs]

     stores.participants.local.sendInformation()
     stores.participants.local.saveInformationToStorage(true)
   }

   function generateRandomNumber(min:number, max:number) {
     return Math.floor(Math.random() * (max - min + 1) + min)
   } */


  /*  function onGenerateRandomAvatar() {

     //////////////////////////////////////////////////////////////////////////////

   //console.log(data, " data")
   // format accordingly to folder name
   const folders : Array<string> = []
   const images : Array<string> = []
   let tempArr : string = ''
   let dataFolderWise = data.split(',')

   for (let i=0; i<dataFolderWise.length-1; i++) {
       if(folders.indexOf(dataFolderWise[i].split('/')[1]) === -1 && dataFolderWise[i].split('/')[1] !== undefined) {
         folders.push(dataFolderWise[i].split('/')[1])
       }

     }
     for (var j=0; j < folders.length; j++) {
       for (let i=0; i<dataFolderWise.length-1; i++) {
       if(folders[j] === dataFolderWise[i].split('/')[1]) {
         tempArr += (dataFolderWise[i]) + ','
       }
     }
     images.push(tempArr)
     tempArr = ''
   }
   ////////////////////////////////////////////////////////////////////////////
     // For Group, Skin and Hair Color setting
     //let randGroupIndex = generateRandomNumber(0,6)
     let randSkinIndex = generateRandomNumber(15, 20)
     let randHairColorIndex = generateRandomNumber(8, 14)
     let imgArr = images[0].split(',')
     let randGroupIndex = imgArr.indexOf('avatar_tool/Colors/es_co_group_x.png')

     //console.log(randGroupIndex)

     //if(pageIndex === 0) {
       //if(randGroupIndex < 7) {
         selectedGroup = imgArr[randGroupIndex]
         if(activeGroup !== randGroupIndex) {
           setActiveGroup(randGroupIndex)
         }
       //}
     //}
     if(randHairColorIndex >= 7 && randHairColorIndex < 15) {
       selectedHairColor = imgArr[randHairColorIndex].split('/')[2].split('.')[0].split('co_')[1]
       if(activeHair !== randHairColorIndex) {
         setActiveHair(randHairColorIndex)
       }
     }
     if(randSkinIndex >= 15 && randSkinIndex < 20) {
       selectedSkin = imgArr[randSkinIndex]
       if(activeSkin !== randSkinIndex) {
         setActiveSkin(randSkinIndex)
       }
     }
   //}

     // Setting Hairs [ Front , Back ]
     let imgHairArr = images[1].split(',')
     let frontHairs : Array<string> = []
     let frontHairIndex : Array<number> = []
     let backHairs : Array<string> = []
     let backHairIndex : Array<number> = []
     frontHairs.splice(0)
     frontHairIndex.splice(0)
     backHairs.splice(0)
     backHairIndex.splice(0)
     for (let i:number = 0; i < imgHairArr.length - 1; i++) {
       //console.log(selectedHairColor.split('_')[1], " ---- ", imgHairArr[i].split("_")[4])
       //if(imgHairArr[i].indexOf(selectedHairColor) !== -1) {

         //console.log(selectedHairColor.split('_')[1], " --- ", selectedHairColor)

         if(imgHairArr.indexOf(selectedHairColor.split('_')[1] + '_' + imgHairArr[i].split("_")[4]) === -1) {
         if((selectedHairColor.split("_")[1] === imgHairArr[i].split("_")[4])) {
           let hairType = imgHairArr[i].split('/')[2].split('.')[0].split('_')[4]
           if(hairType === 'f') {
             frontHairs.push(imgHairArr[i])
             frontHairIndex.push(i)
           } else if(hairType === 'b') {
             backHairs.push(imgHairArr[i])
             backHairIndex.push(i)
           }
         }
       }
     }
     if(frontHairs.length > 0) {
       let randFrontHairIndex = generateRandomNumber(0, frontHairs.length-1)
       selectedHair = frontHairs[randFrontHairIndex]
       //console.log(frontHairs[randFrontHairIndex])
       if(activeFrontHair !== frontHairIndex[randFrontHairIndex]) {
         setActiveFrontHair(frontHairIndex[randFrontHairIndex])
       }
       //console.log(frontHairs[randFrontHairIndex].split('/')[2].split('.')[0], " random front")
       let findBack = imgHairArr.indexOf(String(frontHairs[randFrontHairIndex].split('_f.png')[0] + '_b.png'))
       //console.log(String(frontHairs[randFrontHairIndex].split('_f.png')[0] + '_b.png'), " BackRandom ", findBack)
       //console.log(findBack, " findBack")
       if(findBack !== -1) {
         selectedHairBack = imgHairArr[findBack]
         if(activeBackHair !== findBack) {
           setActiveBackHair(findBack)
         } else {
           selectedHairBack = ''
           setActiveBackHair(-1)
         }
       } else {
         selectedHairBack = ''
         setActiveBackHair(-1)
       }

     } else {
       selectedHair = ''
       setActiveFrontHair(-1)

       selectedHairBack = ''
       setActiveBackHair(-1)
     }

     // Setting OutFits
     let imgOutfitArr = images[2].split(',')
     let randOutfitIndex = generateRandomNumber(0, imgOutfitArr.length-2)
     selectedOutfits = imgOutfitArr[randOutfitIndex]
     if(activeOutfit !== randOutfitIndex) {
       setActiveOutfit(randOutfitIndex)
     }

     // Setting Specs
     let imgSpecsArr = images[3].split(',')
     let randSpecsIndex = generateRandomNumber(0, imgSpecsArr.length-2)
     selectedSpecs = imgSpecsArr[randSpecsIndex]
     if(activeSpecs !== randSpecsIndex) {
       setActiveSpecs(randSpecsIndex)
     }
   } */


   /* function onPrevClick() {
     //console.log("prev click")
     setCurrentSlide(currentSlide === 0 ? slidesLength-1 : currentSlide - 1)
   }

   function onNextClick() {
     //console.log("next click")
     setCurrentSlide(currentSlide === slidesLength-1 ? 0 : currentSlide + 1)
   } */


  window.addEventListener('keydown', (ev) => {
    //ev.preventDefault()
    if(ev.ctrlKey) {return}

    /* if(ev.key === "F3" && press === false) {
      ev.preventDefault()
      press = true;
      if(able === true) {
        setAble(false)
      } else
      if(able === false) {
        setAble(true)
      }
    } */
  }, {})
  //  toucmove: prevent browser zoom by pinch
  window.addEventListener('touchmove', (ev) => {
    //  if (ev.touches.length > 1) {
    ev.preventDefault()
    //  }
  },                      {passive: false, capture: false})
  //  contextmenu: prevent to show context menu with right mouse click
  window.addEventListener('contextmenu', (ev) => {
    ev.preventDefault()
  },                      {passive: false, capture: false})

  //  Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    /* if ((error?.message === 'Ping timeout' || error?.message === 'Strophe: Websocket error [object Event]')
     && message === null && source === null && lineno === null && colno === null){
      errorInfo.setType('connection')
      if (urlParameters.testBot !== null){  //  testBot
        window.location.reload()  //  testBot will reload when connection is cutted off.
      }
    }else{
      console.warn(`Global handler: ${message}`, source, lineno, colno, error)
    } */
    return true
  }


  /////////////////////////////////////////////////////////////////////////////////

  /* function trackPos(data:any, _index:number, _menu:string) {
    //console.log(data.x, " XXXX START")

    if(data.x > -100 || data.x === 0) {
      setPosition({ x: 0, y: 0 })
      return
    }



    setPosition({ x: data.x, y: data.y })
    _menuPos = position.x


    onDragging = true

    // TODAY
    //_menuType = _menu

    // Setting Pos
    CheckAndSetPosition(_index)
    CheckAndActivateMenu(_index)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Check How many items are there in the dock tab
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  function CheckAndActivateMenu(_index:number) {
    //console.log(AllMenusTypes)
    if(AllMenusTypes.length === 0) {
      if(_index === 0) {
        if(Object(refEntity_1.current?.state).x === 0) {
          setMenuType('content')
        } else if(Object(refEntity_2.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          setMenuType('twitch')
        } else {
          setMenuType('blank')
        }
      } else if(_index === 1) {
        if(Object(refEntity_0.current?.state).x === 0) {
          setMenuType('chat')
        } else if(Object(refEntity_2.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          setMenuType('twitch')
        } else {
          setMenuType('blank')
        }
      } else if(_index === 2) {
        if(Object(refEntity_0.current?.state).x === 0) {
          setMenuType('chat')
        } else if(Object(refEntity_1.current?.state).x === 0) {
          setMenuType('content')
        } else {
          setMenuType('blank')
        }
      }
    } else {
      if(_index === 0) {
        if(Object(refEntity_1.current?.state).x === 0) {
          setMenuType('content')
        } else if(Object(refEntity_2.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 2) {
            setMenuType(AllMenusTypes[_index])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_3.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 3) {
            setMenuType(AllMenusTypes[_index+1])
          }else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_4.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 4) {
            setMenuType(AllMenusTypes[_index+2])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_5.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 5) {
            setMenuType(AllMenusTypes[_index+3])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_6.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 6) {
            setMenuType(AllMenusTypes[_index+4])
          } else {
            setMenuType('twitch')
          }
        } else {
          setMenuType('blank')
        }
      } else if(_index === 1) {
        if(Object(refEntity_0.current?.state).x === 0) {
          setMenuType('chat')
        } else if(Object(refEntity_2.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 2) {
            setMenuType(AllMenusTypes[_index-1])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_3.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 3) {
            setMenuType(AllMenusTypes[_index])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_4.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 4) {
            setMenuType(AllMenusTypes[_index+1])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_5.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 5) {
            setMenuType(AllMenusTypes[_index+3])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_6.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 6) {
            setMenuType(AllMenusTypes[_index+4])
          } else {
            setMenuType('twitch')
          }
        } else {
          setMenuType('blank')
        }
      } else if(_index >= 2) {
        if(Object(refEntity_0.current?.state).x === 0) {
          setMenuType('chat')
        } else if(Object(refEntity_1.current?.state).x === 0) {
          setMenuType('content')
        } else if(Object(refEntity_3.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 3) {
            setMenuType(AllMenusTypes[_index-2])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_4.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 4) {
            setMenuType(AllMenusTypes[_index-2])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_5.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 5) {
            setMenuType(AllMenusTypes[_index-2])
          } else {
            setMenuType('twitch')
          }
        } else if(Object(refEntity_6.current?.state).x === 0) {
          _menuPos = -2
          setActiveTabIndex(-1)
          if(mediaItemIndex !== 6) {
            setMenuType(AllMenusTypes[_index-2])
          } else {
            setMenuType('twitch')
          }
        } else {
          setMenuType('blank')
        }
      }
    }
  } */


  /* function CheckAndSetPosition(_index:number) {
    if(_index === 0) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = (0)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }

      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 1) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = (0)
      }
      if(Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0) {
        moveIndex = moveIndex + 1
      } else if(Object(refEntity_1.current?.state).x === 0) {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 2) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = (0)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 3) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 4) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 5) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0 || Object(refEntity_5.current?.state).x > 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    } else if(_index === 6) {
      let moveIndex = 0
      if(Object(refEntity_0.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(Object(refEntity_1.current?.state).x < 0) {
        moveIndex = moveIndex + 1
      } else {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
      if(mediaItemIndex !== 2) {
        if(Object(refEntity_2.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_2.current?.state).x = 0
          Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 3) {
        if(Object(refEntity_3.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_3.current?.state).x = 0
          Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 4) {
        if(Object(refEntity_4.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_4.current?.state).x = 0
          Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 5) {
        if(Object(refEntity_5.current?.state).x < 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_5.current?.state).x = 0
          Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
      if(mediaItemIndex !== 6) {
        if(Object(refEntity_6.current?.state).x < 0  || Object(refEntity_6.current?.state).x > 0) {
          moveIndex = moveIndex + 1
        } else {
          Object(refEntity_6.current?.state).x = 0
          Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
        }
      }
    }
  } */

  /* function setTrack(data:any, _url:string, _index:number, _menu:string) {
    //setMenuType(_type)
  const resetDrag = setTimeout(() => {
    clearTimeout(resetDrag)
    onDragging = false
  }, 300)

    if(data.y < ((_index * -51)) || data.y > (675 + (_index * -51)) || data.x < (-(stores.map.screenSize[0] - 40)) || data.x > 0) {
      ///////////////////////////////////////////////////////
      //onDragging = false
      // Hide the Tab
      if(_index === 0) {
        //console.log("SetTrack fun")
        //Object(refEntity_0.current?.state).x = -99999999
        //ResetAppsPanel(0, 'chat')
        Object(refEntity_0.current?.state).x = -(stores.map.screenSize[0] )
        Object(refEntity_0.current?.state).y = (_index * -51)
        if(data.y < ((_index * -51)) || data.y > (675 + (_index * -51))) {
          onDragging = false
        }
        setPosition({x:0, y:0})
        return
      } else if(_index === 1) {
        //Object(refEntity_1.current?.state).x = -99999999
        //ResetAppsPanel(1, 'content')
        Object(refEntity_1.current?.state).x = -(stores.map.screenSize[0])
        Object(refEntity_1.current?.state).y = (_index * -51)
        if(data.y < ((_index * -51)) || data.y > (675 + (_index * -51))) {
          onDragging = false
        }
        setPosition({x:0, y:0})
        return
      } else if(_index === 2) {
        Object(refEntity_2.current?.state).x = -99999999
      } else if(_index === 3) {
        Object(refEntity_3.current?.state).x = -99999999
      } else if(_index === 4) {
        Object(refEntity_4.current?.state).x = -99999999
      } else if(_index === 5) {
        Object(refEntity_5.current?.state).x = -99999999
      } else if(_index === 6) {
        Object(refEntity_6.current?.state).x = -99999999
      } else if(_index === 9) {
        Object(refEntity_9.current?.state).x = -99999999
      }

      ///////////////////////////////////////////////////////
      //window.open(_url, "_new")

      //console.log(_index, " INDEX ", _url)
      // zonemedia URL (filter out)
      let mediaType = _url.indexOf('twitch')
      let scWidth = window.innerWidth
      let scHeight = window.innerHeight
      let winWidth = window.innerWidth// - 100
      let winHeight = window.innerHeight// - 100
      var winLeft = ( scWidth - winWidth ) / 2
      var winTop = ( scHeight - winHeight ) / 2

      //window.open(_url, "_new")
      let externalWindow = window.open(_index === mediaItemIndex ? (mediaType !== -1 ? (_url + '&parent=' + videoParent + '&autoplay=true') : (_url + "?autoplay=true")) : _url, '', 'width='+winWidth+',height='+winHeight+',left='+winLeft+',top='+winTop);
      var timer = setInterval(function() {
        if(externalWindow?.closed) {
            clearInterval(timer);
            if(_index === 0) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * 51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

            } else if(_index === 1) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0) {
                Object(refEntity_1.current?.state).x = 0
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

            } else if(_index === 2) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

            } else if(_index === 3) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                //Object(refEntity_1.current?.state).y = (0)
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = (0)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

            } else if(_index === 4) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                //Object(refEntity_1.current?.state).y = (0)
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  //Object(refEntity_2.current?.state).y = (0)
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }
            } else if(_index === 5) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                //Object(refEntity_1.current?.state).y = (0)
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  //Object(refEntity_2.current?.state).y = (0)
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x < 0  || Object(refEntity_5.current?.state).x > 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0  || Object(refEntity_5.current?.state).x > 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x === 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

            } else if(_index === 6) {
              let moveIndex = 0
              if(Object(refEntity_0.current?.state).x === 0) {
                Object(refEntity_0.current?.state).x = 0
                Object(refEntity_0.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
              if(Object(refEntity_1.current?.state).x === 0) {
                Object(refEntity_1.current?.state).x = 0
                //Object(refEntity_1.current?.state).y = (0)
                Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }

              if(mediaItemIndex !== 2) {
                if(Object(refEntity_2.current?.state).x === 0) {
                  Object(refEntity_2.current?.state).x = 0
                  //Object(refEntity_2.current?.state).y = (0)
                  Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_2.current?.state).x < 0) {
                  Object(refEntity_2.current?.state).x = 0
                  Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 3) {
                if(Object(refEntity_3.current?.state).x === 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_3.current?.state).x < 0) {
                  Object(refEntity_3.current?.state).x = 0
                  Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 4) {
                if(Object(refEntity_4.current?.state).x === 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_4.current?.state).x < 0) {
                  Object(refEntity_4.current?.state).x = 0
                  Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 5) {
                if(Object(refEntity_5.current?.state).x === 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                } else {
                  moveIndex = moveIndex + 1
                }
              } else {
                if(Object(refEntity_5.current?.state).x < 0) {
                  Object(refEntity_5.current?.state).x = 0
                  Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }

              if(mediaItemIndex !== 6) {
                if(Object(refEntity_6.current?.state).x < 0  || Object(refEntity_6.current?.state).x > 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
                }
              } else {
                if(Object(refEntity_6.current?.state).x < 0  || Object(refEntity_6.current?.state).x > 0) {
                  Object(refEntity_6.current?.state).x = 0
                  Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
                }
              }
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            setPosition({x:0, y:0})
            setPositionMedia({x:0, y:0})
            // CHECKING MENU
            //console.log(_menu, " Menu TO be active")
            setMenuType(_menu)
        }
    }, 100);
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
        _menuPos = -2
        // TODAY
        //setPosition({x:0, y:0})
        setAble(false)
        //console.log(_menuPos, " menuPos")
    }
  } */


//////////////////////////////////////////
/* function ResetAppsPanel(index:number, _type:string) {
  if(index === 0) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }

    if(Object(refEntity_1.current?.state).x === 0) {
      Object(refEntity_1.current?.state).x = 0
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * 51)
    } else {
      moveIndex = moveIndex + 1
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

  } else if(index === 1) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x === 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }
    if(Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0) {
      Object(refEntity_1.current?.state).x = 0
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
    } else {
      moveIndex = moveIndex + 1
    }

   if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(mediaItemIndex !== 5) {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(mediaItemIndex !== 6) {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

  } else if(index === 2) {
    let moveIndex = 0

      if(Object(refEntity_0.current?.state).x === 0) {
        Object(refEntity_0.current?.state).x = 0
        Object(refEntity_0.current?.state).y = (0)
      } else {
        moveIndex = moveIndex + 1
      }


      if(Object(refEntity_1.current?.state).x === 0) {
        Object(refEntity_1.current?.state).x = 0
        Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }


   if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

  } else if(index === 3) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x === 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }
    if(Object(refEntity_1.current?.state).x === 0) {
      Object(refEntity_1.current?.state).x = 0
      //Object(refEntity_1.current?.state).y = (0)
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
    } else {
      moveIndex = moveIndex + 1
    }

   if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        //Object(refEntity_4.current?.state).y = (0)
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        //Object(refEntity_5.current?.state).y = (0)
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

   if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        //Object(refEntity_6.current?.state).y = (0)
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

  } else if(index === 4) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x === 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }

    if(Object(refEntity_1.current?.state).x === 0) {
      Object(refEntity_1.current?.state).x = 0
      //Object(refEntity_1.current?.state).y = (0)
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
    } else {
      moveIndex = moveIndex + 1
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        //Object(refEntity_2.current?.state).y = (0)
        Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

   if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

  } else if(index === 5) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x === 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }
    if(Object(refEntity_1.current?.state).x === 0) {
      Object(refEntity_1.current?.state).x = 0
      //Object(refEntity_1.current?.state).y = (0)
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
    } else {
      moveIndex = moveIndex + 1
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = (0)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x < 0 || Object(refEntity_5.current?.state).x > 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x === 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }
  } else if(index === 6) {
    let moveIndex = 0
    if(Object(refEntity_0.current?.state).x === 0) {
      Object(refEntity_0.current?.state).x = 0
      Object(refEntity_0.current?.state).y = (0)
    } else {
      moveIndex = moveIndex + 1
    }
    if(Object(refEntity_1.current?.state).x === 0) {
      Object(refEntity_1.current?.state).x = 0
      //Object(refEntity_1.current?.state).y = (0)
      Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
    } else {
      moveIndex = moveIndex + 1
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_2.current?.state).x === 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = (0)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_2.current?.state).x < 0) {
        Object(refEntity_2.current?.state).x = 0
        Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_3.current?.state).x === 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_3.current?.state).x < 0) {
        Object(refEntity_3.current?.state).x = 0
        Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_4.current?.state).x === 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_4.current?.state).x < 0) {
        Object(refEntity_4.current?.state).x = 0
        Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_5.current?.state).x === 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      } else {
        moveIndex = moveIndex + 1
      }
    } else {
      if(Object(refEntity_5.current?.state).x < 0) {
        Object(refEntity_5.current?.state).x = 0
        Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }

    if(_type !== 'twitch') {
      if(Object(refEntity_6.current?.state).x < 0 || Object(refEntity_6.current?.state).x > 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
      }
    } else {
      if(Object(refEntity_6.current?.state).x < 0) {
        Object(refEntity_6.current?.state).x = 0
        Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
      }
    }
  }
  _menuPos = -2
  setPosition({x:0, y:0})
  setPositionMedia({x:0, y:0})
  setActiveTabIndex(-1)
  setMenuType(_type)
} */
//////////////////////////////////////////
/* let clicks:any = [];
let timeout:any;
// Single & Double Click
function singleClick(event:any, tabType:string, tabURL:string, tabIndex:number) {
  if((position.x < 0 || position.x > 0) && activeTabIndex === tabIndex) {
    if(onDragging === false) {
      ResetAppsPanel((tabIndex), tabType)
      return
    }

  }

  if(tabIndex === 0) {
    if((Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0)) {
      if(onDragging === false) {
        ResetAppsPanel((tabIndex), tabType)
      } else {
        if(Object(refEntity_0.current?.state).x < -(stores.map.screenSize[0] - 40)) {
          onDragging = false

          Object(refEntity_0.current?.state).x = -(stores.map.screenSize[0])
          Object(refEntity_0.current?.state).y = (tabIndex * -51)

          setPosition({x:0, y:0})
        }
      }
      return

    }
  } else if(tabIndex === 1) {
    if((Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0)) {
      if(onDragging === false) {
        ResetAppsPanel((tabIndex), tabType)
      } else {
        if(Object(refEntity_1.current?.state).x < -(stores.map.screenSize[0] - 40)) {
          //console.log("single click fun")
          onDragging = false
          Object(refEntity_1.current?.state).x = -(stores.map.screenSize[0])
          Object(refEntity_1.current?.state).y = (tabIndex * -51)
          setPosition({x:0, y:0})
        }
      }
      return
    }
  } else if(tabIndex === 2) {
    if((Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) ) {
      //ResetAppsPanel((tabIndex), tabType)
      return
    }
  } else if(tabIndex === 3) {
    if((Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) ) {
      //ResetAppsPanel((tabIndex), tabType)
      return
    }
  } else if(tabIndex === 4) {
    if((Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) ) {
     // ResetAppsPanel((tabIndex), tabType)
      return
    }
  } else if(tabIndex === 5) {
    if((Object(refEntity_5.current?.state).x < 0 || Object(refEntity_5.current?.state).x > 0) ) {
      //ResetAppsPanel((tabIndex), tabType)
      return
    }
  } else if(tabIndex === 6) {
    if((Object(refEntity_6.current?.state).x < 0 || Object(refEntity_6.current?.state).x > 0) ) {
      //ResetAppsPanel((tabIndex), tabType)
      return
    }
  }

    press = true;
    if(able === true) {
      if(menuType === tabType) {
        setAble(false)
      }
    } else
    if(able === false) {
      setAble(true)
    }
    setMenuType(tabType)
    setActiveTabIndex(tabIndex)
} */

/* function doubleClick(event:any, tabType:string, tabURL:string, tabIndex:number) {
  if(tabIndex === 0 && (tabType === 'chat' || tabType === 'content')) {
    Object(refEntity_0.current?.state).x = -(stores.map.screenSize[0])// - 40)
    Object(refEntity_0.current?.state).y = 0 //(tabIndex * -51)
    setPosition({x:0, y:0})
  } else if(tabIndex === 1 && (tabType === 'chat' || tabType === 'content')) {
    Object(refEntity_1.current?.state).x = -(stores.map.screenSize[0])// - 40)
    Object(refEntity_1.current?.state).y = (tabIndex * -51)
    setPosition({x:0, y:0})
  } else {
    if(tabIndex === 0) {
      if(Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0) {return}
      Object(refEntity_0.current?.state).x = -99999999
    } else if(tabIndex === 1) {
      if(Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0) {return}
      Object(refEntity_1.current?.state).x = -99999999
    } else if(tabIndex === 2) {
      if(Object(refEntity_2.current?.state).x < -99999998 || Object(refEntity_2.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_2.current?.state).x = -99999999
    } else if(tabIndex === 3) {
      if(Object(refEntity_3.current?.state).x < -99999998 || Object(refEntity_3.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_3.current?.state).x = -99999999
    } else if(tabIndex === 4) {
      if(Object(refEntity_4.current?.state).x < -99999998 || Object(refEntity_4.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_4.current?.state).x = -99999999
    } else if(tabIndex === 5) {
      if(Object(refEntity_5.current?.state).x < -99999998 || Object(refEntity_5.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_5.current?.state).x = -99999999
    } else if(tabIndex === 6) {
      if(Object(refEntity_6.current?.state).x < -99999998 || Object(refEntity_6.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_6.current?.state).x = -99999999
    } else if(tabIndex === 9) {
      if(Object(refEntity_9.current?.state).x < -99999998 || Object(refEntity_9.current?.state).x > 0 ) {
        setPosition({x:0, y:0})
        return
      }
      Object(refEntity_9.current?.state).x = -99999999
    }

    let mediaType = tabURL.indexOf('twitch')

    let scWidth = window.innerWidth
    let scHeight = window.innerHeight
    let winWidth = window.innerWidth// - 100
    let winHeight = window.innerHeight// - 100
    var winLeft = ( scWidth - winWidth ) / 2
    var winTop = ( scHeight - winHeight ) / 2

    //window.open(_url, "_new")
    let externalWindow = window.open(tabType === 'twitch' ? (mediaType !== -1 ? (tabURL + '&parent=' + videoParent + '&autoplay=true') : (tabURL + "?autoplay=true")) : tabURL, '', 'width='+winWidth+',height='+winHeight+',left='+winLeft+',top='+winTop);


    var timer = setInterval(function() {
      if(externalWindow?.closed) {
          clearInterval(timer);
          //alert(_index);
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //CheckAndSetPosition(_index)
          if(tabIndex === 0) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 1) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0) {
              Object(refEntity_1.current?.state).x = 0
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 2) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 3) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              //Object(refEntity_1.current?.state).y = (0)
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = (0)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 4) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                //Object(refEntity_2.current?.state).y = (0)
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 5) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              //Object(refEntity_1.current?.state).y = (0)
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                //Object(refEntity_2.current?.state).y = (0)
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x < 0  || Object(refEntity_5.current?.state).x > 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0  || Object(refEntity_5.current?.state).x > 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x === 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

          } else if(tabIndex === 6) {
            let moveIndex = 0
            if(Object(refEntity_0.current?.state).x === 0) {
              Object(refEntity_0.current?.state).x = 0
              Object(refEntity_0.current?.state).y = (0)
            } else {
              moveIndex = moveIndex + 1
            }
            if(Object(refEntity_1.current?.state).x === 0) {
              Object(refEntity_1.current?.state).x = 0
              //Object(refEntity_1.current?.state).y = (0)
              Object(refEntity_1.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
            } else {
              moveIndex = moveIndex + 1
            }

            if(mediaItemIndex !== 2) {
              if(Object(refEntity_2.current?.state).x === 0) {
                Object(refEntity_2.current?.state).x = 0
                //Object(refEntity_2.current?.state).y = (0)
                Object(refEntity_2.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_2.current?.state).x < 0) {
                Object(refEntity_2.current?.state).x = 0
                Object(refEntity_2.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 3) {
              if(Object(refEntity_3.current?.state).x === 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_3.current?.state).x < 0) {
                Object(refEntity_3.current?.state).x = 0
                Object(refEntity_3.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 4) {
              if(Object(refEntity_4.current?.state).x === 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_4.current?.state).x < 0) {
                Object(refEntity_4.current?.state).x = 0
                Object(refEntity_4.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 5) {
              if(Object(refEntity_5.current?.state).x === 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              } else {
                moveIndex = moveIndex + 1
              }
            } else {
              if(Object(refEntity_5.current?.state).x < 0) {
                Object(refEntity_5.current?.state).x = 0
                Object(refEntity_5.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }

            if(mediaItemIndex !== 6) {
              if(Object(refEntity_6.current?.state).x < 0  || Object(refEntity_6.current?.state).x > 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (moveIndex * -121) : (moveIndex * -51)
              }
            } else {
              if(Object(refEntity_6.current?.state).x < 0  || Object(refEntity_6.current?.state).x > 0) {
                Object(refEntity_6.current?.state).x = 0
                Object(refEntity_6.current?.state).y = isSmartphone() ? (0) : (0)
              }
            }
          }
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          _menuPos = -2
          setPosition({x:0, y:0})
          setPositionMedia({x:0, y:0})
          setMenuType(tabType)
      }
  }, 100);
  }

  CheckAndSetPosition(tabIndex)

  // When double click
  CheckAndActivateMenu(tabIndex)

  setActiveTabIndex(tabIndex)

  // Enable When needed
  setAble(false)
}*/

/* function onTabMenuClick(event:any, _type:string, _url:string, _index:number) {
  //onDragging = false
  event.preventDefault();
  clicks.push(new Date().getTime());
  window.clearTimeout(timeout);
  const clickTimeout = window.setTimeout(() => {
    clearTimeout(clickTimeout) // 250
    if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 300) {
      //console.log("double click")
      //clickType = 'double'
      doubleClick(event.target, _type, _url, _index)
    } else {
      //console.log("single click")
      //clickType = 'single'
      singleClick(event.target, _type, _url, _index)
    }
  }, 250);
} */
  //////////////////////////////////////////////////////////////////////////////////
  //console.log(activeUserId.split("P")[1], " IDDD")
  /* let mComponentName = ""
  let activeID = activeUserId.split("P")[1]
  for (let i=0; i<Object(allData.data).length; i++) {
    //console.log(Object(allData.data[i])['ID'], " --- ", activeUserId)
    if(String(Object(allData.data[i])['ID']) === activeID) {
      //console.log((Object(allData.data[i])['Component']), " aaaa")
      mComponentName = Object(allData.data[i])['Component']
    }
  } */
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  let AllFlowItemsDetails:any = []
  for (let i=0; i<Object(allData.data).length; i++) {
    if(Object(allData.data[i])['Doc'] !== "" && Object(allData.data[i])['Include'] === "TRUE") {
      //console.log((Object(sheetFlowData.data[i])['HSS Dwg #']), " aaaa")
      AllFlowItemsDetails.push(Object(allData.data[i]))
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
///////////////////////////////////////////////////////////////////////////////////////
let taskList:any = []
for (let key in docList[0]) {
    if(key.indexOf('TASK - ') === 0) {
        taskList.push(key)
    }
  //}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
/* let user_Task = "" */
let mComponentName = ""
AllFlowItemsDetails.map((lisitem:any, i:number)=>
  taskList.map((item:any, index:number)=>
  (lisitem[item].split(':')[0] !== 'C' && lisitem[item].split(':')[1] === activeUserId) ?
  /* console.log(lisitem[item], " --- ", item, " ==== ", index) *//* mComponentName = item[0].split('TASK - ')[0] */ mComponentName = (item.split('TASK - ')[1])  : ""
))

/////////////////////////////////////////////////////////////////
let toDispFormat:string = ""
if(mComponentName !== "") {
  toDispFormat = activeUserName.toUpperCase() + " ("+ mComponentName +")"
} else {
  toDispFormat = activeUserName.toUpperCase()
}
/////////////////////////////////////////////////////////////////


function getPageRef(item:any) {
  let pageRef = ""
  let pageNum = String(item).split("p")[1]
  pageRef = "Page " + pageNum
  return pageRef
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
  //var result = flowData.filter(obj => obj.ID === activeUserId);
  //console.log(result/* Object(result[0])['Component'] */, " assign")
  //console.log(allData.data, " ----------------------")
  //////////////////////////////////////////////////////////////////////////////////
  function backToView() {
    let fromMenu = getActiveMenu();
    //console.log("BACK TO VIEW MODE - ", fromMenu)
    if(stores.roomInfo.activeMenuType === 'docview') {
      if(fromMenu === 'list') {
        stores.roomInfo.activeMenuType = 'list'
      } else {
        stores.roomInfo.activeMenuType = 'flow'
      }
    } else if(stores.roomInfo.activeMenuType === 'docdetailview') {
      stores.roomInfo.activeMenuType = 'docview'
    }
  }
  //////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////

  /* let dispUserName = "MA"
  let activeUserName = "ALAM" */
  //console.log("Reloaded page....")

  return <Observer>{()=>{
    return <div ref={refDiv} className={classes.back} style={{backgroundColor: '#FFFFFF', width:'100%', height:'100%', minWidth:'100%', minHeight:'100%'}}>
          {/* <SplitPane pane2Style={able === true ? {display: 'block', backgroundColor: menuType === 'chat' ? '#FFFFFF' : menuType === 'content' || menuType === 'twitch' ? '#FFFFFF' : menuType !== 'blank' ? activeBgColor : 'white'
, boxShadow: menuType !== 'blank' ? '5px 10px 10px 3px black' : '5px 10px 10px 3px white'} : {display: 'none', backgroundColor: '#FFF'}} className={classes.fill} split="vertical"
  minSize={0} defaultSize={able === true ? isSmartphone() ? '100%' : (_menuType !== 'chat' && _menuType !== 'content') ? "100%" : '100%' : "100%"}> */}
          <SplitPane pane2Style={able === true ? {display: 'block', backgroundColor: '#FFFFFF', boxShadow: '5px 10px 10px 3px white'} : {display: 'none', backgroundColor: '#FFF'}} className={classes.fill} split="vertical"
  minSize={0} defaultSize={isSmartphone() ? '100%' : "100%"}>
          <Fragment>
            {/* <MainScreen showAllTracks = {DEBUG_VIDEO} stores={stores} /> */}
            <Observer>{() => <Map transparent={sharedContentsStore.mainScreenStream !== undefined
             || DEBUG_VIDEO} stores={stores} />
            }</Observer>
            {/* /////////////////////////////////CHAT APP/////////////////////////////////// */}

            {/* <Draggable disabled={Object(refEntity_0.current?.state).x === -(stores.map.screenSize[0]) ? true : false} ref={refEntity_0} key={0} onDrag={(e, data) => trackPos(data, 0, 'chat')} onStop={(e, data) => setTrack(data, '', 0, 'chat')} defaultPosition={{x: 0, y: 0}}>



            <div style={{position:'absolute', right:able ? '0%' : '0%', top:isSmartphone() ? tabBGTopBGMob + (0 * 119) : tabBGTopBGWeb + (0*51), borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'chat' ? 19 : (activeTabIndex === 0) ? 199 : (18 - (0+2)), height:'100%'}}>
            <div  style={{position:'absolute', right:able ? '0%' : '0%', top:'0px', borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'chat' ? 19 : (18 - (0+2))}}
            ////////////////////////////////////////////////////////////////////
              onClick={(e) => {
                // handling single & double click
                onTabMenuClick(e, 'chat', '', 0)
              }}
              onTouchEnd={(e) => {
                onTabMenuClick(e, 'chat', '', 0)
              }}
              >

                <img src={tabCollapseChat} style={{width:isSmartphone() ? 120 : 50, height:'auto', position:'relative', top:'0px', left:isSmartphone() ? '1px' : '1px', userSelect:'none', zIndex:showIntro ? 0 : menuType === 'chat' ? 19 : (18 - (0+2))}} draggable={false} alt='' />
                <img src={tabChatActive} style={{width:isSmartphone() ? 120 : 50, height:isSmartphone() ? 120 : 50, color:'white', position:'absolute', top:'2px', left:isSmartphone() ? '10px' : '5px' , userSelect:'none', zIndex:showIntro ? 0 : 99}} draggable={false} alt='' />
              </div>



              <div style={{position: 'absolute', width:(onDragging === true) ? '405px' : (stores.map.screenSize[0]) + 'px', height:(onDragging === true) ? '70%' : '100%', left:'0px', backgroundColor:'#0f5c81', borderRadius:'2px', minWidth:'280px', top:'0px',
              display:((Object(refEntity_0.current?.state).x < 0 || Object(refEntity_0.current?.state).x > 0)) ? 'block' : 'none' , zIndex:-9999}}>
              <CloseTabIcon style={{width:'40px', height:'50px', position:'absolute', right:'5px', color:'white', padding:isSmartphone() ? '10px' : '1px', transform:isSmartphone() ? 'scale(2)' : 'scale(1)', zIndex:9999, display:(onDragging === true) ? 'none' : 'block'}}
                onClick={() => {
                  ResetAppsPanel(0, 'chat')
                }}
                onTouchEnd={() => {
                  ResetAppsPanel(0, 'chat')
                }}
              />
                <LeftBar stores={stores} type={'chat'}/>
              </div>
              </div>
            </Draggable> */}

             {/* <Draggable disabled={Object(refEntity_1.current?.state).x === -(stores.map.screenSize[0]) ? true : false} ref={refEntity_1} key={1} onDrag={(e, data) => trackPos(data, 1, 'content')} onStop={(e, data) => setTrack(data, '', 1, 'content')} defaultPosition={{x: 0, y: 0}}>
            <div style={{position:'absolute', right:able ? '0%' : '0%', top:isSmartphone() ? tabBGTopBGMob + (1 * 119) : tabBGTopBGWeb + (1*51), borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'content' ? 19 : (activeTabIndex === 1) ? 199 : (18 - (1+2)), height:'100%'}}>
            <div  style={{position:'absolute', right:able ? '0%' : '0%', top:'0px', borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'content' ? 19 : (18 - (1+2))}}
              onClick={(e) => {
                // handling single & double click
                onTabMenuClick(e, 'content', '', 1)
              }}
              onTouchEnd={(e) => {
                onTabMenuClick(e, 'content', '', 1)
              }}
              >
                <img src={tabCollapseContent} style={{width:isSmartphone() ? 120 : 50, height:'auto', position:'relative', top:'0px', left:isSmartphone() ? '1px' : '1px', userSelect:'none', zIndex:showIntro ? 0 : menuType === 'content' ? 19 : (18 - (1+2))}} draggable={false} alt='' />
                <img src={tabContentActive} style={{width:isSmartphone() ? 120 : 50, height:isSmartphone() ? 120 : 50, color:'white', position:'absolute', top:'2px', left:isSmartphone() ? '10px' : '5px' , userSelect:'none', zIndex:showIntro ? 0 : 99}} draggable={false} alt='' />
              </div>

              <div style={{position: 'absolute', width:(onDragging === true) ? '405px' : (stores.map.screenSize[0]) + 'px', height:(onDragging === true) ? '70%' : '100%', left:'0px', backgroundColor:'#8b5e3c', borderRadius:'2px', minWidth:'280px', top:'0px',
              display:((Object(refEntity_1.current?.state).x < 0 || Object(refEntity_1.current?.state).x > 0)) ? 'block' : 'none' , zIndex:-9999}}>
              <CloseTabIcon style={{width:'40px', height:'50px', position:'absolute', right:'5px', color:'white', padding:isSmartphone() ? '10px' : '1px', transform:isSmartphone() ? 'scale(2)' : 'scale(1)', zIndex:9999,display:(onDragging === true) ? 'none' : 'block'}}
                onClick={() => {
                  ResetAppsPanel(1, 'content')
                }}
                onTouchEnd={() => {
                  ResetAppsPanel(1, 'content')
                }}
              />
                <LeftBar stores={stores} type={'content'}/>
              </div>
              </div>
            </Draggable> */}
             <>
            {/* { cContent.filter(item => item.shareType === "appimg").map((content, index) => (
              <Draggable bounds={content.url === '' ? {top: ((index+2) * -51), left: -(stores.map.screenSize[0] ), right: -40, bottom: (stores.map.screenSize[1] - (50 + ((index+2) * 51)))} : {}}

              ref={(index+2) === 2 ? refEntity_2 : (index+2) === 3 ? refEntity_3 : (index+2) === 4 ? refEntity_4 : (index+2) === 5 ? refEntity_5 : (index+2) === 6 ? refEntity_6 : (index+2) === 7 ? refEntity_7 : refEntity_8}

              key={(index+2)} onDrag={(e, data) => trackPos(data, (index+2), content.type)} onStop={(e, data) => setTrack(data, content.url, (index+2), content.type)} defaultPosition={{x: 0, y: 0}}>

                <div style={{position:'absolute', right:able ? '0%' : '0%', top:isSmartphone() ? tabBGTopBGMob + ((index+2) * 119) : tabBGTopBGWeb + ((index+2)*51), borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === content.type ? 19 : (activeTabIndex === (index+2)) ? 19 : (18 - ((index+2)+2)), height:'100%'}}>
                <div  style={{position:'absolute', right:able ? '0%' : '0%', top:'0px', borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === content.type ? 19 : (18 - ((index+2)+2))}}
                ////////////////////////////////////////////////////////////////////
                  onClick={(e) => {
                    // handling single & double click
                    onTabMenuClick(e, content.type, content.url, (index+2))
                  }}
                  onTouchEnd={(e) => {
                    onTabMenuClick(e, content.type, content.url, (index+2))
                  }}
                  ////////////////////////////////////////////////////////////////////
                >
                  <img src={content.baseImage} style={{width:isSmartphone() ? 120 : 50, height:'auto', position:'relative', top:'0px', left:isSmartphone() ? '1px' : '1px', userSelect:'none', zIndex:showIntro ? 0 : menuType === content.type ? 19 : (18 - ((index+2)+2))}} draggable={false} alt='' />
                  <img src={content.baseIcon} style={{width:isSmartphone() ? 120 : 50, height:isSmartphone() ? 120 : 50, color:'white', position:'absolute', top:'2px', left:isSmartphone() ? '10px' : '5px' , userSelect:'none', zIndex:showIntro ? 0 : 99}} draggable={false} alt='' />
                </div>

                <div style={{position: 'absolute', width:'405px', height:'70%', left:'0px', backgroundColor:content.baseColor, borderRadius:'2px', minWidth:'280px', top:'0px',
                display:((Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) && (index+2) === 2) ? 'block' : ((Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) && (index+2) === 3) ? 'block' : ((Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) && (index+2) === 4) ? 'block' : ((Object(refEntity_5.current?.state).x < 0 || Object(refEntity_5.current?.state).x > 0) && (index+2) === 5) ? 'block' : ((Object(refEntity_6.current?.state).x < 0 || Object(refEntity_6.current?.state).x > 0) && (index+2) === 6) ? 'block' : 'none', zIndex:-9999}}>
                <iframe src={content.url} title={content.type} allowTransparency={true} frameBorder={0} style={{width:'100%', height:'100%'}} ></iframe>
                </div>
                </div>
              </Draggable>
             ))}
            {inZone !== undefined && inZone === "close" && zoneMediaURL !== undefined && zoneMediaURL !== ""
            ?
                 <Draggable ref={(mediaItemIndex) === 2 ? refEntity_2 : mediaItemIndex === 3 ? refEntity_3 : mediaItemIndex === 4 ? refEntity_4 : mediaItemIndex === 5 ? refEntity_5 : mediaItemIndex === 6 ? refEntity_6 : mediaItemIndex === 7 ? refEntity_7 : refEntity_8} key={(mediaItemIndex)} onDrag={(e, data) => trackPos(data, (mediaItemIndex), 'twitch')} onStop={(e, data) => setTrack(data, zoneMediaURL, (mediaItemIndex), 'twitch')} defaultPosition={{x: 0, y: 0}} >

              <div style={{position:'absolute', right:able ? '0%' : '0%', top:isSmartphone() ? tabBGTopBGMob + ((mediaIndex) * 119) : tabBGTopBGWeb + ((mediaIndex)*51), borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'twitch' ? 19 : (activeTabIndex === (mediaIndex)) ? 19 : (18 - ((mediaIndex)+2)), height:'100%'}}>
                <div  style={{position:'absolute', right:able ? '0%' : '0%', top:'0px', borderRadius: '5px', display:'flex', zIndex:showIntro ? 0 : menuType === 'twitch' ? 19 : (18 - ((mediaIndex)+2))}}
                 onClick={(e) => {
                  // handling single & double click
                  onTabMenuClick(e, 'twitch', zoneMediaURL, (mediaItemIndex))
                }}
                onTouchEnd={(e) => {
                  onTabMenuClick(e, 'twitch', zoneMediaURL, (mediaItemIndex))
                }}
                >
              <img src={tabCollapseContent} style={{width:isSmartphone() ? 120 : 50, height:'auto', position:'relative', top:'0px', left:isSmartphone() ? '1px' : '1px', userSelect:'none', zIndex:showIntro ? 0 : menuType === 'twitch' ? 19 : (18 - ((mediaIndex)+2))}} draggable={false} alt='' />
                  <img src={appIcon} style={{width:isSmartphone() ? 120 : 50, height:isSmartphone() ? 120 : 50, color:'white', position:'absolute', top:'2px', left:isSmartphone() ? '10px' : '5px' , userSelect:'none', zIndex:showIntro ? 0 : 99, display:positionMedia.x === 0 && anim === true && able === false ? 'none' : 'block'}} draggable={false} alt='' />
                </div>

                <div style={{position: 'absolute', width:'405px', height:'70%', left:'0px', backgroundColor:'#8b5e3c', borderRadius:'2px', minWidth:'280px', top:'0px', display:((Object(refEntity_2.current?.state).x < 0 || Object(refEntity_2.current?.state).x > 0) && (mediaItemIndex) === 2) ? 'block' : ((Object(refEntity_3.current?.state).x < 0 || Object(refEntity_3.current?.state).x > 0) && (mediaItemIndex) === 3) ? 'block' : ((Object(refEntity_4.current?.state).x < 0 || Object(refEntity_4.current?.state).x > 0) && (mediaItemIndex) === 4) ? 'block' : ((Object(refEntity_5.current?.state).x < 0 || Object(refEntity_5.current?.state).x > 0) && (mediaItemIndex) === 5) ? 'block' : ((Object(refEntity_6.current?.state).x < 0 || Object(refEntity_6.current?.state).x > 0) && (mediaItemIndex) === 6) ? 'block' : 'none', zIndex:-9999}}>

                <iframe src={(Object(refEntity_2.current?.state).x < 0 && Object(refEntity_2.current?.state).x > -99999999) && mediaItemIndex === 2 ? (zoneMediaURL.indexOf('twitch') !== -1 ? (zoneMediaURL + "&parent=" + videoParent + "&autoplay=true") : (zoneMediaURL + "?autoplay=true")) : (Object(refEntity_3.current?.state).x < 0 && Object(refEntity_3.current?.state).x > -99999999) && mediaItemIndex === 3 ? (zoneMediaURL.indexOf('twitch') !== -1 ? (zoneMediaURL + "&parent=" + videoParent + "&autoplay=true") : (zoneMediaURL + "?autoplay=true")) : (Object(refEntity_4.current?.state).x < 0 && Object(refEntity_4.current?.state).x > -99999999) && mediaItemIndex === 4 ? (zoneMediaURL.indexOf('twitch') !== -1 ? (zoneMediaURL + "&parent=" + videoParent + "&autoplay=true") : (zoneMediaURL + "?autoplay=true")) : (Object(refEntity_5.current?.state).x < 0 && Object(refEntity_5.current?.state).x > -99999999) && mediaItemIndex === 5 ? (zoneMediaURL.indexOf('twitch') !== -1 ? (zoneMediaURL + "&parent=" + videoParent + "&autoplay=true") : (zoneMediaURL + "?autoplay=true")) : (Object(refEntity_6.current?.state).x < 0 && Object(refEntity_6.current?.state).x > -99999999) && mediaItemIndex === 6 ? (zoneMediaURL.indexOf('twitch') !== -1 ? (zoneMediaURL + "&parent=" + videoParent + "&autoplay=true") : (zoneMediaURL + "?autoplay=true")) : ''} title={'Twitch'} allowTransparency={true} frameBorder={0} style={{width:'100%', height:'100%'}} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                  </div>
                  </div>
            </Draggable>
             : zoneMediaURL === undefined && inZone === undefined ?
             ''
             :''}
            */}
             </>
            <Footer stores={stores} height={(isSmartphone() && isPortrait()) ? 100 : undefined} />
            {
            dispUserName !== "" ?
            <div style={{backgroundColor:'white', width:'100%', height:isSmartphone() ? '10em' : '7em', position:'relative', top:'0em', zIndex:'99999', userSelect:'none'}}>
            {menuName !== 'docview' && menuName !== 'docdetailview' ?
            <div style={{height: isSmartphone() ? '10em' : '5em'}}>
              <img style={{position:'relative', width:isSmartphone() ? '7em' : '3.5em', userSelect:'none', left:'1em', top:'0.5em'}} draggable={false} src={contactIcon}
              alt="" />
              <p style={{position:'relative', marginTop:'-1.3em', marginLeft:isSmartphone() ? '2.4em' : '2.7em', fontSize:isSmartphone() ? '4em' : "2em", fontWeight:'100', fontFamily:'DINCondensed-Bold'}}>Contact {dispUserName} For Parts</p>
            </div> :
            <div style={{height: isSmartphone() ? '10em' : '5em'}}>
              <img style={{position:'relative', width:isSmartphone() ? '6em' : '3em', userSelect:'none', left:isSmartphone() ? '22em' : '12em', top:isSmartphone() ? '1.7em' : '0.9em'}} draggable={false} src={viewDocIcon}
              alt="" />
              <p style={{position:'relative', marginTop:isSmartphone() ? '-0.9em' : '-1em', marginLeft:isSmartphone() ? '0.5em' : '1em', fontSize:isSmartphone() ? '5em' : '2.5em', fontWeight:'100', fontFamily:'DINCondensed-Bold'}}>{Object(selectedItem)['Doc Ref']}</p>

              <div style={{position:'absolute', width:isSmartphone() ? '5em' : '5em', userSelect:'none', right:'1.8em', top:'0em', opacity:'1', color:'#000000', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '2em' : '1em'}}>
                <p style={{position:'relative', textAlign:'right', top:'0.3em', fontWeight:'100', fontFamily:'DINCondensed-Bold'}}>DWg #</p>
                <p style={{position:'relative', top:'-0.9em',  fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:'1.3em', textAlign:'right'}}>{getPageRef(Object(selectedItem)['DD Ref'])}</p>
              </div>



            </div>
            }
            {menuName !== 'docview' && menuName !== 'docdetailview' ?
              <div style={{position:'relative', width:'100%', height:isSmartphone() ? '5em' : '2.5em', backgroundColor:'#000000', top:isSmartphone() ? '-2em' : '-0.5em'/* '0em' */}}>
                <img style={{position:'absolute', width:isSmartphone() ? '6em' : '3em', userSelect:'none', left:'0.5em', top:'-0.19em', opacity:'1'}} draggable={false} src={profileIcon} alt="" />
                <p style={{position:'absolute', color:'#FFFFFF', left:isSmartphone() ? '2.5em' : '3.5em', top:isSmartphone() ? '-0.75em' : '-0.55em', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '3.3em' : '1.3em', opacity:'1'}}>{toDispFormat}</p>

                <img style={{position:'absolute', width:isSmartphone() ? '5em' : '2.5em', userSelect:'none', right:'0.5em', top:'0em', opacity:'1'}} draggable={false} src={viewIcon} alt="" />

                {/* <div style={{position:'relative', width:'100%', height:'8em', top:'5em', backgroundColor:'#FFFFFF', display:'flex'}}>
                  {
                  docList.map((item:any, i:number)=>
                  <div style={{position:'relative', width:isSmartphone() ? '11em' : '5.5em/', height:'auto', backgroundColor:'white', border:'0px solid black', top:'1em', marginRight:'0em', textAlign:'center', left:'1em', fontFamily:'DINCondensed-Bold', userSelect:'none'}}>
                    <div style={{fontSize:isSmartphone() ? '5em' : '2.2em', color:'orange', fontWeight:'700', position:'relative', left:'0.3em', fontFamily:'DINCondensed-Bold'}}> {getDaysRemaining(item['Due Date'])}</div>
                    <div style={{fontSize:isSmartphone() ? '2em' : '1em', color:'grey', fontWeight:'700', width:isSmartphone() ? '7em' : '7em'}}> {item['Doc Ref']}</div>
                  </div>
                  )}

                </div> */}
              </div>


              :
              <div style={{position:'relative', width:'100%', height:isSmartphone() ? '5em' : '2.5em', backgroundColor:'#000000', top:isSmartphone() ? '-2em' : '-0.5em'/* '0em' */}}>
                <ArrowForwardIcon onClick={() => backToView()} style={{position:'absolute', width:isSmartphone() ? '2.8em' : '1.4em', height:'auto', userSelect:'none', left:'0.5em', top:isSmartphone() ? '0.32em' : '0.15em', opacity:'1', color:'#FFFFFF', transform:'rotate(180deg)', zIndex:9999}}/>
                <p style={{position:'absolute', color:'#FFFFFF', left:isSmartphone() ? '2.5em' : '3em', top:isSmartphone() ? '-0.75em' : '-0.7em', fontWeight:'100', fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '3em' : '1.5em', opacity:'1'}}>{Object(selectedItem)['Project']}</p>

                <div style={{position:'absolute', width:isSmartphone() ? '100%' : '100%', userSelect:'none', right:'1.5em', top:'0.4em', opacity:'1', color:'#FFBF41', fontWeight:'100', fontFamily:'DINCondensed-Bold', textAlign:'right', fontSize:isSmartphone() ? '2.3em' : '1.2em'}}>{Object(selectedItem)['Component']}</div>





              </div>



            }
            </div>
            : '' }

           {/*  <ZoneAvatar stores={stores} height={(isSmartphone() && isPortrait()) ? 100 : undefined} />
            <Emoticons stores={stores} height={(isSmartphone() && isPortrait()) ? 100 : undefined} /> */}
          </Fragment>
          {/* <div style={{display: (able === true ? "block" : "none"), minWidth:'280px', width:'100%', maxWidth:'280px'}}>
            <LeftBar stores={stores} type={_menuType}/>
          </div> */}



        </SplitPane>

        {/* <div style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center', verticalAlign:'center',position:'absolute', backgroundColor: '#5f7ca0', textAlign:'center', display:showIntro ? 'block' : 'none'}}>
        <p style={{textAlign:'right', color: 'white', position:'relative', right:'24.5px', top:'20px', fontSize: isSmartphone() ? '2.4rem' : '1rem', fontWeight:'normal'}}>Version 4.0.2</p>
          <div style={{position:'relative', top:roomImgPath === '' ? '20%' : '0%'}}>
          <p style={{textAlign:'center', color: 'white',fontSize:isSmartphone() ? '3rem' : '1.2rem', fontWeight:'normal'}}>Welcome To</p>
          <p style={_roomName ? {textAlign:'center', color: 'white', marginTop:isSmartphone() ? '-2.6rem' : '-0.8rem', fontSize:isSmartphone() ? '2.8rem' : '1.2rem', fontWeight:'bold', opacity: 1, transition: 'opacity 300ms'} : {textAlign:'center', color: 'white', marginTop:isSmartphone() ? '-2.6rem' : '-0.8rem', fontSize:isSmartphone() ? '3rem' : '1.2rem', fontWeight:'bold', opacity: 0}}>{_roomName}</p>
          <img src={roomImgPath} style={roomImgPath ? {height: '250px', transform: "scale(1)", opacity:1, transition: 'opacity 300ms, transform: 300ms', userSelect:'none'} : {height: '0px', transform: "scale(0)", opacity:0, transition: '0.3s ease-out', userSelect:'none'}} draggable={false} alt=""/>
          <p style={{textAlign:'center', color: '#cdcdcd', fontSize:isSmartphone() ? '2.8rem' : '1rem', overflow:'hidden', position:'relative', marginTop:'0.5rem', width:'80%', marginLeft:'10%', fontWeight:'normal'}}>{roomImgDesc}</p>
          <img style={{width:isSmartphone() ? '8rem' : '4rem', backgroundColor:'#00000020', borderRadius: '50%', position:'relative', marginTop:roomImgPath !== '' ? '20px' : '-15px', userSelect:'none'}} src={stores.participants.local.information.avatarSrc} draggable={false} alt="" />
        <p style={{textAlign:'center', color: 'black', marginTop:'0.5rem', fontSize:isSmartphone() ? '3rem' : '1.2rem', fontWeight:'normal'}}>{stores.participants.local.information.name}</p>
        <p style={{textAlign:'center', color: 'black', marginTop:'1.5rem',fontSize:isSmartphone() ? '3rem' : '1.2rem', fontWeight:'normal'}}>Give your web browser permissions</p>
        <p style={{textAlign:'center', color: 'black', marginTop:isSmartphone() ? '-2.9rem' : '-0.9rem',fontSize:isSmartphone() ? '3rem' : '1.2rem', fontWeight:'normal'}}>to access the mic and camera if necessary.</p>
        <img style={{width:isSmartphone() ? '18rem' : '8rem', position:'relative', userSelect:'none'}} src={logo_es} draggable={false} alt="" />
        </div>
        </div> */}

        {/* <div ref={refAvatar} style={{position:'relative', width:'130px', height:'130px', maxWidth:'130px', zIndex:-999}}>
          <div style={{position:'absolute', top:'0px', left:'0px'}}>
            <img style={{display: selectedGroup !== '' ? 'block' : 'none'}} src={selectedGroup} width={'130px'} height={'130px'} draggable={false} alt='' />
          </div>
          <div style={{position:'absolute', top:'0px', left:'0px'}}>
            <img style={{display: selectedHairBack !== '' ? 'block' : 'none'}} src={selectedHairBack} width={'130px'} height={'130px'} draggable={false} alt='' />
          </div>
          <div style={{position:'absolute', top:'0px', left:'0px'}}>
            <img style={{display: selectedSkin !== '' ? 'block' : 'none'}} src={selectedSkin} width={'130px'} height={'130px'}  draggable={false} alt='' />
          </div>
          <div style={{position:'absolute', top:'0px', left:'0px'}}>
            <img style={{display: selectedHair !== '' ? 'block' : 'none'}} src={selectedHair} width={'130px'} height={'130px'}  draggable={false}alt='' />
          </div>
          <div style={{position:'absolute', top:'-3px', left:'0px'}}>
            <img style={{display: selectedOutfits !== '' ? 'block' : 'none'}} src={selectedOutfits} width={'130px'} height={'130px'} draggable={false} alt='' />
          </div>
          <div style={{position:'absolute', top:'0px', left:'0px'}}>
            <img style={{display: selectedSpecs !== '' ? 'block' : 'none'}} src={selectedSpecs} width={'130px'} height={'130px'} draggable={false} alt='' />
          </div>
        </div> */}

        {/* <Dialog open={showHelp} onClose={() => setShowHelp(false)} onExited={() => setShowHelp(false)}
        keepMounted
        PaperProps={{
          style: {
            backgroundColor: 'white',
            position:'relative',
            overflow:'hidden',
            borderRadius: '20px',
            width: 300,
            height: 350,
            zIndex: 0,
            left: '250px',
            transform: isSmartphone() ? 'scale(1.5)' : 'scale(1)',
          },
        }}
        BackdropProps={{ invisible: true }}
        >
        <DialogContent style={{overflow:'hidden'}}>
          <div>
            <div style={{position:'relative', left:'0px'}}>
              <>
              {
                sliderData.map((slide, index) => {
                  return (
                    <div className={index === currentSlide ? classes.activeSlide : classes.slide} key={index}>
                      {index === currentSlide && (
                         <img src={slide} width={'250px'} height={'250px'} alt='' />
                      )}

                    </div>
                  )
                })
              }
              </>
            </div>
            <div style={{width:'100%', height:'1px', backgroundColor:'lightgrey', position:'relative', top:'5px'}}></div>
            <div style={{display:'flex', position:'relative', top:'15px', width:'100%'}}>
              <div onClick={() => onPrevClick()}>
                <ArrowBackIosIcon className={classes.previous}  />
              </div>
              <div onClick={() => onNextClick()}>
                <ArrowForwardIosIcon className={classes.next} />
              </div>
              <div style={{display:'flex', width:'80%', justifyContent:'center', position:'relative', top:'15px', left:'10%'}}>
              {
                sliderDots.map((slide, index) => {
                  return (
                    <div style={{position:'relative', width:'12px', height:'12px', borderRadius:'50%', backgroundColor: index === currentSlide ? 'green' : 'lightgray', alignItems:'center', margin:'3px'}} />
                  )
                })
              }
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
      </div>
  }}</Observer>
}
App.displayName = 'App'