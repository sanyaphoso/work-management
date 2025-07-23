import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button, Tabs, Modal, Input, Form, message } from "antd";
import { supabase } from "../lib/supabase";

const { Title, Text } = Typography;

export default function WorkspacePage() {
  const { id } = useParams(); // workspace id
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchWorkspace = async () => {
      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setWorkspace(data);
      } else {
        console.error(error.message);
      }
    };

    fetchWorkspace();
  }, [id]);

  const handleCreateBoard = () => {
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleSubmitBoard = async () => {
    try {
      const values = await form.validateFields();

      // 👉 1. Create board
      const { data: board, error: boardError } = await supabase
        .from("boards")
        .insert([
          {
            name: values.name,
            workspace_id: id,
          },
        ])
        .select()
        .single();

      if (boardError) throw boardError;

      const boardId = board.id;

       // 👉 2. Create default columns
      const { data: columns, error: columnsError } = await supabase
        .from("columns")
        .insert([
          { board_id: boardId, title: "Item", data_type: "text", order: 1 },
          { board_id: boardId, title: "Person", data_type: "person", order: 2 },
          { board_id: boardId, title: "Status", data_type: "status", order: 3 },
          { board_id: boardId, title: "Date", data_type: "date", order: 4 },
        ])
        .select();

      if (columnsError) throw columnsError;

      // 👉 2. Create default groups
      const defaultGroups = [
        {
          board_id: board.id,
          title: "Group 1",
          order: 1,
        },
        {
          board_id: board.id,
          title: "Group 2",
          order: 2,
        },
      ];

      // const { error: groupError } = await supabase
      //   .from("groups")
      //   .insert(defaultGroups);
      const { data: createdGroups, error: groupError } = await supabase
        .from("groups")
        .insert(defaultGroups)
        .select();

      if (groupError) throw groupError;

      // 👉 4. Sample items
      const sampleItems = [
        { title: "Item 1", person: true, status: "Working on it", date: "Jul 13" },
        { title: "Item 2", person: true, status: "Done", date: "Jul 14" },
        { title: "Item 3", person: true, status: "Default", date: "Jul 16" },
      ];

      // 👉 5. For each group, create items & item_values
      for (const group of createdGroups) {
        for (const item of sampleItems) {
          // Create item
          const { data: createdItem, error: itemError } = await supabase
            .from("items")
            .insert([
              {
                title: item.title,
                group_id: group.id,
                board_id: boardId,
              },
            ])
            .select()
            .single();

          if (itemError) throw itemError;

          // Insert item_values
          const itemValues = columns.map((column) => {
            let value = "";

            switch (column.title.toLowerCase()) {
              case "item":
                value = item.title;
                break;
              case "person":
                value = item.person ? "Assigned" : "Unassigned";
                break;
              case "status":
                value = item.status;
                break;
              case "date":
                value = item.date;
                break;
              default:
                value = "";
            }

            return {
              item_id: createdItem.id,
              column_id: column.id,
              value,
            };
          });

          const { error: valueError } = await supabase
            .from("item_values")
            .insert(itemValues);

          if (valueError) throw valueError;
        }
      }

      // ✅ Success
      message.success("Board created with default groups, columns, and items");
      setIsModalOpen(false);
      navigate(`/board/${boardId}`);

      // const { data, error } = await supabase
      //   .from("boards")
      //   .insert([
      //     {
      //       name: values.name,
      //       workspace_id: id,
      //     },
      //   ])
      //   .select()
      //   .single();

      // if (error) throw error;

      // message.success("Board created");
      // setIsModalOpen(false);
      // navigate(`/board/${data.id}`);
    } catch (err) {
      console.error(err);
      message.error(err.message || "Something went wrong");
    }
  };

  if (!workspace) {
    return <div className="p-8">Loading workspace...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover image */}
      <div className="h-40 bg-green-500 relative">
        <Button className="absolute right-4 top-4" type="primary">
          Change cover
        </Button>
      </div>

      {/* Header */}
      <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-20 h-20 bg-yellow-400 rounded-xl text-white flex items-center justify-center text-3xl font-bold shadow">
          {workspace.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <Title level={3} className="mb-0">{workspace.name}</Title>
          <Text type="secondary">Add workspace description</Text>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button>Invite / 1</Button>
          <Button>...</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8">
        <Tabs
          defaultActiveKey="recents"
          items={[
            {
              key: "recents",
              label: "Recents",
              // children: <RecentTab onCreate={handleCreateBoard} />,
              children: (
                <RecentTab
                  onCreate={handleCreateBoard}
                  workspaceId={workspace.id} // ✅ เพิ่มตรงนี้
                />
              ),
            },
            {
              key: "permissions",
              label: "Permissions",
              children: <Text type="secondary">Permission settings</Text>,
            },
          ]}
        />
      </div>

      {/* Modal */}
      <Modal
        title="Create new board"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmitBoard}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Board name"
            name="name"
            rules={[{ required: true, message: "Please enter a board name" }]}
          >
            <Input placeholder="Enter board name" />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}

// 👉 Recents tab content
function RecentTab({ onCreate, workspaceId }) {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching boards:", error);
      } else {
        setBoards(data);
      }
    };

    if (workspaceId) {
      fetchBoards();
    }
  }, [workspaceId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
      {/* Add new board */}
      <div
        className="border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow cursor-pointer"
        onClick={onCreate}
      >
        <div className="text-3xl mb-2">➕</div>
        <Text>Add new board</Text>
      </div>

      {/* List of existing boards */}
      {boards.map((board) => (
        <div
          key={board.id}
          className="border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow cursor-pointer"
          onClick={() => navigate(`/board/${board.id}`)}
        >
          <Text className="text-lg font-semibold">{board.name}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            Created: {new Date(board.created_at).toLocaleDateString()}
          </Text>
        </div>
      ))}
      
    </div>
  );
}

async function createGroupWithItems(groupName, boardId) {
  // 1. สร้าง group
  const { data: group, error: groupError } = await supabase
    .from("groups")
    .insert([{ name: groupName, board_id: boardId }])
    .select()
    .single();

  if (groupError) throw groupError;

  // 2. ดึง columns ของ board นั้น
  const { data: columns, error: columnsError } = await supabase
    .from("columns")
    .select("*")
    .eq("board_id", boardId);

  if (columnsError) throw columnsError;

  const sampleItems = [
    {
      title: "Item 1",
      person: true,
      status: "Working on it",
      date: "Jul 13",
    },
    {
      title: "Item 3",
      person: true,
      status: "Default",
      date: "Jul 16",
    },
    {
      title: "Item 2",
      person: true,
      status: "Done",
      date: "Jul 13",
    },
  ];

  // 3. สำหรับแต่ละ item
  for (const item of sampleItems) {
    // 3.1 สร้าง item
    const { data: createdItem, error: itemError } = await supabase
      .from("items")
      .insert([
        {
          title: item.title,
          group_id: group.id,
          board_id: boardId,
        },
      ])
      .select()
      .single();

    if (itemError) throw itemError;

    // 3.2 เพิ่ม item_values สำหรับทุก column
    for (const column of columns) {
      let value = "";

      switch (column.title.toLowerCase()) {
        case "item":
          value = item.title;
          break;
        case "person":
          value = item.person ? "Assigned" : "Unassigned";
          break;
        case "status":
          value = item.status;
          break;
        case "date":
          value = item.date;
          break;
        default:
          value = "";
      }

      await supabase.from("item_values").insert([
        {
          item_id: createdItem.id,
          column_id: column.id,
          value: value,
        },
      ]);
    }
  }

  return group;
}


