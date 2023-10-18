import { LoaderBackDrop, SimpleLoader } from './Loader.styled';

const Loader = () => {
    return (
        <LoaderBackDrop>
            <SimpleLoader>LOADING...</SimpleLoader>
        </LoaderBackDrop>
    );
};

export default Loader;
