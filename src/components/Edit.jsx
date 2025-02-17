/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const UpdateVendorForm = () => {
  const [vendor, setVendor] = useState(null);
  const navigate = useNavigate();
  const key = useParams();
  const vendorId = key.id;

  useEffect(() => {
    fetchVendor();
  }, [vendorId]);

  let vendorsRef = collection(db, "vendors");
  const vendorData = doc(vendorsRef, vendorId);

  const fetchVendor = async () => {
    try {
      const response = await getDoc(vendorData);
      const data = response.data();
      setVendor(data);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      await updateDoc(vendorData, values);
      message.success("Vendor Edited successfully", () => {
        navigate(`/`);
      });
    } catch (error) {
      console.error("Error updating vendor:", error);
      message.error("Failed to update details", () => {
        navigate(`/`);
      });
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex items-center justify-center h-[92vh]"
    >
      {vendor && (
        <Form
          {...formItemLayout}
          name="updateVendorForm"
          onFinish={onFinish}
          initialValues={vendor}
          scrollToFirstError
          className="w-full max-w-3xl px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Update Vendor
          </h2>
          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Vendor Name"
            label="Vendor Name"
            rules={[
              {
                required: true,
                message: "Please input your Vendor Name!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter vendor name"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Bank Account"
            label="Bank Account"
            rules={[
              {
                required: true,
                message: "Please input your Bank Account No!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter bank account number"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Bank Name"
            label="Bank Name"
            rules={[
              {
                required: true,
                message: "Please input your Bank Name!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter bank name"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Address Line 1"
            label="Address Line 1"
            rules={[
              {
                required: true,
                message: "Please input your Address Line 1!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter address line 1"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Address Line 2"
            label="Address Line 2"
            rules={[
              {
                message: "Please input your Address Line 2!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter address line 2"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="City"
            label="City"
            rules={[
              {
                message: "Please input your City!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter city"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Country"
            label="Country"
            rules={[
              {
                message: "Please input your Country!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter country"
            />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bolder", color: "rebeccapurple" }}
            name="Zip"
            label="Zip"
            rules={[
              {
                message: "Please input your Zip Code!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter zip code"
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-32 px-6 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
              >
                Update
              </Button>
              <Button
                onClick={() => navigate("/")}
                type="primary"
                htmlType="back"
                className="w-32 px-6 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
              >
                Back
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </motion.div>
  );
};

export default UpdateVendorForm;
