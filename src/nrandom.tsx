import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const WheelComponent = () => {
    const [winner, setWinner] = useState<string | null>(null);
    const [rotating, setRotating] = useState<boolean>(false);
    const segments = [
        'ข้าวกระเพราไก่ + ไข่ดาว',
        'ข้าวผัดหมู',
        'ข้าวหมูกระเทียม + ไข่ดาว',
        'ข้าวไก่กระเทียม + ไข่ดาว',
        'ข้าวคลุกกะปิ',
        'ข้าวปีกไก่ทอด',
        'ข้าวหมูผัดพริกอ่อน',
        'ข้าวคะน้าหมูกรอบ',
        'ข้าวกะหล่ำผัดน้ำปลา',
        'ข้าวหมูสับผัดซีอิ๊ว'
    ];

    const spinWheel = () => {
        if (!rotating) {
            setRotating(true);
            const spinInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * segments.length);
                setWinner(segments[randomIndex]);
            }, 100);
            setTimeout(() => {
                clearInterval(spinInterval);
                setRotating(false);
            }, 3000); // Stop spinning after 3 seconds
        }
    };

    const handleSendMessage = async () => {
        if (window.liff.getContext().type !== "none" && window.liff.getContext().type !== "external") {
            await window.liff.sendMessages([
                {
                    type: "flex",
                    altText: "This is a Flex Message",
                    contents: {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                            "size": "full",
                            "aspectRatio": "20:13",
                            "aspectMode": "cover",
                            "action": {
                                "type": "uri",
                                "uri": "https://line.me/"
                            }
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "เมนู",
                                    "weight": "bold",
                                    "size": "xl"
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "lg",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": "ส่วนประกอบหลัก",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 5
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [
                                                {
                                                    "type": "text",
                                                    "text": "[ส่วนประกอบ]",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 5
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        "footer": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "button",
                                    "style": "link",
                                    "height": "sm",
                                    "action": {
                                        "type": "uri",
                                        "label": "วิธีทำ",
                                        "uri": "https://line.me/"
                                    }
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [],
                                    "margin": "sm"
                                }
                            ],
                            "flex": 0
                        }
                    }
                }
            ]);
        }
    };

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await window.liff.init({ liffId: '2004857022-KJMLVyYa' });
            } catch (error) {
                console.error('LIFF initialization failed:', error);
            }
        };

        initializeLiff();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" className="mb-4" gutterBottom sx={{ marginTop: (theme) => theme.spacing(2) }}>มาสุ่มอาหารกัน!</Typography>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    {segments.map((segment, index) => (
                        <div key={index}>{segment}</div>
                    ))}
                </Box>
                <Button variant="contained" onClick={spinWheel} disabled={rotating} sx={{ marginTop: (theme) => theme.spacing(2) }}>สุ่มเลย!!</Button>
                {winner && <Typography variant="h5" fontWeight="bold" className="mt-4" sx={{ marginTop: (theme) => theme.spacing(2) }}>และเมนูของคุณก็คือ : {winner}</Typography>}
                {winner && <Button variant="outlined" onClick={handleSendMessage} sx={{ marginTop: (theme) => theme.spacing(2) }}>อยากลองทำเอง? คลิกเลย</Button>}
            </div>
        </React.Fragment>
    );
};

export default WheelComponent;
