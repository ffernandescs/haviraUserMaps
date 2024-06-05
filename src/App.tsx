import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./components/services/users";
import { IUser } from "./interfaces/user";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { data, error, isSuccess } = useQuery<IUser[], Error>({
    queryKey: ["getUsers"],
    queryFn: () => getAllUsers(),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // if (!isSuccess) {
  //   return (
  //     <div className="flex h-full w-full items-center justify-center">
  //       <Skeleton className="h-[20px] w-[100px] rounded-full" />
  //     </div>
  //   )
  // }

  dispatch(setUserData(data));
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
