import { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

/*  disabled #zmmtg-root class in assets/styles/tailwind.css, 
    else it was showing completely black screen throughout the app */

/* Do i need to enclose meetId in quotes ?? */
const meetId = 5404214349;
/*  I'm using my PMI and starting the meeting from phone, then hitting the 
    launchMeeting btn, still err 3008 -> Pls init meeting comes */
const role = 0;

const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZhN241LUFuUjdTOUx3QXFNcXlKLUEiLCJleHAiOjE2MTQ5NzQyMzMsImlhdCI6MTYxNDk2ODgzM30.mB1PXNQLBA--29JLSdkiqeXyyUWqhgIvU3yY-URTj2E';

const Page2 = () => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
        // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
        // ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
    }, []);

    const launchMeeting = () => {
        fetch('http://localhost:5000/zoom', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ meetId, role }),
        })
            .then((res) => res.json())
            .then((res) => {
                document.getElementById('zmmtg-root').style.display = 'block';
                ZoomMtg.init({
                    leaveUrl: 'http://localhost:3000/page2',
                    isSupportAV: true,
                    success: function (success) {
                        console.log(success);
                        ZoomMtg.join({
                            signature: token,
                            apiKey: res.apiKey,
                            meetingNumber: meetId,
                            userName: 'test user',
                            passWord:
                                'PTg0h0' /* Does joining PM require pswd ? */,
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

            <div className="ReactModal__Body--open">
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
        </div>
    );
};

export default Page2;
