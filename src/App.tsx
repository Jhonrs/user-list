import "./App.css";
import { TableUsers } from "./components/TableUsers";
import { useUserManagement } from "./hooks/useUserManagement";

function App() {
  const { users, addUser, deleteUser, syncWithAPI, isLoading } = useUserManagement();

  return (
    <div className="App">
 
      <TableUsers 
        data={users}
        onAddUser={addUser}
        onDeleteUser={deleteUser}
        isLoading={isLoading}
        syncWithAPI={syncWithAPI}
      />
    </div>
  );
}

export default App;
