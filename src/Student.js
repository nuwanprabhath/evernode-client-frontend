import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "./index.css";
import axios from "axios";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const validate = urlParams.get("validate");
const API_HOST = process.env.API_HOST || "http://localhost:4001";
const APP_HOST = window.location.origin;
const validateUrl = `${APP_HOST}/student/?id=${id}&validate=true`;

function Student() {
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    handleGetRecords(id);
  }, []);

  console.log("id: ", id);
  console.log("status: ", status);
  console.log("validate: ", validate);

  function getStudentData() {
    if (data) {
      return (
        <div>
          <p>Name: {data.name}</p>
          <p>Degree: {data.degree}</p>
          <p>Graduation Date: {data.date}</p>
          <p>Student ID: {data.studentId}</p>
          <p>Student Account: {data.studentAccount}</p>
        </div>
      );
    }
  }

  function getQRCode() {
    if (!validate) {
      return <div>
        <div style={{ height: "auto", margin: "0 auto" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "90%", width: "90%" }}
            value={validateUrl}
            viewBox={`0 0 256 256`}
          />
        </div>
        <a href={validateUrl} target="_blank" rel="noopener noreferrer" style={{color: "#8ecff1"}}>
          Student record QR Code
        </a>
      </div>;
    }
  }

  function getNftLink() {
    if (!validate) {
      const qrCodeUrl = `https://test.xahauexplorer.com/explorer/${data.nftHash}`;
      return <div>
        <div style={{ height: "auto", margin: "0 auto" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "90%", width: "90%" }}
            value={qrCodeUrl}
            viewBox={`0 0 256 256`}
          />
        </div>
        <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer" style={{color: "#8ecff1"}}>
          NFT QR Code Link
        </a>
      </div>;
    }
  }

  function getContent() {
    if (status === "SUCCESS") {
      return <>
      {getStudentData()}
      {getQRCode()}
      {/* {getNftLink()} */}
      </>;
    } else if (status === "ERROR" && validate) {
      return <div>No records found</div>;
    } else if (
      status === "ERROR" &&
      (validate === null || validate === undefined)
    ) {
      return <div>You haven't graduated yet. Work hard though!</div>;
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <div>
      <header className="App-header">
        <div style={{ fontSize: "xxx-large" }}>
          Student Record {validate && " Check"}
        </div>
        {getContent()}
        {validate && <a href={`https://test.xahauexplorer.com/explorer/${data.nftHash}`} target="_blank" rel="noopener noreferrer" style={{color: "#8ecff1"}}>
          Validate NFT
        </a>}
        {/* <input
          type="text"
          id="uriInput"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        /> */}
        {/* <button onClick={handleGetRecords}>Get Records</button> */}
      </header>
    </div>
  );

  function handleGetRecords(uri) {
    const url = `${API_HOST}/retrieve/?id=${uri}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("Data received: ", data);
        setData(data.data);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        console.log(error);
        setStatus("ERROR");
      });
  }
}

export default Student;
