// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// //import { get } from "../../../server/routes";

// const Details = () => {
//   const navigate = useNavigate();

//   // fETCH The Data From MongoDB

//   const [memberData, setMemberData] = useState([]);

//   const fetchDatas = async () => {
//     try {
//       const res = await axios
//         .get("http://localhost:8000/api/get-addmember")
//         .then((res) => {
//           setMemberData(res.data);
//         });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     useEffect(() => {
//       fetchDatas();
//     }, []);
//   };

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-white mb-6">
//           Voter Details
//         </h1>
//         <form className="flex flex-col gap-5">
//           {/* Name Input */}
//           <input
//             type="text"
//             readOnly
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* NIC Input */}
//           <input
//             type="text"
//             placeholder="NIC"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* District Input */}
//           <input
//             type="text"
//             placeholder="District"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />

//           {/* Next Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//           >
//             NEXT
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// export default Details;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Details = () => {
//   const navigate = useNavigate();
//   const [memberData, setMemberData] = useState([]);

//   // Function to fetch data from the API endpoint
//   const fetchDatas = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/get-addmember");
//       setMemberData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch the data once when the component mounts
//   useEffect(() => {
//     fetchDatas();
//   }, []);

//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
//       <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-white mb-6">
//           Voter Details
//         </h1>
//         Display the member data if available
//         {memberData && memberData.length > 0 ? (
//           <div className="mb-6 text-white">
//             <p>
//               <strong>Name</strong> - {memberData[0].member_name}
//             </p>
//             <p>
//               <strong>NIC</strong> - {memberData[0].nic}
//             </p>
//             <p>
//               <strong>District</strong> - {memberData[0].distric}
//             </p>
//           </div>
//         ) : (
//           <p className="mb-6 text-white">No member data found.</p>
//         )}
//         {/* The form can be used for additional actions or editing if needed */}
//         <form className="flex flex-col gap-5">
//           <input
//             type="text"
//             value={memberData[0].member_name}
//             readOnly
//             placeholder="Name"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />
//           <input
//             type="text"
//             value={""}
//             readOnly
//             placeholder="NIC"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />
//           <input
//             type="text"
//             value={""}
//             readOnly
//             placeholder="District"
//             className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
//           >
//             NEXT
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Details;

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/get-addmember");
        setMemberData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Voter Details
        </h1>
        {/* Only the form will be shown with placeholders */}
        <form className="flex flex-col gap-5">
          <input
            type="text"
            value={memberData?.[0]?.member_name || ""}
            readOnly
            placeholder="Name"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />
          <input
            type="text"
            value={memberData?.[0]?.nic || ""}
            readOnly
            placeholder="NIC"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />
          <input
            type="text"
            value={memberData?.[0]?.distric || ""}
            readOnly
            placeholder="District"
            className="w-full py-3 px-4 rounded-lg bg-gray-300 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 focus:outline-none"
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
