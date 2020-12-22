export default function Player(props) {
    return (
        <video controls autoPlay>
            {/*Safari / iOS, IE9*/}
            <source
                src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
                type="video/mp4"
            />
            {/*Chrome10+, Ffx4+, Opera10.6+*/}
            <source
                src="http://clips.vorwaerts-gmbh.de/VfE.webm"
                type="video/webm"
            />
            {/*Firefox3.6+ / Opera 10.5+*/}
            <source
                src="http://clips.vorwaerts-gmbh.de/VfE.ogv"
                type="video/ogg"
            />
        </video>
    );
}
