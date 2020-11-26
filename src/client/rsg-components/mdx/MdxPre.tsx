import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export default function MdxPre({ children, ...rest }: Props) {
	return <div>{children}</div>;
}
