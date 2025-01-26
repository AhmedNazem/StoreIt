import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      SideBar
      <section className="flex h-full flex-1 flex-col">
        Mobile navigation Header
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
