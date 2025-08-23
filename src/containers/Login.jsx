// import { motion } from "framer-motion";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";

// const Login = () => {
//   const [showPassword, setshowPassword] = useState(false);
//   const [data, setdata] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setdata((preve) => {
//       return {
//         ...preve,
//         [name]: value,
//       };
//     });
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();

//     const dataResponse = await fetch(SummaryApi.signIn.url, {
//       method: SummaryApi.signIn.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const dataApi = await dataResponse.json();

//     if (dataApi.success) {
//       toast.success(dataApi.message);
//       navigate("/voter");
//     }

//     if (dataApi.error) {
//       toast.error(dataApi.message);
//     }
//   };

//   console.log("data login", data);

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <h1 className="text-4xl font-bold text-white mb-8">
//         Administration Login
//       </h1>
//       <form
//         className="flex flex-col gap-4 items-center w-80"
//         onSubmit={handlesubmit}
//       >
//         <div className="flex flex-col gap-4 items-center w-80">
//           <input
//             type="email"
//             placeholder="User Name"
//             name="email"
//             value={data.email}
//             onChange={handleOnChange}
//             className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//           />

//           <div className="relative w-full">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter Password"
//               value={data.password}
//               name="password"
//               onChange={handleOnChange}
//               className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
//             />
//             <span
//               className="absolute top-3 right-4 text-gray-600 cursor-pointer"
//               onClick={() => setshowPassword((preve) => !preve)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <Link
//             to={"/createaccount"}
//             className="block w-fit ml-auto hover:underline hover:text-red-600 text-black text-sm mt-2"
//           >
//             Don't have an Account?
//           </Link>
//         </div>

//         <div className="flex flex-col gap-5 w-40 mt-4">
//           <button
//             //onClick={() => navigate("/voter")}
//             // onClick={() => {
//             //   toast.info("Redirecting to Voter Login...");
//             //   navigate("/voter");
//             // }}
//             // onSubmit={handlesubmit}
//             type="submit"
//             className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
//           >
//             Voter's Login
//           </button>

//           {/* <motion.button
//             onClick={() => navigate()}
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//             whileHover={{ scale: 1.05 }}
//           >
//             Sign Up
//           </motion.button> */}

//           <motion.button
//             onClick={() => navigate()}
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//             whileHover={{ scale: 1.05 }}
//           >
//             Login
//           </motion.button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

// //@@@@@@@@@@@@@@@@@@@

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/voter");
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <h1 className="text-4xl font-bold text-white mb-8">
        Administration Login
      </h1>
      <form
        className="flex flex-col gap-4 items-center w-80"
        onSubmit={handlesubmit}
      >
        <div className="flex flex-col gap-4 items-center w-80">
          <input
            type="email"
            placeholder="User Name"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={data.password}
              name="password"
              onChange={handleOnChange}
              className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <span
              className="absolute top-3 right-4 text-gray-600 cursor-pointer"
              onClick={() => setshowPassword((preve) => !preve)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Link
            to={"/createaccount"}
            className="block w-fit ml-auto hover:underline hover:text-red-600 text-black text-sm mt-2"
          >
            Don't have an Account?
          </Link>
        </div>

        <div className="flex flex-col gap-5 w-40 mt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
          >
            Voter's Login
          </button>

          <motion.button
            onClick={() => navigate()}
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Login;
