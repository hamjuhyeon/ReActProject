import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <>
      profile
      <Link to="/profile/edit">
        <button>프로필 편집</button>
      </Link>
    </>
  );
};

export default Profile;