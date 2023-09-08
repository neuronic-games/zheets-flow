import {BMProps} from '@components/utils'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect/* , useRef, useState */} from 'react'
import {/* Observer,  */useObserver} from 'mobx-react-lite'
import { isSmartphone } from '@models/utils'

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
    height: '0em', //(props.props.stores.map.screenSize[1] - 200) + 'px',
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

/* let dispUserName = "" */


let cont_WH:any = []
export function getContDim() {
  return cont_WH;
}

let taskCount:number = 0
export function getTotalTaskCount() {
  return taskCount
}

export const TitleView: React.FC<BMProps> = (props) => {
  const menuName = useObserver(() => props.stores.roomInfo.activeMenuType)
  let AllFlowItemsDetails:any = []
  const sheetFlowData =  useObserver(() => props.stores.roomInfo.activeFlowData)
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
///////////////////////////////////////////////////////////////////////////////////////
let taskList:any = []
  for (let key in docList[0]) {
      if(key.indexOf('TASK - ') === 0) {
        taskList.push(key)
      }
  }
taskCount = taskList.length;
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
  //////////////////////////////////////////////////////////////////
  const classes = useStyles({props})
  //  keyboard shortcut
  useEffect(() => {
    /* return () => {

    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //////////////////////////////////////////////////////////////////
  // Reset the div matrix
  setTimeout(function() {
    const changeMatrix = (new DOMMatrix()).rotateSelf(0, 0, 0)
    props.stores.map.setMatrix(changeMatrix)
    props.stores.map.setCommittedMatrix(changeMatrix)
  }, 100)
  //////////////////////////////////////////////////////////////////
  setTimeout(function() {
    let cW = document.getElementById('containerTitleView')?.scrollWidth
    let cH = document.getElementById('containerTitleView')?.scrollHeight
    cont_WH = [cW, cH]
    // setting system props
    props.stores.roomInfo.activeScreenResolution = [cont_WH[0], cont_WH[1]]
  }, 200)
  //////////////////////////////////////////////////////////////////
  return (
    (menuName === 'flow' ?
    <div className={classes.container} style={{backgroundColor:'white'}}>
      <div id='containerTitleView' style={{position:'relative', top:isSmartphone() ? '13em' : '6.4em'/* '7.4em' */, display:'flex', left:'0',
      width:'100%', height:isSmartphone() ? '8em' : '4em', minWidth:'100%', maxHeight:'auto', zIndex:'99999999', backgroundColor:'#FFFFFF'}}>
        {
        docList.map((item:any, i:number)=>
        <div style={{position:'relative', backgroundColor:'#FFFFFF'}}>
        <div style={{position:'relative', width:isSmartphone() ? '11em' : '5.5em', height:'auto', backgroundColor:'white', border:'0px solid black', top:'1em', marginRight:'0em', textAlign:'center', left:'1em', fontWeight:'100', fontFamily:'DINCondensed-Bold', userSelect:'none', zIndex:'999999999',}}>
          <div style={{fontSize:isSmartphone() ? '5em' : '2.2em', color:'orange', fontWeight:'100', position:'relative', left:'0.3em', fontFamily:'DINCondensed-Bold'}}> {getDaysRemaining(item['Due Date'])}</div>
          <div style={{fontFamily:'DINCondensed-Bold', fontSize:isSmartphone() ? '2em' : '1em', color:'grey', fontWeight:'100', width:isSmartphone() ? '7em' : '7em'}}> {item['Doc Ref']}</div>
        </div>
        </div>
        )}
      </div>
    </div>
    : <div></div>)
  )
  //},
    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  []
   // )
}
TitleView.displayName = 'TitleView'
