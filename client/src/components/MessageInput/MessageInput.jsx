import {Input} from "./MessageInput.style";

function MessageInput() {
    return (
        <form name="publish" onSubmit={(e) => e.preventDefault()}>
            <Input type="text" name="message" placeholder={'Write a message ... '}/>
            {/*<input type="submit" value="Send"/>*/}
        </form>
    )
}

export default MessageInput;