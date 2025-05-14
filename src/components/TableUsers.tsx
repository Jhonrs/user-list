// TableUsers.tsx
// Se crea este componente para mostrar la tabla
import type { User } from "../interfaces";
import { CreateUser } from "./CreateUser";

// Se crea los props para tipar los datos que se van a utilizar en el componente y hacerlo más estricto
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
    <div className="relative flex flex-col justify-center items-center mb-5">
      <div className="flex justify-center items-center gap-1.5 mt-5">
        <button
          onClick={syncWithAPI}
          className="block text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center 700  focus:ring-blue-800 mb-4"
        >
          Sincronizar con API
        </button>

        <CreateUser onAddUser={onAddUser} />
      </div>
      <table className="text-sm text-left rtl:text-right text-gray-500 w-[50%]">
        <thead className="text-xs text-gray-700 uppercase bg-gray-700 ">
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

            {/* Se crea un map para posicionar en la tabla cada usaario creado */}
          {data &&
            data.map((user: User) => (
              <tr
                key={user.id}
                className=" border-b  bg-gray-900 border-gray-200"
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
                    className="bg-gray-700 w-full p-3 rounded-2xl text-white cursor-pointer"
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
