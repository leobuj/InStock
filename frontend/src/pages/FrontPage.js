import { Container, Row, Button, Nav } from "react-bootstrap";
/*import {
    Box, 
    Divider, 
    Drawer, 
    IconButton, 
    List, 
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined, 
    ChevronLeft,
    ChevronRightOutlined, 
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined, 
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined
} from "@mui/icons-material";*/
import { useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./FrontPage.css";

const FrontPage = ({
    /*drawerWidth,
    isSidebarOpen,
    SetIsSidebarOpen,
    isNonMobile*/
}) => {
    //const { pathname } = useLocation();
    //const [active, setActive] = useState("");
    //const navigate = useNavigate();
    //const theme = useTheme();

    //useEffect(() => {
    //    setActive(pathname.substring(1));
    //}, [pathname])
    return(
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <section className="inventoryList">
                            <Nav.Link href="/teststock">
                            <Link to="/teststock">Inventory</Link>
                            </Nav.Link>
                        </section>
                        <section className="inventoryList">
                            <Nav.Link href="/order">
                            <Link to="/order">Orders</Link>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Date Ordered</th>
                                    <th>Item Ordered</th>
                                </tr>
                            </table>
                            </Nav.Link>
                        </section>
                        <div className="buttonContainer">
                            <a href="/teststock">
                                <Button size="lg" className="landingbutton">
                                    Inventory
                                </Button>
                            </a>
                            <a href="/register">
                                <Button 
                                    size="lg" 
                                    className="landingbutton"
                                    variant="outline-primary"
                                >
                                    Register Here!
                                </Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default FrontPage;