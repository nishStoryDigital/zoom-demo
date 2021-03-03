import { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

/*  disabled #zmmtg-root class in assets/styles/tailwind.css, 
    else it was showing completely black screen throughout the app */

const meetId = 1234; 
/*  I'm using my PMI and starting the meeting from phone, then hitting the 
    launchMeeting btn, still err 3008 -> Pls init meeting comes */ 
const role = 0;

const Page2 = () => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

    const launchMeeting = () => {
        fetch('http://localhost:5000/zoom', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ meetId, role })
        })
        .then(res => res.json())
        .then(res => {
            ZoomMtg.init({
				leaveUrl: 'http://localhost:3000/page2',
				isSupportAV: true,
				success: function() {	
					ZoomMtg.join({
						signature: res.signature,
						apiKey: res.apiKey,
						meetingNumber: meetId,
						userName: 'test user',
						// passWord: meetConfig.passWord,
						error(res) { 
							console.log(res) 
						}
					})		
				}
			})
        })
    }

    return (
        <div>
            <p className="text-red-500 font-semibold"> This is page 2. </p>
            <button className="link" onClick={() => launchMeeting()}>
                join zoom meeting
            </button>

            {/* added on import */}
            <div id="zmmtg-root"></div>
            <div id="aria-notify-area"></div>

            {/* added on meeting init */}
            <div className="ReactModalPortal"></div>
            <div className="ReactModalPortal"></div>
            <div className="ReactModalPortal"></div>
            <div className="ReactModalPortal"></div>
            <div className="global-pop-up-box"></div>
            <div className="sharer-controlbar-container sharer-controlbar-container--hidden"></div>
        </div>
    );
};

export default Page2;
