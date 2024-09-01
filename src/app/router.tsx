import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	useNavigate 
} from "react-router-dom";

import { App } from "./App";
import { ReactElement, useEffect } from "react";
import { Path } from "../constants";
import * as TodoFeature from "../features";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path={Path.INDEX} element={<App><TodoFeature.TodotStateProvider /></App>}>
			<Route index element={<TodoFeature.TodoListPage />} />
			<Route path={Path.ADD_TODO} element={<TodoFeature.AddTodoPage />} />
			<Route path={Path.ABOUT} element={<TodoFeature.AboutPage />} />
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
