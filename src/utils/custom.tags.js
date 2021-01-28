import React, { memo } from "react";
import { Tag } from "antd";

function StatusColor({ status }) {
	const color = {
		booked: "processing",
		confirmed: "success",
		cancelled: "error"
	};
	return (
		<Tag color={color[status]} style={{ borderRadius: "6px" }}>
			{status.toUpperCase()}
		</Tag>
	);
}

export default memo(StatusColor);
