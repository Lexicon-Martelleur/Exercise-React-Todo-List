import React, { ReactElement, ReactNode } from "react";

import { BaseLayout } from "../layout";

interface Props {
	children?: ReactNode;
}

export const App: React.FC<Props> = ({
	children
}): ReactElement => {
	return (
		<BaseLayout>
			{children}
    	</BaseLayout>
	);
}
