import React from 'react';
import { useStateContext } from '../StateContext';
import '../index.css'

const SessionExpiredModal= ()=> {
    const {handleClose, show} = useStateContext()
  return (
    <div>
      { show===true ? (
        <div className="modal-overlay">
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
              <div className="modal-header">
                <h2>Session Expired</h2>
              </div>
              <div className="modal-body">
                <p>Your session has expired. Please login again.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-ok" onClick={handleClose}>Login</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SessionExpiredModal;
