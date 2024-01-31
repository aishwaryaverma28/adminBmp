import React from 'react'
import { Provider } from 'react-redux'
import store from './utils/store'
import BmpHeader from './BmpHeader'
import { Outlet } from 'react-router-dom'
import "./styles/BlogAdd.css";
import "./styles/Admin.css";
import "./styles/bmp.css";
import "./styles/Comment.css";
import "./styles/CompanyProducts.css";
import "./styles/Contacts.css";
import "./styles/CPGenral.css";
import "./styles/CreateLead.css";
import "./styles/Editor.css";
import "./styles/EmployeeProfile.css";
import "./styles/EmployeeUpdate.css";
import "./styles/EmployeeView.css";
import "./styles/Error.css";
import "./styles/HeadFoot.css";
import "./styles/HelpAdd.css";
import "./styles/HelpModal.css";
import "./styles/Home.css";
import "./styles/Import.css";
import "./styles/Login.css";
import "./styles/LPGeneral.css";
import "./styles/LPheader.css";
import "./styles/LPleads.css";
import "./styles/LPSecurity.css";
import "./styles/LPSetting.css";
import "./styles/LPSettingsNotification.css";
import "./styles/LPUserAndTeam.css";
import "./styles/Marketing.css";
import "./styles/Password.css";
import "./styles/Permissions.css";
import "./styles/profile.css";
import "./styles/RecycleBin.css";
import "./styles/Registration.css";
import "./styles/Sidebar.css";
import "./styles/Tournament.css";
import "./styles/workflow.css";
import "./styles/CompanySettings.css";
import "./styles/DealUpdate.css";

const BmpAdmin = () => {
    return (
        <div>
            <Provider store={store}>
                <BmpHeader />
                <Outlet />
            </Provider>
        </div>
    )
}

export default BmpAdmin