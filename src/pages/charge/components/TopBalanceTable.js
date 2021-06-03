import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag, Avatar, Tooltip, Typography, Dropdown, Menu, Space } from "antd";
import { CompassOutlined, EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { getTransactionTops, getTransactionTopsByMonth } from "../redux/action";
import { TableRounded } from "../styled";
import moment from "moment";
import _ from "lodash";

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const filters = [];

for (var i = 0; i < 12; i++) {
	filters.push({
		value: i + 1,
		text: `Tháng ${i + 1}`
	});
}

function TopBalanceTable() {
	const {
		loading: getTransactionTopsByMonthLoading,
		error: getTransactionTopsByMonthError,
		data: getTransactionTopsByMonthData
	} = useSelector((state) => {
		return _.get(state, "chargeState.getTransactionTopsByMonth");
	});
	let minYear = moment().year();
	let maxYear = moment().year();
	const dispatch = useDispatch();
	const [year, setYear] = useState(moment().year());
	const [month, setMonth] = useState(moment().month() + 1);
	const key = `${month}/${moment().year()}`;

	if (!_.isEmpty(getTransactionTopsByMonthData)) {
		minYear = parseInt(
			_.minBy(_.keys(getTransactionTopsByMonthData), (key) => {
				return parseInt(key.split("/")[1]);
			}).split("/")[1]
		);
		maxYear = parseInt(
			_.maxBy(_.keys(getTransactionTopsByMonthData), (key) => {
				return parseInt(key.split("/")[1]);
			}).split("/")[1]
		);
	}

	const columns = [
		{
			title: `Top tháng ${key}`,
			dataIndex: "id",
			width: 80,
			render: (id) => {
				return id < 5 ? (
					<Typography.Link className="rgb-text" style={{ marginBottom: 0, fontSize: 14, fontWeight: 600 }}>
						{id + 1}
					</Typography.Link>
				) : (
					<Typography.Link style={{ marginBottom: 0, fontSize: 14 }}>{id + 1}</Typography.Link>
				);
			},
			style: {
				borderRadius: 15
			},
			filters: filters,
			filterMultiple: false,
			filterDropdown: (props) => {
				return (
					<div style={{textAlign: "center"}}>
						<Space direction="vertical">
							<Dropdown
								overlay={
									<Menu onClick={(e) => setMonth(parseInt(e.key))} defaultSelectedKeys={[`${month}`]}>
										{_.map(props.filters, (v) => {
											return <Menu.Item key={v.value}>{v.text}</Menu.Item>;
										})}
									</Menu>
								}
							>
								<Typography.Link>Chọn tháng</Typography.Link>
							</Dropdown>
							<Dropdown
								overlay={
									<Menu onClick={(e) => setYear(parseInt(e.key))} defaultSelectedKeys={[`${year}`]}>
										{_.map(_.range(minYear, maxYear + 1), (year) => {
											return <Menu.Item key={year}>{year}</Menu.Item>;
										})}
									</Menu>
								}
							>
								<Typography.Link>Chọn năm</Typography.Link>
							</Dropdown>
						</Space>
					</div>
				);
			}
		},
		{
			title: "Tên in-game",
			dataIndex: "username",
			width: 300,
			render: (username, record) => {
				return record.id < 5 ? (
					<Typography.Link className="rgb-text" style={{ marginBottom: 0, fontSize: 14, fontWeight: 600 }}>
						{username}
					</Typography.Link>
				) : (
					<Typography.Link style={{ marginBottom: 0, fontSize: 14 }}>{username}</Typography.Link>
				);
			}
		}
	];

	useEffect(() => {
		dispatch(getTransactionTopsByMonth());
	}, [month, year]);

	return (
		<TableRounded
			bordered
			rowKey={(record) => record.id}
			scroll={false}
			columns={columns}
			limit={10}
			loading={getTransactionTopsByMonthLoading}
			dataSource={_.get(getTransactionTopsByMonthData, key, []).slice(0, 10)}
			pagination={false}
		/>
	);
}

export default memo(TopBalanceTable);
