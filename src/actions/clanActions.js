import fetch from "../utils/fetch";

export const createClan = (
  tag,
  name,
  logo,
  anthem,
  country,
  boss
) => async dispatch => {
  try {
    const response = await fetch("/api/klan/create.php", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ tag, name, logo, anthem, country, boss })
    });

    if (response.status === 200) {
      const content = await response.json();

      if (content.message === "OK") {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
