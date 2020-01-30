export function setErrorMessageCallBackEnd(error) {
    let messageResponse = "Server down";
    if (error.response) {
        // Server up
        messageResponse = error.response.data;
        if (error.response.data === "") {
            messageResponse = `(${error.response.status}) Server error`;
        }
        if (error.response.status === "500") {
            messageResponse = "Internal server error";
        }
    }
    return messageResponse;
}