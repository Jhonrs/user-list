// CreateUser.tsx
// Se crea el componente, para que tenga su propia logica a la hora de crear un nuevo usuario
import { useState } from "react";
import type { User } from "../interfaces";

interface Props {
  onAddUser: (user: User) => void;
}

export const CreateUser = ({ onAddUser }: Props) => {

    /* Se utilizan estados para manejar los eventos, en esta caso la visibilidad del modal, y la creación de los nuevos usuarios */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      ...formData,
      status: true,
    };
    onAddUser(newUser);
    handleCloseModal();
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="block text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center 700  focus:ring-blue-800 mb-4"
        type="button"
      >
        Add New User
      </button>

      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden={!isModalOpen}
        className={`${
          isModalOpen ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-neutral-800/80 mb-5`}
      >
        <div className="relative p-4  max-w-full max-h-full flex justify-center">
          <div className=" rounded-lg shadow-sm w-[50%] bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-600">
              <h3 className="text-xl font-semibold text-white">
                Add new user
              </h3>
              <button
                onClick={handleCloseModal}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-white  "
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg   w-full p-1.5"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-white  "
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-600  text-sm rounded-lg   w-full p-1.5"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-600  text-sm rounded-lg  w-full p-1.5  "
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800"
                >
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
