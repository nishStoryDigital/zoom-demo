import { Link } from 'react-router-dom';

const Sample = () => {
    return (
        <div>
            <div className="content">
                <Link to="/page2">
                    <span className="text-blue-400 font-xl font-bold">
                        Go to Page-2
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Sample;
