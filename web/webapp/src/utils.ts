import { useCallback } from "react";

export interface FormInterface {
	firstName: string;
	lastName: string;
	startTime: string;
	endTime: string;
	seats: string;
}

export interface ReservationInterface extends FormInterface {
	id: number;
	accept: boolean;
	deny: boolean;
	createdAt: string;
}

export const useCRUD = (domain: string) =>
	useCallback(
		(source: string) => {
			const url = domain + source;

			return {
				list: async () => {
					const response = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					});
					const resp = await response.json();
					return resp;
				},
				create: async (data: { [key: string]: any }) => {
					const response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});
					const resp = await response.json();
					return resp;
				},
				update: async (data: { [key: string]: any }) => {
					const response = await fetch(url, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});
					const resp = await response.json();
					return resp;
				},
				remove: async () => {
					await fetch(url, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						}
					});
					return true;
				}
			};
		},
		[domain]
	);

export const formatDate = (d: string) => {
	let date = new Date(d);

	const options = {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	};

	return date.toLocaleString("en-us", options);
};
