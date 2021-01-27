import React, { memo, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { Modal } from "antd";

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

function IndexPage()  {

    const [modalVisible, setModalVisible] = useState(false);
    const [redirect, setRedirect] = useState(null);

	const onModalOk = () => {
        setModalVisible(false);
	};

	const onModalCancel = () => {
		setModalVisible(showModal);
	};

	const onModalShowing = () => {
		setModalVisible(true);
	};

	ccomponentDidMount() {
		setTimeout(() => {
			$("#discord").addClass("index-on-hover");
		}, 300);
		setTimeout(() => {
			$("#charge").addClass("index-on-hover");
		}, 600);
		setTimeout(() => {
			$("#play").addClass("index-on-hover");
		}, 900);
	}

	render() {
		if (this.state.redirect) return <Redirect to="/napthe" />;

		return (
			<section className="index image">
				<div className="index-content">
					<div className="wrapper">
						<div className="image"></div>
						<h2>Một server Minecraft Pixelmon với nhiều tính năng và trải nghiệm mới.</h2>
						<h2>Tham gia ngay!</h2>
						<nav className="nav-container">
							<a href="https://discord.gg/C7r24E5SVR" id="discord">
								Discord
							</a>
							<a href="/napthe" id="charge">
								Nạp thẻ
							</a>
							<a onClick={this.onModalShowing} id="play">
								Chơi game
							</a>
							<Modal
								closable={false}
								bodyStyle={{ fontColor: "black" }}
								title="Cách vào server"
								footer={false}
								centered={true}
								onCancel={this.onModalCancel}
								onOk={this.onModalOk}
								visible={this.state.showModal}
							>
								<p>
									1. Tải launcher để tải mods tự động:{" "}
									<a
										id="download-link"
										href="https://drive.google.com/u/0/uc?export=download&confirm=YoeM&id=1-HWmtCjJq8N_gK2fqnsQJUN-SQSIhTub"
									>
										Bấm vào đây
									</a>
								</p>
								<p>2. Đăng nhập vào game thông qua launcher.</p>
								<p>
									3. Kết nối tới server với địa chỉ IP: <b>pixelmc.vn</b>.
								</p>
							</Modal>
						</nav>
					</div>
				</div>
				<div className="index-footer">
					<div className="wrapper">
						<OptionItem href="https://facebook.com/groups/928009357605548" image="url(./facebook.png)" />
						<OptionItem href="https://www.youtube.com/channel/UCJ8TfWNfF1Z9vVcNaX7Cxzg" />
					</div>
				</div>
			</section>
		);
	}
}
