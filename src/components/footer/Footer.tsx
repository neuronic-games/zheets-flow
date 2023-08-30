import {ErrorDialog} from '@components/error/ErrorDialog'
import {BMProps} from '@components/utils'
/* import {acceleratorText2El} from '@components/utils/formatter' */
/* import megaphoneIcon from '@iconify/icons-mdi/megaphone'
import {Icon} from '@iconify/react' */
import {/* Button,  */Collapse, /* Dialog, DialogActions,  DialogContent, DialogTitle*/} from '@material-ui/core'
/* import Menu from '@material-ui/core/Menu' */
/* import MenuItem from '@material-ui/core/MenuItem' */
/* import Popover from '@material-ui/core/Popover' */
import {makeStyles} from '@material-ui/core/styles'
/* import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff' */
/* import SettingsIcon from '@material-ui/icons/Settings' */
/* import VideoIcon from '@material-ui/icons/Videocam'
import VideoOffIcon from '@material-ui/icons/VideocamOff'
import SpeakerOffIcon from '@material-ui/icons/VolumeOff'
import SpeakerOnIcon from '@material-ui/icons/VolumeUp' */
/* import {useTranslation} from '@models/locales' */
import {useObserver} from 'mobx-react-lite'
import React, {useEffect, useRef} from 'react'
/* import {AdminConfigForm} from './adminConfig/AdminConfigForm' */
/* import {BroadcastControl} from './BroadcastControl' */
/* import {FaceControl} from './FaceControl' */
import {FabMain/* , FabWithTooltip */} from '@components/utils/FabEx'
/* import {ShareButton} from './share/ShareButton'
import {RecorderButton} from './recorder/RecorderButton'
import {StereoAudioSwitch} from './StereoAudioSwitch'
import { player, recorder } from '@models/conference/Recorder' */
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { isSmartphone } from '@models/utils'

/* import MoreIcon from '@images/whoo-screen_btn-more.png'
import ExitAppIcon from '@images/earshot_icon_btn-kick.png'
import ShareAppIcon from '@images/earshot_icon_btn-share.png'
import SettingsIcon from '@material-ui/icons/Settings' */
/* import Container from '@material-ui/core/Container'
import CheckBoxIcon from '@material-ui/icons/Done'

import {DialogIconItem} from '@components/utils/DialogIconItem'
import { SettingsControl } from './SettingsControl'
import { BroadcastVideoControl } from './BroadcastVideoControl'
import { StereoSwitchControl } from './StereoSwitchControl' */
/* import { conference } from '@models/conference'
import { MessageType } from '@models/conference/DataMessageType' */

// Bottom Icon
import ListViewIcon from '@images/flow_sym_list.png';
import FlowViewIcon from '@images/flow_sym_flow.png';
import FileIcon from '@images/flow_sym_file.png';
import TeamIcon from '@images/flow_sym_team.png';
import CalcIcon from '@images/flow_sym_cal.png';
import { MouseOrTouch } from '@components/map/Share/RndContent'

const theme = createTheme({
  palette: {
    primary: { main: '#FFFFFF' },
    secondary: { main: '#FFFFFF' }
  }
});

const buttonStyle = {
  '&': {
    margin: '5px',
    borderRadius: '0%',
    width: isSmartphone() ? '90px' : '57px',
    height: isSmartphone() ? '90px' : '57px',
    textAlign: 'center',
  },
}

