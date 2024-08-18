import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import kssiaImage from "../assets/images/kssia.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Collapse,
  Dialog,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as NotificationIcon } from "../assets/icons/NotificationIcon.svg";
import profile from "../assets/images/profile.png";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
const drawerWidth = 250;
const subNavigation = [
  { name: "Dashboard", to: "/dashboard", icon: <GridViewIcon /> },
  { name: "Members", to: "/members", icon: <PeopleOutlineOutlinedIcon /> },
  { name: "Products", to: "/products", icon: <LocalMallOutlinedIcon /> },
  {
    name: "Events",
    icon: <CalendarMonthOutlinedIcon />,
    subItems: [
      {
        name: "Event list",
        to: "/events/eventlist",
        icon: <ListOutlinedIcon />,
      },
      {
        name: "Event history",
        to: "/events/eventhistory",
        icon: <HistoryOutlinedIcon />,
      },
    ],
  },
  { name: "Payments", to: "/payments", icon: <PaymentsOutlinedIcon /> },
  { name: "Approvals", to: "/approvals", icon: <GavelOutlinedIcon /> },
  { name: "Promotions", to: "/promotions", icon: <ReceiptLongOutlinedIcon /> },
  {
    name: "Notifications",
    to: "/notifications",
    icon: <NotificationsOutlinedIcon />,
  },
  { name: "News and Updates", to: "/news", icon: <NewspaperOutlinedIcon /> },
  { name: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> },
  { name: "Logout", to: "/logout", icon: <LogoutOutlinedIcon /> },
];

const SimpleDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: 50,
          right: 50,
          m: 0,
          width: "270px",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Stack spacing={2} borderRadius={3} padding="10px" paddingTop={"20px"}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            alt="Remy Sharp"
            src={profile}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography variant="h6" color="#292D32" paddingBottom={1}>
              Alex meian
            </Typography>
            <Typography variant="h7" color="rgba(41, 45, 50, 0.44)">
              Admin
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  );
};

const AdminLayout = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        width: "250px",
        height: "1024px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)", // Right border
      }}
    >
      <Toolbar
        sx={{
          width: "250px",
          height: "90px",
          padding: "33px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <img src={kssiaImage} alt="KSSIA" width={"133px"} height="36px" />
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "10px",
              fontWeight: 300,
              lineHeight: "12.1px",
              letterSpacing: "0.3px",
              textAlign: "left",
              marginTop: "10px",
            }}
          >
            version 1.0
          </Typography>
        </Box>
      </Toolbar>
      <List
        sx={{
          width: "250px",
          height: "600px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: 0,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#a1a1a1",
            },
          },
        }}
      >
        {subNavigation.map((item) =>
          item.name === "Events" ? (
            <div key={item.name}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    py: 1,
                    px: 3,
                    color: "#5F6368",
                    "&:hover": { color: "#2C2829", backgroundColor: "#F7F7F7" },
                    "&:hover .MuiListItemIcon-root": { color: "#2C2829" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 24, mr: 2, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open}>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem key={subItem.name} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={subItem.to}
                        sx={{
                          py: 1,
                          pl: 7,
                          pr: 3,
                          color:
                            location.pathname === item.to
                              ? "#2C2829"
                              : "#686465",
                          backgroundColor:
                            location.pathname === item.to
                              ? "#F7F7F7"
                              : "transparent",
                          "&:hover": {
                            color: "#004797",
                            backgroundColor: "#E7EBF9",
                          },
                          "&:hover .MuiListItemIcon-root": { color: "#004797" },
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: 24, mr: 2, color: "inherit" }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ) : (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                  py: 1,
                  px: 3,
                  color: location.pathname === item.to ? "#2C2829" : "#686465",
                  backgroundColor:
                    location.pathname === item.to ? "#F7F7F7" : "transparent",
                  "&:hover": { color: "#2C2829", backgroundColor: "#F7F7F7" },
                  "&:hover .MuiListItemIcon-root": { color: "#2C2829" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 24, mr: 2, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: `white`,
          boxShadow: `none`,
        }}
      >
        <Toolbar
          sx={{
            height: "88px",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "flex-start",
              padding: "15px",
            }}
          >
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box display={isMobile && "none"}> </Box>
            <NotificationIcon />

            <Box
              borderRadius="24px"
              padding={"5px 20px 5px 5px"}
              bgcolor={"#F7F7F7"}
              width={"200px"}
              color={"#000"}
              gap={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={handleDialogOpen}
              sx={{ cursor: "pointer", flexShrink: 0, marginLeft: "10px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography variant="h6" color={"#292D32"} display="block">
                    Alex Meian
                  </Typography>
                  <Typography
                    variant="h7"
                    color={"rgba(41, 45, 50, 0.44)"}
                    display="block"
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
              <ExpandMoreIcon />
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#F3F3F3",
          minHeight: "100vh",
          paddingTop: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <SimpleDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
};

AdminLayout.propTypes = {
  window: PropTypes.func,
};

export default AdminLayout;
