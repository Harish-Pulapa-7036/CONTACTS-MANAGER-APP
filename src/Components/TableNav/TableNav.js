 import { parse } from "papaparse";
 import { useState,useContext } from "react";
 import Calendar from "./images/calender.png"
 import downArrow from "./images/down-arrow.png"
 import filter from "./images/filter.png"
 import verticleLine from "./images/vertical-line.png"
 import Delete from "./images/delete_vector.png"
 import Import from "./images/import.png"
 import Export from "./images/export.png"
 import impDel from "./images/impDel.png";
 import delIconComp from "./images/importComp.png";
 import importLogo from "./images/impImp.png";
import { context } from "../Context/Context";
import "./TableNav.css"
import Table from "../Tables/table";

const TableNav = () => {
   const {  fetchContacts, checkedArr, deleteContacts } = useContext(context);
const {postContacts} = useContext(context);
  const [click, setClick] = useState(false);
  const [delclick, setDelClick] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDelComplete, setIsDelComplete] = useState(false);
  // if (isComplete) {
  //    fetchContacts()
  //   // fetchContactsperPage()
  // }

  const deletebtnClicked = async () => {
    console.log(checkedArr)
    const UserIds = checkedArr;
    UserIds.map(async (id) => {
      return await deleteContacts(id);
    });
    fetchContacts();
  };

  return (
    <>
      <div className='table-nav-container'>
        <div className='left-nav'>
          <div className='nav-items'>
            <img id="icon" src={Calendar} alt="" style={{"height":"15px"}} />
            <span>Select Date</span>
            <img src={downArrow} alt="" style={{"height":"15px"}} />
          </div>
          <div className='nav-items'>
            <img src={filter} alt="" style={{"height":"15px"}} />
            <span>Filter</span>
            <img src={verticleLine} alt="" style={{"height":"15px"}}/>
            <img src={downArrow} alt="" style={{"height":"15px"}} />
          </div>
        </div>
        <div className='right-nav'>
          <div className='nav-items' style={{ cursor: "pointer" }} 
          onClick={() => setDelClick(true)}
          >
            <img src={Delete} alt="" style={{"height":"15px"}} />
            <span>Delete</span>
          </div>
          {delclick && (
            <div className="popup">
              {(isDelComplete) ? (
                <>
                  <div>
                    <img src={delIconComp} alt="PopUp" />
                  </div>
                  <div className="popuptext">Deleted Contacts</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                        document.location.reload();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img src={impDel} alt="PopUp" />
                  </div>
                  <div className="popuptext">Delete Contacts</div>
                  <div className="popuplink">
                    Sure you want delete this Contacts ?
                  </div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                      }}
                    >
                      OK
                    </button>
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setIsDelComplete(true);
                        deletebtnClicked();
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <div className='nav-items' style={{ cursor: "pointer" }} onClick={() => setClick(!click)}>
            <img src={Import} alt="" style={{"height":"15px"}} />
            <span>Import</span>
          </div>
          <div className='nav-items'>
            <img src={Export} alt="" style={{"height":"15px"}} />
            <span>Export</span>
          </div>
          {click && (
            <div
              className={`popup ${highlighted ? "highlighted" : "nothighlighted"}`}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={() => setHighlighted(true)}
              onDragLeave={() => setHighlighted(false)}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(false);
                //console.log(e.dataTransfer.files)


                const convertarr=Array.from(e.dataTransfer.files) 
              convertarr.map( async file=>{ 
        
            let text=await file.text() 
            let result=parse(text,{header:true});
            //console.log(result.data);
            //document.location.reload()
            console.log(result.data);
            
            postContacts(result.data);
             document.location.reload()
            
        



                    setIsComplete(true);
                    document.location.reload();
                  });
              }
              
            }
            >
              {isComplete ? (
                <>
                  <div>
                    <img src={delIconComp} alt="PopUp" />
                  </div>
                  <div className="popuptext">Import Complete</div>
                  <div className="popuplink">CSV File is Uploaded</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setClick(!click);
                        setIsComplete(false);
                         //setdrop(false);
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img src={importLogo} alt="PopUp" />
                  </div>
                  <div className="popuptext">Import File</div>
                  <div className="popuplink">Drag & Drop a CSV File to Upload</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setClick(!click);
                        setIsComplete(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mainTable-container">
        <Table />
      </div>
    </>
  )
}

export default TableNav