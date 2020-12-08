import React, { FC, Dispatch, SetStateAction, ChangeEvent } from "react";

import { FormInterface } from "../utils";

interface ComponentProps {
	requestHandler: () => void;
	setData: Dispatch<SetStateAction<FormInterface>>;
}

const Form: FC<ComponentProps> = ({ setData, requestHandler }) => {
	return (
		<>
			<div className="row justify-content-center my-2">
				<div className="col-4">
					<div className="mb-3">
						<label htmlFor="firstNameInput" className="form-label">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstNameInput"
							placeholder="John"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setData((prevState) => ({
									...prevState,
									firstName: e.target.value
								}))
							}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="lastNameInput" className="form-label">
							Last Name
						</label>
						<input
							type="text"
							className="form-control"
							id="lastNameInput"
							placeholder="Doe"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setData((prevState) => ({
									...prevState,
									lastName: e.target.value
								}))
							}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="startingAtInput" className="form-label">
							Starting At
						</label>
						<input
							type="datetime-local"
							className="form-control"
							id="startingAtInput"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setData((prevState) => ({
									...prevState,
									startTime: e.target.value
								}))
							}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="endingAtInput" className="form-label">
							Ending At
						</label>
						<input
							type="datetime-local"
							className="form-control"
							id="endingAtInput"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setData((prevState) => ({
									...prevState,
									endTime: e.target.value
								}))
							}
						/>
					</div>

					<div className="mb-3">
						How many people?
						<br />
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								name="seatsInput"
								id="seatsInputRadio1"
								value="1"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setData((prevState) => ({
										...prevState,
										seats: e.target.value
									}))
								}
							/>
							<label
								className="form-check-label"
								htmlFor="seatsInputRadio1"
							>
								1
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								name="seatsInput"
								id="seatsInputRadio2"
								value="2"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setData((prevState) => ({
										...prevState,
										seats: e.target.value
									}))
								}
							/>
							<label
								className="form-check-label"
								htmlFor="seatsInputRadio2"
							>
								2
							</label>
						</div>
					</div>

					<div className="d-grid gap-2">
						<button
							className="btn btn-primary btn-sm"
							type="button"
							onClick={requestHandler}
						>
							Request
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Form;
