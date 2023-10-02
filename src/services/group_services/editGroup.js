const editGroup = async (data, id) => {
  try {
    fetch(`/api/group/task/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data = await res.json();
      return data;
    });
  } catch (error) {
    console.error(error);
  }
};
export default editGroup;
