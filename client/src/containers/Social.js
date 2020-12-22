import { Views, Votes } from '../components';
export default function Social() {
    //Get the views & votes from DB

    return (
        <div className="social">
            <Views />
            <Votes />
        </div>
    );
}
