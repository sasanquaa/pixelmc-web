import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Avatar, Tooltip, Typography } from "antd";
import { CompassOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getTransactions } from "../redux/action";
import moment from "moment";
import _ from "lodash";

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function ChargeTable() {
	const dispatch = useDispatch();
	const {
		loading: getTransactionsLoading,
		error: getTransactionsError,
		data: getTransactionsData
	} = useSelector((state) => _.get(state, "chargeState.getTransactions"));

	const columns = [
		{
			title: "ID",
            dataIndex: "id",
            width: 80
		},
		{
			title: "Tên in-game",
            dataIndex: "username",
            width: 150,
            render: username => <Typography.Link href="javascript::;">{username}</Typography.Link>
		},
		{
			title: "Loại thẻ",
            dataIndex: "cardType",
            width: 100,
            render: cardType => <Tag color="orange">{cardType}</Tag>
		},
		{
			title: "Mệnh giá",
			dataIndex: "cardValue",
            width: 120,
			render: (v) => `${formatNumber(v.substr(1))} VNĐ`,
		},
		{
			title: "Số serial",
			dataIndex: "cardSerial",
            width: 140
		},
		{
			title: "Trạng thái",
            dataIndex: "cardStatus",
            width: 150,
			render: (s) => {
				switch (s) {
					case "pending":
						return <Tag color="processing">Đang xử lý</Tag>;
					case "success":
						return <Tag color="success">Nạp thành công</Tag>;
					case "invalid":
						return <Tag color="red">Sai mệnh giá</Tag>;
					case "failure":
						return <Tag color="error">Nạp thất bại</Tag>;
					case "error":
						return <Tag color="warning">Lỗi hệ thống</Tag>;
				}
			}
		},
		{
			title: "Thời gian",
			dataIndex: "datetime",
			render: (datetime) => moment(datetime).format("DD-MM-YYYY HH:mm:ss")
		},
		{
			title: "Code",
            dataIndex: "youtuber",
            width: 80
		}
	];

	useEffect(() => {
		dispatch(
			getTransactions({
				_sort: "id:desc"
			})
		);
	}, [dispatch]);

	return (
		<Table
            bordered
			rowKey={(record) => record.id}
			scroll={{ x: 1000, y: 500 }}
			columns={columns}
			loading={getTransactionsLoading}
            dataSource={getTransactionsData}
            pagination={{
                simple: true
            }}
		/>
	);
}

export default memo(ChargeTable);
