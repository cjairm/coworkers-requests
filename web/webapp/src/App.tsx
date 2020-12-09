import React, { FC, useEffect, useState } from "react";

import { useCRUD, ReservationInterface, FormInterface } from "./utils";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Form from "./components/Form";

const initForm = {
	firstName: "",
	lastName: "",
	startTime: "",
	endTime: "",
	seats: ""
};

const App: FC = () => {
	const base = useCRUD("http://localhost:8000/");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [reservations, setReservations] = useState<ReservationInterface[]>(
		[]
	);
	const [data, setData] = useState<FormInterface>(initForm);

	useEffect(() => {
		base("reservations/?order_by=createdAt")
			.list()
			.then((res: ReservationInterface[]) => {
				setReservations(res);
				setIsLoading(false);
			});
	}, [base]);

	const createRequestHandler = () => {
		base("reservations/")
			.create(data)
			.then((res: ReservationInterface) => {
				setReservations((prevState: ReservationInterface[]) => [
					res,
					...prevState
				]);
			});
	};

	const updateRequestHandler = (
		id: number,
		data: { accept: boolean; deny: boolean }
	) => {
		let d: any = {};

		const newRes: ReservationInterface[] = reservations.map(
			(r: ReservationInterface) => {
				if (r.id === id) {
					d = { ...r, ...data };
					return d;
				} else return r;
			}
		);

		base(`reservations/${id}/`)
			.update(d)
			.then(() => {
				setReservations(newRes);
			});
	};

	return (
		<>
			<Navbar />
			<div className="container">
				{isLoading ? (
					<Loading />
				) : (
					<div className="row p-2">
						<Form
							requestHandler={createRequestHandler}
							setData={setData}
						/>
						{reservations.map((r: ReservationInterface) => {
							return (
								<div
									key={r.id}
									className="col-12 col-sm-6 col-md-4 col-lg-3"
								>
									<Card
										updateRequestHandler={
											updateRequestHandler
										}
										id={r.id}
										firstName={r.firstName}
										lastName={r.lastName}
										startTime={r.startTime}
										endTime={r.endTime}
										seats={r.seats}
										accept={r.accept}
										deny={r.deny}
										createdAt={r.createdAt}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default App;
