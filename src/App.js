import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
    Box,
    Container,
    IconButton,
    ThemeProvider,
    Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { buttonSX, floatingButtonSX } from "./assets/appStyles";
import "./assets/main.css";
import { theme } from "./assets/theme";
import Header from "./components/header/Header";
import AuthInModal from "./components/modals/AuthModal";
import ToDo from "./components/todo/ToDo";
import { closeModal, openModal } from "./store/modal/modal.slice";
import { addList } from "./store/todo/todo.slice";
import { SIGN_IN, SIGN_UP } from "./utilities/constants";

function App() {
    // Handle Modal state
    const modalStatus = useSelector((state) => state.modal.modalStatus);
    const modalType = useSelector((state) => state.modal.modalType);
    const toDoLists = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    // Modal Functions
    const openSignUp = () => {
        dispatch(openModal({ status: true, modalType: SIGN_UP }));
    };
    const openSignIn = () => {
        dispatch(openModal({ status: true, modalType: SIGN_IN }));
    };
    const closeAuthModal = () => {
        dispatch(closeModal({ status: false, modalType: "" }));
    };

    // Add New List
    const handleAddList = () => {
        dispatch(addList({ id: uuidv4(), toDoList: [] }));
    };

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Header openSignUp={openSignUp} openSignIn={openSignIn} />
                <Box sx={floatingButtonSX}>
                    <Tooltip title="Add List">
                        <IconButton onClick={handleAddList} sx={buttonSX}>
                            <AddCircleIcon fontSize="large" color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        {toDoLists.map((list) => {
                            return <ToDo list={list} key={list.id} />;
                        })}
                    </Grid>
                </Container>
                <AuthInModal
                    open={modalStatus}
                    onClose={closeAuthModal}
                    modalType={modalType}
                />
            </ThemeProvider>
        </Box>
    );
}

export default App;
