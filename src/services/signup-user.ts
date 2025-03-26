export async function signupUser(userData: any) {
  const response = await fetch("https://datacliqq.ditcosoft.com/apis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Security-Key":
        "d73be1ccc41a54d6932909c094a0ccc9 | eyJyNzMyZTEzNGMyMTg5NTEiiOjE1ODAzODQyNTA3MDN9",
    },
    body: JSON.stringify({
      requestType: "REGT",
      userMail: userData.email,
      userPassword: userData.password,
      userFullname: `${userData.firstName} ${userData.lastName}`,
      userPhone: userData.phone,
      agentCode: "TBC",
      userAgent: navigator.userAgent,
    }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
}
