import React, { memo, useState, useEffect } from "react";
import QueueAnim from "rc-queue-anim";
import { CreditCardOutlined, DownloadOutlined, HeartOutlined, YoutubeFilled, FacebookFilled } from "@ant-design/icons";
import { Modal, Button, Space, Row, Col, Typography, Tag, Layout, Avatar} from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
const { Header, Content, Footer } = Layout;

function DiscordSvg() {
	return (
		<svg
			className="icon"    
			style={{ width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden" }}
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			p-id={1928}
		>
			<path
				d="M658.432 486.4c0 31.232-23.04 56.832-52.224 56.832-28.672 0-52.224-25.6-52.224-56.832s23.04-56.832 52.224-56.832c29.184 0 52.224 25.6 52.224 56.832z m-239.104-56.832c-29.184 0-52.224 25.6-52.224 56.832s23.552 56.832 52.224 56.832c29.184 0 52.224-25.6 52.224-56.832 0.512-31.232-23.04-56.832-52.224-56.832zM960 105.472V1024c-128.988-113.988-87.736-76.256-237.568-215.552l27.136 94.72H168.96C111.104 903.168 64 856.064 64 797.696V105.472C64 47.104 111.104 0 168.96 0h686.08C912.896 0 960 47.104 960 105.472z m-145.92 485.376c0-164.864-73.728-298.496-73.728-298.496-73.728-55.296-143.872-53.76-143.872-53.76l-7.168 8.192c87.04 26.624 127.488 65.024 127.488 65.024-121.622-66.658-264.488-66.67-382.464-14.848-18.944 8.704-30.208 14.848-30.208 14.848s42.496-40.448 134.656-67.072l-5.12-6.144s-70.144-1.536-143.872 53.76c0 0-73.728 133.632-73.728 298.496 0 0 43.008 74.24 156.16 77.824 0 0 18.944-23.04 34.304-42.496-65.024-19.456-89.6-60.416-89.6-60.416 7.532 5.272 19.952 12.106 20.992 12.8 86.42 48.396 209.176 64.252 319.488 17.92 17.92-6.656 37.888-16.384 58.88-30.208 0 0-25.6 41.984-92.672 60.928 15.36 19.456 33.792 41.472 33.792 41.472 113.152-3.584 156.672-77.824 156.672-77.824z"
				fill
				p-id={1929}
			/>
		</svg>
	);
}

function OptionItem(props) {
	return (
		<div className="option-item">
			<div className="item-icon-container">
				<a href={props.href} className="item-icon-circle">
					<i
						style={{
							backgroundImage: props.image
						}}
					></i>
				</a>
			</div>
		</div>
	);
}

function IndexPage() {
	const [modalVisible, setModalVisible] = useState(false);
	const [redirect, setRedirect] = useState(null);

	const onModalOk = () => {
		setModalVisible(false);
	};

	const onModalCancel = () => {
		setModalVisible(false);
	};

	const onModalShowing = () => {
		setModalVisible(true);
	};

	return (
		<section className="index image">
			<Content className="index-content">
				<div className="wrapper" style={{ marginTop: 60 }}>
					<QueueAnim type="scaleBig" ease="easeInOutCirc" duration={600}>
						<div key="1" className="image"></div>
					</QueueAnim>
					<QueueAnim type="alpha" delay={300}>
						<Content
							key="1"
							style={{
								backgroundColor: "rgba(0,0,0,0.45)",
								borderRadius: 8,
								border: "1px solid rgba(255, 255, 255, 0.4)",
								padding: 20,
								width: "75%",
								height: 240,
								margin: "0 auto"
							}}
						>
							<QueueAnim type="right" ease="easeInOutCirc" duration={600}>
								<Typography.Title key="1" style={{ color: "whitesmoke" }} level={2}>
									Một server Minecraft Pixelmon với nhiều tính năng và trải nghiệm mới.
								</Typography.Title>
								<Typography.Title key="2" style={{ color: "#fca658" }} level={2}>
									Tham gia ngay!
								</Typography.Title>
							</QueueAnim>
							<QueueAnim
								component={Row}
								type="bottom"
								delay={800}
								componentProps={{ gutter: [12, 0], style: { marginTop: 50 } }}
							>
								<Col span={6}></Col>
								<Col key="1" span={4}>
									<Button
										style={{
											backgroundColor: "whitesmoke"
										}}
										href="/napthe"
										block
										size="large"
										type="ghost"
                                        href="https://discord.gg/C7r24E5SVR"
                                        icon={<Icon component={DiscordSvg} style={{fontSize: 24}}/>}
									>
										Discord
									</Button>
								</Col>
								<Col key="2" span={4}>
									<Button
										icon={<CreditCardOutlined style={{fontSize: 20, verticalAlign: "middle"}}/>}
										block
										size="large"
										type="ghost"
										style={{
											backgroundColor: "whitesmoke"
										}}
										href="/napthe"
									>
										Nạp thẻ
									</Button>
								</Col>
								<Col key="3" span={4}>
									<Button
										icon={<HeartOutlined style={{fontSize: 20, verticalAlign: "middle"}} />}
										block
										size="large"
										type="primary"
										onClick={onModalShowing}
										type="primary"
									>
										Chơi game
									</Button>
								</Col>
								<Col span={6}></Col>
								<Modal
									closable={false}
									bodyStyle={{ fontColor: "black" }}
									title="Cách vào server"
									footer={false}
									centered={true}
									onCancel={onModalCancel}
									onOk={onModalOk}
									visible={modalVisible}
								>
									<Typography.Paragraph>
										1. Tải launcher để tải mods tự động
										<Typography.Link href="https://drive.google.com/u/0/uc?export=download&confirm=YoeM&id=1-HWmtCjJq8N_gK2fqnsQJUN-SQSIhTub">
											<DownloadOutlined style={{ fontSize: 15, paddingLeft: 5 }} />
										</Typography.Link>
									</Typography.Paragraph>
									<Typography.Paragraph>
										2. Đăng nhập vào game thông qua launcher.
									</Typography.Paragraph>
									<Typography.Paragraph>
										3. Kết nối tới server với địa chỉ IP: <b>play.pixelmc.vn</b>.
									</Typography.Paragraph>
								</Modal>
							</QueueAnim>
						</Content>
					</QueueAnim>
				</div>
			</Content>
			<Footer style={{ backgroundColor: "transparent", width: 200 }}>
				<QueueAnim component={Row} type="left" delay={1200} componentProps={{ gutter: [12, 0]}}>
					<Col key="1" span={12}>
						<Button
							style={{ fontSize: 36, width: 40, height: 40 }}
							shape="circle"
							href="https://facebook.com/groups/928009357605548"
							icon={<FacebookFilled style={{ fontSize: 24 }} />}
						/>
					</Col>
					<Col key="2" span={12}>
						<Button
							style={{ fontSize: 36, width: 40, height: 40 }}
							shape="circle"
							href="https://www.youtube.com/channel/UCJ8TfWNfF1Z9vVcNaX7Cxzg"
							icon={<YoutubeFilled style={{ fontSize: 24 }} />}
						/>
					</Col>
				</QueueAnim>
			</Footer>
		</section>
	);
}

export default memo(IndexPage);
