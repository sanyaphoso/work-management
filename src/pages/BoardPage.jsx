// /pages/BoardPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button, Table, Tag } from "antd";
import { supabase } from "../lib/supabase";

const { Title } = Typography;

export default function BoardPage() {
  const { id } = useParams(); // board id
  const [board, setBoard] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchBoard = async () => {
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setBoard(data);
    };

    const fetchItems = async () => {
      const { data } = await supabase
        .from("items")
        .select("*")
        .eq("board_id", id);

      setItems(data);
    };

    fetchBoard();
    fetchItems();
  }, [id]);

  const columns = [
    { title: "Item", dataIndex: "title", key: "title" },
    { title: "Person", dataIndex: "person_id", key: "person_id" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Done" ? "green" : status === "Working on it" ? "orange" : "gray";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div className="p-6">
      <Title level={3}>{board?.name || "Board"}</Title>

      <div className="flex justify-between items-center my-4">
        <Button type="primary">➕ New item</Button>
        <Button>+ Add new group</Button>
      </div>

      <Table
        columns={columns}
        dataSource={items}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
}
