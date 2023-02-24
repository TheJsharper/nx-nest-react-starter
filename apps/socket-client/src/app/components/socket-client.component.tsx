import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ClientToServerEvents, Message, ServerToClientEvents } from "@types";
import { useState } from "react";
import { Socket } from "socket.io-client";


export interface ResponsiveDialogProps {
    setUserName: (value: string) => void
}


export function ResponsiveDialog(props: ResponsiveDialogProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const fullScreen = useMediaQuery('md');


    const handleClose = () => {
        setOpen(false);
        props.setUserName(name);

    };

    return (
        <div>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Input your name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText component="span">
                        <Input placeholder="your name...." required value={name} onChange={(event) => setName(event.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Let's chat..
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}





export interface SocketClientProps {
    socketRef: Socket<ClientToServerEvents, ServerToClientEvents>;
}


export const SocketClient = (props: SocketClientProps) => {
    const [message, setMessage] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    props.socketRef.on('chatToServer', (message: Message) => { console.log("===>say", message) })
    const setUserName = (name: string) => {
        console.log("====>name ", name);
        setSender(name);
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <Input
                    placeholder="Chat...."
                    required
                    value={message
                    }
                    sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <Button type="submit" onClick={() => props.socketRef.emit("chatToClient", { message, sender })}>send</Button>
            </form>
            <ResponsiveDialog setUserName={setUserName} />
        </>
    );
}



export default SocketClient;