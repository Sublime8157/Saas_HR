import Button from "../../components/Button";
import HR from "../../components/HR";
import { useState } from "react";

const AdminPage = () => {
  const [isFilteringReveal, setIsFilteringReveal] = useState(true);
  const revealFiltering = (isFilteringReveal) => {
    setIsFilteringReveal((prev) => !prev);
  };

  return (
    <main className="gap-2 p-10 flex-col flex h-screen w-screen items-center">
      <h2 className="text-center text-3xl mb-10 font-bold">Companies</h2>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <Button
            className="text-xs"
            onClick={() => {
              revealFiltering(isFilteringReveal);
            }}
          >
            {isFilteringReveal ? "Hide Filtering" : "Enable Filtering"}
          </Button>
          <Button className="text-xs">Generate Password</Button>
        </div>
        <Button className="text-xs">Add Company</Button>
      </div>
      <div className="w-full">
        <ul className="font-bold px-2 text-sm flex w-full justify-between">
          <li className="">Code</li>
        </ul>
        <HR></HR>
        <ul
          className={`bg-white rounded shadow ${isFilteringReveal ? "flex" : "hidden"} flex-row justify-between px-2 py-4`}
        >
          <li className="bg-gray-300 justify-between flex items-center gap-2 w-20 p-2 text-sm">
          </li>
        </ul>
      </div>
    </main>
  );
};

export default AdminPage;
