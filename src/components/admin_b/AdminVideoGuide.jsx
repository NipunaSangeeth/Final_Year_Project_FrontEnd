// AdminVideoGuide.jsx
import React, { useState } from "react";

// Example timeline – you can edit anytime
const videoTimeline = [
  { start: "00:00:00", end: "00:02:30", desc: "Explain Create Elections" },
  { start: "00:02:30", end: "00:05:00", desc: "Explain Add Candidates Elections" },
  { start: "00:05:00", end: "00:07:45", desc: "Explain Voting Process" },
  { start: "00:07:45", end: "00:10:00", desc: "Explain Results & Dashboard" },
];

const AdminVideoGuide = ({ isAdmin = true }) => {
  const [showModal, setShowModal] = useState(false);

  // Load URL from .env
  const videoUrl = process.env.REACT_APP_DRIVE_LINK_ADMINGUIDE;

  if (!isAdmin) return null; // Render only for admin

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 text-white hover:text-blue-200 text-2xl rounded-lg border border-white/30 bg-black/50"
      >
        More Details About the System
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="relative w-[90%] max-w-4xl bg-white/20 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 p-6">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400"
            >
              &times;
            </button>

            {/* Video Iframe */}
            <div className="w-full h-[60vh] mb-6">
              <iframe
                src={videoUrl}
                width="100%"
                height="100%"
                allow="autoplay"
                allowFullScreen
                className="rounded-xl shadow-lg"
                title="Admin Video Guide"
              />
            </div>

            {/* Timeline */}
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-4 max-h-60 overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-3">Video Timeline</h3>

              <ul className="space-y-2 text-white">
                {videoTimeline.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b border-white/20 pb-1">
                    <span>{item.start} - {item.end}</span>
                    <span>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AdminVideoGuide;

// // AdminVideoGuide.jsx
// import React, { useState } from "react";

// // Example video timeline
// const videoTimeline = [
//   { start: "00:00:00", end: "00:02:30", desc: "Explain Create Elections" },
//   {
//     start: "00:02:30",
//     end: "00:05:00",
//     desc: "Explain Add Candidates Elections",
//   },
//   { start: "00:05:00", end: "00:07:45", desc: "Explain Voting Process" },
//   { start: "00:07:45", end: "00:10:00", desc: "Explain Results & Dashboard" },
// ];

// const AdminVideoGuide = ({ isAdmin = true }) => {
//   const [showModal, setShowModal] = useState(false);

//   if (!isAdmin) return null; // Only visible to admin users

//   return (
//     <>
//       {/* Button to open modal */}
//       <button
//         onClick={() => setShowModal(true)}
//         className="px-6 py-3 text-white hover:text-blue-200 text-2xl rounded-lg border border-white/30 bg-black/50"
//       >
//         More Details About the System
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
//           {/* Modal container */}
//           <div className="relative w-[90%] max-w-4xl bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 p-6">
//             {/* Close button */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute -top-3 -right-1 text-white text-5xl font-bold hover:text-red-400"
//             >
//               &times;
//             </button>

//             {/* Video */}
//             <div className="w-full h-[60vh] mb-6">
//               <iframe
//                 src="https://drive.google.com/file/d/1MzP3Y-yBQoAgGMMcBBbGJvLyMmM9W5xG/preview"
//                 width="100%"
//                 height="100%"
//                 allow="autoplay"
//                 allowFullScreen
//                 className="rounded-lg shadow-lg"
//                 title="Admin Video Guide"
//               />
//             </div>

//             {/* Timeline */}
//             <div className="bg-white/30 backdrop-blur-md rounded-lg p-4 max-h-60 overflow-y-auto">
//               <h3 className="text-xl font-semibold text-white mb-3">
//                 Video Timeline
//               </h3>
//               <ul className="space-y-2 text-white">
//                 {videoTimeline.map((item, idx) => (
//                   <li
//                     key={idx}
//                     className="flex justify-between border-b border-white/20 pb-1"
//                   >
//                     <span>
//                       {item.start} - {item.end}
//                     </span>
//                     <span>{item.desc}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminVideoGuide;
