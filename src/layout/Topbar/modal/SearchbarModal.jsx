// import * as React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   Button,
//   ButtonGroup,
//   Grid,
//   Typography,
//   Tooltip,
//   Divider,
// } from "@mui/material";

// import { CheckCircle, Cancel } from "@mui/icons-material";

// import styles from "./DownloadListModal.module.css";
// import Image from "next/image";
// import PeerFileIcon from "@/components/peerFileList/PeerFileIconCustom";
// import PeerFileLinearProgress from "@/components/peerFileList/PeerFileLinearProgressCustom";
// import FileStatusButton from "./FileStatusButton";

// const getSize = (size) => {
//   const sizeInKB = size / 1024;
//   if (sizeInKB < 1024) {
//     return `${sizeInKB.toFixed(2)} KB`;
//   }
//   const sizeInMB = sizeInKB / 1024;
//   if (sizeInMB < 1024) {
//     return `${sizeInMB.toFixed(2)} MB`;
//   }
//   const sizeInGB = sizeInMB / 1024;
//   return `${sizeInGB.toFixed(2)} GB`;
// };

// const getShortFileName = (fileName) => {
//   const maxLength = 8;
//   const extension = fileName.split(".").pop(); // get the file extension
//   const nameWithoutExt = fileName.substr(0, fileName.lastIndexOf(".")); // get the file name without extension

//   if (nameWithoutExt.length > maxLength) {
//     return nameWithoutExt.substr(0, maxLength) + "..." + extension;
//   } else {
//     return fileName;
//   }
// };

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// export default function SearchbarModal(props) {
//   const {
//     receivedFiles,
//     open,
//     onClose,
//     onFileAccept,
//     onFileReject,
//     onAcceptAll,
//     onRejectAll,
//     onFileDelete,
//     onFileDownload,
//   } = props;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle sx={{ borderBottom: 1, borderColor: "#cccccc" }}>
//         Received Files
//       </DialogTitle>

//       <DialogContent
//         className={styles.container}
//         sx={{ overflowX: "hidden", maxHeight: 500 }}
//       >
//         {receivedFiles.map((peerInfo, index) => (
//           <React.Fragment key={`${peerInfo.peer.peerHash}-${index}`}>
//             <Grid
//               container
//               padding={2}
//               flexDirection={"column"}
//               alignItems={"stretch"}
//             >
//               <Grid item>
//                 <Grid
//                   container
//                   alignItems={"center"}
//                   justifyContent={"flex-start"}
//                   gap={2}
//                 >
//                   <Grid item>
//                     <Image
//                       src={`avatars/${peerInfo.peer.alias}.svg`}
//                       alt={peerInfo.peer.alias}
//                       width={50}
//                       height={50}
//                     />
//                   </Grid>

//                   <Grid>
//                     <Typography variant="body1" color="initial">
//                       {capitalizeFirstLetter(peerInfo.peer.alias)} has sent you{" "}
//                       {peerInfo.files.length} file(s)
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Box
//               className={styles.container}
//               component={List}
//               sx={{
//                 maxHeight: "calc(52px * 3)", // 72px is the estimated height of a ListItem
//                 overflowY: "auto",
//                 marginBottom: "1rem",
//                 marginTop: "0.5rem",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 padding: "1rem",
//                 paddingRight: "0.5rem",
//               }}
//             >
//               {peerInfo.files.map((file) => (
//                 <ListItem
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     maxWidth: 750,
//                     minWidth: 350,
//                     maxHeight: 65,
//                   }}
//                   key={file.fileId}
//                 >
//                   <Box sx={{ display: "flex" }}>
//                     <PeerFileIcon fileType={file.fileType} />
//                     <Tooltip title={file.fileName} placement="top-start" arrow>
//                       <ListItemText
//                         sx={{ marginRight: 1, whiteSpace: "nowrap" }}
//                         primary={getShortFileName(file.fileName)}
//                         secondary={getSize(file.fileSize)}
//                       />
//                     </Tooltip>
//                   </Box>

//                   <Box sx={{ width: "100%" }}>
//                     <PeerFileLinearProgress
//                       status={file.status}
//                       progress={file.progress}
//                       buffer={file.data?.buffer || 0}
//                     />
//                   </Box>
//                   <Box
//                     sx={{ display: "flex", alignItems: "center", margin: 1 }}
//                   >
//                     <FileStatusButton
//                       status={file.status}
//                       fileId={file.fileId}
//                       onFileReject={onFileReject}
//                       onFileAccept={onFileAccept}
//                       onFileDelete={onFileDelete}
//                       onFileDownload={onFileDownload}
//                     />
//                   </Box>
//                 </ListItem>
//               ))}
//             </Box>

//             <Grid container justifyContent={"flex-end"}>
//               <ButtonGroup
//                 variant="outlined"
//                 color="primary"
//                 aria-label="group-accept-reject"
//                 size="small"
//               >
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   startIcon={<Cancel />}
//                   onClick={() => onRejectAll(peerInfo.peer)}
//                 >
//                   Reject All
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="success"
//                   startIcon={<CheckCircle />}
//                   onClick={() => onAcceptAll(peerInfo.peer)}
//                 >
//                   Download All
//                 </Button>
//               </ButtonGroup>
//             </Grid>
//             {index < receivedFiles.length - 1 ? (
//               <Divider variant="middle" sx={{ m: 1.5 }} />
//             ) : null}
//           </React.Fragment>
//         ))}
//         {/* Close */}
//       </DialogContent>
//       <Grid
//         container
//         justifyContent={"flex-end"}
//         sx={{ paddingRight: 3, borderTop: 1, borderColor: "#cccccc" }}
//       >
//         <Button
//           sx={{ m: 1 }}
//           variant="contained"
//           color="error"
//           onClick={onClose}
//         >
//           Close
//         </Button>
//       </Grid>
//     </Dialog>
//   );
// }
