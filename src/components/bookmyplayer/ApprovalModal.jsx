import React from "react";
import "../styles/Comment.css";
import "react-toastify/dist/ReactToastify.css";

const ApprovalModal = ({ onClose, item}) => {
  console.log(item);
  return (
    <div class="recycle-popup-wrapper">
      <div class="recycle-popup-container">
        <div className="approval_box">
          <div className="approval_cross common-fonts" onClick={onClose}>X</div>

          <div className="approval_flex">
            <label htmlFor="">Date</label>
            <input type="date" className="common-fonts common-input approval_input" value={item?.update_date?.split("T")[0]}/>
          </div>

          <div className="approval_flex">
            <label htmlFor="">Rejected Fields</label>
            <input type="text" className="common-fonts common-input approval_input" value={item.rejectedFields}/>
          </div>

          <div className="approval_flex">
            <label htmlFor="">Approved Fields</label>
            <input type="text" className="common-fonts common-input approval_input" value={item.approvedFields}/>
          </div>

          <div className="approval_flex">
            <label htmlFor="">Remarks</label>
            <textarea name="" id="" cols="30" rows="5" className="common-fonts approval_textarea" value={item.rejection_reason}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
