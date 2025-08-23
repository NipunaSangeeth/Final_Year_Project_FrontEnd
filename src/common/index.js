const backendDomain = "http://localhost:8000";

const SummaryApi = {
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
};
export default SummaryApi;
