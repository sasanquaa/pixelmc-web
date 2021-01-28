import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {chargeSubmit} from "./redux/action";
import { Button, Modal, Form, Input, Row, Col, Select, Space, Typography } from "antd";
import ChargeTable from "./components/ChargeTable";
import _ from "lodash";
import { FormItemStyled } from "./styled";

const { Option } = Select;

function time() {
	return Math.floor(new Date().getTime() / 1000);
}

function BouncingBalls(props) {
	return (
		<div>
			<div id="ball-1" className="circle"></div>
			<div id="ball-2" className="circle"></div>
			<div id="ball-3" className="circle"></div>
		</div>
	);
}

function ChargePage() {
    const dispatch = useDispatch();
	const {
		loading: chargeSubmitLoading,
		error: chargeSubmitError,
		success: chargeSubmitSuccess
	} = useSelector((state) => _.get(state, "chargeState.chargeSubmit"));

	const [username, setUsername] = useState(null);
	const [mathe, setCardCode] = useState(null);
	const [serial, setSerial] = useState(null);
	const [menhgia, setCardPrice] = useState(null);
	const [loaithe, setCardType] = useState(null);
    const [youtuber, setYoutuber] = useState(null);
    const [updated, setUpdated]  = useState(false);
    
	const content = () => time();
	const onFinish = (values) => {
        values = {...values, content: content()};
        dispatch(chargeSubmit(values)).then((v) => {
            setUpdated(!updated);
        });
    };
    
    useEffect(() => {
    }, [dispatch]);

	return (
		<Form onFinish={onFinish} className="charge" style={{ alignItems: "normal" }}>
			<Row gutter={[12, 0]} justify="start" style={{ justifyContent: "center" }}>
				<Col span={6} style={{ backgroundColor: "whitesmoke", padding: "25px 30px", borderRadius: 10 }}>
					<Typography.Paragraph style={{ textAlign: "center" }}>
						<Typography.Title style={{ marginBottom: 2 }} level={3}>
							Điền vào thông tin
						</Typography.Title>

						<Typography.Paragraph style={{ marginBottom: 3 }}>Lưu ý:</Typography.Paragraph>

						<Typography.Paragraph style={{ marginBottom: 3 }}>
							Nếu bạn nhập sai <b>tên in-game</b> hoặc <b>chưa được đăng ký</b> thì hệ thống sẽ không gửi
							vật phẩm.
						</Typography.Paragraph>

						<Typography.Paragraph style={{ marginBottom: 3 }}>
							Nếu bạn nhập sai <b>mệnh giá thẻ</b> thì bạn sẽ mất thẻ.
						</Typography.Paragraph>

						<Typography.Paragraph style={{ marginBottom: 3 }}>
							Admin sẽ không hoàn trả các trường hợp trên dưới mọi hình thức.
						</Typography.Paragraph>
					</Typography.Paragraph>

					<FormItemStyled name="username" label="Tên in-game" labelCol={{ md: 24 }} labelAlign="left">
						<Input onChange={setUsername} />
					</FormItemStyled>
					<FormItemStyled name="mathe" label="Mã thẻ" labelCol={{ md: 24 }} labelAlign="left">
						<Input onChange={setCardCode} />
					</FormItemStyled>
					<FormItemStyled name="serial" label="Số serial thẻ" labelCol={{ md: 24 }} labelAlign="left">
						<Input onChange={setSerial} />
					</FormItemStyled>
					<FormItemStyled name="menhgia" label="Mệnh giá" labelCol={{ md: 24 }} labelAlign="left">
						<Select onChange={setCardPrice} placeholder="Chọn mệnh giá">
							<Option value="10000">10.000 VNĐ</Option>
							<Option value="20000">20.000 VNĐ</Option>
							<Option value="50000">50.000 VNĐ</Option>
							<Option value="100000">100.000 VNĐ</Option>
							<Option value="200000">200.000 VNĐ</Option>
							<Option value="500000">500.000 VNĐ</Option>
						</Select>
					</FormItemStyled>
					<FormItemStyled name="loaithe" label="Loại thẻ" labelCol={{ md: 24 }} labelAlign="left">
						<Select onChange={setCardType} placeholder="Chọn loại thẻ">
							<Option value="Mobifone">Mobifone</Option>
							<Option value="Vinaphone">Vinaphone</Option>
							<Option value="Viettel">Viettel</Option>
						</Select>
					</FormItemStyled>
					<FormItemStyled name="youtuber" style={{ marginBottom: 16 }} label="Code" labelCol={{ md: 24 }} labelAlign="left">
						<Select onChange={setYoutuber} placeholder="Chọn code">
							<Option value="Kass">Kass</Option>
							<Option value="TL">TL</Option>
							<Option value="Noxuss">Noxuss</Option>
						</Select>
					</FormItemStyled>
					<FormItemStyled style={{ textAlign: "center" }}>
						<Button loading={chargeSubmitLoading} type="primary" htmlType="submit">Nạp thẻ</Button>
					</FormItemStyled>
				</Col>
				<Col span={14}>
					<ChargeTable />
				</Col>
			</Row>
		</Form>
	);
}

export default memo(ChargePage);