const useStyles = makeStyles({
  /* root:{
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 0,
    outline: 'none',
    pointerEvents: 'none',
  }, */

  /* menu:{
    position: 'absolute',
    width: '100%',
    left: '-100%',
    opacity: 0,
    transition: '0.5s ease-out',
  },
  menuActive:{
    position: 'absolute',
    width: '100%',
    opacity: 1,
    left: 0,
    transition: '0.5s ease-out',
  }, */

  menuTop:{
    position: 'absolute',
    width: '100%',
    left: -200,
    opacity: 0,
    top: 0,
    transition: '0.5s ease-out',
  },
  menuActiveTop:{
    position: 'absolute',
    width: '100%',
    opacity: 1,
    left: 0,
    top:0,
    transition: '0.5s ease-out',
  },

  topMenu:{
    position: 'absolute',
    width: '100%',
    top: -200,
    opacity: 0,
    transition: '0.5s ease-out',
  },
  topMenuActive:{
    position: 'absolute',
    width: '100%',
    opacity: 1,
    top: 0,
    transition: '0.5s ease-out',
  },

  more:{
    display: 'inline-block',
    height: 50,
    width: 50,
    position:'relative',
    cursor: 'pointer',
    backgroundColor: '#bcbec0', //  '#ef4623' : '#9e886c', bcbec0
    right: 0,
    left: 0,
    bottom:0,
    ...buttonStyle,
  },
  moreActive:{
    display: 'inline-block',
    height: 50,
    position:'relative',
    cursor: 'pointer',
    backgroundColor: '#ef4623', //  '#ef4623' : '#9e886c',
    right: 0,
    left:0,
    bottom:0,
    ...buttonStyle,
  },
  container:{
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 0,
    left: 0,
    outline: 'none',
    minWidth : 530,
    pointerEvents: 'none',
    backgroundColor: '#FFFFFF',
  },

  topContainer:{
    position: 'absolute',
    width: '100%',
    top: 10,
    padding: 0,
    left: -50,
    outline: 'none',
    minWidth : 530,
    pointerEvents: 'none',
  },

  wrapper:{width:'100%'},
  /* wrapperInner:{width:'100%', display:'flex', alignItems:'flex-end'}, */
  wrapperInner:{width:isSmartphone() ? '100%' : '100%', display:'flex', alignItems:'center', position: 'relative', left: isSmartphone() ? '0%' : '0%', bottom: '0em', justifyContent:'space-around', backgroundColor: '#FFFFFF',},
})

class Member{
  timeoutOut:NodeJS.Timeout|undefined = undefined
  touched = false

  // For canvas context menu
  downTime = 0
  upTime = 0
}

let buttonClickStatus:boolean = false
export function getVideoButtonStatus():boolean {
  return buttonClickStatus
}

let activeMenu = "flow"
export function getActiveMenu():string {
  return activeMenu
}

/* let enterPopup:boolean = true */
/* let deviceFound:boolean = false */

//let previousMenuMode:string = 'flow'

