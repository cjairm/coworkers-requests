import React, { FC } from "react";

import { ReservationInterface, formatDate } from "../utils";

interface ComponentProps extends ReservationInterface {
	updateRequestHandler: (
		id: number,
		data: { accept: boolean; deny: boolean }
	) => void;
}

const Card: FC<ComponentProps> = ({
	id,
	firstName,
	lastName,
	startTime,
	endTime,
	seats,
	accept,
	deny,
	createdAt,
	updateRequestHandler
}) => {
	return (
		<div
			className="card border-dark mb-3 mx-auto"
			style={{ maxWidth: "18rem" }}
		>
			<div className="card-header">
				{+seats === 1 ? "For one person" : "For two people"}
			</div>
			<div className="card-body text-dark">
				<h5 className="card-title">{`${firstName} ${lastName}`}</h5>
				<p className="card-text">
					Starting at:{" "}
					<span className="fst-italic">{formatDate(startTime)}</span>
				</p>
				<p className="card-text">
					Ending at:{" "}
					<span className="fst-italic">{formatDate(endTime)}</span>
				</p>
				{!accept && !deny ? (
					<>
						<button
							onClick={() =>
								updateRequestHandler(id, {
									accept: true,
									deny: false
								})
							}
							className="btn btn-link"
						>
							Accept
						</button>
						<button
							onClick={() =>
								updateRequestHandler(id, {
									accept: false,
									deny: true
								})
							}
							className="btn btn-link"
						>
							Deny
						</button>
					</>
				) : accept && !deny ? (
					<span className="badge bg-success">Accepted</span>
				) : !accept && deny ? (
					<span className="badge bg-warning">Denied</span>
				) : null}
			</div>
			<div className="card-footer">
				<small className="text-muted">{formatDate(createdAt)}</small>
			</div>
		</div>
	);
};

export default Card;
