// TableUsers.tsx
import type { User } from "../interfaces";
import { CreateUser } from "./CreateUser";

interface Props {
  data: User[];
  onDeleteUser: (userId: string) => void;
  onAddUser: (user: User) => void;
  syncWithAPI: () => void;
  isLoading: boolean;
}

export const TableUsers = ({
  data,
  onDeleteUser,
  onAddUser,
  syncWithAPI,
  isLoading,
}: Props) => {
  if (isLoading) return <div>Cargando...</div>;
  return (
    <div className="relative w-[100vw]">
      <div className="flex justify-center items-center gap-1.5">
        <button
          onClick={syncWithAPI}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-blue-950  hover:bg-blue-700  focus:ring-blue-800 mb-4"
        >
          Sincronizar con API
        </button>

        <CreateUser onAddUser={onAddUser} />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  bg-gray-700  ">
          <tr>
            <th scope="col" className="px-6 py-3 text-white">
              firstName
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              lastName
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              email
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user: User) => (
              <tr
                key={user.id}
                className=" border-b  bg-gray-800  border-gray-700 border-gray-200"
              >
                <td
                  scope="row"
                  className="px-6 py-4 text-white whitespace-nowrap"
                >
                  {user.firstName}
                </td>
                <td className="px-6 py-4 text-white">{user.lastName}</td>
                <td className="px-6 py-4 text-white">{user.email}</td>
                <td className="px-6 py-4 text-white">
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="bg-white p-2 rounded-2xl text-red-600 hover:text-red-900 pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
