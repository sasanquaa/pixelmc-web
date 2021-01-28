import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Avatar, Tooltip, Typography } from "antd";
import { CompassOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getTransactionTops } from "../redux/action";
import { TableRounded } from "../styled";
import moment from "moment";
import _ from "lodash";

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function TopBalanceTable() {
	const dispatch = useDispatch();
	const {
		loading: getTransactionTopsLoading,
		error: getTransactionTopsError,
		data: getTransactionTopsData
	} = useSelector((state) => _.get(state, "chargeState.getTransactionTops"));

	const columns = [
		{
			title: "Top",
			dataIndex: "id",
            width: 80,
            render: (id) => {
                return id < 5 ? 
                    <Typography.Link className="rgb-text" style={{marginBottom: 0, fontSize: 14, fontWeight: 600}}>{id}</Typography.Link> :
                    <Typography.Link style={{marginBottom: 0, fontSize: 14}}>{id}</Typography.Link>;
            },
            style: {
                borderRadius: 15
            }
		},
		{
			title: "Tên in-game",
			dataIndex: "username",
			width: 300,
            render: (username, record) => {
                return record.id < 5 ? 
                    <Typography.Link className="rgb-text" style={{marginBottom: 0, fontSize: 14, fontWeight: 600}}>{username}</Typography.Link> :
                    <Typography.Link style={{marginBottom: 0, fontSize: 14}}>{username}</Typography.Link>;
            }
		},
		{
			title: "Số tiền",
            dataIndex: "balance",
            render: (balance, record) => {
                return record.id < 5 ? 
                    <Typography.Paragraph className="rgb-text" style={{marginBottom: 0, fontSize: 14}}> {BigInt(balance).toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</Typography.Paragraph> :
                    <Typography.Paragraph style={{marginBottom: 0, fontSize: 14, fontWeight: 600}}> {BigInt(balance).toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}</Typography.Paragraph>;
            }
		}
	];

	useEffect(() => {
		dispatch(getTransactionTops());
	}, [dispatch]);

	return (
		<TableRounded
			bordered
			rowKey={(record) => record.id}
            scroll={false}
            columns={columns}
            limit={10}
			loading={getTransactionTopsLoading}
			dataSource={getTransactionTopsData.slice(0, 10)}
			pagination={false}
		/>
	);
}

export default memo(TopBalanceTable);
