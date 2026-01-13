// import Sidebar from "./components/Sidebar";

// type LayoutProps = {
//   children: React.ReactNode;
//   activePage: "dashboard" | "tasks";
//   setActivePage: (page: "dashboard" | "tasks") => void;
// };

// function Layout({ children, activePage, setActivePage }: LayoutProps) {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//       />

//       <div style={{ marginLeft: "250px", width: "100%", padding: "20px" }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Layout;


import Sidebar from "./components/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
  activePage: "home" | "dashboard" | "tasks";
  setActivePage: (page: "home" | "dashboard" | "tasks") => void;
};

function Layout({ children, activePage, setActivePage }: LayoutProps) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ marginLeft: "250px", width: "100%", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
