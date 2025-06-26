import {Input} from "./MessageInput.style";

function MessageInput() {
    return (
        <form name="publish" autocomplete="off">
            <Input type="text" name="message" placeholder={'Write a message ... '}/>
            {/*<input type="submit" value="Send"/>*/}
        </form>
    )
}

export default MessageInput;