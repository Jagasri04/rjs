// import "./Sidebar.css";
// import { FaThLarge, FaComments } from "react-icons/fa";

// type SidebarProps = {
//   activePage: "dashboard" | "tasks";
//   setActivePage: (page: "dashboard" | "tasks") => void;
// };

// function Sidebar({ activePage, setActivePage }: SidebarProps) {
//   return (
//     <div className="sidebar">
//       <h4 className="sidebar-title">TASKS</h4>

//       <ul className="sidebar-menu">
//         <li
//           className={activePage === "dashboard" ? "active" : ""}
//           onClick={() => setActivePage("dashboard")}
//         >
//           <FaThLarge /> Dashboard
//         </li>

//         <li
//           className={activePage === "tasks" ? "active" : ""}
//           onClick={() => setActivePage("tasks")}
//         >
//           <FaComments /> Tasks List
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;


import "./Sidebar.css";
import { FaThLarge, FaComments, FaHome } from "react-icons/fa";

type SidebarProps = {
  activePage: "home" | "dashboard" | "tasks";
  setActivePage: (page: "home" | "dashboard" | "tasks") => void;
};

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">TASKS</h4>

      <ul className="sidebar-menu">
        <li
          className={activePage === "home" ? "active" : ""}
          onClick={() => setActivePage("home")}
        >
          <FaHome /> Home
        </li>

        <li
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <FaThLarge /> Dashboard
        </li>

        <li
          className={activePage === "tasks" ? "active" : ""}
          onClick={() => setActivePage("tasks")}
        >
          <FaComments /> Tasks List
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
