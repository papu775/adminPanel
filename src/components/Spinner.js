import { PulseLoader } from "react-spinners";

const override = {
    margin: '0 auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderColor: '#e65100',
};

const SpinnerComponent = ({ isLoading }) => {
    return (
        <>
            <PulseLoader color={'#e65100'} loading={isLoading} cssOverride={override} size={30} />
        </>
    );
}

export default SpinnerComponent;