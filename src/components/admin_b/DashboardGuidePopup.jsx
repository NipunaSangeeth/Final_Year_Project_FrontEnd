// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const DashboardGuidePopup = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     // ⏱️ Show popup automatically after 5 seconds
//     const timer = setTimeout(() => setShowPopup(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => {
//     if (isChecked) setShowPopup(false);
//   };

//   return (
//     <AnimatePresence>
//       {showPopup && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white/10 border border-white/20 rounded-2xl p-28 text-white max-w-6xl mx-4 shadow-2xl backdrop-blur-md"


//           >
//             <h2 className="text-6xl font-bold mb-6 text-center text-amber-400">
//               👋 Welcome, Admin!
//             </h2>

//             <div className="space-y-5 text-base leading-relaxed">
//               <p className="text-center text-4xl font-semibold text-amber-300">
//                 ✨ Welcome to{" "}
//                 <span className="text-amber-400">Administration B</span>
//               </p>

//               <ul className="list-disc list-inside space-y-3 text-white/90 text-3xl">
//                 <li>
//                   Here you can <strong>create new elections</strong> for the
//                   system.
//                 </li>
//                 <li>
//                   Add and manage <strong>candidates</strong> participating in
//                   each election.
//                 </li>
//                 <li>
//                   Watch <strong>real-time live election results</strong> as
//                   votes are submitted.
//                 </li>
//                 <li>
//                   View <strong>past election summaries</strong> and
//                   historical voting records.
//                 </li>
//                 <li>
//                   Review complete{" "}
//                   <strong>candidate details & profiles</strong> at any time.
//                 </li>
//               </ul>
//             </div>

//             {/* Checkbox + Continue Button */}
//             <div className="mt-6 text-center">
//               <label className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={() => setIsChecked(!isChecked)}
//                   className="w-4 h-4 accent-amber-500 cursor-pointer"
//                 />
//                 <span>I’ve read and understood these guidelines.</span>
//               </label>

//               <motion.button
//                 whileHover={{ scale: isChecked ? 1.05 : 1 }}
//                 whileTap={{ scale: isChecked ? 0.95 : 1 }}
//                 disabled={!isChecked}
//                 onClick={handleClose}
//                 className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all ${
//                   isChecked
//                     ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Got it →
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DashboardGuidePopup;

// ///Would you like the popup to remember “Got it” in localStorage (so it doesn’t appear again next time the admin revisits)?
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { adminGuideSteps } from "../../assets/adminGuideSteps";


// const DashboardGuidePopup = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowPopup(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => {
//     if (isChecked) setShowPopup(false);
//   };

//   return (
//     <AnimatePresence>
//       {showPopup && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.85, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.85, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white/10 border border-white/20 rounded-2xl p-16 text-white max-w-6xl mx-4 shadow-2xl backdrop-blur-md overflow-y-auto max-h-[90vh]"
//           >
//             {/* Main Title */}
//             <h2 className="text-5xl font-bold mb-6 text-center text-amber-400">
//               👋 Welcome, Admin!
//             </h2>

//             {/* Subtitle */}
//             <p className="text-center text-3xl font-semibold text-amber-300 mb-12">
//               ✨ Welcome to <span className="text-amber-400">Administration B</span>
//             </p>

//             {/* Steps */}
//             <div className="space-y-14">
//               {adminGuideSteps.map((step, index) => (
//                 <div key={index} className="space-y-6">
                  
//                   {/* Step Title */}
//                   <h3 className="text-3xl font-semibold flex items-center gap-3">
//                     <span className="text-amber-400 text-4xl">•</span>
//                     {step.title}
//                   </h3>

//                   {/* Images */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {step.images.map((img, idx) => (
//                       <motion.img
//                         key={idx}
//                         src={img}
//                         alt="Guide Illustration"
//                         whileHover={{ scale: 1.03 }}
//                         className="w-full rounded-xl shadow-xl border border-white/10 object-cover"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Checkbox + Continue Button */}
//             <div className="mt-12 text-center">
//               <label className="flex items-center justify-center gap-3 text-gray-200 text-lg mb-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={() => setIsChecked(!isChecked)}
//                   className="w-5 h-5 accent-amber-500 cursor-pointer"
//                 />
//                 <span>I’ve read and understood these guidelines.</span>
//               </label>

//               <motion.button
//                 whileHover={{ scale: isChecked ? 1.05 : 1 }}
//                 whileTap={{ scale: isChecked ? 0.95 : 1 }}
//                 disabled={!isChecked}
//                 onClick={handleClose}
//                 className={`px-10 py-4 rounded-lg font-bold text-white text-xl shadow-lg transition-all ${
//                   isChecked
//                     ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
//                     : "bg-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 Got it →
//               </motion.button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DashboardGuidePopup;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { adminGuideSteps } from "../../assets/adminGuideSteps";


const DashboardGuidePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (isChecked) setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white/10 border border-white/20 rounded-2xl p-10 text-white max-w-5xl w-full mx-6 shadow-2xl backdrop-blur-xl overflow-y-auto max-h-[90vh]"
                    //  "bg-white/10 border border-white/20 rounded-2xl p-16 text-white max-w-6xl mx-4 shadow-2xl backdrop-blur-md overflow-y-auto max-h-[90vh]"
          >
            {/* Title */}
            <h2 className="text-5xl font-bold mb-4 text-center text-amber-400">
              👋 Welcome, Admin!
            </h2>

            <p className="text-center text-3xl font-semibold text-amber-300 mb-8">
              ✨ Welcome to <span className="text-amber-400">Administration B</span>
            </p>

            {/* Steps */}
            <div className="space-y-10">
              {adminGuideSteps.map((step, index) => (
                <div key={index}>
                  <p className="text-2xl font-semibold text-white/90 mb-4">
                    {step.title}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {step.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-full max-h-96 bg-white/5 rounded-xl overflow-hidden border border-white/20 flex items-center justify-center"
                      >
                        <img
                          src={img}
                          alt={`step-${index}-${i}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Checkbox + Button */}
            <div className="mt-10 text-center">
              <label className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
                <span>I’ve read and understood these guidelines.</span>
              </label>

              <motion.button
                whileHover={{ scale: isChecked ? 1.05 : 1 }}
                whileTap={{ scale: isChecked ? 0.95 : 1 }}
                disabled={!isChecked}
                onClick={handleClose}
                className={`px-8 py-3 rounded-lg font-bold text-white shadow-md text-lg transition-all ${
                  isChecked
                    ? "bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:shadow-amber-500/40"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                Got it →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardGuidePopup;

