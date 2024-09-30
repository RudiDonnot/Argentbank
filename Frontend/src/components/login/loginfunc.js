import {
  setToken,
  setFirstName,
  setLastName,
  setUserName,
  logout,
} from "../../Slice/loginslice";

export async function loginUser(logs, dispatch, navigate) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logs),
    });

    if (!response.ok) {
      if (response.status === 400) {
        alert(
          "La combinaison de l'adresse mail et/ou du mot de passe est mauvaise."
        );
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return;
    }

    const retour = await response.json();

    dispatch(setToken({ token: retour.body.token }));
    const userProfile = await userProfileFetching(retour.body.token);
    dispatch(setUserName(userProfile.userName));
    dispatch(setFirstName(userProfile.firstName));
    dispatch(setLastName(userProfile.lastName));
    navigate("/accountPage");
  } catch (error) {
    console.error("Error in LoginUser:", error);
    throw error;
  }
}

async function userProfileFetching(token) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "GET", // Changement de POST à GET si nécessaire
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const retour = await response.json();
    return retour.body;
  } catch (error) {
    console.error("Error in UserProfile:", error);
    throw error;
  }
}

export async function changeUsername(newusername, dispatch, token) {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: newusername }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const retour = await response.json();
    dispatch(setUserName(newusername));
    return retour.body;
  } catch (error) {
    console.error("Error in ChangeUsername:", error);
    throw error;
  }
}

export function Logout(navigate, dispatch) {
  return new Promise((resolve) => {
    dispatch(logout());
    resolve(navigate("/"));
  });
}
