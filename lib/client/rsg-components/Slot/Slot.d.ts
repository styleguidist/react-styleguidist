/// <reference types="react" />
import PropTypes from 'prop-types';
interface SlotProps {
    name: string;
    active?: string;
    onlyActive?: boolean;
    props?: {
        onClick?: (id: string, ...attrs: any[]) => void;
        active?: boolean;
        name?: string;
        [propId: string]: any;
    };
    className?: string;
}
declare function Slot({ name, active, onlyActive, className, props }: SlotProps): JSX.Element | null;
declare namespace Slot {
    var propTypes: {
        name: PropTypes.Validator<string>;
        active: PropTypes.Requireable<string>;
        onlyActive: PropTypes.Requireable<boolean>;
        props: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
    };
}
export default Slot;
