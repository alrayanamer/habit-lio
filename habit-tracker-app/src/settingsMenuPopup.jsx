import { getAuth, deleteUser, signOut } from "firebase/auth";
import "./Settings.css";

function SettingsPopup({ closePopup }) {
  const auth = getAuth();

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(auth.currentUser);
      alert("Account deleted.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("You may need to log in again before deleting your account.");
    }
  };

  return (
    <div className="settings-popup-overlay" onClick={closePopup}>
      <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        <button
          onClick={async () => {
            await signOut(auth);
            closePopup();
          }}
        >
          Sign Out
        </button>

        <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>

        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default SettingsPopup;
