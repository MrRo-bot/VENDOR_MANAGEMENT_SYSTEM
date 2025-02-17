/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const fetchData = async () => {
    try {
      let arr = [];
      setLoading(true);

      let vendorsRef = collection(db, "vendors");
      let q = query(vendorsRef, orderBy("Vendor Name"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ key: doc.id, ...doc.data() });
      });

      setPosts(arr);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  const handleEdit = (record) => {
    navigate(`/update/${record.key}`);
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
    setDeleteConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "vendors", deleteRecord.key));
      setDeleteConfirmVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteRecord(null);
    setDeleteConfirmVisible(false);
  };

  const columns = [
    {
      title: <span className="text-lg font-bold">Vendor Name</span>,
      render: (value) => {
        return (
          <span className="font-semibold text-sky-600">
            {value["Vendor Name"]}
          </span>
        );
      },
    },
    {
      title: <span className="text-lg font-bold">Bank Account</span>,
      render: (value) => {
        return (
          <span className="font-semibold text-cyan-600">
            {value["Bank Account"]}
          </span>
        );
      },
    },
    {
      title: <span className="text-lg font-bold">Bank Name</span>,
      render: (value) => {
        return (
          <span className="font-semibold text-sky-600">
            {value["Bank Name"]}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      className: "!text-lg !font-bold !text-center",
      render: (_, record) => (
        <div className="flex justify-center">
          <Button
            className="mr-2"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="bg-gray-100 h-[92vh]">
        <div className="container flex flex-col h-full p-2 mx-auto sm:p-4">
          <div className="flex my-6 justify-between w-[65%] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-center text-gray-600"
            >
              Vendor List
            </motion.h1>
            <div className="w-48 ml-auto">
              <Link to="/add">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  block
                  className=" hover:bg-blue-700"
                >
                  Add New Vendor
                </Button>
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="overflow-x-auto w-[65%] mx-auto rounded-lg shadow-lg table-container"
          >
            <Table
              dataSource={posts}
              columns={columns}
              loading={loading}
              pagination={{
                pageSize: 8,
              }}
              bordered
              className="mx-auto rounded-lg"
            />
          </motion.div>
        </div>
      </section>
      <Modal
        title="Confirm Delete"
        open={deleteConfirmVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this vendor?</p>
      </Modal>
    </>
  );
};

export default View;
