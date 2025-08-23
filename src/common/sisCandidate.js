const backendDomain = "http://localhost:8000";

const manageSisCandidateApi = {
  manageSisCandidateReg: {
    url: `${backendDomain}/api/addcandidate-sis-elec`,
    method: "post",
  },
};

export default manageSisCandidateApi;
