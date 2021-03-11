import { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

/*  disabled #zmmtg-root class in assets/styles/tailwind.css, 
    else it was showing completely black screen throughout the app */

/* Do i need to enclose meetId in quotes ?? */
const meetId = 1234;
/*  I'm using my PMI and starting the meeting from phone to test it out*/
const role = 0;

const Page2 = () => {
    useEffect(() => {
        //ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
        // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
    }, []);

    const launchMeeting = () => {
        fetch('http://localhost:8000/zoom', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ meetId, role }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.signature);
                document.getElementById('zmmtg-root').style.display = 'block';
                ZoomMtg.init({
                    leaveUrl: 'http://localhost:3000/page2',
                    isSupportAV: true,
                    success: function (success) {
                        console.log(success);
                        ZoomMtg.join({
                            signature: res.signature,
                            apiKey: res.apiKey,
                            meetingNumber: meetId,
                            userName: 'test user',
                            success: (success) => {
                                console.log(success);
                            },
                            error: (error) => {
                                console.log(error);
                            },
                        });
                    },
                });
            });
    };

    return (
        <div>
            <p className="text-red-500 font-semibold"> This is page 2. </p>
            <button className="link" onClick={() => launchMeeting()}>
                join zoom meeting
            </button>
        </div>
    );
};

export default Page2;
