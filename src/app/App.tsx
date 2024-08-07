import { ReactElement } from "react";
import { BaseLayout } from "../layout";
import { Outlet } from "react-router-dom";

export const App = (): ReactElement => {
	return (
	<BaseLayout>
      	<Outlet />  
    </BaseLayout>
	);
}
