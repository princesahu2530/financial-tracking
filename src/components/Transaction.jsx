import React, { useRef, useState } from "react";
import { Input, Table, Select, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import search from "../assets/search.svg";
import { parse } from "papaparse";
import { toast } from "react-toastify";

const { Option } = Select;

const Transaction = ({
  transactions,
  exportToCsv,
  addTransaction,
  fetchTransactions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInput = useRef();

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = searchTerm
      ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
    const typeMatch = typeFilter ? transaction.type === typeFilter : true;

    return searchMatch && tagMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8 lg:py-8">
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 w-full md:w-auto bg-gray-100 border border-gray-300 p-3 rounded-lg">
            <img src={search} width="16" alt="Search icon" />
            <Input
              placeholder="Search by Name"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none bg-transparent w-full md:w-auto"
            />
          </div>
          <Select
            className="w-full md:w-52 border-gray-300"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter by Type"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-bold">My Transactions</h2>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <Radio.Group
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
              className="flex items-center"
            >
              <Radio.Button value="" className="mr-2">No Sort</Radio.Button>
              <Radio.Button value="date" className="mr-2">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>

            <div className="flex gap-4 ">
              <button
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={exportToCsv}
              >
                Export to CSV
              </button>
              <label
                htmlFor="file-csv"
                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
              >
                Import from CSV
              </label>
              <input
                onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                className="hidden"
              />
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          className="overflow-hidden rounded-lg"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "100%" }} // Ensure the table is scrollable on small screens
        />
      </div>
    </div>
  );
};

export default Transaction;
