import { user_manual } from "../assets";
import Title from "../components/Common/Title";

const UserManualPage = () => {
  return (
    <section className="m-4 p-4 bg-white rounded-md shadow-md flex flex-col">
      <Title title="User Manual" />
      <iframe
        title="User Manual"
        src={user_manual}
        className="mt-4"
        style={{ width: "100%", height: "600px" }}
      />
    </section>
  );
};

export default UserManualPage;
