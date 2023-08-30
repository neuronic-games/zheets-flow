export function getSheetData(sheet_Id: string, sheet_Name:string):Promise<string> {
  /////////////////////////////////////////////////////////////////////////////
  const promise = new Promise<string>((resolutionFunc, rejectionFunc) => {
    const formData = new FormData()
    /*
      * Set the param from the values received to the ()
      params
      - Spreadsheet Id
      - sheet name to that spreadsheet (tab)
    */
    //console.log(sheet_Id, " --INAPI-- ", sheet_Name)
    formData.append('sheetId', sheet_Id)
    formData.append('sheet', sheet_Name)

    //console.log(formData, " formData")

    fetch('peopleData.php', {method: 'POST', body: formData})
    .then(response => response.text())
    .then((responseText) => {
      resolutionFunc(responseText)
    })
    .catch((error) => {
      if (`${error}` === 'TypeError: Failed to fetch'){
        rejectionFunc('type')
      }else{
        console.error(error)
        rejectionFunc('')
      }
    })
  })
  /////////////////////////////////////////////////////////////////////////////
  return promise
}

export function getSheetFlowData(sheet_Id: string, sheet_Name:string):Promise<string> {
  /////////////////////////////////////////////////////////////////////////////
  const promise = new Promise<string>((resolutionFunc, rejectionFunc) => {
    const formData = new FormData()
    /*
      * Set the param from the values received to the ()
      params
      - Spreadsheet Id
      - sheet name to that spreadsheet (tab)
    */
    formData.append('sheetId', sheet_Id)
    formData.append('sheet', sheet_Name)

    fetch('flowData.php', {method: 'POST', body: formData})
    .then(response => response.text())
    .then((responseText) => {
      resolutionFunc(responseText)
    })
    .catch((error) => {
      if (`${error}` === 'TypeError: Failed to fetch'){
        rejectionFunc('type')
      }else{
        console.error(error)
        rejectionFunc('')
      }
    })
  })
  /////////////////////////////////////////////////////////////////////////////
  return promise
}


// For GoogleSheet update
export function updateSheetDetails(sheet_Id: string, sheet_Name:string, docIndex:string, columnName:string, newColumnValue:string, updateType:string, msgInfo:any):Promise<string> {
  /////////////////////////////////////////////////////////////////////////////
  const promise = new Promise<string>((resolutionFunc, rejectionFunc) => {
    const formData = new FormData()
    /*
      * Set the param from the values received to the ()
      params
      - Spreadsheet Id
      - sheet name to that spreadsheet (tab)
    */
    formData.append('sheetId', sheet_Id)
    formData.append('sheet', sheet_Name)
    formData.append('docIndex', docIndex)
    formData.append('sheetColName', columnName)
    formData.append('sheetColValue', newColumnValue)
    formData.append('updateType', updateType)
    formData.append('msgInfo', msgInfo)

    //console.log("IN API ------------ ", sheet_Id, " -- ", sheet_Name, " --- ", docIndex, " ---- ", columnName, " ---- ", newColumnValue)

    fetch('updateGoogleSheet.php', {method: 'POST', body: formData})
    .then(response => response.text())
    .then((responseText) => {
      resolutionFunc(responseText)
    })
    .catch((error) => {
      if (`${error}` === 'TypeError: Failed to fetch'){
        rejectionFunc('type')
      }else{
        console.error(error)
        rejectionFunc('')
      }
    })
  })
  /////////////////////////////////////////////////////////////////////////////
  return promise
}