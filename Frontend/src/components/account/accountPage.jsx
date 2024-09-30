import AccountBanner from "./accountBanner";
import { useState } from "react";
import { changeUsername } from "../login/loginfunc";
import { useSelector, useDispatch } from "react-redux";

function AccountPage() {
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const userName = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();
  const [userNameInput, setUserNameInput] = useState("");
  const [Edit, setEdit] = useState(false);
  const token = useSelector((state) => state.login.token.token);
  function showEdit() {
    setEdit(true);
  }

  function hideEdit() {
    setEdit(false);
  }

  const userNameButton = (event) => {
    event.preventDefault();
    changeUsername(userNameInput, dispatch, token);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName} ({userName}){" "}
        </h1>
        {!Edit && (
          <button onClick={showEdit} className="edit-button">
            Edit Name
          </button>
        )}
        {Edit && (
          <div className={"editusername"}>
            <form>
              <div className={"form-field"}>
                <label htmlFor={"username"}>User name:</label>
                <input
                  id={"username"}
                  type={"text"}
                  value={userNameInput}
                  onChange={(evt) => setUserNameInput(evt.target.value)}
                />
              </div>
              <div className={"form-field"}>
                <label htmlFor={"firstname"}>First name:</label>
                <input
                  id={"firstname"}
                  placeholder={firstName}
                  type={"text"}
                  disabled
                ></input>
              </div>
              <div className={"form-field"}>
                <label htmlFor={"lastname"}>Last name:</label>
                <input
                  id={"lastname"}
                  placeholder={lastName}
                  type={"text"}
                  disabled
                ></input>
              </div>
              <div className={"form-buttons"}>
                <button
                  type="submit"
                  onClick={userNameButton}
                  className="sign-in-button"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={hideEdit}
                  className="sign-in-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountBanner
        accountId={"8349"}
        type={"Checking"}
        balance={"2,082.79"}
      />
      <AccountBanner
        accountId={"6712"}
        type={"Savings"}
        balance={"10,928.42"}
      />
      <AccountBanner
        accountId={"8349"}
        type={"Credit Card"}
        balance={"184.30"}
      />
    </main>
  );
}

export default AccountPage;
