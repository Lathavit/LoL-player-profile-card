export const sentFlexToLine = async (data: {
    name: string,
    img: string,
}) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data), // ส่งข้อมูลในรูปแบบ JSON
        redirect: "follow" as RequestRedirect
    };

    return fetch("http://localhost:3000/send-message", requestOptions)
        .then((response) => response.text())
} 
