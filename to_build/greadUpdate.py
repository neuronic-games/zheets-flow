import gspread
import sys

# Credentials [Keys etc]
credFileName = "credentials.json"
mServiceAccount = gspread.service_account(filename=credFileName)
mGoogleSheetId = sys.argv[1].split(',')[0]

#print(colNameFromFile.replace("_", " "))
#mGoogleSheetId = "1-1GYTwxJWhenYWTXy3nLLDi0cLHnPlHiIR1bMKZjCdY"

#Open the sheet based on sheet id passed
mGoogleSheet = mServiceAccount.open_by_key(mGoogleSheetId)

#checking
#Sheet Name
sheetName = sys.argv[1].split(',')[1]
# match docIndex
docIndex = sys.argv[1].split(',')[2]
# match update col name
colName = sys.argv[1].split(',')[3]
colNameFromFile = colName.replace("_", " ")
# update value
newColValue = sys.argv[1].split(',')[4]

# updateType
updateType = sys.argv[1].split(',')[5]

###############################################################################
#if(updateType == "messageUpdate"):
  #myNewArra = sys.argv[1].split(',')[6:]
  #for index, val in enumerate(myNewArra):
    #myNewArra[index] = val.replace("_", " ")
  #print(myNewArra)
#else:
  #print("in Master update")
###############################################################################
#find the column and update accordingly
#cellNum = mSelectedWorkSheet.find(audit_setting.exhibitName)
#machinIndex = cellNum.row
#mSelectedWorkSheet.update(('E' + str(machinIndex)), time_str)

#################################################################################
# Getting the date from the mentioned sheet name
mSelectedWorkSheet = mGoogleSheet.worksheet(sheetName)
#################################################################################


#mSelectedWorkSheet = mGoogleSheet.worksheet("Master")
# Converting Data to Required JSON
#print(mSelectedWorkSheet.get_all_records())


##############################################################################################
# BLOCK FOR COMMENT, ASSIGN SECTION
# update the required col value
# get the headers from row #1
if(updateType == "masterUpdate"):
  cell_list = []
  columnHeaders = mSelectedWorkSheet.row_values(1)
  # find the column "Weight", we will remember this column #
  colToUpdateIndex = columnHeaders.index(colNameFromFile) #columnHeaders.index('TASK - Metal Shop') # Task Coumn Name # sys.argv[1].split('sheetname')[3]
  # task 1 of 2
  cellLookup = mSelectedWorkSheet.find(docIndex) #mSelectedWorkSheet.find('123') # sys.argv[1].split('sheetname')[2]
  # get the cell to be updated
  cellToUpdate = mSelectedWorkSheet.cell(cellLookup.row, (colToUpdateIndex+1))
  # update the cell's value
  cellToUpdate.value = newColValue #"ABCDDD" # value that needs to be updated # sys.argv[1].split('sheetname')[4]
  cell_list.append(cellToUpdate)

  # Update the cell values
  mSelectedWorkSheet.update_cells(cell_list)
  print('Master cell Updated')
else:
##############################################################################################
  # BLOCK FOR MESSAGE SECTION
  messageInfo = sys.argv[1].split(',')[6:]
  for index, val in enumerate(messageInfo):
    messageInfo[index] = val.replace("_", " ")
  #print(myNewArra)
  mSelectedWorkSheet.append_rows(values=[messageInfo])
  print('Message cell Updated')
##############################################################################################
# Return update status
#print('Cell Updated')
#################################################################################

