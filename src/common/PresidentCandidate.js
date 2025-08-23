const backendDomain = "http://localhost:8000";

const managePreCandidateApi = {
  managePreCandidateReg: {
    url: `${backendDomain}/api/addcandidate`,
    method: "post",
  },
};

export default managePreCandidateApi;
