import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Button,
  Spin,
  Typography,
  Card,
  Modal,
  Input,
  Radio,
  Form,
} from "antd";

const { Title, Text } = Typography;

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [recentItems, setRecentItems] = useState([]); // fake data for now
  const [workspaces, setWorkspaces] = useState([]); // fake data for now

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigate("/"); // 🔒 redirect if not logged in
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };
    getSession();
    // Fake recent & workspace data
    setRecentItems([
      { id: 1, name: "Task A", date: "2025-06-17" },
      { id: 2, name: "Task B", date: "2025-06-16" },
    ]);
    // setWorkspaces([
    //   { id: "w1", name: "Team Alpha", members: 5 },
    //   { id: "w2", name: "Team Beta", members: 3 },
    // ]);
  }, []);

  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  const handleCreate = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const fetchWorkspaces = async () => {
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("owner_id", user?.id);

    if (error) {
      console.error("Error fetching workspaces:", error.message);
    } else {
      setWorkspaces(data);
    }
  };

  const handleAddWorkspace = async () => {
    try {
      const values = await form.validateFields();
      const { name, privacy } = values;

      const { data, error } = await supabase.from("workspaces").insert([
        {
          name,
          privacy,
          owner_id: user.id,
        },
      ]).select().single();

      if (error) throw error;

      // fetchWorkspaces();
      setIsModalOpen(false);
      // 👉 ไปยังหน้า workspace โดยใช้ id ที่ได้
      navigate(`/workspace/${data.id}`);
    } catch (err) {
      console.error("❌ Create failed:", err.message);
    }
  };

  // const handleAddWorkspace = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     const { name, privacy } = values;

  //     // insert
  //     const { error: insertError } = await supabase.from("workspaces").insert([
  //       {
  //         name,
  //         privacy,
  //         owner_id: user.id,
  //       },
  //     ]);

  //     if (insertError) throw insertError;

  //     // fetch latest workspace ของ user
  //     const { data, error: fetchError } = await supabase
  //       .from("workspaces")
  //       .select("*")
  //       .eq("owner_id", user.id)
  //       .order("created_at", { ascending: false })
  //       .limit(1)
  //       .maybeSingle();

  //     if (fetchError) throw fetchError;
  //     if (!data) throw new Error("Workspace not found after insert");

  //     setIsModalOpen(false);
  //     navigate(`/workspace/${data.id}`);
  //   } catch (err) {
  //     console.error("❌ Create failed:", err.message);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin tip="Loading user..." size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-5 ">
      <Title level={2}>Home</Title>

      {/* Products */}
      <section className="mt-8">
        <Title level={4}>Products</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <Card title="Work Management" bordered hoverable>
            <Text>Manage projects, tasks, teams all in one place.</Text>
            <div className="mt-4 text-right">
              <Button type="primary" onClick={handleCreate}>
                Create +
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Recently Visited */}
      <section className="mt-12">
        <Title level={4}>Recently Visited</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {recentItems.map((item) => (
            <Card key={item.id} hoverable>
              <Title level={5}>{item.name}</Title>
              <Text type="secondary">Last opened: {item.date}</Text>
            </Card>
          ))}
          {recentItems.length === 0 && (
            <Text type="secondary">No recent activity</Text>
          )}
        </div>
      </section>

      {/* My Workspaces */}
      <section className="mt-12">
        <Title level={4}>My Workspaces</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {workspaces.map((ws) => (
            <Card key={ws.id} title={ws.name} hoverable>
              <Text>{ws.members} members</Text>
              <div className="mt-4 text-right">
                <Button
                  type="default"
                  onClick={() => navigate(`/workspace/${ws.id}`)}
                >
                  View Workspace
                </Button>
              </div>
            </Card>
          ))}
          {workspaces.length === 0 && <Text>No workspaces yet</Text>}
        </div>
      </section>


      {/* Modal for Add Workspace */}
      <Modal
        title="Add new workspace"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddWorkspace}
        okText="Add workspace"
        cancelText="Cancel"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Workspace name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="New Workspace" />
          </Form.Item>

          <Form.Item label="Privacy" name="privacy" initialValue="open">
            <Radio.Group>
              <Radio value="open">Open</Radio>
              <Radio value="closed">Closed</Radio>
            </Radio.Group>
          </Form.Item>

          <p className="text-gray-500 text-sm">
            Every team member in the account can join
          </p>
        </Form>
      </Modal>
    </div>
  );
}
