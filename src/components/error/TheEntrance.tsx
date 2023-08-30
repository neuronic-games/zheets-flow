
import {BMProps} from '@components/utils'
import Box from '@material-ui/core/Box'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import {useTranslation} from '@models/locales'
/* import {urlParameters} from '@models/url' */
import {isSmartphone} from '@models/utils'
import errorInfo from '@stores/ErrorInfo'
import React, {useState, useEffect} from 'react'
import {ErrorDialogFrame} from './ErrorDialog'

// Flow Images
import flowIcon from '@images/flow_sym_logo.png'
import btnGo from '@images/flow_sym_go.png'

import {getSheetData} from '@models/api/GoogleSheet'
import { urlParameters } from '@models/url'
/* import { urlParameters } from '@models/url' */


let nameStr:string = ''
let loginClick:boolean = false
let _roomName:string = ''
let userType:string = ''

export function userName(): string {
  return nameStr
}
export function getLoginClick(): boolean {
  return loginClick
}
export function getRoomName(): string {
  return _roomName
}

export function getUserType(): string {
  return userType
}

let PermissionShown:boolean = false
/* let permissionRoomName:string = '' */

export function getPermissionStatus() : boolean {
  return PermissionShown
}


//let userInfo = []

interface Item {
  Email: string;
  Password: string;
}

const allUserData = {
  data: ""
}
export function getAllUserData() {
  return allUserData;
}