export const Footer: React.FC<BMProps&{height?:number}> = (props) => {
  const {map/* , participants */} = props.stores
  //  show or not
  /* const [show, setShow] = React.useState<boolean>(false)
  const [showPop, setShowPop] = React.useState<boolean>(false) */
  /* const [showFooter, setShowFooterRaw] = React.useState<boolean>(true) */
  /* const [showAdmin, setShowAdmin] = React.useState<boolean>(false) */
  /* const [showShare, setShowShareRaw] = React.useState<boolean>(false) */
  /* const [openSettiong, setOpenSettiong] = React.useState<boolean>(false) */
  /* const [showFooter, setShowFooterRaw] = React.useState<boolean>(true) */

  // Show message
  /* const [showSettingMessage, setShowSettingMessage] = React.useState(false) */
  // request permission
  //const [showPermission, setShowPermission] = React.useState(false)


  /* function openAdmin(){
    map.keyInputUsers.add('adminForm')
    setShowAdmin(true)
  } */
  /* function closeAdmin(){
    map.keyInputUsers.delete('adminForm')
    setShowAdmin(false)
  } */
  /* function setShowShare(flag: boolean) {
    if (flag) {
      map.keyInputUsers.add('shareDialog')
    }else {
      map.keyInputUsers.delete('shareDialog')
    }
    setShowShareRaw(flag)
  } */
  /* const [showRecorder, setShowRecorderRaw] = React.useState<boolean>(false)
  function setShowRecorder(flag: boolean) {
    if (flag) {
      map.keyInputUsers.add('recorderDialog')
    }else {
      map.keyInputUsers.delete('recorderDialog')
    }
    setShowRecorderRaw(flag)
  } */

  const memberRef = useRef<Member>(new Member())
  const member = memberRef.current
  /* const containerRef = useRef<HTMLDivElement>(null)
  const adminButton = useRef<HTMLDivElement>(null) */

  //  Fab state and menu
  /* const [deviceInfos, setDeviceInfos] = React.useState<MediaDeviceInfo[]>([])
  const [micMenuEl, setMicMenuEl] = React.useState<Element|null>(null)
  const [speakerMenuEl, setSpeakerMenuEl] = React.useState<Element|null>(null)
  const [videoMenuEl, setVideoMenuEl] = React.useState<Element|null>(null)
  const [settingsMenuEl, setSettingsMenuEl] = React.useState<Element|null>(null) */

   // Change button stat and active one
   const [listView, setListView] = React.useState<boolean>(false)

  /* const {t} = useTranslation() */
  const classes = useStyles()


  /* let outputDeviceAvailable = false */

  /* function showSharePopMenu() {
    //console.log(showPop, " >>> showPop")
    if(showPop) {
      setShowPop(false)
    } else {
      setShowPop(true)
    }
  }

  function showMainMenu() {
    if(show) {
      setShow(false)
    } else {
      setShow(true)
    }
  } */

  function onListViewClick(event:MouseOrTouch) {
    event.preventDefault()
    if(listView === false) {
      activeMenu = "list"
      setListView(true)
    } else {
      activeMenu = "flow"
      setListView(false)
    }
    // Update listview
    //console.log(props.stores.roomInfo.activeMenuType, " previous active mode")
    props.stores.roomInfo.activeMenuType = activeMenu
  }

  //  Footer collapse conrtrol
  function checkMouseOnBottom() {
    return map.screenSize[1] - (map.mouse[1] - map.offset[1]) < 90
  }
  const mouseOnBottom = useObserver(checkMouseOnBottom)
  useEffect(() => {
    /* if (checkMouseOnBottom()) { member.touched = true }
    setShowFooter(mouseOnBottom || !member.touched) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },        [mouseOnBottom, member.touched])

  /* function setShowFooter(showFooter: boolean) {
    if (showFooter) {
      setShowFooterRaw(true)
      if (member.timeoutOut) {
        clearTimeout(member.timeoutOut)
        member.timeoutOut = undefined
      }
      containerRef.current?.focus()
    }else {
      if (!member.timeoutOut) {
        member.timeoutOut = setTimeout(() => {
          setShowFooterRaw(false)
          member.timeoutOut = undefined
        },                             500)
      }
    }
  } */

  //  keyboard shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      //  console.log(`onKeyDown: code: ${e.code}`)
      if (map.keyInputUsers.size === 0) {
        if (!e.ctrlKey && !e.metaKey && !e.altKey){
          /* if (e.code === 'KeyM') {  //  mute/unmute audio
            participants.local.muteAudio = !participants.local.muteAudio
            setShowFooter(true)
          } */
          /* if (e.code === 'KeyC') {  //  Create share dialog
            setShowFooter(true)
            setShowShare(true)
            e.preventDefault()
            e.stopPropagation()
          }
          if (e.code === 'KeyR') {  //  Recorder dialog
            setShowFooter(true)
            setShowRecorder(true)
            if (recorder.recording) recorder.stop()
            if (player.playing) player.stop()
            e.preventDefault()
            e.stopPropagation()
          }
          if (e.code === 'KeyL' || e.code === 'Escape') {  //  Leave from keyboard
            participants.local.physics.awayFromKeyboard = true
          } */
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },        [])

  const fabSize = props.height
  /* const iconSize = props.height ? props.height * 0.7 : 36 */

  //  Create menu list for device selection
  /* function makeMenuItem(info: MediaDeviceInfo, close:(did:string) => void):JSX.Element {
    let selected = false
    if (info.kind === 'audioinput') {
      selected = info.deviceId === participants.local.devicePreference.audioInputDevice
    }else if (info.kind === 'audiooutput') {
      selected = info.deviceId === participants.local.devicePreference.audioOutputDevice
    }else if (info.kind === 'videoinput') {
      selected = info.deviceId === participants.local.devicePreference.videoInputDevice
    }

    return <MenuItem key={info.deviceId}
      onClick={() => { close(info.deviceId) }}
      > { (selected ? '✔\u00A0' : '\u2003') + info.label }</MenuItem>  //  \u00A0: NBSP, u2003: EM space.
      return <div style={{position:'relative', display:'flex', alignItems:'center', marginLeft:'15px'}}> {selected ? <CheckBoxIcon style={{opacity:'1', position:'absolute', marginLeft:'-10px', fontSize:isSmartphone() ? '3em' : '1.5em'}} /> : <CheckBoxIcon style={{opacity:'0', position:'absolute', marginLeft:'-10px', fontSize:isSmartphone() ? '3em' : '1.5em'}} />}
      <MenuItem key={info.deviceId} style={{fontSize:isSmartphone() ? '2.5em' : '1em', marginLeft:isSmartphone() ? '0.5em' : '0em'}}
        onClick={() => { close(info.deviceId) }}
        > {info.label}
      </MenuItem></div>  //  \u00A0: NBSP, u2003: EM space.
  } */


  /* const settingsMenuItems:JSX.Element[] = [<MenuItem style={{display:'flex', flexDirection:'column', textAlign:'center', marginLeft:'-35px'}} key = {'settingLoc'} ><SettingsControl {...props} /><Container><DialogIconItem
  key="settingPreference" text={t('settingPreference')} onClick={openAdmin}
/></Container></MenuItem>] */




  /* function getMenuItems(kind:'audioinput' | 'audiooutput' | 'videoinput'){
    const rv = []
    let blankMenu
    let closeMenu
    let bottomItem
    if (kind === 'audioinput'){
      closeMenu = closeMicMenu
      bottomItem = <MenuItem  key = {'broadcast'} style={{fontSize:isSmartphone() ? '2.5em' : '1em'}} ><BroadcastControl {...props} /></MenuItem>
    }else if (kind === 'audiooutput'){
      closeMenu = closeSpeakerMenu
      // For None menu
      blankMenu = <MenuItem  key = {'noneLoc'} style={{fontSize:isSmartphone() ? '2.5em' : '1em', color:'#CCC', position:'relative', left: '17px', fontStyle:'italic'}} >None</MenuItem>
      bottomItem = <MenuItem  key = {'soundLoc'} style={{fontSize:isSmartphone() ? '2.5em' : '1em'}} ><StereoSwitchControl {...props} /></MenuItem>
    }else{
      closeMenu = closeVideoMenu
      bottomItem = <MenuItem  key = {'faceTrack'} style={{fontSize:isSmartphone() ? '2.5em' : '1em'}} ><FaceControl {...props} /></MenuItem>
      bottomItem = <MenuItem  key = {'broadcastVideo'} style={{fontSize:isSmartphone() ? '2.5em' : '1em'}} ><BroadcastVideoControl {...props} /></MenuItem>
    }

    for (const info of deviceInfos){
      if (info.kind === kind) {
        rv.push(makeMenuItem(info, closeMenu))
      }
    }

    //////////////////////////////////////////////////////
    if(deviceInfos.length >= 0 && show) {
      for (const info of deviceInfos) {
        if(info.kind === 'audiooutput' || info.kind === 'audioinput') {
          outputDeviceAvailable = true
          break
        }
      }
      if(outputDeviceAvailable === false) {
        rv.push(blankMenu, closeMenu)
      }
    }
    //////////////////////////////////////////////////////

    //console.log(outputDeviceAvailable, " outputDeviceAvailable")

    if (bottomItem) rv.push(bottomItem)
    return rv
  } */
  /* function closeMicMenu(did:string) {
    if (did) {
      participants.local.devicePreference.audioInputDevice = did
      participants.local.saveMediaSettingsToStorage()
    }
    setMicMenuEl(null)
  }
  function closeSpeakerMenu(did:string) {
    if (did) {
      participants.local.devicePreference.audioOutputDevice = did
      participants.local.saveMediaSettingsToStorage()
    }
    setSpeakerMenuEl(null)
  }
  function closeVideoMenu(did:string) {
    if (did) {
      participants.local.devicePreference.videoInputDevice = did
      participants.local.saveMediaSettingsToStorage()
    }
    setVideoMenuEl(null)
  }

  function closeSettingsMenu(did:string) {
    setSettingsMenuEl(null)
  } */
  //  Device list update when the user clicks to showFooter the menu
  /* function updateDevices(ev:React.PointerEvent | React.MouseEvent | React.TouchEvent) {
    navigator.mediaDevices.enumerateDevices()
    .then(setDeviceInfos)
    .catch(() => { console.log('Device enumeration error') })
  } */

  //  observer
  /* const mute = useObserver(() => ({
    muteA: participants.local.muteAudio,  //  mic
    muteS: participants.local.muteSpeaker,  //  speaker
    muteV: participants.local.muteVideo,  //  camera
    onStage: participants.local.physics.onStage
  }))
  const fabSize = props.height
  const iconSize = props.height ? props.height * 0.7 : 36 */

  /* navigator.mediaDevices.enumerateDevices().then(devices =>
    devices.forEach(device =>
        device.label === '' ? ''  : deviceFound = true

    )) */
  /* if(deviceInfos.length === 0) {
    navigator.mediaDevices.enumerateDevices()
    .then(setDeviceInfos)
    .catch(() => { console.log('Device enumeration error') })
  } */ /* else {
    //console.log(deviceLabel, ' >> device label << ', deviceInfos.length, deviceInfos)
  } */

  /* if(deviceInfos.length === 0 || deviceFound === false && permissionGranted === false) {
      // Speaker
      participants.local.muteSpeaker = false
      // Audio
      participants.local.muteAudio = false
      if (!participants.local.muteAudio) {
        participants.local.muteSpeaker = false
      }
      participants.local.saveMediaSettingsToStorage()

      // Speaker
      const resetTimer = setTimeout(() => {
        clearTimeout(resetTimer)
        participants.local.muteSpeaker = true
        // Audio
        participants.local.muteAudio = true
        if (!participants.local.muteAudio) {
          participants.local.muteSpeaker = false
        }
        participants.local.saveMediaSettingsToStorage()
      }, 2000)
    //}
  } else {
    // Speaker
    participants.local.muteSpeaker = false
    // Audio
    participants.local.muteAudio = false
    if (!participants.local.muteAudio) {
      participants.local.muteSpeaker = false
    }
    participants.local.saveMediaSettingsToStorage()
  } */

  return <div style={{position:'absolute', width:'100%', bottom:'0px'}}>
  <Collapse in={true/* showFooter */} classes={classes}>
    <div /* className={show ? classes.menuActive : classes.menu} */>
      <MuiThemeProvider theme={theme}>
      <FabMain isOpen={false} index={0} size={fabSize} color={'primary'}
        aria-label="speaker" onClick={(ev) => {
          onListViewClick(ev)
        }}
        >
        {listView === false
        ?
          <img src={ListViewIcon} style={{width:80, height:80, position:'relative', top:isSmartphone() ? '0px' : '0px', left:isSmartphone() ? '0px' : '0px', transform: isSmartphone() ? 'scale(2.2)' : 'scale(1.2)'}}  alt=""/>
        : <img src={FlowViewIcon} style={{width:80, height:80, position:'relative', top:isSmartphone() ? '0px' : '0px', left:isSmartphone() ? '0px' : '0px', transform: isSmartphone() ? 'scale(2.5)' : 'scale(1.2)'}}  alt=""/>
        }
      </FabMain>
      <FabMain isOpen={false} index={1} size={fabSize} color={'primary'} aria-label="mic"
        /* title = {acceleratorText2El(t('ttMicMute'))} */
        onClick = { (ev) => {
        }}
        >
        <img src={FileIcon} style={{width:80, height:80, position:'relative', top:isSmartphone() ? '0px' : '0px', left:isSmartphone() ? '0px' : '0px', transform: isSmartphone() ? 'scale(2)' : 'scale(1)'}}  alt=""/>
      </FabMain>
      <FabMain isOpen={false} index={2} size={fabSize} color={'primary'} aria-label="camera"
        onClick = { () => {
          buttonClickStatus = true
        }}
      >
        <img src={TeamIcon} style={{width:80, height:80, position:'relative', top:isSmartphone() ? '0px' : '0px', left:isSmartphone() ? '0px' : '0px', transform: isSmartphone() ? 'scale(2)' : 'scale(1)'}}  alt=""/>
      </FabMain>
      <ErrorDialog {...props}/>
        <FabMain isOpen={false} index={3} size={fabSize} color={'primary'}
          aria-label="settings" onClick={(ev) => {
          }}
          >
           <img src={CalcIcon} style={{width:80, height:80, position:'relative', top:isSmartphone() ? '0px' : '0px', left:isSmartphone() ? '0px' : '0px', transform: isSmartphone() ? 'scale(2)' : 'scale(1)'}}  alt=""/>
        </FabMain>
      </MuiThemeProvider>
      </div>
    </Collapse>
    </div>
}
Footer.displayName = 'Footer'
