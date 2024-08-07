import { createBrowserRouter, createRoutesFromElements, Route, useNavigate } from "react-router-dom";

import { App } from "./App";
import { TodoFormPage, TodoListPage } from "../features";
import { ReactElement, useEffect } from "react";
import { Path } from "../constants";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path={Path.INDEX} element={<App />}>
			<Route index element={<TodoListPage />} />
			<Route path={Path.ADD_TODO} element={<TodoFormPage />} />
			<Route path={Path.UNKNOWN} element={<RouteToIndex />} />
		</Route>
	)
);

function RouteToIndex (): ReactElement {
	const navigate = useNavigate();
	useEffect(() => {
		navigate(Path.INDEX);
	})
	return <></>
}
