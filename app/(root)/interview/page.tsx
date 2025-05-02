import agent from "@/components/agent";
import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <>
          <h3>Interview Generation</h3>

          <agent userName={user?.name!} userId={user?.id} type="generate" />
    </>
  );
};

export default Page;