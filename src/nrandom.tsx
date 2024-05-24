import React, { useState, useEffect } from 'react';
import { Button, CssBaseline, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import liff from '@line/liff';

declare global {
    interface Window {
        liff: typeof liff;
    }
}

const WheelComponent: React.FC = () => {
    const [winner, setWinner] = useState<string | null>(null);
    const [rotating, setRotating] = useState<boolean>(false);
    const [isLiffReady, setIsLiffReady] = useState(false);
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
        'ข้าวหมูสับผัดซีอิ๊ว',
        'สลัดมันฝรั่ง',
        'สเต็กวีแกน',
        'เต้าหู้ทรงเครื่อง',
        'สลัดโรล'
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

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({ liffId: '2005345037-4XjR6xAY' });
                setIsLiffReady(true);
            } catch (error) {
                console.error('LIFF initialization failed', error);
            }
        };

        initializeLiff();
    }, []);

    const handleSendMessage = async (winner: string) => {
        if (isLiffReady) {
            try {
                await liff.sendMessages([
                    {
                        type: "flex",
                        altText: "This is a Flex Message",
                        contents: {
                            type: "bubble",
                            hero: {
                                type: "image",
                                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                                size: "full",
                                aspectRatio: "20:13",
                                aspectMode: "cover",
                                action: {
                                    type: "uri",
                                    label: "วิธีทำ",
                                    uri: "https://line.me/"
                                }
                            },
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: winner,
                                        weight: "bold",
                                        size: "xl"
                                    }
                                ]
                            },
                            footer: {
                                type: "box",
                                layout: "vertical",
                                spacing: "sm",
                                contents: [
                                    {
                                        type: "button",
                                        style: "link",
                                        height: "sm",
                                        action: {
                                            type: "uri",
                                            label: "วิธีทำ",
                                            uri: "https://line.me/"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]);
                console.log('Message sent successfully');
            } catch (error) {
                console.error('Error sending message', error);
            }
        } else {
            console.warn('LIFF is not initialized');
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ marginTop: 2 }}>
                    มาสุ่มอาหารกัน!
                </Typography>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    {segments.map((segment, index) => (
                        <div key={index}>{segment}</div>
                    ))}
                </Box>
                <Button variant="contained" onClick={spinWheel} disabled={rotating} sx={{ marginTop: 2 }}>
                    สุ่มเลย!!
                </Button>
                {winner && (
                    <>
                        <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 2 }}>
                            และเมนูของคุณก็คือ : {winner}
                        </Typography>
                        <Button variant="outlined" onClick={() => handleSendMessage(winner)} sx={{ marginTop: 2 }}>
                            อยากลองทำเอง? คลิกเลย
                        </Button>
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default WheelComponent;
