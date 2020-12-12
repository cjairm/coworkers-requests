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
	const [file, setFile] = useState<any>(null);

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
					...prevState,
					res
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

	const getFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e ? e.target.files[0] : e.target ? e.target.files[0] : null;
		setFile({ invitationsFile: f });
	};

	const sendFileHandler = () => {
		if (file) {
			let formData = new FormData();

			for (const name in file) {
				formData.append(name, file[name]);
			}

			console.log(file);
			console.log(formData);

			base("reservations/list/")
				.create(formData, "None")
				.then((res: ReservationInterface[]) => {
					setReservations((prevState: ReservationInterface[]) => [
						...prevState,
						...res
					]);
				});
		}
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
							getFileHandler={getFileHandler}
							sendFileHandler={sendFileHandler}
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
