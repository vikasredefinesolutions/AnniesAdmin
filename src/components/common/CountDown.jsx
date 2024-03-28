import { useEffect, useState } from "react";
const CountdownTimer = ({ DataExpiryDateTime }) => {
    const [expiryTime, setExpiryTime] = useState(DataExpiryDateTime);
    const [countdownTime, setCountdownTime] = useState({
        countdownDays: "",
        countdownHours: "",
        countdownlMinutes: "",
        countdownSeconds: "",
    });
    const countdownTimer = () => {
        const timeInterval = setInterval(() => {
            const countdownDateTime = new Date(expiryTime).getTime();
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor(
                (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const totalMinutes = Math.floor(
                (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

            const runningCountdownTime = {
                countdownDays: totalDays,
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds,
            };

            setCountdownTime(runningCountdownTime);

            if (remainingDayTime < 0) {
                clearInterval(timeInterval);
                setExpiryTime(false);
            }
        }, 1000);
    };

    useEffect(() => {
        countdownTimer();
    });

    return (
        <div className="mt-2 border">
            <div className="row">
                <div className="col-sm-6">
                    <div className="btn-group my-3 flex justify-center items-center">
                        {expiryTime !== false ? (
                            <>
                                <div className="text-center">
                                    <div className="mb-2">Days</div>
                                    <div className="text-2xl font-bold bg-[#404549] relative text-white after:absolute after:content-[''] after:h-0.5 after:bg-[rgba(0,0,0,0.4)] after:top-1/2 after:w-full after:-translate-y-1/2 after:left-0 after:right-0 overflow-hidden rounded-lg px-3 py-3 inline-flex min-w-[50px] justify-center">
                                        {countdownTime.countdownDays ? countdownTime.countdownDays : "00"}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">&nbsp;</div>
                                    <div className="mx-2 text-center">
                                        <div className="text-2xl text-gray-800 font-bold">:</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">Hours</div>
                                    <div className="text-2xl font-bold bg-[#404549] relative text-white after:absolute after:content-[''] after:h-0.5 after:bg-[rgba(0,0,0,0.4)] after:top-1/2 after:w-full after:-translate-y-1/2 after:left-0 after:right-0 overflow-hidden rounded-lg px-3 py-3 inline-flex min-w-[50px] justify-center">
                                        {countdownTime.countdownHours ? countdownTime.countdownHours : "00"}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">&nbsp;</div>
                                    <div className="mx-2 text-center">
                                        <div className="text-2xl text-gray-800 font-bold">:</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">Minutes</div>
                                    <div className="text-2xl font-bold bg-[#404549] relative text-white after:absolute after:content-[''] after:h-0.5 after:bg-[rgba(0,0,0,0.4)] after:top-1/2 after:w-full after:-translate-y-1/2 after:left-0 after:right-0 overflow-hidden rounded-lg px-3 py-3 inline-flex min-w-[50px] justify-center">
                                        {countdownTime.countdownMinutes ? countdownTime.countdownMinutes : "00"}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">&nbsp;</div>
                                    <div className="mx-2 text-center">
                                        <div className="text-2xl text-gray-800 font-bold">:</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2">Seconds</div>
                                    <div className="text-2xl font-bold bg-[#404549] relative text-white after:absolute after:content-[''] after:h-0.5 after:bg-[rgba(0,0,0,0.4)] after:top-1/2 after:w-full after:-translate-y-1/2 after:left-0 after:right-0 overflow-hidden rounded-lg px-3 py-3 inline-flex min-w-[50px] justify-center">
                                        {countdownTime.countdownSeconds ? countdownTime.countdownSeconds : "00"}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Store Close Date has been Reached !</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CountdownTimer;