export const TheEntrance: React.FC<BMProps> = (props) => {
/* export const TheEntrance: React.FC<{}> = () => { */
  const [peopleData,setPeopleData] = useState<Array<Item>>([]);
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  /////////////////////////////////////////////////////////////
  // vars for new ui
  const [sheetId, setSheetId] = useState("")
  const [webRedirected, setWebRedirected] = useState(false)
  /////////////////////////////////////////////////////////////



  function loadUserDetailsFromSheet(sheet_Id:string, sheetName:string) {
    //console.log(sheet_Id, " -IN ENTR-- ", sheetName)
    getSheetData(sheet_Id, sheetName).then((data) => {
      //console.log(data, " from People API ", data.length)
      if(data.length > 0) {
        if(peopleData.length === 0) {
          //let data = "[{'ID': 'P123', 'Initials': 'JD', 'Full Name': 'John Doe', 'Email': 'john.doe@acme.com', 'Password': 'test'}, {'ID': 'P124', 'Initials': 'EB', 'Full Name': 'Ed Brown', 'Email': 'brown@acme.com', 'Password': 'try'},{'ID': 'P125', 'Initials': 'MA', 'Full Name': 'Mumtaz Alam', 'Email': 'alam.mumtaz@acme.com', 'Password': 'alam'}, {'ID': 'P126', 'Initials': 'TM', 'Full Name': 'Tam Myaing', 'Email': 'tam@acme.com', 'Password': 'tam'}]"
          let userDate = data
          var mResponseSC = userDate.replace(/�/g, "")
          var mResponseDQ = mResponseSC.replace(/"/g, "dqo")
          var mResponseDDQ = mResponseDQ.replace(/: dqo/g, ": 'dqo")
          var mResponseDDQE = mResponseDDQ.replace(/dqo,/g, "dqo',")
          const regex = /('(?=(,\s*')))|('(?=:))|((?=([:,]\s*))')|((?={)')|('(?=}))/g;
          let replaceResponseRegX = mResponseDDQE.replace(regex, '"').replace(/{'/g, '{"').replace(/: '/g, ': "').replace(/, '/g, ', "');
          let replaceResponse = replaceResponseRegX.replace(/\\'/g, "'");
          let userInfo = JSON.parse(replaceResponse)
          setPeopleData(userInfo)
          allUserData.data = userInfo

          // Hide loader
          hideLoader()
          // change the display
          setWebRedirected(true)
        }
      } else {
        hideLoader()
        Object(window.document.getElementById("middleSection")).style.display = "block"
        Object(window.document.getElementById("errorMsg")).style.opacity = "1"
        Object(window.document.getElementById("errorMsg")).innerHTML = "*WRONG SHEET ID"
      }
    })
  }

  useEffect(() => {
    //console.log(urlParameters.id?.toString(), " url ent")
    if(peopleData.length === 0) {
      /* if(urlParameters.id === "") { */
        //loadUserDetailsFromSheet("1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY", "People")
      /* } else {
        loadUserDetailsFromSheet(String(urlParameters.id?.toString()), "People")
      } */

      if(urlParameters.id?.toString() !== undefined) {
        setTimeout(function() {
          Object(window.document.getElementById("middleSection")).style.display = "none"
          showloader()
          loadUserDetailsFromSheet(String(urlParameters.id?.toString()), "People")
        }, 300)
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    const onKeyDown = (e: KeyboardEvent) => {
      if(e.ctrlKey) {return}
      if(peopleData.length === 0) {return}
      if(e.key === "Enter") {
        window.removeEventListener('keydown', onKeyDown)
        onErrorClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    /* if(room !== "") {
      return
    } */
    const intr = setTimeout(() => {
      clearTimeout(intr)
      setPlaceholderIndex(-10)
    }, 1000);
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(intr)
    }
  },);

  const onErrorClose = () => {
    //console.log(name, " --- ", password)

    if(peopleData.length === 0) {return}


    //peopleData.filter(obj =>
      //console.log(obj.Email, " --- ", obj.Password)
    //);

    var result = peopleData.filter(obj => obj.Email === name && obj.Password === password);

    //console.log(result, " >>> ", peopleData.length)

    if(result.length === 0) {
      setShowError(true)
    } else {
      //console.log(Object(result[0])['Full Name'], " FFFF")
      nameStr = Object(result[0])['Full Name']

      // Set the logged in user name here for further usage
      props.stores.roomInfo.activeLoggedInUser = nameStr
      props.stores.roomInfo.activeLoggedInUserId = Object(result[0])['ID']

      setShowError(false)
      setPlaceholderIndex(1)
      setActive(true)
      const endScreen = setTimeout(() => {
        clearTimeout(endScreen)
        loginClick = true
        errorInfo.clear()
      }, 500)
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  function checkUserFillData() {
    let winLoc = window.location.href.split("?")[0]
    // get the values from the search form
    //let newWinUrl:string = winLoc + '?id=' + sheetId
    //console.log(newWinUrl, " url")
    //
    //window.history.replaceState({}, "null", (winLoc + "?id=" + sheetId))
    let sheet_Id = ""
    if(sheetId !== "") {
      let splitParam = "https://docs.google.com/spreadsheets/d/"
      if(sheetId.length > 30) {
        let correctURL = sheetId.includes(splitParam)
        if(correctURL) {
          // Get Google Sheet url
          sheet_Id = sheetId.split(splitParam)[1].split("/")[0]
        } else {
          sheet_Id = sheetId
        }
        window.history.replaceState({}, "null", (winLoc + "?id=" + sheet_Id))
        Object(window.document.getElementById("middleSection")).style.display = "none"
        showloader()
        // Calling load sheet
        if(peopleData.length === 0) {
          loadUserDetailsFromSheet(sheet_Id, "People")
        }
      } else {
        /* hideLoader()
        Object(window.document.getElementById("middleSection")).style.display = "block"
        Object(window.document.getElementById("errorMsg")).style.opacity = "1"
        Object(window.document.getElementById("errorMsg")).innerHTML = "*WRONG SHEET ID" */
        window.history.replaceState({}, "null", (winLoc + "?id=" + sheetId))
        Object(window.document.getElementById("middleSection")).style.display = "none"
        showloader()
        if(peopleData.length === 0) {
          loadUserDetailsFromSheet(sheetId, "People")
        }
      }
    }
  }


  function showloader() {
    Object(window.document.getElementById("loadingLogo")).style.display = "block"
  }

  function hideLoader() {
    Object(window.document.getElementById("loadingLogo")).style.display = "none"
  }


  //console.log(sheetId, " sheetId")
  //console.log(window.document.getElementById('loadingLogo'), " loading logog")
  //Object(window.document.getElementById('loadingLogo')).style.display = "block"
  ///////////////////////////////////////////////////////////////////////////////////////

  const {t/* , i18n */} = useTranslation()
  return <ErrorDialogFrame onClose={()=>{errorInfo.clear()}}>
    <DialogContent onClick={() => active ? errorInfo.clear() : ''} style={active ? {overflowY: 'hidden', overflowX:'hidden', backgroundColor: '#FFF', fontSize: isSmartphone() ? '2em' : '1em', transition: '0.3s ease-out'} : {overflowY: 'hidden', overflowX:'hidden', backgroundColor: '#FFF', fontSize: isSmartphone() ? '2em' : '1em', transition: '0s ease-out'}}>
      {/* <header style={{position:'relative', width:'100%', height:'200px', backgroundColor:'cyan'}}></header> */}
      <p style={{textAlign:'right', color: 'black', fontSize: isSmartphone() ? '1.2em' : '1em'}}>Version 1.0.8</p>
      {/* <Button style={{position:'absolute', top:30, right:20, display:'none'}} onClick = {() => {
        const idx = (i18nSupportedLngs.findIndex(l => l === i18n.language) + 1) % i18nSupportedLngs.length
        i18n.changeLanguage(i18nSupportedLngs[idx])
      }}>
        <TranslateIcon />
      </Button> */}

      {
      webRedirected ?
      <>

      <p>
      </p>
      <div style={active ? {position: 'relative', width:'100em', display:'none'} : {position: 'relative', width:'100em', display:'block'}}/>
      <div style={active ? {position: 'absolute', top: '3em', width: '100%', textAlign:'center', opacity:'0', transform: "scale(0.10)", transition: '0.3s ease-out', left: isSmartphone() ? "0.5em" : '0em'} : {position: 'relative', top: placeholderIndex === 0 ? '4em' : '2em', width: '100%', textAlign:'center', transition: '0.3s ease-out', left: isSmartphone() ? "0.5em" : '0em'}}>
        <p style={{display:placeholderIndex === 0 ? 'none' : 'block', position: 'relative', top: '2em', left: '-5em', transform: 'scale(5)', fontWeight: '700'}}>FL</p>
        <p style={{display:placeholderIndex === 0 ? 'none' : 'block', position: 'relative', top: '0em', left: '4.4em', transform: 'scale(5)', fontWeight: '700'}}>W</p>
        <img style={placeholderIndex === 0 ? {position:'relative',width:'10em', userSelect:'none'} : {width:'4em', userSelect:'none', transition: '0.3s ease-out', position:'relative', top:'-4.2em'}} draggable={false} src={flowIcon}
        alt="" />
      </div>
      <br />


      <Box mt={isSmartphone() ? 3 : 2}>
      <div style={placeholderIndex === 0 ? {position: 'relative', top: '0em', width: '100%', textAlign:'center', display:'none'} : (placeholderIndex === -10 ? {position: 'relative', top: '6em', width: '100%', textAlign:'center'} : {position: 'relative', top: '6em', width: '100%', textAlign:'center', opacity:'0', transform: "scale(0.10)", transition: '0.3s ease-out'})  }>
        <p style={{display: showError ? 'block' : 'none', color:'red', fontSize: isSmartphone() ? '1.2em' : '1em', position:'absolute', width:'100%', top:'-3em'}}>{t('loginError')}</p>
        <InputLabel style={{fontSize: isSmartphone() ? '1.2em' : '1em', color: '#7A7A7A', padding:'0.2em 0 0.2em 0', marginLeft:'0em', position:'relative', left:'0%', width:'100%'}}> {t('email')}</InputLabel>
        <Box mt={isSmartphone() ? 2 : 1}></Box>
        <Input id='userEmail' type='text' autoFocus={true}  style={{position:'relative', width:isSmartphone() ? '80%' : '35%'}} value={name} disableUnderline={true} placeholder={'your@email.com'} inputProps={{style: {fontSize: isSmartphone() ? '2.5em' : '1em', height: isSmartphone() ? '1.5em' : '1.5em', color: '#747474', backgroundColor: '#E8E5E5', padding: '3px', width: '100%', left:'0%', border:'1px solid black', textAlign:'center', fontWeight:'700'}}} onChange={event =>(setName(event.target.value))} />
      </div>
      </Box>
      <Box mt={isSmartphone() ? 3 : 2}>
      <div style={placeholderIndex === 0 ? {position: 'relative', top: '0em', width: '100%', textAlign:'center', display:'none'} : (placeholderIndex === -10 ? {position: 'relative', top: '6em', width: '100%', textAlign:'center'} : {position: 'relative', top: '6em', width: '100%', textAlign:'center', opacity:'0', transform: "scale(0.10)", transition: '0.3s ease-out'}) }>
        <InputLabel style={{fontSize: isSmartphone() ? '1.2em' : '1em', color: '#7A7A7A', padding:'0.2em 0 0.2em 0', marginLeft:'0em', position:'relative', left:'0%', width:'100%'}}> {t('password')}</InputLabel>
        <Box mt={isSmartphone() ? 2 : 1}></Box>
        <Input id='userPass' type='password' style={{position:'relative', width:isSmartphone() ? '80%' : '35%'}} value={password} autoFocus={false} disableUnderline={true} placeholder={'your_password'} inputProps={{style: {fontSize: isSmartphone() ? '2.5em' : '1em', height: isSmartphone() ? '1.5em' : '1.5em', color: '#747474', backgroundColor: '#E8E5E5', padding: '3px', width: '100%', left:'0%', border:'1px solid black', textAlign:'center', fontWeight:'700'}}} onChange={event => (setPassword(event.target.value))} />
      </div>
      </Box>

      <div style={placeholderIndex === 0 ? {position: 'relative', top: isSmartphone() ? '7em' : '7em', width: '100%', textAlign:'center', display:'none'} : (placeholderIndex === -10 ? {position: 'relative', top:isSmartphone() ? '7em' : '7em', width: '100%', textAlign:'center'} : {position: 'relative', top: isSmartphone() ? '7em' : '7em', width: '100%', textAlign:'center', opacity:'0', transform: "scale(0.10)", transition: '0.3s ease-out'}) }>
        <img style={{width:'6.5em', userSelect:'none'}} src={btnGo} draggable={false} onClick={() => onErrorClose()} alt="" />
      </div>
      {/* <footer style={{position:'relative', width:'100%', height:'200px', backgroundColor:'cyan', bottom:'-2em'}}></footer> */}
      </>
        :
      <>
      <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', overflow:'hidden'}}>
        <header id="page-header" className="game_header">
          <div style={{position:'relative', marginLeft:isSmartphone() ? '1.5em' : '4em', top:'1.5em'}}>
            <div className='game_logo'>
              <img src="images/icon_flow.png" alt="" width={isSmartphone() ? "150" : "60"}/>
              <img src="images/logo_icon.png" alt="" style={{position:'relative', left:'1.2em', top:'-0.2em'}} width={isSmartphone() ? "550" : "200"}/>
            </div>
            <h1 className='header_title font-poppins'>Manage Your Process Flow</h1>
          </div>
        </header>


        <div id="middleSection" style={{position: 'relative', top: '-2em', width:'100%', height:'100%', fontFamily:'DINRegular', textAlign:'center', backgroundColor:'#FFFFFF'}}>
          <p id='errorMsg'  style={{opacity:'1', position:'relative', top:isSmartphone() ? '7em' : '6em', fontSize:'1.2em', color:'red'}}></p>
          <h4 style={{position:'relative', top:isSmartphone() ? '5em' : '6em'}}>ENTER YOUR GOOGLE SHEET ID OR GOOGLE SHEET URL</h4>
          <div id="settingBox" style={{position:'relative', top:isSmartphone() ? '7em' : '6em'}}>
            <div>
              <input className="form-control" type="text" name="usheetId" pattern="[A-Za-z0-9]+" onChange={event =>(setSheetId(event.target.value))}/>
            </div>
            <button onClick={() => checkUserFillData()} className="btn_submit"><img src={btnGo} width={isSmartphone() ? '200' : "80"} alt='' /></button>
            </div>
          </div>
      </div>

      <div style={{position:'absolute', bottom:'0px', left:0, width:'100%', minHeight:'100vh !important', overflow:'hidden'}}>
        <footer id="page-footer" className="game_footer">
          <div>
            <div className="copyright text-center text-light" style={{position: 'relative', height:'1em'}}></div>
          </div>
        </footer>
      </div>
      </>
    }

    </DialogContent>
  </ErrorDialogFrame>
}
TheEntrance.displayName = 'TheEntrance'
