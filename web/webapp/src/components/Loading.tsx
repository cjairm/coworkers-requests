import React, { FC } from "react";

const Loading: FC = () => {
	return (
		<div className="d-flex align-items-center">
			<strong>Loading...</strong>
			<div
				className="spinner-border ms-auto"
				role="status"
				aria-hidden="true"
			></div>
		</div>
	);
};

export default Loading;
