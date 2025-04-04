// --- Sidebar Component ---
import React, { useState } from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  List,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import LayersIcon from "@mui/icons-material/Layers";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import PaymentIcon from "@mui/icons-material/Payment";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const location = useLocation();
  const [openMasterData, setOpenMasterData] = useState(true);
  const [openAcademic, setOpenAcademic] = useState(true);
  const [openStudent, setOpenStudent] = useState(true);
  const [openTeacher, setOpenTeacher] = useState(true);
  const [openFinance, setOpenFinance] = useState(true);

  const getColor = (path) =>
    location.pathname.startsWith(path) ? "primary" : "inherit";

  return (
    <>
      {/* Master Data */}
      
      <ListItemButton onClick={() => setOpenMasterData(!openMasterData)}>
        <ListItemIcon><ClassOutlinedIcon /></ListItemIcon>
        <ListItemText primary="Master Data" />
        {/* {openMasterData ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={openMasterData} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/Admin/classes" sx={{ pl: 4 }}>
            <ListItemIcon><ClassOutlinedIcon color={getColor("/Admin/classes")} /></ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/sections" sx={{ pl: 4 }}>
            <ListItemIcon><LayersIcon color={getColor("/Admin/sections")} /></ListItemIcon>
            <ListItemText primary="Sections" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/streams" sx={{ pl: 4 }}>
            <ListItemIcon><GroupWorkIcon color={getColor("/Admin/streams")} /></ListItemIcon>
            <ListItemText primary="Streams" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/subjects" sx={{ pl: 4 }}>
            <ListItemIcon><SubjectIcon color={getColor("/Admin/subjects")} /></ListItemIcon>
            <ListItemText primary="Subjects" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/designations" sx={{ pl: 4 }}>
            <ListItemIcon><WorkIcon color={getColor("/Admin/designations")} /></ListItemIcon>
            <ListItemText primary="Designations" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Academic Setup */}
      <Divider sx={{ my: 1 }} />
      
      <ListItemButton onClick={() => setOpenAcademic(!openAcademic)}>
        <ListItemIcon><AccountTreeIcon /></ListItemIcon>
        <ListItemText primary="Academic Setup" />
        {/* {openAcademic ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={openAcademic} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/Admin/class-subject-assignment" sx={{ pl: 4 }}>
            <ListItemIcon><AccountTreeIcon color={getColor("/Admin/class-subject-assignment")} /></ListItemIcon>
            <ListItemText primary="Class-Subject Assignment" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/class-teacher-assignment" sx={{ pl: 4 }}>
            <ListItemIcon><AssignmentIndIcon color={getColor("/Admin/class-teacher-assignment")} /></ListItemIcon>
            <ListItemText primary="Class Teacher Assignment" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Student Management */}
      <Divider sx={{ my: 1 }} />
      
      <ListItemButton onClick={() => setOpenStudent(!openStudent)}>
        <ListItemIcon><SchoolIcon /></ListItemIcon>
        <ListItemText primary="Student Management" />
        {/* {openStudent ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={openStudent} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/Admin/addstudents" sx={{ pl: 4 }}>
            <ListItemIcon><PersonAddIcon color={getColor("/Admin/addstudents")} /></ListItemIcon>
            <ListItemText primary="Student Registration" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/students" sx={{ pl: 4 }}>
            <ListItemIcon><SchoolIcon color={getColor("/Admin/students")} /></ListItemIcon>
            <ListItemText primary="Student Directory" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/feeoverview" sx={{ pl: 4 }}>
            <ListItemIcon><PaymentIcon color={getColor("/Admin/feeoverview")} /></ListItemIcon>
            <ListItemText primary="Fee Management" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Teacher Management */}
      <Divider sx={{ my: 1 }} />
      
      <ListItemButton onClick={() => setOpenTeacher(!openTeacher)}>
        <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
        <ListItemText primary="Teacher Management" />
        {/* {openTeacher ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={openTeacher} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/Admin/teachers/addteacher" sx={{ pl: 4 }}>
            <ListItemIcon><PersonIcon color={getColor("/Admin/teachers/addteacher")} /></ListItemIcon>
            <ListItemText primary="Teacher Registration" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/teachers" sx={{ pl: 4 }}>
            <ListItemIcon><SupervisorAccountIcon color={getColor("/Admin/teachers")} /></ListItemIcon>
            <ListItemText primary="Teacher Directory" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/salarymanagement" sx={{ pl: 4 }}>
            <ListItemIcon><AccountBalanceWalletIcon color={getColor("/Admin/salarymanagement")} /></ListItemIcon>
            <ListItemText primary="Salary Management" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Finance */}
      <Divider sx={{ my: 1 }} />
      
      <ListItemButton onClick={() => setOpenFinance(!openFinance)}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Finance" />
        {/* {openFinance ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
      <Collapse in={openFinance} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/Admin/feecategorysetup" sx={{ pl: 4 }}>
            <ListItemIcon><SettingsIcon color={getColor("/Admin/feecategorysetup")} /></ListItemIcon>
            <ListItemText primary="Fee Setup" />
          </ListItemButton>
          <ListItemButton component={Link} to="/Admin/salarysetup" sx={{ pl: 4 }}>
            <ListItemIcon><SettingsApplicationsIcon color={getColor("/Admin/salarysetup")} /></ListItemIcon>
            <ListItemText primary="Salary Setup" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default Sidebar;