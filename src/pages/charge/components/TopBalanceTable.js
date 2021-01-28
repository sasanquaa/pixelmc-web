import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Avatar, Tooltip, Typography } from "antd";
import { CompassOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getTransactions } from "../redux/action";
import { TableRounded } from "../styled";
import moment from "moment";
import _ from "lodash";

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function summary() {

}

function TopChargeTable() {
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
			render: (username) => <Typography.Link>{username}</Typography.Link>
        },
        {
            title: "Số tiền",
            dataIndex: "charged"
        }
	];

	useEffect(() => {
		dispatch(
			getTransactions({
                limit: -1
			})
		);
	}, [dispatch]);

	return (
		<TableRounded
			bordered
			rowKey={(record) => record.id}
			scroll={{ x: 1000, y: 500 }}
			columns={columns}
			loading={getTransactionsLoading}
			dataSource={getTransactionsData}
			pagination={false}
		/>
	);
}

export default memo(TopChargeTable);
