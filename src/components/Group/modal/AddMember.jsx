/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchBar from "../../../layout/Topbar/SearchBar";
import { Box } from "@mui/system";

const AddMember = (props) => {
  const handleSearch = (userId) => {
    props.handleAddMember(userId);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      sx={{
        zIndex: 98,
      }}
    >
      <DialogTitle>Search Member</DialogTitle>
      <DialogContent
        sx={{
          p: 2,
          height: "70px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMember;
