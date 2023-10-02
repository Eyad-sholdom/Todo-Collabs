import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQ() {
  const faqData = [
    {
      question: "What is a Todo app?",
      answer:
        "A Todo app is a tool that helps you keep track of tasks or activities that you need to complete. It's a digital to-do list.",
    },
    {
      question: "Why should I use a Todo app?",
      answer:
        "Using a Todo app can help you stay organized, prioritize tasks, and manage your time more efficiently. It's a convenient way to remember and accomplish your goals.",
    },
    {
      question: "How do I add a task?",
      answer:
        "In most Todo apps, you can typically click a 'Add Task' button or input field, then enter a description of the task and press 'Enter' or click 'Add' to save it to your list.",
    },
    {
      question: "Can I set due dates for tasks?",
      answer:
        "Yes, many Todo apps allow you to set due dates and deadlines for tasks. This helps you prioritize and manage your time effectively.",
    },
    {
      question: "Is it possible to mark tasks as completed?",
      answer:
        "Absolutely! You can mark tasks as completed when you've finished them. This provides a sense of accomplishment and helps you keep track of your progress.",
    },
    {
      question: "Can I organize my tasks into categories or lists?",
      answer:
        "Yes, most Todo apps offer features like task categories, lists, or tags, allowing you to group related tasks together for better organization.",
    },
    {
      question: "How can I delete a task?",
      answer:
        "You can usually delete a task by selecting it and then clicking a 'Delete' or 'Remove' button. Be careful, as this action is often irreversible.",
    },
    {
      question: "Do Todo apps sync across devices?",
      answer:
        "Many modern Todo apps offer synchronization across devices, so you can access your tasks on your phone, tablet, or computer, keeping your lists up-to-date no matter where you are.",
    },
    {
      question: "Are there any free Todo apps available?",
      answer:
        "Yes, there are many free Todo apps with basic features. However, some apps offer premium features that may require a subscription or one-time purchase.",
    },
    {
      question: "Can I collaborate with others on tasks?",
      answer:
        "Some Todo apps offer collaboration features that allow you to share tasks and lists with others. This is useful for team projects or shared responsibilities.",
    },
  ];
  return (
    <Grid container spacing={12} justifyContent={"center"} pb={"2%"}>
      {faqData.map((faq, index) => (
        <Grid key={index} item lr={8} md={8} xs={8}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
}

export default FAQ;
