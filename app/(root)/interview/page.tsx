import Agent from "@/components/agent";
import React from "react";

const Page = () => {
  return (
    <>
          <h3>Interview Generation</h3>

          <Agent userName="John Doe" userId="user1" type="generate" />
    </>
  );
};

export default Page;