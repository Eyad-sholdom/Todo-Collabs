import React from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          About Our ToDo App
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Todo Collabs - The Ultimate Task Management Solution!
        </Typography>

        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Todo Collabs is a powerful and intuitive task management application
          designed to streamline your daily tasks and enhance collaboration
          within your groups. With Todo Collabs, you can effortlessly create and
          manage groups, add members, assign tasks, and maintain your personal
          profile, all from a single, user-friendly platform.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Group Management
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Create Groups"
              secondary="Get organized by creating groups for your various projects, teams, or social circles."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Add Members"
              secondary="Easily invite and add members to your groups, ensuring seamless collaboration."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Edit Groups"
              secondary="Admins and moderators can edit group details to keep everything up-to-date. they can add Task or Edit it They Also can Add Members and Delete Them. Normal Users Can Change the Status of the Task."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Manage Friends"
              secondary="You can Add or Delete Friends from thier Profile Page , Also All of Your Friends Will Be Displayed In your Profile ."
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default AboutPage;
