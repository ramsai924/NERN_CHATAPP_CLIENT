import React from "react";
import styles from '../../src/styles/Cartoon.module.css'

let eyesObj : any = {
    one: {
        top: "60%",
        left: "10%"
    },
    two: {
        top: "65%",
        left: "20%"
    },
    three: {
        top: "65%",
        left: "30%"
    },
    four: {
        top: "60%",
        left: "40%"
    },
    default: {
        top: "40%",
        left: "30%"
    }
};

function Cartoon(props: any) {
    let [position, setPosition] = React.useState<any>("default");
    let [closeEye, setCloseEye] = React.useState({});

    const { emaillength, type, passwordlength, unhidepassword } = props;
    React.useEffect(() => {
        if (emaillength > 0) {
            if (emaillength <= 3) {
                setPosition("one");
            } else if (emaillength <= 6) {
                setPosition("two");
            } else if (emaillength <= 9) {
                setPosition("three");
            } else if (emaillength > 10) {
                setPosition("four");
            }
        } else {
            setPosition("default");
        }

        if (type === "password" && passwordlength > 0) {
            setPosition("default");
            let animatedObj = "closeEye 1s forwards";
            setCloseEye(animatedObj);
        } else if (type === "password") {
            setPosition("default");
            setCloseEye("");
        }

        if (type === "password" && unhidepassword) {
            setPosition("three");
        }
    }, [emaillength, type, passwordlength, unhidepassword]);

    console.log(emaillength && type === "email");
    return (
        <div className={styles.cartoon_container}>
            <div className={styles.eyes_container}>
                <div className={styles.eye_left}>
                    <div
                        className={styles.eye_ball_left}
                        style={{
                            ...eyesObj[position],
                            animation:
                                (emaillength && type === "email") > 0
                                    ? "none"
                                    : passwordlength > 0 && type === "password" && closeEye
                        }}
                    ></div>
                </div>

                <div className={styles.eye_right}>
                    <div
                        className={styles.eye_ball_right}
                        style={{
                            ...eyesObj[position],
                            animation:
                                (emaillength && type === "email") > 0
                                    ? "none"
                                    : passwordlength > 0 &&
                                        type === "password" &&
                                        unhidepassword === false
                                        ? closeEye
                                        : type === "password" &&
                                        passwordlength > 0 &&
                                        "openEye 1s forwards"
                            // animation: "closeEye 1s forwards"
                        }}
                    ></div>
                </div>
            </div>
            <div className={styles.close_eyes_container} style={{ display: "none" }}>
            
                <div>
                    <div className={styles.close_eye_left}></div>
                    <div className={styles.close_eye_right}></div>
                </div>
            </div>
            <div className={styles.mouth_smile}>
                <div className={styles.teeth}></div>
            </div>
        </div>
    );
}

export default Cartoon;
