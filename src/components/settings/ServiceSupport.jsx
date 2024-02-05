import React, { useEffect, useState } from 'react';
import '../styles/CPGenral.css';
import axios from 'axios';
import {
  getDecryptedToken, GET_SERVICE 
} from '../utils/Constants';
import ServiceRequestTab from './ServiceRequestTab';
import EditRequest from './EditRequest';

const ServiceSupport = () => {
  const id = localStorage.getItem('id');
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
  const [isServiceTabOpen, setIsServiceTabOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading,setLoading] = useState(true);

 const getMyTicket = () => {
    axios
      .get(GET_SERVICE + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
      getMyTicket();
    }, []);

  const handleOpenServiceTab = (item) => {
    setSelectedTicket(item); // Set the selected ticket item
    setIsServiceTabOpen(true);
    
  };

  const handleCloseServiceTab = () => {
    setIsServiceTabOpen(false);
  };

  const openContactTab = (item) => {
    setSelectedTicket(item);
    setIsEditOpen(true);
  }
  const serviceRefresh = () => {
    getMyTicket();
  }

  const handleEditClose = () => {
    setIsEditOpen(false);
  }



    return (
      <div>
        {isLoading ? (
           <div className='support-no-ticket-found'>
           <p className='common-fonts'>Loading...</p>
           </div>
        ) :
        ticket.length === 0 ? (
           <div className='support-no-ticket-found'>
          <p className='common-fonts'>No ticket found</p>
          </div>
        ) : (
          <>
          <div className='service-req-top'>
            <p className="common-fonts ss-heading">Service request</p>
            <button type="button" className="helpBtn genral-refresh-icon label-refresh-icon" title="Refresh" onClick={serviceRefresh}>
              <i class="fa-sharp fa-solid fa-rotate "></i>
              </button>
          </div>
            <div className="service-support-table">
              <table>
                <thead>
                  <tr>
                    <th className="common-fonts">s no</th>
                    <th className="common-fonts">Title</th>
                    <th className="common-fonts">description</th>
                    <th className="common-fonts">category</th>
                    <th className="common-fonts">status</th>
                    <th className="common-fonts">assigned to</th>
                    <th className="common-fonts">created date</th>
                    <th className="common-fonts">update date</th>
                    <th></th>
                  </tr>
                </thead>
  
                <tbody>
                  {ticket.map((item) => (
                    <tr key={item.id} >
                      <td className="common-fonts">{item.id}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} >{item.title.slice(0, 10) + '...'} </td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} >{item.description.slice(0, 10) + '...'}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.category}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.status}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.assigned_to}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.created_at.split('T')[0]}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.updated_at.split('T')[0]}</td>
                      <td onClick={() => openContactTab(item)}><div><i className="fa-solid fa-pen"></i></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {isServiceTabOpen && <ServiceRequestTab ticket={selectedTicket} onClose={handleCloseServiceTab} />}

        {
          isEditOpen && <EditRequest onClose={handleEditClose} ticket={selectedTicket}/>
        }
      </div>
    );

  }




export default ServiceSupport;
