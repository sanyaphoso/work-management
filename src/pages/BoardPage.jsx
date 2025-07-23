// /pages/BoardPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button, Table, Tag, Input, Collapse, message } from "antd";
import { supabase } from "../lib/supabase";
import { PlusOutlined } from "@ant-design/icons";
import BoardGroup from "../components/BoardGroup";

const { Title } = Typography;

export default function BoardPage() {
  const { id } = useParams(); // เพิ่มบรรทัดนี้
  const [boardName, setBoardName] = useState(""); // state สำหรับชื่อ board
  const [groups, setGroups] = useState([]);

  // const [groups, setGroups] = useState([
  //   {
  //     id: 1,
  //     name: "To Do",
  //     items: [
  //       {
  //         id: 1,
  //         name: "Design homepage",
  //         person: "John",
  //         status: "Working on it",
  //         date: "2025-07-15",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "In Progress",
  //     items: [],
  //   },
  // ]);

  // ✅ โหลดข้อมูลชื่อ board
  useEffect(() => {
    const fetchBoard = async () => {
      const { data, error } = await supabase
        .from("boards")
        .select("name")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching board:", error);
      } else {
        setBoardName(data.name);
      }
    };

    if (id) fetchBoard();
  }, [id]);

  // ✅ โหลดข้อมูล groups ของ board นี้
  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     const { data, error } = await supabase
  //       .from("groups")
  //       .select("*")
  //       .eq("board_id", id)
  //       .order("created_at", { ascending: true });

  //     if (error) {
  //       message.error("Error loading groups");
  //       console.error(error);
  //     } else {
  //       setGroups(data);
  //     }
  //   };

  //   if (id) fetchGroups();
  // }, [id]);

  useEffect(() => {
    const fetchBoardData = async () => {
      // 👉 ดึงชื่อ board
      const { data: boardData, error: boardError } = await supabase
        .from("boards")
        .select("name")
        .eq("id", id)
        .single();

      if (boardError) return console.error(boardError);
      setBoardName(boardData.name);

      // 👉 ดึง groups พร้อม items ภายในกลุ่มนั้น
      const { data: groupData, error: groupError } = await supabase
        .from("groups")
        .select("id, title, items(*)") // ต้องเปิด foreign key จาก groups → items
        .eq("board_id", id)
        .order("order");

      if (groupError) {
        console.error("Error fetching groups:", groupError);
      } else {
        setGroups(groupData);
      }
    };

    if (id) fetchBoardData();
  }, [id]);


  return (
    <div className="p-6">
      {/* ✅ Header แสดงชื่อ Board */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">{boardName}</h1>
      </div>
      {/* ✅ Groups */}
      {/* <BoardGroup groupName="Marketing Tasks" />
      <BoardGroup groupName="Development Backlog" /> */}

      {/* ✅ แสดง groups จากฐานข้อมูล */}
      {/* {groups.map((group) => (
        <BoardGroup key={group.id} groupName={group.title} />
      ))} */}
      {groups.map((group) => (
        <BoardGroup key={group.id} groupName={group.title} items={group.items || []} />
      ))}
    </div>
  );
}
