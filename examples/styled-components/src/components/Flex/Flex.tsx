import styled from "@emotion/styled";

interface FlexProps {
    bool: boolean
}

const Flex = styled('div')<FlexProps>`
	display: flex;
`;

/** @component */
export default Flex;
