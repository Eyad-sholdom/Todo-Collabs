export const deleteGroup = async (groupId) => {
  try {
    // Make an HTTP DELETE request to your API to delete the group
    const response = await fetch(`/api/group/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete group with status ${response.status}`);
    }
    console.log("Group deleted successfully");
    return;
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};
export default deleteGroup;
