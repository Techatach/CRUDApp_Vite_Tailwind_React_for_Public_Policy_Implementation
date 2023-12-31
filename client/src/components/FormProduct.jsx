import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { TablePagination } from "@mui/material";

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState([]);
  const currentPage = useRef();
  const [rows, setRowsChange] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("http://localhost:3000/api/product")
      // fetch(
      //   `http://localhost:3000/api/product?page=${currentPage.current}&limit=${limit}`
      // )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setRowsChange(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
    currentPage.current = 1;
    loadData();
    getPaginatedUsers();
  }, []);

  const loadData = async () => {
    return await axios
      .get("http://localhost:3000/api/product")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    return await axios
      .post("http://localhost:3000/api/product", form)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = async (id) => {
    console.log(id);
    return await axios
      .delete("http://localhost:3000/api/product/" + id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  function getPaginatedUsers() {
    fetch(
      `http://localhost:3000/api/product?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data);
      });
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
    return products.length;
  };

  return (
    <div>
      <div className="text-center p-8 font-bold text-xl text-gray-900 dark:text-white">
        การประเมินนโยบายสาธารณะ
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mx-96">
          <div className="mb-2">
            <label
              for="base-input"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              ยุทธศาสตร์ชาติ
            </label>

            <select
              type="text"
              onChange={(e) => handleChange(e)}
              name="strategy"
              aria-describedby="nameHelp"
              className="form-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              id="strategy"
            >
              <option selected className="text-blue">
                กรุณาเลือกตัวชี้วัด
              </option>
              <option>ดัชนีสันติภาพโลก</option>
              <option>ดัชนีความสุขโลก</option>
              <option>ดัชนีสิทธิมนุษยชนและหลักนิติธรรม</option>
              <option>ดัชนีสถาบัน</option>
              <option>ดัชนีเสถียรภาพทางการเมือง</option>
              <option>ดัชนีการมีสิทธิ์มีเสียงของประชาชนและภาระรับผิดชอบ</option>
              <option>ดัชนีความปลอดภัยจากภัยคุกคาม</option>
              <option>ดัชนีความสงบสุขภาคใต้</option>
              <option>
                ประสิทธิภาพของหน่วยงานด้านการข่าวและประชาคมข่าวกรอง
              </option>
              <option>ดัชนีความแข็งแกร่งทางกำลังทหาร</option>
              <option>ดัชนีรัฐเปราะบาง</option>
              <option>
                สถานการณ์บรรลุเป้าหมายของการพัฒนาที่ยั่งยืน (SDGs) เป้าหมายที่
                17
              </option>
              <option>
                ระดับประสิทธิภาพการดำเนินงานของหน่วยงานด้านการจัดการความมั่นคง
              </option>
            </select>
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              หน่วยงานที่นำนโยบายไปปฏิบัติ
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="implementation"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="หน่วยงานที่นำนโยบายไปปฏิบัติ"
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              อีเมล
            </label>
            <input
              type="email"
              onChange={(e) => handleChange(e)}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              โทรศัพท์
            </label>
            <input
              type="number"
              onChange={(e) => handleChange(e)}
              name="mobile"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="โทรศัพท์"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              งบประมาณ
            </label>
            <input
              type="number"
              onChange={(e) => handleChange(e)}
              name="budget"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="งบประมาณ"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              ปีงบประมาณ
            </label>
            <input
              type="number"
              onChange={(e) => handleChange(e)}
              name="year"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ปีงบประมาณ"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              ผลประเมิน
            </label>
            <input
              type="float"
              onChange={(e) => handleChange(e)}
              name="evaluation"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ผลประเมิน"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              จุดแข็ง
            </label>
            <textarea
              type="text"
              onChange={(e) => handleChange(e)}
              name="strength"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="จุดแข็ง"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              จุดอ่อน
            </label>
            <textarea
              type="text"
              onChange={(e) => handleChange(e)}
              name="weak"
              id="weak"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="จุดอ่อน"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              แนวทางเสริม (จุดแข็ง)
            </label>
            <textarea
              type="text"
              onChange={(e) => handleChange(e)}
              name="development"
              id="development"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="แนวทางเสริม (จุดแข็ง)"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              จุดที่ควรปรับปรุง (จุดอ่อน)
            </label>
            <textarea
              type="text"
              onChange={(e) => handleChange(e)}
              name="improvement"
              id="improvement"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="จุดที่ควรปรับปรุง (จุดอ่อน)"
            />
          </div>
          <div className="mb-2">
            <label
              for="suggestion"
              className="block mb-2 text-gray-900 dark:text-white"
            >
              ข้อเสนอแนะ
            </label>
            <textarea
              type="text"
              onChange={(e) => handleChange(e)}
              name="suggestion"
              id="suggestion"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="ข้อเสนอแนะ"
            />
          </div>
        </div>
        <div className="grid mx-96 mb-6 mt-6">
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              className="ml-2 text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <div className="d-flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
      >
        <input
          type="text"
          name="name"
          className="form-control mr-4"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          color="dark"
          className="btn btn-success rounded-3 bg-success text-white"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white"
              >
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                ลำดับ
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                ยุทธศาสตร์ชาติ
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                หน่วยงานที่นำนโยบายไปปฏิบัติ
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                email
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                mobile
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                งบประมาณ (ล้านบาท)
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                ปีงบประมาณ
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                ผลประเมิน
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                จุดแข็ง
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                จุดอ่อน
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                แนวทางเสริม (จุดแข็ง)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                จุดที่ควรปรับปรุง (จุดอ่อน)
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                ข้อเสนอแนะ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-gray-900 whitespace-nowrap dark:text-white"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data
                  .filter(
                    (data) =>
                      data.strategy.toLowerCase().includes(query) ||
                      data.implementation.toLowerCase().includes(query)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <button className="btn btn-primary mx-3">
                          <Link to={"/edit/" + item._id}>
                            <EditIcon />
                          </Link>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            window.confirm(
                              "คุณแน่ใจใช่ไหมว่าจะลบข้อมูลนี้ออกจากระบบ (Are you sure you want to delete your data?)"
                            ) && handleRemove(item._id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.strategy}
                      </th>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.implementation}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.mobile}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.budget}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.year}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.evaluation}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.strength}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.weak}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.development}
                      </td>

                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.improvement}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {item.suggestion}
                      </td>
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <Link
                          to={"/edit/" + item._id}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-4"
                        >
                          Edit
                        </Link>
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            window.confirm(
                              "คุณแน่ใจใช่ไหมว่าจะลบข้อมูลนี้ออกจากระบบ (Are you sure you want to delete your data?)"
                            ) && handleRemove(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-center mt-2">
        <TablePagination
          rowsPerPageOptions={[5, 20, 30, 50, { label: "All", value: 100 }]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={rows.length}
          component="div"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </div>
    </div>
  );
};

export default FormProduct;
