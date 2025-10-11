import {Message, MessageWrapper, FirstRow, Username, DateWrapper, Wrapper} from "./Messages.style";

function Messages({messages}) {
    return (
        <Wrapper>
            {
                messages.map((message, index) => {
                        let hours = new Date(message.date).getHours();
                        let minutes = new Date(message.date).getMinutes();
                        minutes = minutes.length < 2 ? `0${minutes}` : minutes;

                        return (
                            <MessageWrapper key={index + message.username + message.message} style={{margin: '0 0 10px'}}>
                                <FirstRow>
                                    <Username>{message.username}</Username>
                                    <DateWrapper>{hours}:{minutes}</DateWrapper>
                                </FirstRow>
                                <Message>{message.message}</Message>
                            </MessageWrapper>
                        )
                    }
                )
            }
        </Wrapper>
    )
}

export default Messages;