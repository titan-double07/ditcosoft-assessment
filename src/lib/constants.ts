import md5 from "md5";

  export const agentCode = "TBC";
  const staticToken = "eyJyNzMyZTEzNGMyMTg5NTEiiOjE1ODAzODQyNTA3MDN9";

  // Generate the Security-Key
  export const securityKey = `${md5(agentCode)} | ${staticToken}`;