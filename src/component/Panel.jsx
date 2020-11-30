import React, { useState } from "react";
import styled from "styled-components";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";

export default function Panel() {
    const [uploaded, setuploaded] = useState(false);
    const [loading, setloading] = useState(false);
    const fetchData = async () => {
        setloading(true);
        await Axios.post("https://zauba-backened.herokuapp.com/fetch");
        setloading(false);
    };
    const props = {
        name: "file",
        action: "https://zauba-backened.herokuapp.com/upload",
        headers: {},
        onChange(info) {
            console.log("info", info);
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                setuploaded(true);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file is'nt in csv format.`);
            }
        },
    };
    return (
        <Container>
            <div style={{ marginBottom: 20 }}>
                Zauba panel for uploading csv and fetching data
            </div>
            <div
                style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Upload {...props} accept=".csv">
                    <Button icon={<UploadOutlined />}>Upload only csv</Button>
                </Upload>
                <Button
                    onClick={fetchData}
                    disabled={!uploaded}
                    loading={loading}
                >
                    Fetch data
                </Button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10vh;
`;
