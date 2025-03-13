import Profile from "@/components/layouts/Profile";
import Loading from "@/components/Loading";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Loading>
      <Profile>{children}</Profile>
    </Loading>
  );
};

export default layout;
